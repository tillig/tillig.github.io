---
layout: post
title: "How to Route Ingress Traffic by Host in Istio"
date: 2021-09-30 -0800
comments: true
tags: [kubernetes]
description: "Kind of niche, but if you need to route ingress traffic in Istio using hostname but you're only getting a single hostname inbound... this could help you."
---

I have a situation that is possibly kind of niche, but it was a real challenge to figure out so I thought I'd share the solution in case it helps you.

I have a Kubernetes cluster with Istio installed. My Istio ingress gateway is connected to an Apigee API management front-end via mTLS. Requests come in to Apigee then get routed to a secured public IP address where only Apigee is authorized to connect.

Unfortunately, this results in all requests coming in with the same `Host` header:

1. Client requests `api.services.com/v1/resource/operation`.
2. Apigee gets that request and routes to `1.2.3.4/v1/resource/operation` via the Istio ingress gateway and mTLS.
3. An Istio `VirtualService` answers to `hosts: "*"` (any host header at all) and matches entirely on URL path - if it's `/v1/resource/operation` it routes to `mysvc.myns.svc.cluster.local/resource/operation`.

This is how the [ingress tutorial on the Istio site works](https://istio.io/latest/docs/tasks/traffic-management/ingress/ingress-control/#accessing-ingress-services-using-a-browser), too. No hostname-per-service.

However, there are a couple of wrenches in the works, as expected:

- There are some API endpoints on the service that _aren't_ exposed through Apigee. They're internal-only operations that allow for service-to-service communications in the cluster but aren't for outside callers.
- I want to do canary deployments and route traffic slowly from an existing version of the service to a new, canary version. I need _both_ the external _and_ internal traffic routed this way to get accurate results.

The combination of these things is a problem. I can't assume that the match-on-path-regex setting will work for internal traffic - I need any internal service to route properly based on host name. However, you also can't match on `host: "*"` for internal traffic that doesn't come through an ingress. That means I would need two different `VirtualService` instances - one for internal traffic, one for external.

But if I have two different `VirtualService` objects to manage, it means I need to keep them in sync over the canary, which kind of sucks. **I'd like to set the traffic balancing in one spot and have it work for both internal and external traffic.**

[I asked how to do this on the Istio discussion forum](https://discuss.istio.io/t/how-can-you-use-a-delegate-virtualservice-to-route-both-internal-and-external-traffic/11449) and thought for a while that [a `VirtualService` `delegate` would be the answer](https://istio.io/latest/docs/reference/config/networking/virtual-service/#Delegate) - have one `VirtualService` with the load balancing information, a second service for internal traffic (delegating to the load balancing service), and a third service for external traffic (delegating to the load balancing service). It's more complex, but I'd get the ability to control traffic in one spot.

Unfortunately (the word "unfortunately" shows up a lot here, doesn't it?), **you can't use delegates on a `VirtualService` that doesn't also connect to a `gateway`**. That is, if it's internal/`mesh` traffic, you don't get the delegate support. [This issue in the Istio repo touches on that.](https://github.com/istio/istio/issues/22997)

**Here's where I landed.**

First, **I updated Apigee** so it takes care of two things for me:

1. **It adds a `Service-Host` header with the internal host name of the target service, like `Service-Host: mysvc.myns.svc.cluster.local`.** It more tightly couples the Apigee part of things to the service internal structure, but it frees me up from having to route entirely by regex in the cluster. (You'll see why in a second.) I did try to set the `Host` header directly, but Apigee overwrites this when it issues the request on the back end.
2. **It does all the path manipulation before issuing the request.** If the internal service wants `/v1/resource/operation` to be `/resource/operation`, that path update happens in Apigee so the inbound request will have the right path to start.

I did the `Service-Host` header with [an "AssignMessage" policy](https://docs.apigee.com/api-platform/reference/policies/assign-message-policy).

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<AssignMessage async="false" continueOnError="false" enabled="true" name="Add-Service-Host-Header">
    <DisplayName>Add Service Host Header</DisplayName>
    <Set>
        <Headers>
            <Header name="Service-Host">mysvc.myns.svc.cluster.local</Header>
        </Headers>
    </Set>
    <IgnoreUnresolvedVariables>true</IgnoreUnresolvedVariables>
    <AssignTo createNew="false" transport="http" type="request"/>
</AssignMessage>
```

Next, **I added an Envoy filter to the Istio ingress gateway** so it knows to look for the `Service-Host` header and update the `Host` header accordingly. Again, I used `Service-Host` because I couldn't get Apigee to properly set `Host` directly. If you can figure that out and get the `Host` header coming in correctly the first time, you can skip the Envoy filter.

The filter needs to run _first thing_ in the pipeline, before Istio tries to route traffic. I found that pinning it just before the `istio.metadata_exchange` stage got the job done.

```yaml
apiVersion: networking.istio.io/v1alpha3
kind: EnvoyFilter
metadata:
  name: propagate-host-header-from-apigee
  namespace: istio-system
spec:
  workloadSelector:
    labels:
      istio: ingressgateway
      app: istio-ingressgateway
  configPatches:
    - applyTo: HTTP_FILTER
      match:
        context: GATEWAY
        listener:
          filterChain:
            filter:
              name: "envoy.http_connection_manager"
            subFilter:
              # istio.metadata_exchange is the first filter in the connection
              # manager, at least in Istio 1.6.14.
              name: "istio.metadata_exchange"
      patch:
        operation: INSERT_BEFORE
        value:
          name: envoy.filters.http.lua
          typed_config:
            "@type": type.googleapis.com/envoy.extensions.filters.http.lua.v3.Lua
            inline_code: |
              function envoy_on_request(request_handle)
                local service_host = request_handle:headers():get("service-host")
                if service_host ~= nil then
                  request_handle:headers():replace("host", service_host)
                end
              end
```

Finally, **the `VirtualService` that handles the traffic routing needs to be tied both to the ingress and to the `mesh` gateway**. The `hosts` setting can just be the internal service name, though, since that's what the ingress will use now.

```yaml
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: mysvc
  namespace: myns
spec:
  gateways:
    - istio-system/apigee-mtls
    - mesh
  hosts:
    - mysvc
  http:
    - route:
        - destination:
            host: mysvc-stable
          weight: 50
        - destination:
            host: mysvc-baseline
          weight: 25
        - destination:
            host: mysvc-canary
          weight: 25
```

Once all these things are complete, **both internal and external traffic will be routed by the single `VirtualService`**. Now I can control canary load balancing in a single location and be sure that I'm getting correct overall test results and statistics with as few moving pieces as possible.

**Disclaimer**: There may be reasons you _don't_ want to treat external traffic the same as internal, like if you have different `DestinationRule` settings for traffic management inside vs. outside, or if you need to pass things through different authentication filters or whatever. Everything I'm working with is super locked down so I treat internal and external traffic with the same high levels of distrust and ensure that both types of traffic are scrutinized equally. YMMV.
