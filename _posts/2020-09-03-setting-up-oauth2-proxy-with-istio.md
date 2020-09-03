---
layout: post
title: "Setting Up oauth2-proxy with Istio"
date: 2020-09-03 -0800
comments: true
tags: [kubernetes]
description: "Getting oauth2-proxy working with nginx ingress is pretty straightforward. Not so much with Istio, but I got it working and here's what I did."
---
Here's what I want:

- Istio 1.6.4 in Kubernetes acting as the ingress.
- oauth2-proxy wrapped around _one application_, not the whole cluster.
- OpenID Connect support for Azure AD - both interactive OIDC and support for client_credentials OAuth flow.
- Istio token validation in front of the app.
- No replacing the Istio sidecar. I want things running as stock as possible so I'm not too far off the beaten path when it's upgrade time.

I've set this up in the past without too much challenge using [nginx ingress](https://kubernetes.github.io/ingress-nginx/examples/auth/oauth-external-auth/) but I don't want Istio bypassed here. Unfortunately, setting up oauth2-proxy with an Istio (Envoy) ingress is a lot more complex than sticking a couple of annotations in there.

Luckily, I found [this blog article by Justin Gauthier](https://homelab.blog/blog/devops/Istio-OIDC-Config/) who'd done a lot of the leg-work to figure things out. The difference in that blog article and what I want done are:

- That article uses an older version of Istio so some of the object definitions don't apply to my Istio 1.6.4 setup.
- That article wraps everything in the cluster (via the Istio ingress) with oauth2-proxy and I only want one service wrapped.

With all that in mind, let's get going.

## Prerequisites

There are some things you need to set up before you can get this going.

### DNS Entries

Pick a subdomain on which you'll have the service and the oauth2-proxy. For our purposes, let's pick `cluster.example.com` as the subdomain. You want a single subdomain so you can share cookies and so it's easier to set up DNS and certificates.

We'll put the app and oauth2-proxy under that.

- The application/service being secured will be at `myapp.cluster.example.com`.
- The oauth2-proxy will be at `oauth.cluster.example.com`.

In your DNS system you need to assign the wildcard DNS `*.cluster.example.com` to the IP address that your Istio ingress is using. If someone visits `https://myapp.cluster.example.com` they should be able to get to your service in the cluster via the Istio ingress gateway.

### Azure AD Application

For an application to allow OpenID Connect / OAuth through Azure AD, you need to [register the application with Azure AD](https://docs.microsoft.com/en-us/graph/auth-register-app-v2). The application should be for the _service you're securing_.

In that application you need to:

- On the "Overview" tab, make a note of...
  - The "Application (client) ID" - you'll need it later. For this example, let's say it's `APPLICATION-ID-GUID`.
  - The "Directory (tenant) ID" - you'll need it later. For this example, let's say it's `TENANT-ID-GUID`
- On the "Authentication" tab:
  - Under "Web / Redirect URIs," set the redirect URI to `/oauth2/callback` relative to your app, like `https://myapp.cluster.example.com/oauth2/callback`.
  - Under "Implicit grant," check the box to allow access tokens to be issued.
- On the "Expose an API" tab, create a scope. It doesn't matter really what it's called, but if no scopes are present then client_credentials won't work. I called mine `user_impersonation` but you could call yours `fluffy` and it wouldn't matter. The scope URI will end up looking like `api://APPLICATION-ID-GUID/user_impersonation` where that GUID is the ID for your application.
- On the "API permissions" tab:
  - Grant permission to that `user_impersonation` scope you just created.
  - Grant permission to `Microsoft.Graph - User.Read` so oauth2-proxy can validate credentials.
  - Click the "Grant admin consent" button at the top or client_credentials won't work. There's no way to grant consent in the middle of that flow.
- On the "Certificates & secrets" page, under "Client secrets," create a client secret and take note of it. You'll need it later. For this example, we'll say the client secret is `myapp-client-secret` but yours is going to be a long string of random characters.

Finally, somewhat related - take note of the email domain associated with your users in Azure Active Directory. For our example, we'll say everyone has an `@example.com` email address. We'll use that when configuring oauth2-proxy for who can log in.

### cert-manager

[Set up cert-manager in the cluster.](https://cert-manager.io/docs/installation/kubernetes/) I found [the DNS01 solver](https://cert-manager.io/docs/configuration/acme/dns01/) worked best for me with Istio in the mix because it was easy to get [Azure DNS hooked up](https://cert-manager.io/docs/configuration/acme/dns01/azuredns/).

The example here assumes that you have it set up so you can drop a `Certificate` into a Kubernetes namespace and cert-manager will take over, request a certificate, and populate the appropriate Kubernetes secret that can be used by the Istio ingress gateway for TLS.

Setting up cert-manager isn't hard, but there's already a lot of documentation on it so I'm not going to repeat all of it.

_If you can't use cert-manager in your environment_ then you'll have to adjust for that when you see the steps where the TLS bits are getting set up later.

## The Setup

OK, you have the prerequisites set up, let's get to it.

### Istio Service Entry

**If you have traffic going through an egress** in Istio, you will need to set up a `ServiceEntry` to allow access to the various Azure AD endpoints from oauth2-proxy. I have all outbound traffic requiring egress so this was something I had to do.

```yaml
apiVersion: networking.istio.io/v1beta1
kind: ServiceEntry
metadata:
  name: azure-istio-egress
  namespace: istio-system
spec:
  hosts:
  - '*.microsoft.com'
  - '*.microsoftonline.com'
  - '*.windows.net'
  location: MESH_EXTERNAL
  ports:
  - name: https
    number: 443
    protocol: HTTPS
  resolution: NONE
```

I use a lot of other Azure services, so I have some pretty permissive outbound allowances. You can try to reduce this to just the minimum of what you need by doing a little trial and error. I know I ran into:

- `graph.windows.com` - Azure AD graph API
- `login.windows.net` - Common JWKS endpoint
- `sts.windows.net` - Token issuer, also used for token validation
- `*.microsoftonline.com`, `*.microsoft.com` - Some UI redirection happens to allow OIDC login here with a Microsoft account

I'll admit after I got through a bunch of different minor things, I just started whitelisting egress allowances. It wasn't that important for me to be exact for this.

I did deploy this to the `istio-system` namespace. It seems that it doesn't matter where a `ServiceEntry` gets deployed, once it's out there it works for any service in the cluster. I ended up just deploying all of these to the `istio-system` namespace so it's easier to track.

### TLS Certificate

OpenID Connect via Azure AD requires a TLS connection for your app. cert-manager takes care of converting a `Certificate` object to a Kubernetes `Secret` for us.

It's important to note that we're going to use the standard `istio-ingressgateway` to handle our inbound traffic, and that's in the `istio-system` namespace. You can't read Kubernetes secrets across namespaces, so the `Certificate` needs to be deployed to the `istio-system` namespace.

This is one of the places where you'll see why it's good to have picked a common subdomain for the oauth2-proxy and the app - wildcard certificate.

```yaml
apiVersion: cert-manager.io/v1beta1
kind: Certificate
metadata:
  name: tls-myapp-production
  namespace: istio-system
spec:
  commonName: '*.cluster.example.com'
  dnsNames:
  - '*.cluster.example.com'
  issuerRef:
    kind: ClusterIssuer
    name: letsencrypt-production
  secretName: tls-myapp-production
```

### Application Namespace

Create your application namespace and enable Istio sidecar injection. This is where your app/service, oauth2-proxy, and Redis will go.

```powershell
kubectl create namespace myapp
kubectl label namespace myapp istio-injection=enabled
```

### Redis

You need to enable Redis as a session store for oauth2-proxy if you want the Istio token validation in place. I gather this isn't required if you don't want Istio doing any token validation, but I did, so here we go.

I used the [Helm chart v10.5.7 for Redis](https://github.com/helm/charts/tree/master/stable/redis). There are... a lot of ways you can set up Redis. I set up the demo version here in a very simple, non-clustered manner. Depending on how you set up Redis, you may [need to adjust your oauth2-proxy configuration](https://github.com/oauth2-proxy/oauth2-proxy/blob/master/docs/configuration/configuration.md).

Here's the `values.yaml` I used for deploying Redis:

```yaml
cluster:
  enabled: false
usePassword: true
password: "my-redis-password"
master:
  persistence:
    enabled: false
```

### The Application

When you deploy your application, you'll need to set up:

- The Kubernetes `Deployment` and `Service`
- The Istio `VirtualService` and `Gateway`

The `Deployment` doesn't have anything special, it just exposes a port that can be routed to by a `Service`. Here's a simple `Deployment`.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
  namespace: myapp
  labels:
    app.kubernetes.io/name: myapp
spec:
  replicas: 1
  selector:
    matchLabels:
      app.kubernetes.io/name: myapp
  template:
    metadata:
      labels:
        app.kubernetes.io/name: myapp
    spec:
      containers:
      - image: "docker.io/path/to/myapp:sometag"
        imagePullPolicy: IfNotPresent
        name: myapp
        ports:
        - containerPort: 80
          name: http
          protocol: TCP
```

We have a Kubernetes `Service` for that `Deployment`:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: myapp
  namespace: myapp
  labels:
    app.kubernetes.io/name: myapp
spec:
  ports:
  # Exposes container port 80 on service port 8000.
  # This is pretty arbitrary, but you need to know
  # the Service port for the VirtualService later.
  - name: http
    port: 8000
    protocol: TCP
    targetPort: http
  selector:
    app.kubernetes.io/name: myapp
```

The Istio `VirtualService` is another layer on top of the `Service` that helps in traffic control. Here's where we start tying the ingress gateway to the `Service`.

```yaml
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  labels:
    app.kubernetes.io/name: myapp
  name: myapp
  namespace: myapp
spec:
  gateways:
  # Name of the Gateway we're going to deploy in a minute.
  - myapp
  hosts:
  # The full host name of the app.
  - myapp.cluster.example.com
  http:
  - route:
    - destination:
        # This is the Kubernetes Service info we just deployed.
        host: myapp
        port:
          number: 8000
```

Finally, we have an Istio `Gateway` that ties the ingress to our `VirtualService`.

```yaml
apiVersion: networking.istio.io/v1beta1
kind: Gateway
metadata:
  labels:
    app.kubernetes.io/name: myapp
  name: myapp
  namespace: myapp
spec:
  selector:
    istio: ingressgateway
  servers:
  - hosts:
    # Same host as the one in the VirtualService, the full
    # name for the service.
    - myapp.cluster.example.com
    port:
      # The name here must be unique across all of the ports named
      # in the Istio ingress. It doesn't matter what it is as long
      # as it's unique. I like using a modified version of the
      # host name.
      name: https-myapp-cluster-example-com
      number: 443
      protocol: HTTPS
    tls:
      # This is the name of the secret that cert-manager placed
      # in the istio-system namespace. It should match the
      # secretName in the Certificate.
      credentialName: tls-myapp-production
      mode: SIMPLE
```

At this point, if you have everything set up right, you should be able to hit `https://myapp.cluster.example.com` and get to it anonymously. There's no oauth2-proxy in place, but the ingress is all wired up to use TLS with that wildcard certificate cert-manager got you and the DNS was set up, too.

If you can't get to the service, one of the things isn't lining up:

- You forgot to enable Istio sidecar injection on the app namespace or did it after you deployed. Restart the deployments to get the sidecars added.
- DNS hasn't propagated.
- The secret with the TLS certificate isn't in the `istio-system` namespace - it **must be** in `istio-system` for the ingress to find it.
- The `Gateway` isn't lining up - `credentialName` is wrong, host name is wrong, port name isn't unique.
- The `VirtualService` isn't lining up - host name is wrong, `Gateway` name doesn't match, `Service` name or port is wrong.
- The `Service` isn't lining up - the `selector` doesn't select any pods, the destination port on the pods is wrong.

If it feels like you're Odysseus trying to shoot an arrow through 12 axes, yeah, it's a lot like that. This isn't even all the axes.

### oauth2-proxy

For this I used the [Helm chart v3.2.2 for oauth2-proxy](https://github.com/helm/charts/tree/master/stable/oauth2-proxy). I created the cookie secret for it like this:

```powershell
docker run -ti --rm python:3-alpine python -c 'import secrets,base64; print(base64.b64encode(secrets.token_bytes(16)));'
```

You're also going to need the client ID from your Azure AD application as well as the client secret. You should have grabbed those during the prerequisites earlier.

The values:

```yaml
config:
  # The client ID of your AAD application.
  clientID: "APPLICATION-ID-GUID"
  # The client secret you generated for the AAD application.
  clientSecret: "myapp-client-secret"
  # The cookie secret you just generated with the Python container.
  cookieSecret: "the-big-base64-thing-you-made"
  # Here's where the interesting stuff happens:
  configFile: |-
    auth_logging = true
    azure_tenant = "TENANT-ID-GUID"
    cookie_httponly = true
    cookie_refresh = "1h"
    cookie_secure = true
    email_domains = "example.com"
    oidc_issuer_url = "https://sts.windows.net/TENANT-ID-GUID/"
    pass_access_token = true
    pass_authorization_header = true
    provider = "azure"
    redis_connection_url = "redis://redis-master.myapp.svc.cluster.local:6379"
    redis_password = "my-redis-password"
    request_logging = true
    session_store_type = "redis"
    set_authorization_header = true
    silence_ping_logging = true
    skip_provider_button = true
    skip_auth_strip_headers = false
    skip_jwt_bearer_tokens = true
    standard_logging = true
    upstreams = [ "static://" ]
```

Important things to note in the configuration file here:

- The client ID, client secret, and Azure tenant ID information are all from that Azure AD application you registered as a prerequisite.
- The logging settings, like `silence_ping_logging` or `auth_logging` are totally up to you. These don't matter to the functionality but make it easier to troubleshoot.
- The `redis_connection_url` is going to depend on how you deployed Redis. You want to connect to the Kubernetes `Service` that points to the `master`, at least in this demo setup. [There are a lot of Redis config options for oauth2-proxy](https://github.com/oauth2-proxy/oauth2-proxy/blob/master/docs/configuration/configuration.md) that you can tweak. Also, **storing passwords in config like this isn't secure** so, like, do something better. But it's also a lot more to explain how to set up and mount secrets and all that here, so just pretend we did the right thing.
- The `pass_access_token`, `pass_authorization_header`, `set_authorization_header`, and `skip_jwt_bearer_tokens` values are _super key here_. The first three must be set that way for OIDC or OAuth to work; the last one must be set for client_credentials to work.

Once oauth2-proxy is set up, you need to add the Istio wrappers on it.

First, let's add that `VirtualService`...

```yaml
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  labels:
    app.kubernetes.io/name: oauth2-proxy
  name: oauth2-proxy
  namespace: myapp
spec:
  gateways:
  # We'll deploy this gateway in a moment.
  - oauth2-proxy
  hosts:
  # Full host name of the oauth2-proxy.
  - oauth.cluster.example.com
  http:
  - route:
    - destination:
        # This should line up with the Service that the
        # oauth2-proxy Helm chart deployed.
        host: oauth2-proxy
        port:
          number: 80
```

Now the `Gateway`...

```yaml
apiVersion: networking.istio.io/v1beta1
kind: Gateway
metadata:
  labels:
    app.kubernetes.io/name: oauth2-proxy
  name: oauth2-proxy
  namespace: myapp
spec:
  selector:
    istio: ingressgateway
  servers:
  - hosts:
    # Same host as the one in the VirtualService, the full
    # name for oauth2-proxy.
    - oauth.cluster.example.com
    port:
      # Again, this must be unique across all ports named in
      # the Istio ingress.
      name: https-oauth-cluster-example-com
      number: 443
      protocol: HTTPS
    tls:
      # Same secret as the application - it's a wildcard cert!
      credentialName: tls-myapp-production
      mode: SIMPLE
```

OK, now you should be able to get something if you hit `https://oauth.cluster.example.com`. You're not passing through it for authentication yet you will likely see something along the lines of an error saying "The reply URL specified in the request does not match the reply URLs configured for the application." The point is, it shouldn't be some arbitrary 500 or 404. oauth2-proxy should kick in.

### Istio Token Validation - RequestAuthentication

We want Istio to do some token validation in front of our application, so we can deploy a `RequestAuthentication` object.

```yaml
apiVersion: security.istio.io/v1beta1
kind: RequestAuthentication
metadata:
  labels:
    app.kubernetes.io/name: myapp
  name: myapp
  namespace: myapp
spec:
  jwtRules:
  - issuer: https://sts.windows.net/TENANT-ID-GUID/
    jwksUri: https://login.windows.net/common/discovery/keys
  selector:
    matchLabels:
      # Match labels should not select the oauth2-proxy, just
      # the application being secured.
      app.kubernetes.io/name: myapp
```

### The Magic - Envoy Filter for Authentication

The real magic is this last step, an Istio `EnvoyFilter` to pass authentication requests for your app through oauth2-proxy. This is the biggest takeaway I got from [Justin's blog article](https://homelab.blog/blog/devops/Istio-OIDC-Config/) and it's really the key to the whole thing.

**Envoy filter format is in flux.** The object defined here is really dependent on the version of Envoy that Istio is using. This was a huge pain. I ended up [finding the docs for the Envoy ExtAuthz filter](https://www.envoyproxy.io/docs/envoy/latest/api-v2/config/filter/http/ext_authz/v2/ext_authz.proto) and feeling my way through the exercise, but you should be aware these things do change.

Here's the Envoy filter:

```yaml
apiVersion: networking.istio.io/v1alpha3
kind: EnvoyFilter
metadata:
  labels:
    app.kubernetes.io/name: myapp
  name: myapp
  namespace: istio-system
spec:
  configPatches:
  - applyTo: HTTP_FILTER
    match:
      context: GATEWAY
      listener:
        filterChain:
          filter:
            name: envoy.http_connection_manager
            subFilter:
              # In Istio 1.6.4 this is the first filter. The examples showing insertion
              # after some other authorization filter or not showing where to insert
              # the filter at all didn't work for me. Istio just failed to insert the
              # filter (silently) and moved on.
              name: istio.metadata_exchange
          # The filter should catch traffic to the service/application.
          sni: myapp.cluster.example.com
    patch:
      operation: INSERT_AFTER
      value:
        name: envoy.filters.http.ext_authz
        typed_config:
          '@type': type.googleapis.com/envoy.extensions.filters.http.ext_authz.v3.ExtAuthz
          http_service:
            authorizationRequest:
              allowedHeaders:
                patterns:
                - exact: accept
                - exact: authorization
                - exact: cookie
                - exact: from
                - exact: proxy-authorization
                - exact: user-agent
                - exact: x-forwarded-access-token
                - exact: x-forwarded-email
                - exact: x-forwarded-for
                - exact: x-forwarded-host
                - exact: x-forwarded-proto
                - exact: x-forwarded-user
                - prefix: x-auth-request
                - prefix: x-forwarded
            authorizationResponse:
              allowedClientHeaders:
                patterns:
                - exact: authorization
                - exact: location
                - exact: proxy-authenticate
                - exact: set-cookie
                - exact: www-authenticate
                - prefix: x-auth-request
                - prefix: x-forwarded
              allowedUpstreamHeaders:
                patterns:
                - exact: authorization
                - exact: location
                - exact: proxy-authenticate
                - exact: set-cookie
                - exact: www-authenticate
                - prefix: x-auth-request
                - prefix: x-forwarded
            server_uri:
              # URIs here should be to the oauth2-proxy service inside your
              # cluster, in the namespace where it was deployed. The port
              # in that 'cluster' line should also match up.
              cluster: outbound|80||oauth2-proxy.myapp.svc.cluster.local
              timeout: 1.5s
              uri: http://oauth2-proxy.myapp.svc.cluster.local
```

That's it, you should be good to go!

Note I didn't really mess around with trying to lock the headers down too much. This is the set I found from the [blog article by Justin Gauthier](https://homelab.blog/blog/devops/Istio-OIDC-Config/) and every time I tried to tweak too much, something would stop working in subtle ways.

## Try It Out

With all of this in place, you should be able to hit `https://myapp.cluster.example.com` and the Envoy filter will redirect you through oauth2-proxy to Azure Active Directory. Signing in should get you redirected back to your application, this time authenticated.

## Troubleshooting

There are a lot of great tips about troubleshooting and diving into Envoy [on the Istio site.](https://istio.io/latest/docs/ops/diagnostic-tools/proxy-cmd/) [This forum post is also pretty good.](https://discuss.istio.io/t/debugging-istio-gateway/2758)

Here are a couple of spot tips that I found to be of particular interest.

### Finding the Envoy Version

As noted in the `EnvoyFilter` section, filter formats change based on the version of Envoy that Istio is using. You can find out what version of Envoy you're running in your Istio cluster by using:

```powershell
$podname = kubectl get pod -l app=prometheus -n istio-system -o jsonpath='{$.items[0].metadata.name}'
kubectl exec -it $podname -c istio-proxy -n istio-system -- pilot-agent request GET server_info
```

You'll get a lot of JSON explaining info about the Envoy sidecar, but the important bit is:

```json
{
 "version": "80ad06b26b3f97606143871e16268eb036ca7dcd/1.14.3-dev/Clean/RELEASE/BoringSSL"
}
```

In this case, it's `1.14.3`.

### Look at What Envoy is Doing

It's hard to figure out where the Envoy configuration gets hooked up. [The `istioctl proxy-status` command can help you.](https://istio.io/latest/docs/ops/diagnostic-tools/proxy-cmd/)

`istioctl proxy-status` will yield a list like this:

```text
NAME                                                         CDS        LDS        EDS        RDS          PILOT                       VERSION
myapp-768b999cb5-v649q.myapp                                 SYNCED     SYNCED     SYNCED     SYNCED       istiod-5cf5bd4577-frngc     1.6.4
istio-egressgateway-85b568659f-x7cwb.istio-system            SYNCED     SYNCED     SYNCED     NOT SENT     istiod-5cf5bd4577-frngc     1.6.4
istio-ingressgateway-85c67886c6-stdsf.istio-system           SYNCED     SYNCED     SYNCED     SYNCED       istiod-5cf5bd4577-frngc     1.6.4
oauth2-proxy-5655cc447d-5ftbq.myapp                          SYNCED     SYNCED     SYNCED     SYNCED       istiod-5cf5bd4577-frngc     1.6.4
redis-5f7c5b99db-tp5l7.myapp                                 SYNCED     SYNCED     SYNCED     SYNCED       istiod-5cf5bd4577-frngc     1.6.4
```

Once you've deployed, you'll see a `myapp` listener as well as the Istio ingress. You can dump their config by doing something like

```powershell
istioctl proxy-config listeners myapp-768b999cb5-v649q.myapp -o json
```

Sub in the name of the listener as needed. It will generate a huge raft of JSON, so you might need to dump it to a file so you can scroll around in it and find what you want.

- The application listener will show you info about the sidecar attached to the app.
- The ingress gateway listener will show you info about ingress traffic (including showing your Envoy filter).

### When All Else Fails, Restart the Ingress

**When all else fails, restart the ingress pod.** `kubectl rollout restart deploy/istio-ingressgateway -n istio-system` can get you pretty far. When it seems like everything should be working but you're getting errors like "network connection reset" and it doesn't make sense... just try kicking the ingress pods. Sometimes the configuration needs to be freshly rebuilt and deployed and that's how you do it.

I don't know _why_ this happens, but if you've deployed and undeployed some Envoy filters a couple of times... sometimes something just stops working. Restarting the ingress is the only way I've found to fix it... but it works!

## Other Options

oauth2-proxy isn't the only way to get this done.

I did see [this `authservice` plugin](https://github.com/istio-ecosystem/authservice), which appears to be an Envoy extension to provide oauth2-proxy services right in Envoy itself. Unfortunately, it [doesn't support the latest Istio versions](https://github.com/istio-ecosystem/authservice/issues/116); it [requires you manually replace the Istio sidecar with this custom version](https://github.com/istio-ecosystem/authservice/blob/36dd2ca04858bd4eab5b866bcb42536fef759e15/bookinfo-example/config/bookinfo-with-authservice-template.yaml#L269); and it [doesn't seem to support `client_credentials`](https://github.com/istio-ecosystem/authservice/issues/84), which is a primary use case for me.

[There's an OAuth2 filter for Envoy](https://www.envoyproxy.io/docs/envoy/latest/api-v3/extensions/filters/http/oauth2/v3alpha/oauth.proto) currently in active development (alpha) but I didn't see that it supported OIDC. I could be wrong there. I'd love to see someone get this working inside Istio.

For older Istio there was an [App Identity and Access Adapter](https://istio.io/latest/blog/2019/app-identity-and-access-adapter/) but Mixer adapters/plugins have been deprecated in favor of WASM extensions for Envoy.

Are there others? Let me know in the comments!
