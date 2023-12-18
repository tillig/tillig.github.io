---
layout: post
title: "Recursively Copying Indirect Project Dependencies in MSBuild"
date: 2014-05-09 -0800
comments: true
disqus_identifier: 1842
tags: [dotnet,gists,build]
---
I've run across a similar situation to many folks I've seen online, where I have a solution with a pretty modular application and when I build it,**I don't get all the indirect dependencies copied in**.

I found [a blog article with an MSBuild target in it that supposedly fixes some of this indirect copying nonsense](http://blog.alexyakunin.com/2009/09/making-msbuild-visual-studio-to.html), but as it turns out, it doesn't actually go far enough.

My app looks something like this (from a reference perspective)

- Project: App Host
  - Project: App Startup/Coordination
    - Project: Core Utilities
    - Project: Server Utilities
      - NuGet references and extra junk

The application host is where I need everything copied so it all works, but the NuGet references and extra junk way down the stack isn't making it so there are runtime explosions.

**I also decided to solve this with MSBuild, but using an inline code task.** This task will...

1. Look at the list of project references in the current project.
2. Go find the project files corresponding to those project references.
3. Calculate the path to the project reference output assembly and
    include that in the list of indirect references.
4. Calculate the paths to any third-party references that include a `<HintPath>` (indicating the item isn't GAC'd) and include those in the list of indirect references.
5. Look for any additional project references – if they're found, go to step 2 and continue recursing until there aren't any project references we haven't seen.

While it's sort of the "nuclear option," it means that my composable application will have all the stuff ready and in place at the Host level for any plugin runtime assemblies to be dropped in and be confident they'll find all the platform support they expect.

*Before I paste in the code, the standard disclaimers apply: Works on my box; no warranty expressed or implied; no support offered; YMMV; and so on. If you grab this and need to tweak it to fit your situation, go for it. I'm not really looking to make this The Ultimate Copy Paste Solution for Dependency Copy That Works In Every Situation.*

**And with that, here's a .csproj file snippet showing how to use the task as well as the task proper:**

```xml
<?xml version="1.0" encoding="utf-8"?>
<Project ToolsVersion="12.0" DefaultTargets="Build" xmlns="http://schemas.microsoft.com/developer/msbuild/2003">
  <!-- All the stuff normally found in the project, then in the AfterBuild event... -->
  <Target Name="AfterBuild">
    <!-- Here's the call to the custom task to get the list of dependencies -->
    <ScanIndirectDependencies StartFolder="$(MSBuildProjectDirectory)"
                              StartProjectReferences="@(ProjectReference)"
                              Configuration="$(Configuration)">
      <Output TaskParameter="IndirectDependencies" ItemName="IndirectDependenciesToCopy" />
    </ScanIndirectDependencies>

    <!-- Only copy the file in if we won't stomp something already there -->
    <Copy SourceFiles="%(IndirectDependenciesToCopy.FullPath)"
          DestinationFolder="$(OutputPath)"
          Condition="!Exists('$(OutputPath)\%(IndirectDependenciesToCopy.Filename)%(IndirectDependenciesToCopy.Extension)')" />
  </Target>


  <!-- THE CUSTOM TASK! -->
  <UsingTask TaskName="ScanIndirectDependencies" TaskFactory="CodeTaskFactory" AssemblyFile="$(MSBuildToolsPath)\Microsoft.Build.Tasks.v12.0.dll">
    <ParameterGroup>
      <StartFolder Required="true" />
      <StartProjectReferences ParameterType="Microsoft.Build.Framework.ITaskItem[]" Required="true" />
      <Configuration Required="true" />
      <IndirectDependencies ParameterType="Microsoft.Build.Framework.ITaskItem[]" Output="true" />
    </ParameterGroup>
    <Task>
      <Reference Include="System.Xml"/>
      <Using Namespace="Microsoft.Build.Framework" />
      <Using Namespace="Microsoft.Build.Utilities" />
      <Using Namespace="System" />
      <Using Namespace="System.Collections.Generic" />
      <Using Namespace="System.IO" />
      <Using Namespace="System.Linq" />
      <Using Namespace="System.Xml" />
      <Code Type="Fragment" Language="cs">
      <![CDATA[
var projectReferences = new List<string>();
var toScan = new List<string>(StartProjectReferences.Select(p => Path.GetFullPath(Path.Combine(StartFolder, p.ItemSpec))));
var indirectDependencies = new List<string>();

bool rescan;
do{
  rescan = false;
  foreach(var projectReference in toScan.ToArray())
  {
    if(projectReferences.Contains(projectReference))
    {
      toScan.Remove(projectReference);
      continue;
    }

    Log.LogMessage(MessageImportance.Low, "Scanning project reference for other project references: {0}", projectReference);

    var doc = new XmlDocument();
    doc.Load(projectReference);
    var nsmgr = new XmlNamespaceManager(doc.NameTable);
    nsmgr.AddNamespace("msb", "http://schemas.microsoft.com/developer/msbuild/2003");
    var projectDirectory = Path.GetDirectoryName(projectReference);

    // Find all project references we haven't already seen
    var newReferences = doc
          .SelectNodes("/msb:Project/msb:ItemGroup/msb:ProjectReference/@Include", nsmgr)
          .Cast<XmlAttribute>()
          .Select(a => Path.GetFullPath(Path.Combine(projectDirectory, a.Value)));

    if(newReferences.Count() > 0)
    {
      Log.LogMessage(MessageImportance.Low, "Found new referenced projects: {0}", String.Join(", ", newReferences));
    }

    toScan.Remove(projectReference);
    projectReferences.Add(projectReference);

    // Add any new references to the list to scan and mark the flag
    // so we run through the scanning loop again.
    toScan.AddRange(newReferences);
    rescan = true;

    // Include the assembly that the project reference generates.
    var outputLocation = Path.Combine(Path.Combine(projectDirectory, "bin"), Configuration);
    var localAsm = Path.GetFullPath(Path.Combine(outputLocation, doc.SelectSingleNode("/msb:Project/msb:PropertyGroup/msb:AssemblyName", nsmgr).InnerText + ".dll"));
    if(!indirectDependencies.Contains(localAsm) && File.Exists(localAsm))
    {
      Log.LogMessage(MessageImportance.Low, "Added project assembly: {0}", localAsm);
      indirectDependencies.Add(localAsm);
    }

    // Include third-party assemblies referenced by file location.
    var externalReferences = doc
          .SelectNodes("/msb:Project/msb:ItemGroup/msb:Reference/msb:HintPath", nsmgr)
          .Cast<XmlElement>()
          .Select(a => Path.GetFullPath(Path.Combine(projectDirectory, a.InnerText.Trim())))
          .Where(e => !indirectDependencies.Contains(e));

    Log.LogMessage(MessageImportance.Low, "Found new indirect references: {0}", String.Join(", ", externalReferences));
    indirectDependencies.AddRange(externalReferences);
  }
} while(rescan);

// Expand to include pdb and xml.
var xml = indirectDependencies.Select(f => Path.Combine(Path.GetDirectoryName(f), Path.GetFileNameWithoutExtension(f) + ".xml")).Where(f => File.Exists(f)).ToArray();
var pdb = indirectDependencies.Select(f => Path.Combine(Path.GetDirectoryName(f), Path.GetFileNameWithoutExtension(f) + ".pdb")).Where(f => File.Exists(f)).ToArray();
indirectDependencies.AddRange(xml);
indirectDependencies.AddRange(pdb);
Log.LogMessage("Located indirect references:\n{0}", String.Join(Environment.NewLine, indirectDependencies));

// Finally, assign the output parameter.
IndirectDependencies = indirectDependencies.Select(i => new TaskItem(i)).ToArray();
      ]]>
      </Code>
    </Task>
  </UsingTask>
</Project>
```

**Boom!** Yeah, that's a lot of code. And I could probably tighten it up, but I'm only using it once, in one place, and it runs one time during the build. Ain't broke, don't fix it, right?

Hope that helps someone out there.
