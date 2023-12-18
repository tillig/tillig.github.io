---
layout: post
title: "IIS Express Adds a (Possibly Duplicate) Certificate During Install"
date: 2011-03-17 -0800
comments: true
disqus_identifier: 1702
tags: [dotnet,web,vs]
---
**When you install IIS Express it also installs a self-signed
certificate that it will use for SSL.** This is not normally a problem,
however, if you already have a self-signed certificate, it may result in
a confusing issue where you have two certificates with the same
distinguished name, like so:

![Duplicate certificates with
CN=localhost]({{ site.url }}/images/20110317duplicatecertif.png)

And why would that be a problem? Say you are working with WCF services
that need to identify themselves with certificates. You have your dev
machine set up to use the self-signed certificate, like so:

    <serviceCredentials>
      <serviceCertificate
        x509FindType="FindBySubjectDistinguishedName"
        findValue="CN=localhost"
        storeLocation="LocalMachine"
        storeName="My" />
    </serviceCredentials>

Now when you go visit your service, the channel is always faulted. Why?
If you [turn up the WCF end-to-end
logging](http://msdn.microsoft.com/en-us/library/ms733025.aspx), you'll
see the following exception:

> System.ServiceModel.ServiceActivationException: The service
> '/YourServiceHere.svc' cannot be activated due to an exception during
> compilation. The exception message is: Found multiple X.509
> certificates using the following search criteria: StoreName 'My',
> StoreLocation 'LocalMachine', FindType
> 'FindBySubjectDistinguishedName', FindValue 'CN=localhost'. Provide a
> more specific find value.

Basically - **Ambiguous match. Be more precise.**

There is an article explaining [how to use a custom SSL certificate with
IIS
Express](http://learn.iis.net/page.aspx/1005/handling-url-binding-failures-in-iis-express/)
that involves removing the SSL endpoint and re-creating it with the
appropriate cert. Your other option, and the one I'm going with, is to
**identify the certificate for WCF by certificate thumbprint rather than
distinguished name**.

    <serviceCredentials>
      <serviceCertificate
        x509FindType="FindByThumbprint"
        findValue="1234567890123456789012345678901234567890"
        storeLocation="LocalMachine"
        storeName="My" />
    </serviceCredentials>

Far less human readable, to be sure, but more precise and totally
unambiguous. Of course, if you're on a development team, it means
everyone needs to have the same dev certificates installed. Tradeoffs,
tradeoffs.

This one took me a while to figure out and caused *"Hulk Smash!"* style
rage during the search. Hopefully I can save you the same.
