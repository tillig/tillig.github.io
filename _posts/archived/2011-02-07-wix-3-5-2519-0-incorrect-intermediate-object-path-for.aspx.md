---
layout: post
title: "WiX 3.5.2519.0 Incorrect Intermediate Object path for External Files"
date: 2011-02-07 -0800
comments: true
disqus_identifier: 1696
tags: [net,build]
---
I'm upgrading a project to the released version of WiX and found an
issue that causes .wixobj files to be created in your source tree in
unfortunate locations at build time. [I've filed the issue on
SourceForge](https://sourceforge.net/tracker/index.php?func=detail&aid=3175345&group_id=105970&atid=642714),
but for folks running across it, I thought I'd post here as well
including the workaround.

**If you have a .wixproj that contains .wxs files that are included via
relative path** outside of the folder structure below the .wixproj, the
intermediate objects (.wixobj) get placed in odd/incorrect locations
based on the source external .wxs files. What this looks like in the
wild is that random .wixobj files just sort of "materialize" during the
build and you can't figure out where they're coming from.

For example, say you have a folder structure like this:

    trunk/
      product/
        solution/
          installer/
            ProductSetup.wixproj
            Product.wxs
      setup/
        CustomDialogs.wxs

The ProductSetup.wixproj includes the set of custom dialogs like this:

    <Project>
      <ItemGroup>
        <Compile Include="..\..\..\setup\CustomDialogs.wxs">
          <Link>CustomDialogs.wxs</Link>
        </Compile>
      </ItemGroup>
    </Project>

(.wixproj simplified for the example)

Given that the `OutputPath` for the project is relative -
`bin\$(Configuration)` - and the `IntermediateOutputPath` is also
relative - `obj\$(Configuration)` - I would expect that all .wixobj
files get created in `obj\$(Configuration)`... *but they don't*.

Alternatively, I could accept (though it'd be unexpected) that
intermediate output gets placed in `obj\$(Configuration)` relative to
each .wxs file, so I might see
`trunk\setup\obj\Debug\CustomDialogs.wixobj` in this example. *This is
also not what happens.*

Instead, **paths are calculated based on the relative location of the
.wxs source combined with the project's intermediate output path.** That
means, for this example:

`trunk\product\solution\installer\obj\Debug` (the intermediate output
location of the .wixproj project)

combines with

`..\..\..\setup` (the location of the external .wxs file)

and you find the file

`trunk\product\solution\setup\CustomDialogs.wixobj`

gets created during the build process.

The workaround for this appears to be to manually specify `ObjectPath`
on any included .wxs files, like:

    <Compile Include="..\..\..\setup\CustomDialogs.wxs">
      <Link>CustomDialogs.wxs</Link>
      <ObjectPath>obj\$(Configuration)</ObjectPath>
    </Compile>

This forces the .wixobj files to be created in the appropriate location.

**UPDATE 3/21/2011**: I got a report that just putting
`obj\$(Configuration)` didn't work for one user and they needed to add a
trailing backslash, like `obj\$(Configuration)\` to the path. I didn't
need that, but if the above isn't working for you, try adding the
backslash.

This behavior is new in WiX 3.5.2519.0 (the released/official 3.5
version) and did not exist in 3.5.2403.0.

