---
layout: post
title: "Debugging Visual Studio Add-Ins and XmlSerialization Problems"
date: 2009-11-03 -0800
comments: true
disqus_identifier: 1585
tags: [net]
---
The quick version:

**If you're writing a Visual Studio add-in, a DXCore add-in, or anything
else where the debug environment is Visual Studio itself, be careful not
to load the add-in project in the Visual Studio instance you're
debugging.** You'll get some weird errors.

This is a total edge case but it had me baffled for a while.

I'm working on a DXCore plugin that talks to a web service. It takes
some selected code and sends it to a web service to do something with.
Since you need code to work with, the easiest way to debug it was to:

1.  Hit F5 to start another Visual Studio environment with the add-in
    installed.
2.  Go to File -\> Recent Projects and grab the first one in the list -
    the add-in project.
3.  Test out the plugin.

At one point I made a call to the web service using a complex type (not
a string or integer, but a data transfer object) like this:

`ComplexObject response = serviceProxy.DoAnOperation(param1, param2);`

...where `param1` is an input object of type `ComplexObject`. Doing that
I got a weird XmlSerializationException:

`[A]CR_PluginName.WebServiceNamespace.ComplexObject cannot be cast to [B]CR_PluginName.WebServiceNamespace.ComplexObject. Type A originates from 'CR_PluginName, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null' in the context 'LoadFrom' at location 'C:\Documents and Settings\tillig\My Documents\DevExpress\IDE Tools\Community\PlugIns\CR_PluginName.dll'. Type B originates from 'CR_PluginName, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null' in the context 'LoadNeither' at location 'C:\Documents and Settings\tillig\Local Settings\Application Data\Microsoft\VisualStudio\9.0\ProjectAssemblies\wi3h64z601\CR_PluginName.dll'.`

Huh?

The key was in the second location: "...\\**ProjectAssemblies**\\..."
The object I was sending to the web service was defined in the plugin
assembly... but it was trying to deserialize the response using the
temporary assembly that the debug instance of Visual Studio had compiled
in the background.

The solution ends up being "don't do that." Opening up a different
solution, I no longer had issues debugging my web service calls and the
plugin worked fine.

1.  Hit F5 to start another Visual Studio environment with the add-in
    installed.
2.  Go to File -\> Open Project... and find *some other project that is
    not the add-in project*.
3.  Test out the plugin.


