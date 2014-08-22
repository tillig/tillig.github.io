---
layout: post
title: "Book Review: Professional ASP.NET 3.5 Security, Membership, and Role Management with C# and VB"
date: 2009-01-06 -0800
comments: true
disqus_identifier: 1484
tags: [Web Development]
---
[![Professional ASP.NET 3.5 Security, Membership, and Role Management
with C\# and
VB](http://ecx.images-amazon.com/images/I/61fLVextjJL._BO2_AA240_SH20_OU01_.jpg)*Professional
ASP.NET 3.5 Security, Membership, and Role Management with C\# and
VB*](http://www.amazon.com/gp/product/0470379308?ie=UTF8&tag=mhsvortex&linkCode=as2&camp=1789&creative=9325&creativeASIN=0470379308)
is, other than a heck of a long title, probably one of the most useful
books I've read through in recent memory.

You know when you're working on an in-depth item related to, say,
ASP.NET membership and you search the web only to find 100 tiny articles
that *almost* cover what you're looking for? You know how you wish
someone would make a book that would just aggregate all of that
knowledge and maybe take it just a little deeper?

This is that book.

The high level table of contents is as follows:

-   Chapter 1: Introducing IIS 7.0
-   Chapter 2: IIS 7.0 and ASP.NET Integrated Mode
-   Chapter 3: HTTP Request Processing in IIS 7.0 Integrated Model
-   Chapter 4: A Matter of Trust
-   Chapter 5: Configuration System Security
-   Chapter 6: Forms Authentication
-   Chapter 7: Integrating ASP.NET Security with Classic ASP
-   Chapter 8: Session State
-   Chapter 9: Security for Pages and Compilation
-   Chapter 10: The Provider Model
-   Chapter 11: Membership
-   Chapter 12: SqlMembershipProvider
-   Chapter 13: ActiveDirectoryMembershipProvider
-   Chapter 14: Role Manager
-   Chapter 15: SqlRoleProvider
-   Chapter 16: AuthorizationStoreRoleProvider
-   Chapter 17: Membership and Role Management in ASP.NET AJAX 3.5
-   Chapter 18: Best Practices for Securing ASP.NET Web Applications

The introductory chapters on IIS 7 were particularly interesting to me,
since I still maintain a lot of legacy code on IIS 6 and haven't had the
opportunity to get in-depth with IIS 7 quite yet. These really gave a
great overview not only of the general request process for IIS 7, but
also differences between IIS 6 and IIS 7 with a focus on places where
security-related events happen (e.g., where a request gets authorized,
when the thread principal gets set, how these things get set in
different scenarios).

Chapter 4 had a great discussion on the different ASP.NET trust levels
that your application can run under and what each means. It also
explained how the permissions for your application get determined and
how to customize the permissions in your application to give it only
what it needs. Code access security is such a tricky thing, it was nice
to see this laid out in a clear fashion.

Chapter 5 talked about the way configuration (web.config) gets read and
what permissions you need in order to access it. It also discussed ways
to encrypt the sensitive sections of configuration (settings that might
contain passwords, for example) and ways you can create your own
encrypted settings provider - even allowing the settings to be read from
a location other than the config file.

Chapter 6 on forms authentication started out like every other ASP.NET
book with a forms auth discussion, but this chapter actually got into
details like how secure encrypted forms auth tickets are and ways to
influence the forms auth process that you might not have originally
considered.

Chapter 7 might also have been called "How to get ASP.NET and classic
ASP to coexist in IIS 7." While the focus on it is getting the ASP.NET
authentication mechanisms to work with classic ASP (using IIS 7), the
discussion went a bit deeper than that, even talking about topics like
passing data between ASP and ASP.NET.

Chapter 8 is basically everything you ever wanted to know about session
state but were afraid to ask. It's not just what session state is and
how it works, it goes into what exactly is stored in a SQL session
database, how that data gets generated, how to secure it, and how to
stop session-related DoS attacks.

Chapter 9 was a short chapter that talked about a few odds and ends that
didn't get covered elsewhere. This chapter was the one that felt a
little disorganized and mishmash, but it was still useful information.
Topics here included request validation, viewstate protection, the
permissions needed for page compilation, and securing your site map.

Chapters 10 - 16 were about the role and membership providers. The
overall system gets introduced in a chapter, then each out-of-the-box
provider gets explained in super detail. For example, the
SqlMembershipProvider chapter goes so far as to explain how the schema
for the membership database gets versioned. Chapter 17 ties the role and
membership stuff into ASP.NET AJAX so you can see how to work with it
all from the client side.

Chapter 18, though, is where you'll want to flip right to. This is where
it all comes together - all the stuff you'll have learned from the
previous chapters, put together in a near-checklist form, so you can
take a step back from the application you're working on, look through
this, and ask yourself, "Am I doing this in a secure fashion?" Common
gotchas and attacks are discussed here as well as ways to protect
yourself.

It's definitely not for folks new to ASP.NET - if you haven't written an
ASP.NET app before or you're just starting out, this isn't for you. This
book gives you in-depth information that, in some cases, you'd only
otherwise get by using .NET Reflector to delve into the actual .NET
assemblies and follow the code. It's heavy, detailed information. For
mid-level to experienced ASP.NET developers, you definitely need to pick
this up.

In all, this is one of those books I'm really glad to have on my shelf,
right alongside *[Professional ASP.NET 3.5 in C\# and
VB](http://www.amazon.com/gp/product/0470187573?ie=UTF8&tag=mhsvortex&linkCode=as2&camp=1789&creative=9325&creativeASIN=0470187573)*.

