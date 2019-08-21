---
layout: post
title: "Make Your DXCore Plugin Official with a ProductModule"
date: 2010-09-22 -0800
comments: true
disqus_identifier: 1667
tags: [net,vs]
---
**As of 2012.1.4, the DXCore "About" box no longer displays
ProductModule contents. If you're working with that version or later,
don't bother with this. You won't see the results of your efforts.**

Have you ever looked at the [DevExpress](http://www.devexpress.com) menu
in Visual Studio and selected the "About" option? There's a list in
there of all the installed "products" with associated version
information, a textual description, and even a graphic with the product
logo:

![DXCore "About"
box]({{ site.url }}/images/20100922about1.png)

If you have the [CR_Documentor](http://cr-documentor.googlecode.com)
plugin installed, you'll notice it also shows up in that box:

![DXCore "About" box showing the CR_Documentor
information]({{ site.url }}/images/20100922about2.png)

If you want to "make your plugin an official product" and show up in the
"About" box, the way to do that is to implement a ProductModule.

**Before we get into this, something to consider**: You probably don't
need or want to implement a ProductModule for every plugin you write.
Doing this is something for larger plugins or, better still, *suites of
multiple plugins* that get distributed as a single product. If every
plugin did this, that "About" box would get pretty noisy really quick...
and does everyone need to see that little hotkey plugin in the "About"
box? That said, if you have a sizable plugin or a plugin suite, here's
how you get into the "About" box...

**This tutorial assumes your plugin(s) are all in one assembly.** You
may need to tweak a few things to get it to work for a multi-assembly
suite, but the general principles should remain the same.

**First, make sure your assembly is marked with title, version,
copyright, and description attributes.** We'll use these attributes to
generate the text that shows up in the "About" box.

    [assembly: AssemblyTitle("Product Module Demo")]
    [assembly: AssemblyCopyright("Copyright © 2010 Travis Illig")]
    [assembly: AssemblyDescription("Demonstration that shows how the ProductModule works to get a plugin into the About box.")]
    [assembly: AssemblyVersion("1.0.0.0")]

**Next, create your logo graphic.** The image should be a 536 x 201 PNG
image and should have your product logo as well as the name of your
product. If you look at the above "About" box images, you'll see a blue
gradient that has the logo and product name on top - that's what you'll
be creating. Your image should include the gradient and everything -
that doesn't get put in for you. To make it good, you'll probably need
to take a little time with a paint program of your choice. Just put your
logo on the background; the little "version" information in the top
right corner gets inserted for you by the "About" box.

For convenience, here's a PNG image of the gradient background that I
created and you can use to start with:

![Gradient for "About" box
logos]({{ site.url }}/images/20100922productmodulegradient.png)

**Add your logo image to your plugin project as an embedded resource.**
Drag it into your plugin project so it gets added in there and make sure
in the properties the image is set as "Embedded Resource."

![Embedded resource
properties]({{ site.url }}/images/20100922logoproperties.png)

**Add a class to your project that derives from
DevExpress.CodeRush.Common.ProductModule.** This is where all the
information for the "About" box comes from.

**In your derived ProductModule, you need to define some constants:**

-   The path to the embedded resource that is your product logo graphic.
-   A GUID that uniquely identifies your product. Note that there is ONE
    product GUID, but there may be many plugins in that product. This
    GUID is not the same as the plugin IDs.
-   The minimum DXCore version that your product works with. This will
    be used to help DXCore determine if your product is compatible with
    the user's installation.
-   A string with the short name of your plugin assembly
    ("MyPlugin.dll"). You could technically calculate this on the fly,
    but chances are it's not going to change much (or ever) so it's
    fairly safe to just hardcode it.

This will end up looking something like the following:

    private const string LogoPath = "ProductModuleDemo.ProductModuleLogo.png";
    private static readonly Guid ProductId = new Guid("0CB93ADC-7188-4632-B469-98D161074E48");
    private static DevExpress.CodeRush.Common.Version MinEngineVersion = new DevExpress.CodeRush.Common.Version(10, 1, 6, 0);
    private const string PluginAssemblyName = "ProductModuleDemo.dll";

**Add a static constructor to your ProductModule** to calculate some
values based on the assembly. You need to calculate and store:

-   The assembly title.
-   The assembly copyright information.
-   The assembly description.
-   The assembly version, converted to a DXCore version value.

Get that information from the attributes you added to the assembly. For
a ProductModule class called "About," that'll look like:

    private static readonly string AssemblyTitle;
    private static readonly string AssemblyCopyright;
    private static readonly string AssemblyDescription;
    private static readonly DevExpress.CodeRush.Common.Version AssemblyVersion;

    static About()
    {
      var assembly = typeof(About).Assembly;
      var version = assembly.GetName().Version;
      AssemblyVersion = new DevExpress.CodeRush.Common.Version(
        version.Major,
        version.Minor,
        version.Build,
        version.Revision,
        DevExpress.CodeRush.Common.ReleaseType.Release);
      AssemblyTitle = GetCustomAttribute<AssemblyTitleAttribute>(assembly).Title;
      AssemblyCopyright = GetCustomAttribute<AssemblyCopyrightAttribute>(assembly).Copyright;
      AssemblyDescription = GetCustomAttribute<AssemblyDescriptionAttribute>(assembly).Description;
    }

    private static T GetCustomAttribute<T>(Assembly asm) where T : Attribute
    {
      var attributes = (T[])asm.GetCustomAttributes(typeof(T), true);
      return attributes[0];
    }

**In your ProductModule, override and implement the following:**

-   **Copyright1 property**: Return the assembly copyright information.
-   **Description property**: Return the assembly description
    information.
-   **ID property**: Return the Product ID GUID you created.
-   **MinimumEngineVersion property**: Return the minimum engine version
    value you created.
-   **ModuleType property**: This indicates what kind of product you
    have. If it's a community/free plugin, return ModuleTypes.Free; if
    it's a paid product, return ModuleTypes.Full.
-   **Name property**: Return the assembly title information.
-   **SupportedLanguages property**: This property returns an array of
    language strings that indicate what languages your plugin is valid
    for. You can find these values in the "Language" dropdown on the
    DevExpress options menu. At the time of this writing, they are:
    Basic, C/C++, CSharp, HTML, JavaScript, Plain Text, and XML. 
    ![]({{ site.url }}/images/20100922languages.png)
-   **Version property**: Return the assembly version information.

There are other properties you can override to return additional
information, but these pretty much handle the stuff that shows up in the
"About" box.

**Override the BuildDefenition method**. The "BuildDefenition" method
(yes, it is misspelled) is responsible for defining which assemblies
make up your complete product. For the purposes of this tutorial it's
just the one assembly, which makes it easy. For each assembly, you call
the "DefinePlugIn" method and pass in the string name of the assembly
(the constant string you defined earlier):

    protected override void BuildDefenition()
    {
      this.DefinePlugIn(PluginAssemblyName);
    }

**Override the GetImage method**. This is the method that grabs the
embedded logo image and returns it for display in the "About" box. It's
a pretty simple two-line implementation where you get the embedded
resource stream from your assembly and convert it to a bitmap, like
this:

    public override System.Drawing.Image GetImage()
    {
      Assembly current = typeof(About).Assembly;
      return new System.Drawing.Bitmap(current.GetManifestResourceStream(LogoPath));
    }

That's all you have to do for the ProductModule. The last thing you have
to do is mark your assembly so DXCore knows to look for your
ProductModule.

**Add a DXCoreProductAttribute to your assembly**. The
DXCoreProductAttribute points to your ProductModule so the "About" box
knows what to look for. Really simple:

    [assembly: DXCoreProduct(typeof(ProductModuleDemo.About))]

**That's it!** Now fire up Visual Studio with your plugin in place and
you should see your product information - with your logo, version,
description, etc. - all in the DevExpress "About" box.

![]({{ site.url }}/images/20100922about3.png)

I've got a solution you can download with a working demo in it so you
can see what the complete package looks like:

[[ProductModuleDemo.zip
(11KB)](https://onedrive.live.com/redir?resid=C2CB832A5EC9B707!45330&authkey=!AJLihr45GiDblb0&ithint=file%2czip)]

Hopefully this will help you larger plugin developers to make some
really cool "official" DXCore products!

