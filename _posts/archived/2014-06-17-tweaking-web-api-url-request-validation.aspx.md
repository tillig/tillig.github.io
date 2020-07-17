---
layout: post
title: "Tweaking Web API URL Request Validation"
date: 2014-06-17 -0800
comments: true
disqus_identifier: 1844
tags: [net,aspnet]
---
In working with a REST API project I'm on, I was tasked to create a
DELETE operation that would take the resource ID in the URL path, like:

`DELETE /api/someresource/reallylongresourceidhere HTTP/1.1`

The resource ID we had was really, really long base-64 encoded value.
About 750 characters long. No, don't bug me about why that was the case,
just... stick with me. I had to get it to work in IIS and OWIN hosting.

**STOP. STOP RIGHT HERE. I'm going to tell you some ways to tweak URL
request validation. This is a security thing. Security is Good. IN THE
END, I DIDN'T DO THESE. I AM NOT RECOMMEDING YOU DO THEM.** But, you
know, if you run into one of the issues I ran into... here are some ways
you can work around it *at your own risk*.

**Problem 1: The Overall URL Length**

By default, ASP.NET has a max URL length set at 260 characters.
[Luckily, you can change that in
web.config](http://msdn.microsoft.com/en-us/library/e1f13641(v=vs.100).aspx):

    <configuration>
      <system.web>
        <httpRuntime maxUrlLength="2048" />
      </system.web>
    </configuration>

Setting that `maxUrlLength` value got me past the first hurdle.

**Problem 2: URL Decoding**

Base 64 includes the "/" character – the path slash. Even if you encode
it on the URL like this...

`/api/someresource/abc%2Fdef%2fghi`

...when .NET reads it, it gets entirely decoded:

`/api/someresource/abc/def/ghi`

...which then, of course, got me a 404 Not Found because my route wasn't
set up like that.

[This is also something you can control through
web.config](http://msdn.microsoft.com/en-us/library/ee656539.aspx):

    <configuration>
      <uri>
        <schemeSettings>
          <add name="http" genericUriParserOptions="DontUnescapePathDotsAndSlashes" />
          <add name="https" genericUriParserOptions="DontUnescapePathDotsAndSlashes" />
        </schemeSettings>
      </uri>
    </configuration>

Now that the URL is allowed through and it's not being proactively
decoded (so I can get routing working), the last hurdle is...

**Problem 3: Max Path Segment Length**

The key, if you recall, is about 750 characters long. I can have a URL
come through that's 2048 characters long, but there's still validation
on each path segment length.

[The tweak for this is in the
registry](http://support.microsoft.com/kb/820129). Find the registry key
`HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\HTTP\Parameters`
and add a DWORD value `UrlSegmentMaxLength` with the value of the max
segment length. The default is 260; I had to update mine to 1024.

After you change that value, you have to reboot to get it to take
effect.

This is the part that truly frustrated me. Even running in the
standalone OWIN host, this value is still used. I thought OWIN and OWIN
hosting was getting us away from IIS, but **the low-level http.sys is
still being used in there somewhere**. I guess I just didn't realize
that and maybe I should have. I mean, .NET is all just wrappers on
unmanaged crap anyway, right? :)

**WHAT I ENDED UP DOING**

Having to do all that to get this working set me on edge. I don't mind
increasing, say, the max URL length, but I had to tweak a lot, and that
left me with a bad taste in my mouth. Deployment pain, potential
security pain... not worth it.

Since we had control over how the resource IDs were generated in the
first place, **I changed the algorithm so we could fit them all under
260 characters** – the max path segment length. I left the overall URL
length configuration in web.config at a higher number, but shrunk it
down to 1024 instead of sticking at 2048. I ditched the registry change
– no longer needed.

