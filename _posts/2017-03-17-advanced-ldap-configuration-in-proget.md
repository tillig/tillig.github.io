---
layout: post
title: "Advanced LDAP Configuration in ProGet"
date: 2017-03-17 -0800
comments: true
tags: [build,security]
description: "Setting up a simple Active Directory connection in ProGet is easy - doing more advanced configuration takes some doing. Here are some tips to help."
---
[ProGet](https://inedo.com/proget) is a very cool, very flexible package and symbol server. They offer a [free edition](https://inedo.com/proget/pricing#pg-free) but when you get into the paid licenses you can secure your feeds using LDAP or Active Directory credentials.

**NOTE: This is written against ProGet 4.7.6.** Inedo is pretty good about getting new and cool features out quickly, so if you don't see all the stuff I'm talking about here it may have been rolled up into "more official" UI.

Given that disclaimer...

ProGet supports three user directories:

1. Built-in - the local user store, no Active Directory or LDAP.
2. LDAP or Single Domain Active Directory - uses a single LDAP directory for users.
3. Active Directory with Multiple Domains - enables the local Active Directory as well as an additional domain.

# General Troubleshooting

**There's a hidden integrated auth debugging page** at `http://yourprogetserver/debug/integrated-auth` and it dumps out a bunch of data about which user directory you're using, which user account you're using to authenticate currently, and so on.

I'm not putting a screen shot here because the view would be nearly useless given the amount of info I'd have to redact. Just try it, you'll see.

# Built-in Directory

There's not much to say about the built-in directory. It's very simple. Members, groups, done. However, you may, at some point want to test searching for specific users or groups if folks are reporting trouble.

**There is a hidden test page for the built-in directory** here: `http://yourprogetserver/administration/security/configure-directory?directoryId=1`

That page allows you to do a test search. There's really nothing to configure otherwise, so it's just diagnostics.

![Built-in directory test page]({{ site.url }}/images/20170317_builtinpage.png)

# LDAP or Single Domain Active Directory

Connecting to the local Active Directory is pretty straightforward. [There's good doc on how to do that.](https://inedo.com/support/documentation/proget/administration/ldap-active-directory)

However, there are additional properties you can configure, like which LDAP OU you want users to be in, and there's no UI... _or so it would seem_.

**There is a hidden configuration and test page for LDAP or Single Domain Active Directory** here: `http://yourprogetserver/administration/security/configure-directory?directoryId=2`

![LDAP/single AD test page]({{ site.url }}/images/20170317_ldappage.png)

This is super useful if you need to authenticate as a service account for AD queries or otherwise modify the LDAP query.

**I didn't find a way to change the LDAP server here.** I may be misunderstanding, but the description on this option makes it sound like that's possible: "ProGet will use the user and group information of a single domain or a generic LDAP directory." In practice this option will only use the Active Directory of the account running the ProGet web app. If the web app is running as a local machine service account (e.g., SYSTEM or NETWORK SERVICE) that means the Active Directory to which the local machine belongs.

In order to use a _different_ domain than the service account or machine you need to switch to the "Active Directory with Multiple Domains" option.

# Active Directory with Multiple Domains

This option lets you authenticate users against a _different_ or _second_ directory. In this case, "Multiple Domains" means "the default domain and an additional one."

**There is a hidden configuration and test page for Active Directory with Multiple Domains** here: `http://yourprogetserver/administration/security/configure-directory?directoryId=3`

![AD/multiple domains test page]({{ site.url }}/images/20170317_multidomainpage.png)

I think the "AD with Multiple Domains" option _also_ uses the settings from the "LDAP or Single Domain Active Directory" option, but I can't promise that. It seems like the configuration page should have the same sorts of values on it but it doesn't.
