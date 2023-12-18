---
layout: post
title: "MIX07 - Developing AJAX Applications with Visual Studio &quot;Orcas&quot;"
date: 2007-04-30 -0800
comments: true
disqus_identifier: 1191
tags: [conferences,aspnet,dotnet,vs,javascript]
---
I admit I've been lax and haven't been installing the Visual Studio
"Orcas" releases. I've followed the cool stuff, but I haven't actually
installed it. This session made me wish we were already in this.

 The session was called "Developing AJAX Applications with Visual Studio
'Orcas'" but it should have been called "New ASP.NET Controls and How
Visual Studio Supports JavaScript Development."

 In the non-JavaScript developments, we see new controls of interest in
ASP.NET 3.5. The ListView control is sort of like a repeater but gives
you a little more control over list creation. For example, you could set
a list template to something like `<ul runat="server"></ul>` and a list
item template of `<li><%# DataBoundField %></li>` to make an unordered
list... and the output HTML is no more or less than exactly what you
specified - great control over the HTML. The DataPager control is an
extender for any databound control that allows you to easily add paging
- no more having to natively support it in your controls.

 The JavaScript developments were the big show here, though. Full
Intellisense for JavaScript including keywords, declared variables,
properties, methods... even if you reference an external JavaScript
file, it'll figure that out and give you Intellisense for all of those
methods. And it's smart about it - it does dynamic type evaluation on
variables, for example, and figures out that at the time you're asking
for Intellisense it's, say, a number, so you only see the Intellisense
for methods applicable to numeric objects. *Hot.*

 To assist in the Intellisense effort, they've added XML documentation
support such that the Intellisense is driven by the XML doc comments in
your script. If you document your script, it'll appear just like
standard .NET Intellisense with method descriptions, parameter
information, and so on. To get around the loose typing of JavaScript,
you add attributes to the XML doc comments to tell Intellisense what the
expected parameter types and what the return type of the method is
(`<param name="myParam" type="String">Some Parameter</param>`).
Specifying the return type is how the Intellisense knows the way to
treat return values from your methods. ASP.NET AJAX libraries will all
be commented this way.

 JavaScript debugging is vastly improved, too. If you have a script in
your page, you can set a breakpoint in the page and \*gasp\* when you
run the page it'll break on your breakpoint. This is a huge improvement
because you used to have to figure out where in your ASPX the script
really was and try to figure out whether the breakpoint was actually
hit... and sometimes it wasn't... it was just a nightmare. Now?
Brilliance.
