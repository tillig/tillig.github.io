---
layout: post
title: "NAnt and HintPath"
date: 2004-10-06 -0800
comments: true
disqus_identifier: 671
tags: [net,build,vs]
---
I'm working on a Visual Studio .NET add-in project where we need to be
able to build the project both through the Visual Studio IDE and through
[NAnt](http://nant.sourceforge.net/).

 So I've got NAnt 0.84, which builds all the other projects (using the
\<solution\> task) I've got just fine, but gives me this error:
`System.NullReferenceException: Object reference not set to an instance of an object. at NAnt.VSNet.Reference..ctor(Solution solution, ProjectSettings ps, XmlElement elemReference, SolutionTask solutionTask, String outputDir)...`

 And so on, tracing down the whole call stack. What's the deal?

 As you (probably) know, references in a .csproj file look like this:

`<VisualStudioProject>  <CSHARP>   <Build>    <References>     <Reference      Name = "EnvDTE"      AssemblyName = "EnvDTE"      HintPath = "..\..\..\..\..\WINDOWS\Microsoft.NET\Framework\v1.1.4322\EnvDTE.dll"     />    </References>   </Build>  </CSHARP> </VisualStudioProject>`

 Of course, the "HintPath" attribute is optional.

 Apparently it's not an option for NAnt. The add-in wizard doesn't put
HintPath in for your references, and regardless of what you do, NAnt
won't build without it. (Yes, I added \<assemblyfolders\> attributes to
the \<solution\> task - you need those, too, but it doesn't fix it.) So
manually edit your .csproj, add the HintPath, and you're in.
