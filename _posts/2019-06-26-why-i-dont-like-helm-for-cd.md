---
layout: post
title: "Why I Don't Like Helm for Continuous Deployment"
date: 2019-06-26 -0800
comments: true
tags: [azure,kubernetes,process]
description: "There are a lot of articles out there showing how to wire up your containers with Helm charts and get them deployed to Kubernetes. I don't think Helm in its typical usage is very good for continuous deployment, and here's why."
---
## What Helm Is

[Helm](https://helm.sh) is a tool used to create and deploy templates that define entities in Kubernetes. It's kind of like taking Kubernetes YAML and adding [handlebars template support](https://handlebarsjs.com/). For example, you might see something like this:

```yaml
apiVersion: v1
kind: ReplicationController
metadata:
  name: deis-database
  namespace: deis
  labels:
    app.kubernetes.io/managed-by: deis
spec:
  replicas: 1
  selector:
    app.kubernetes.io/name: deis-database
  template:
    metadata:
      labels:
        app.kubernetes.io/name: deis-database
    spec:
      serviceAccount: deis-database
      containers:
        - name: deis-database
          image: {{.Values.imageRegistry}}/postgres:{{.Values.dockerTag}}
          imagePullPolicy: {{.Values.pullPolicy}}
          ports:
            - containerPort: 5432
          env:
            - name: DATABASE_STORAGE
              value: {{default "minio" .Values.storage}}
```

In this case, you can see there are some values poked in from another YAML document that has some configuration parameters. The values document might look like this:

```yaml
imageRegistry: "quay.io/deis"
dockerTag: "latest"
pullPolicy: "Always"
storage: "gcs"
```

When Helm does an installation or upgrade, it takes the parameters, fills in the appropriate blanks in the larger YAML deployment templates, and does the Kubernetes work to execute the deployment.

Since there are a lot of pieces to putting things in Kubernetes - maybe you have some deployments, services, etc. that all need to go in at the same time - [Helm uses a concept called "charts" to bundle these up](https://helm.sh/docs/developing_charts/#charts) as an atomic entity. You can think of a Helm chart as a zip file with a bunch of Kubernetes YAML in it and a small manifest that explains what the zip file installs.

There are some great benefits to using Helm to deploy things:

- **Separation of deployment template from configuration.** You don't need to keep rafts of YAML around for different environments/clusters/whatever. You can have different parameters and one larger template.
- **Ability to roll back a deployment.** Helm tracks the installations and upgrades you make along with the values. If you deploy something that doesn't work, you can roll it back to the previous version.
- **Ability to list deployments and versions.** You can use Helm to list out the charts and versions that have been deployed to Kubernetes. This makes things that are logically spread around namespaces into a nice, central list.
- **Charts can have dependencies.** Let's say your application needs a Redis instance when you deploy it. Cool! You can set up your chart to have a dependency on installing/upgrading Redis at the same time using the Redis Helm chart.

Things to be aware of that will come into play later:

- **Helm installations are global.** When you do a Helm installation of a chart, even if it's into a specific namespace, the installation itself is a global concept. Let's say you want to install Redis twice (separately from your applications) - once into a `test` namespace and once into a `prod` namespace. Make sure you name those installations in a unique way - the output of the installation may go into the namespace but the _installation itself_ is a global thing outside the namespace. (Unclear if this will change with Helm 3.0.)
- **Helm isn't using `kubectl`.** For version 2.0 Helm uses a service running in the cluster called `tiller` to do its installations. [Tiller is going away in Helm 3.0](https://helm.sh/blog/helm-3-preview-pt2/) but it's still not using `kubectl` - it's using the Kubernetes API directly. What that means is if you're looking to use `kubectl` later (even in an automated fashion) to modify things, you'll get messages like `Warning: kubectl apply should be used on resource created by either kubectl create --save-config or kubectl apply`.
- **Helm installation tracks chart version and install version, not container version.** When you install something with Helm, later you can do `helm list` to get the installations. Doing that, you'll see the _chart version_ and the _data last updated_ but no information about what's _in_ that installation.

For the purposes of this article, I'm not going into exactly how Helm does its work. If you're interested in diving deep, [the docs are a good place to start](https://helm.sh/docs/). The important things to understand are some of the benefits and limitations.

## Continuous Delivery vs. Continuous Deployment

Let's talk about "CD." Some folks differentiate between "continuous _delivery_" and "continuous _deployment_." The apparent differentiator is that "delivery" implies software that's been tested and is _ready_ to be deployed to production but _isn't_; while "deployment" implies another step - the software is actually automatically deployed into production and verified.

I guess you can do that, but I don't really separate those things in my mind. If it's ready to go to production... why isn't it going there? I'd argue that if you differentiate then maybe it's just that your pipeline (or your org, or your process, or whatever) just isn't ready for a complete check-in-code to deploy-code-in-production execution. It's an incomplete pipeline, not "two different things."

## Folks Love Helm for CD

There are a lot of [articles like this one](https://medium.com/@gajus/the-missing-ci-cd-kubernetes-component-helm-package-manager-1fe002aac680) pointing out how Helm is the missing link in the CI/CD chain for Kubernetes.

It _sort of_ is, but not the way they explain in articles. At least, not the way I see it.

The process most of the articles describe roughly follows this:

- Create a Helm chart for your application.
- In the CD pipeline, create a set of parameters that can be used to `helm upgrade` your app in Kubernetes.
- If anything fails, use `helm rollback` to return to the previous state.

Seems simple enough, right? And it is simple. But this is really the "continuous _delivery_" sort of pipeline - the pipeline where you're not actually trying to automate things into production. I can't imagine you'd ever want to stomp your production deployment like this, hope that it works, and depend on `helm rollback` to return to a previous state if it doesn't.

That's a _hugely important differentiator_. If all you need to do is get things deployed into some sort of development/testing environment and that's the limit of your pipeline, I guess that works. I feel like the goal should be bigger than that. I'm a fan of [test in production](https://medium.com/@copyconstruct/testing-in-production-the-safe-way-18ca102d0ef1) and I'm not a fan of trying to replicate environments across dev, test, perf, and production (or however you break it up).

Given that...

## Why I Don't Like Helm for CD

If I'm thinking about actually deploying _into production_ on a regular basis, I want support for more complex scenarios like [canary testing](https://martinfowler.com/bliki/CanaryRelease.html). Let's think about how that works for Kubernetes.

- Existing deployment of the service in production is taking traffic.
- New deployment of the service in production goes in _alongside_ the existing deployment, but takes no traffic.
- Testing against the new deployment runs internal to the cluster.
- Traffic handling is tweaked to allow some small amount of production traffic to the new deployment whilst the majority of the traffic is still going to the original deployment. This may be accomplished in a few different ways. For example...
  - With a standard Kubernetes service, you can adjust how much traffic goes to old vs. new based on the number of deployed pods. If you want 10% of the traffic on the new and 90% on old, you'd need that proportion of pods - 1 new, 9 old.
  - With a service mesh like Istio, you can use the [traffic management](https://istio.io/docs/concepts/traffic-management/) built in to control the percentage of traffic routed to each set of pods. This is a lot cleaner than the standard mechanism but means you have some complexity with a service mesh in the mix.
- Testing runs on the service and both old and new versions of the deployment are monitored. If the new version starts misbehaving, all traffic is routed back to the original version of the service and the "canary" new version is killed. If the new version behaves, more traffic is directed to the new version and removed from the old version until either all traffic is pointed to the new version or the canary is killed.

How do you do something like that with Helm? In its stock form, you really can't... or your Helm chart is going to be pretty complicated.

- It'll have to allow for parameterization of both existing and new deployments _or_ you're going to have two deployments side-by-side. Remember how deployments are a global concept? That makes it complicated.
- You'll have to figure out how to only have one Kubernetes service that can route to both sets of pods (old and new) or you'll need something external to the Kubernetes load balancer to handle traffic control across the Kubernetes services.
- If your chart has the Istio bits in it, again, you want one set of Istio load balancing/ingress controls across both pods, so the canary installation wouldn't want to deploy those.
- If you control traffic using Kuberenetes constructs (either by adjusting the ratio of deployed pods or tweaking Istio values) those are all `helm upgrade` operations. If the canary fails, how many `helm rollback` operations do you need to perform to get back to the original state?

There are other reasons Helm isn't great for CD, too. [Here's a pretty good article](https://medium.com/virtuslab/think-twice-before-using-helm-25fbb18bc822) that talks about some of the challenges and shortcomings you can hit.

## Helm is Great for Infrequent Deployments

Helm is great for installing things that you don't deploy often. Need to deploy Istio? Sweet, Helm to the rescue. You don't update Istio every day. Need to get an ElasticSearch instance installed that your services can share? Boom! Helm, baby! You won't be upgrading that every day.

Helm as a way to manage infrastructure or shared services is awesome. Things that don't require canary testing, continuous rollout, that sort of thing.

## Helm is Great for Templating in CD Pipelines

Helm is great as a way to package up a set of YAML and handle parameterization and some calcuations to generate a final Kubernetes YAML for deployment... and in a continuous delivery/continuous deployment context, that's what I would recommend using it for.

A great example of this [is the way Spinnaker uses Helm to deploy things](https://www.spinnaker.io/guides/user/kubernetes-v2/deploy-helm/). It's not using `helm install` or `helm upgrade` - instead it can take a Helm chart or Helm-formatted YAML document and it uses `helm template` to generate the final template with the parameters all populated. It then takes that output and executes the deployment in Kubernetes. The note at the top of the Spinnaker "Deploy Helm Charts" page pretty much says it all:

> Note: This stage is intended to help you package and deploy applications that you own, and are actively developing and redeploying frequently. It is not intended to serve as a one-time installation method for third-party packages. If that is your goal, it’s arguably better to call `helm install` once when bootstrapping your Kubernetes cluster.

If you think about what you get with `helm list`, you're getting the chart version, right? Honestly, once you have the chart down, the chart version has no meaning in continuous deployment. The important stuff is the version(s) of the container(s) that are deployed and making up the application. That stuff isn't tracked, so `helm list` becomes pretty useless.

Things like Helm chart repositories are also really not interesting. In fact, the YAML for the Helm template may just be embedded right in the CD pipeline itself, not a separate thing stored elsewhere. This allows you to separate things like tweaking Istio load balancer settings from the concept of `helm install`. It also avoids needing to ensure deployment names are unique.

Finally, it means `helm rollback` won't save you. You're not `helm install`ing anything, so there's nothing to roll back. You'll need to ensure your CD pipeline can appropriately kill the canary. However, if you're doing canary testing and not just stomping your existing production deployment with a new untested deployment... you should be able to easily kill the canary and leave the existing deployment untouched, with no one the wiser that something went awry.
