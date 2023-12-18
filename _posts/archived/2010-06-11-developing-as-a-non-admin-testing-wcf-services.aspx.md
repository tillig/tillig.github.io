---
layout: post
title: "Developing as a Non-Admin: Testing WCF Services"
date: 2010-06-11 -0800
comments: true
disqus_identifier: 1649
tags: [dotnet,vs,testing,wcf]
---
If you're developing as a non-admin user and writing WCF services (or
supporting entities like behaviors, etc.), you probably not only are
unit testing the code but also want to write an integration test or two
that actually fires up a real WCF service, makes a couple of requests,
and validates the responses.

You may also have seen this exception:

`System.ServiceModel.AddressAccessDeniedException : HTTP could not register URL http://+:1234/ServiceUnderTest/. Your process does not have access rights to this namespace (see http://go.microsoft.com/fwlink/?LinkId=70353 for details).`

Following that link, you'll see that the reason you can't start your
service listening to the port/URL you chose in your test fixture is that
you're not running as admin. You also see some instructions telling you
how to grant the user the rights to use that URL.

**There's an easier way and it doesn't require permissions changes.**

There is a special temporary URL base that anyone can use. Instead of
starting up your service on an arbitrary port or URL like
"<http://localhost:1234/ServiceUnderTest>" **try putting the test service
under "<http://localhost:80/Temporary\_Listen\_Addresses/>"** like
"<http://localhost:80/Temporary\_Listen\_Addresses/ServiceUnderTest>". You
won't get prompted for credentials and things will run just fine on your
local machine without having to grant your developer user any additional
permissions.

This is one of those things that I figured out, forgot, figured out, and
forgot again... and now I've figured it out one more time. This time I'm
blogging it so I hopefully don't forget.
