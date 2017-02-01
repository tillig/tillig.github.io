---
layout: post
title: "Forcing ASP.NET 3.5 on IIS6"
date: 2008-12-01 -0800
comments: true
disqus_identifier: 1470
tags: [aspnet]
---
I realize I'm probably a bit behind the times on this one, but there was
just something I wasn't *getting* until now.

I know that [.NET 3.0 and 3.5 are still on the .NET 2.0
CLR](http://www.hanselman.com/blog/HowToSetAnIISApplicationOrAppPoolToUseASPNET35RatherThan20.aspx).
I get that. Today, though, I was writing a little web form - a one-page,
all-code-in-the-ASPX web form to just do a quick test of something. I
wasn't using Visual Studio, I wasn't creating a whole web project, I
just wanted to drop a single ASPX file into C:\\Inetpub\\wwwroot and run
it to see the outcome of a particular expression evaluation. Sort of
like [Snippet Compiler](http://www.sliver.com/dotnet/SnippetCompiler/)
gone ASPX.

For the life of me, though, I could not get my .NET 3.5 LINQ code to
compile. I had the correct \<%@ Assembly %\> directive to reference
System.Core, I had everything looking right... but it wouldn't use the
.NET 3.5 C# compiler, so it wasn't understanding my LINQ syntax.

The answer: **You absolutely must specify the .NET 3.5 compiler in your
\<system.codedom\> section of web.config.** No choice. You can't just
drop an ASPX file in there and expect the latest compiler to be used,
even if you have it installed. Here's a snippet:

    <system.codedom>
      <compilers>
        <compiler language="c#;cs;csharp" extension=".cs" warningLevel="4" type="Microsoft.CSharp.CSharpCodeProvider, System, Version=2.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089">
          <providerOption name="CompilerVersion" value="v3.5"/>
          <providerOption name="WarnAsError" value="false"/>
        </compiler>
      </compilers>
    </system.codedom>

.NET 3.0 and 3.5 did some great stuff to help you in using the features
in ASP.NET. For example, [the default web\_mediumtrust.config (Medium
Trust in ASP.NET) was
updated](http://download.microsoft.com/download/9/a/e/9ae0f6cc-7032-408e-9ca7-989f9e4af4ec/dotNetReadMe.htm#General%20Issues)
to allow ReflectionPermission so you can use the LinqDataSource control
without having to create your own custom trust level.

How come they didn't update the compiler for ASP.NET to be the latest?
Instead, you have to put this in every web.config file of every
application you make. (I didn't notice it because it's one of the things
Visual Studio does for you when you create a new web project.)

[Hanselman has a more complete article on the
issue](http://www.hanselman.com/blog/HowToSetAnIISApplicationOrAppPoolToUseASPNET35RatherThan20.aspx),
but at a minimum, you need to update the compiler in your web.config.

