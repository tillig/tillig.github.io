---
layout: post
title: "How to Connect Azure Blob Storage Artifacts to Spinnaker Pipelines"
date: 2018-01-01 -0800
comments: true
tags: [azure,kubernetes,build]
description: "You want to store Helm charts or other artifacts in Azure Blob Storage and kick off Spinnaker deployments when they change? Here's how."
---
[Spinnaker](https://www.spinnaker.io) is a great tool for continuous deployment of services into Kubernetes. It has a lot of first-class integration support for things like Docker containers and Google Cloud Storage blobs.

For example, say you have a Docker container that gets deployed to Kubernetes via a [Helm-chart-style manifest](https://www.spinnaker.io/guides/user/kubernetes-v2/deploy-manifest/). You might store the manifest in Google Cloud Storage and the Docker container in Google Cloud Registry. Change one of those things, it triggers a pipeline to deploy.

**This is not so easy if you are in Azure and storing your manifests in Azure Blob Storage.** You can make this work, but it takes a lot of moving pieces. I'll show you how to get this done.

# "Why Don't You Just...?"

Before we get into the "how," let's talk about "why."

You might wonder why I'm interested in doing any of this when there are things like Azure DevOps that can do deployment and Azure Helm Repository to store Helm charts. Just sidestep the issue, right?

Azure DevOps is great for builds but doesn't have all the deployment features of Spinnaker. In particular, if you want to use things like [Automated Canary Analysis](https://www.spinnaker.io/guides/user/canary/), Azure DevOps isn't going to deliver.

Further, Azure DevOps is kind of a walled garden. It works great if you keep _everything_ within Azure DevOps. If you want to integrate with other tools, like have artifacts stored somewhere so another tool can grab it, that's _hard_. [Azure DevOps can publish artifacts to various repo types](https://docs.microsoft.com/en-us/azure/devops/artifacts/index?view=vsts) (NuGet, npm, etc.) but really has no concept of artifacts that don't get a semantic version (e.g., stuff that would happen in a continuous delivery environment) and aren't one of the supported artifact types. [Universal packages?](https://docs.microsoft.com/en-us/azure/devops/artifacts/quickstarts/universal-packages?view=vsts&tabs=azuredevops) They need semantic versions.

So what if you have a zip file full of stuff that just needs to be pushed? If Azure DevOps is handling it in a pipeline, you can [download build artifacts via a pipeline task](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/utility/download-build-artifacts?view=vsts)... but from an external tool standpoint, you have to use the REST API to [get the list of artifacts from the build](https://docs.microsoft.com/en-us/rest/api/azure/devops/build/artifacts?view=azure-devops-rest-5.0) and then iterate through those to get the respective download URL. All of these calls need to be [authenticated](https://docs.microsoft.com/en-us/rest/api/azure/devops/?view=azure-devops-rest-5.0) but at least it supports HTTP Basic auth with personal access tokens. Point being, there's no simple webhook.

[Azure Helm Repository](https://docs.microsoft.com/en-us/azure/container-registry/container-registry-helm-repos) is currently in beta and has no webhook event that can inform an external tool when something gets published. That may be coming, but it's not there today. It also doesn't address other artifact types you might want to handle, like that arbitrary zip file.

# How It Works

Now you know why, let me explain how this whole thing will work. There are a lot of moving pieces to align. I'll explain details in the respective sections, but so you get an overview of where we're going:

- Publishing a new/updated blob to Azure Blob Storage will raise an event with Azure EventGrid.
- A subscription to Azure EventGrid for "blob created" events will route the EventGrid webhooks to an Azure API Management endpoint.
- The Azure API Management endpoint will transform the EventGrid webhook contents into a Spinnaker webhook format and forward the transformed data to Spinnaker.
- Spinnaker will use HTTP artifacts to download the Azure Blob.
- The Spinnaker download request will be handled by a small Node.js proxy that converts HTTP Basic authentication to Azure Blob Storage "shared key" authentication.

Most of this is required because of the security around EventGrid and Azure Blob Storage. There's not a straightforward way to just use a series of GET and POST requests with HTTP Basic auth.

# Create the Azure Storage Account and Blob Container

This is where you will store your artifact blobs.

```bash
az storage account create \
  --name myartifacts \
  --resource-group myrg \
  --access-tier StandardLRS \
  --https-only true \
  --kind StorageV2 \
  --location westus

az storage container create \
  --name artifacts \
  --account-name myartifacts
```

Your blobs will get downloaded via URLs like `https://myartifacts.blob.core.windows.net/artifacts/artifact-name.zip`.

# Create a Basic Auth Proxy for Blob Storage

If you want to download from Azure Blob Storage without making the artifacts publicly accessible, [you need to use `SharedKey` authentication.](https://docs.microsoft.com/en-us/rest/api/storageservices/authorize-with-shared-key). It looks a lot like HTTP Basic but instead of using a username/password combination, it's a username/signature. The signature is generated by concatenating several headers and generating a signature using your shared key (available through the Azure portal).

It's complicated and not something built into Spinnaker. If you really want to see how to generate the signature and all that, [the docs have a very detailed explanation](https://docs.microsoft.com/en-us/rest/api/storageservices/authorize-with-shared-key).

The short version here is that you probably want a client SDK library to do this work. Since Spinnaker really only supports HTTP Basic anyway, you need to take in `username:password` in some form and convert that into the request Blob Storage expects.

[Richard Astbury has a great blog article](https://coderead.wordpress.com/2012/04/10/access-blob-storage-using-basic-authentication/) showing a simple web server that takes in HTTP Basic auth where your storage account name is the username and the storage account key is the password, then proxies that through to Blob Storage for download.

**Deploy this proxy somewhere you can access** like [an Azure App Service](https://docs.microsoft.com/en-us/azure/app-service/app-service-web-get-started-nodejs).

I converted this to be an [Express app](https://expressjs.com/) without too much trouble, which adds some logging and diagnostics to help with troubleshooting.

Things to keep in mind when you deploy this:

- **Run in HTTPS only mode using a minimum TLS 1.2.** These are options in the Azure App Service settings. You'll be using HTTP Basic auth which isn't encrypted, so ensuring the communication itself is encrypted is important.
- **Consider adding more layers of security** to ensure random people can't just use your proxy. Azure App Service apps are public, so consider updating the app to only respond to requests to a special endpoint URL that contains a key only you know. You could also ensure you only respond to requests for known storage account info, not just ay info. That would mean folks need the special endpoint URL _and_ the storage account info to get anything.
- **Ensure it's "always on."** Azure App Service apps go to sleep for a while when they're idle. The first request can time out as it wakes up, and if Spinnaker is the first request it'll cause a pipeline failure.

**For this walkthrough, we'll say your Blob Storage proxy app is at `https://mycoolproxy.azurewebsites.net`.** You'll see this show up later as we set up the rest of the pieces. When Spinnaker wants to download an HTTP artifact, it'll access `https://mycoolproxy.azurewebsites.net/artifacts/artifact-name.zip` _instead of_ accessing the Blob Storage URL directly.

# Enable Spinnaker Webhook Artifacts

Spinnaker needs to know that it can expect artifacts to come in via webhooks. To do that, you need to enable the artifacts. Edit the `.hal/default/profiles/echo-local.yml` file to enable it.

```yaml
webhooks:
  artifacts:
    enabled: true
```

# Enable Spinnaker HTTP Artifacts

The webhook will tell Spinnaker where the artifact lives, but you have to also enable Spinnaker to download the artifact. You also have to provide it with credentials to do so. [There is good doc explaining all this](https://www.spinnaker.io/setup/artifacts/http/) but here's a set of commands to help you.

```bash
hal config features edit --artifacts true
hal config artifact http enable
USERNAME=myartifacts
PASSWORD=[big long shared key from Azure Portal]
echo ${USERNAME}:${PASSWORD} > upfile.txt
hal config artifact http account add myartifacts \
  --username-password-file upfile.txt

# You're stuck with that upfile.txt in the current folder until you
# do a backup/restore of the config. First deploy it to get the changes
# out there...
hal deploy apply

# Now back up the config.
hal backup create

# Immediately restore the backup you just made.
hal backup restore --backup-path halbackup-Tue_Dec_18_23-00-10_GMT_2018.tar

# Verify the local upfile.txt isn't being used anymore.
hal config artifact http account get myartifacts

# Assuming you don't see a reference to the local upfile.txt...
rm upfile.txt
```

Spinnaker now knows not only that webhooks will be supplying artifact locations, but also how to provide HTTP Basic credentials to authenticate with the artifact source.

At the time of this writing [I don't know how Spinnaker handles multiple sets of credentials](https://github.com/spinnaker/spinnaker.github.io/issues/1159). For example, if you already have some HTTP Basic artifact credentials set up and add this new set, how will it know to use these new creds instead of the ones you already had? I don't know. If you know, [chime in on this GitHub issue](https://github.com/spinnaker/spinnaker.github.io/issues/1159)!

**You should now have enough set up to enable Spinnaker to download from Azure Blob Storage.** If an artifact URL like `https://mycoolproxy.azurewebsites.net/artifacts/artifact-name.zip` comes in as part of [an HTTP File artifact](https://www.spinnaker.io/reference/artifacts/types/http-file/), Spinnaker can use the supplied credentials to download it through the proxy.

# Create an API Management Service for EventGrid Handling

[Azure API Management Service](https://azure.microsoft.com/en-us/services/api-management/) is usually used as an API gateway to allow you to expose APIs, secure them, and deal with things like licensing and throttling.

We're going to take advantage of the [API Management policy mechanism](https://docs.microsoft.com/en-us/azure/api-management/set-edit-policies) to handle Azure EventGrid webhook notifications. This part is based on [this awesome blog article from David Barkol](https://madeofstrings.com/2017/12/27/subscribing-to-event-grid-events-with-azure-api-management/). Using API Management policies enables us to skip having to put another Node.js proxy out there.

Why not use API Management for the Blob Storage proxy? I wasn't sure how to get the Azure Blob Storage SDK libraries into the policy and didn't want to try to recreate the signature generation myself. Lazy? Probably.

The API Management Service policies will handle two things for us:

1. **Handshaking with EventGrid for webhook subscriptions.** EventGrid doesn't just let you send webhooks wherever you want. To set up the subscription, [the receiver has to perform a validation handshake](https://docs.microsoft.com/en-us/azure/event-grid/security-authentication) to acknowledge that it wants to receive events. You can't get Spinnaker to do this, and it's nigh impossible to get the manual validation information.
2. **Transforming EventGrid schema to Spinnaker Artifact schema.** The data supplied in the EventGrid webhook payload isn't something Spinnaker understands. We can't even use Jinja templates to transform it at the Spinnaker side because Spinnaker doesn't want an inbound webhook to be an array - [it wants the webhook to be an _object that contains the array_ in a property called `artifacts`](https://www.spinnaker.io/guides/user/pipeline/triggers/webhooks/#passing-artifacts). We can do the transformation work easily in the API Management policy.

First, create your API Management service.

![Create API Management Service]({{ site.url }}/images/20181220_createapimgmt.png)

This can take a long time to provision, so give it a bit. When it's done, your API will be at a location based on the API Management Service name, like `https://my-azure-api.azure-api.net`. All the APIs you hang off this management service will be children of this URL.

Once it's provisioned, go to the "APIs" section. By default, you'll get a sample "Echo" API. Delete that.

Now, add a new "Blank API." Call it "EventGrid Proxy" and set the name to `eventgrid-proxy`. For the URL scheme, be sure to only select HTTPS. Under "Products," select "Unlimited" so your developer key for unlimited API calls will be in effect.

![Create a blank API]({{ site.url }}/images/20181220_createblankapi.png)

In the EventGrid Proxy API, create a new operation called `webhook` that takes POST requests to `/webhook`.

![Create webhook operation]({{ site.url }}/images/20181220_webhookoperation.png)

The webhook operation doesn't do anything except give us a valid endpoint to which EventGrid can post its webhook notifications.

On the EventGrid Proxy api, select "Design" and then click the little XML angle brackets under "Inbound Processing." This will get you into the area where you can [set up and manage API policies](https://docs.microsoft.com/en-us/azure/api-management/set-edit-policies) using XML.

![Go to XML inbound policy management]({{ site.url }}/images/20181220_configinbound.png)

In the inbound policy, paste this XML beauty **and update the noted locations with your endpoints**:

```xml
<policies>
    <inbound>
        <set-variable value="@(!context.Request.Headers.ContainsKey("Aeg-Event-Type"))" name="noEventType" />
        <choose>
            <when condition="@(context.Variables.GetValueOrDefault<bool>("noEventType"))">
                <return-response>
                    <set-status code="404" reason="Not Found" />
                    <set-body>No Aeg-Event-Type header found.</set-body>
                </return-response>
            </when>
            <otherwise>
                <set-variable value="@(context.Request.Headers["Aeg-Event-Type"].Contains("SubscriptionValidation"))" name="isEventGridSubscriptionValidation" />
                <set-variable value="@(context.Request.Headers["Aeg-Event-Type"].Contains("Notification"))" name="isEventGridNotification" />
                <choose>
                    <when condition="@(context.Variables.GetValueOrDefault<bool>("isEventGridSubscriptionValidation"))">
                        <return-response>
                            <set-status code="200" reason="OK" />
                            <set-body>@{
                                var events = context.Request.Body.As<string>();
                                JArray a = JArray.Parse(events);
                                var data = a.First["data"];
                                var validationCode = data["validationCode"];
                                var jOutput =
                                    new JObject(
                                        new JProperty("validationResponse", validationCode)
                                    );
                                return jOutput.ToString();
                            }</set-body>
                        </return-response>
                    </when>
                    <when condition="@(context.Variables.GetValueOrDefault<bool>("isEventGridNotification"))">
                        <send-one-way-request mode="new">
                            <!-- Replace this with YOUR Spinnaker location! -->
                            <set-url>https://your.spinnaker.api/webhooks/webhook/azureblob</set-url>
                            <set-method>POST</set-method>
                            <set-header name="Content-Type" exists-action="override">
                                <value>application/json</value>
                            </set-header>
                            <set-body>@{
                                var original = JArray.Parse(context.Request.Body.As<string>());
                                var proxied = new JArray();
                                foreach(var e in original)
                                {
                                    var name = e["subject"];
                                    // Replace this with YOUR Blob and proxy info!
                                    var reference = e["data"].Value<string>("url").Replace("myartifacts.blob.core.windows.net", "mycoolproxy.azurewebsites.net");
                                    var transformed = new JObject(
                                        new JProperty("type", "http/file"),
                                        new JProperty("name", name),
                                        new JProperty("reference", reference));
                                    proxied.Add(transformed);
                                }

                                var wrapper = new JObject(new JProperty("artifacts", proxied));
                                var response = wrapper.ToString();
                                context.Trace(response);
                                return response;
                            }</set-body>
                        </send-one-way-request>
                        <return-response>
                            <set-status code="200" reason="OK" />
                        </return-response>
                    </when>
                    <otherwise>
                        <return-response>
                            <set-status code="404" reason="Not Found" />
                            <set-body>Aeg-Event-Type header indicates unsupported event.</set-body>
                        </return-response>
                    </otherwise>
                </choose>
            </otherwise>
        </choose>
    </inbound>
    <backend>
        <base />
    </backend>
    <outbound>
        <base />
    </outbound>
    <on-error>
        <base />
    </on-error>
</policies>
```

Again, **update the URL endpoints as needed in there!**

- **The location of your Spinnaker API (deck) endpoint for the webhook.** This is always at `/webhooks/webhook/sourcename` where I've used `azureblob` for the source but you could use whatever you want. The source name is used in the [pipeline configuration for webhooks](https://www.spinnaker.io/guides/user/pipeline/triggers/webhooks/).
- **The location of your Blob Storage and Blob Storage Proxy.** These got set up earlier - in the `Replace` call up there, you need to swap your Blob Storage server location for the location of your proxy so when Spinnaker tries to download, it'll go through your proxy.

I'm not going to dive too deep into API policy management. [I recommend reading the official docs](https://docs.microsoft.com/en-us/azure/api-management/set-edit-policies) and [being aware of what is available](https://docs.microsoft.com/en-us/azure/api-management/api-management-policies). However, I will explain what this policy does and how it works.






`https://my-azure-api.azure-api.net/webhook?subscription-key=<apim-key>`

Azure Blob Storage => EventGrid => Azure API Management => Spinnaker

- HTTP File artifacts: https://www.spinnaker.io/reference/artifacts/types/http-file/
- Configure HTTP File credentials: https://www.spinnaker.io/setup/artifacts/http/
- EventGrid security/handshake info: https://docs.microsoft.com/en-us/azure/event-grid/security-authentication
- Trigger Spinnaker pipeline by webhooks (including webhook schema for artifacts): https://www.spinnaker.io/guides/user/pipeline/triggers/webhooks/
- Reacting to Blob Storage events: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-event-overview
- EventGrid event schema: https://docs.microsoft.com/en-us/azure/event-grid/event-schema
- Set up and edit API Management policies: https://docs.microsoft.com/en-us/azure/api-management/set-edit-policies
- API Management Policy reference: https://docs.microsoft.com/en-us/azure/api-management/api-management-policies
