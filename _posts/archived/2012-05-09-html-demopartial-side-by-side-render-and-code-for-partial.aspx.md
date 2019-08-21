---
layout: post
title: "Html.DemoPartial - Side-by-Side Render and Code for Partial Views"
date: 2012-05-09 -0800
comments: true
disqus_identifier: 1781
tags: [net,gists,aspnet,csharp]
---
I was working on an ASP.NET MVC site for demonstrating some internal concepts recently. One of the things I wanted to show was how to use some HtmlHelper extension methods. I wanted the viewer to be able to see the rendered output and then flip to see the code, sort of like how you see in [snazzy demos like the DevExpress MVC Extensions](http://demos.devexpress.com/MVC/).

Here's a little screencast/demo of what I'm talking about.

Unable to display content. Adobe Flash is required.

So... how do you do that? Here's how it plays out:

-   The tabs are [jQuery UI](http://jqueryui.com/).
-   The syntax highlighting is [SyntaxHighlighter](http://alexgorbatchev.com/SyntaxHighlighter/).
-   The HTML is rendered with a special HtmlHelper extension method `DemoPartial` that I'll show you how to write.

The usage is really nice – you put your demo code into a partial view and then render it like this:

`@Html.DemoPartial("MyDemoPartialView")`

First, I'll warn you... **I do a little bit of crazy and totally unsupported reflection work in here** because there's some stuff in ASP.NET MVC that I really wish was public. But since it's not... there's some hackery.

**I wrote this using MVC 3**. I won't guarantee that I'll be keeping this article up to date with future versions of MVC, and future versions may make the reflection work obsolete. You're on your own for adapting it to the future.

On with the show!

First, let's set up the view that will be housing our demos. You'll need to include...

-   jQuery (JS)
-   jQuery UI (JS and CSS)
-   SyntaxHighlighter (JS and CSS)
-   SyntaxHighlighter "brush" scripts for XML/HTML and Razor (JS)

You'll also need a little bit of startup script to get the tabs running. The base view will look like this:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>My Demo Page</title>
  <link href="@Url.Content("~/Content/Site.css")" rel="stylesheet" type="text/css" />
  <link href="@Url.Content("~/Content/themes/smoothness/jquery-ui.css")" rel="stylesheet" type="text/css" />
  <link href="@Url.Content("~/Content/shCore.css")" rel="stylesheet" type="text/css" />
  <link href="@Url.Content("~/Content/shThemeDefault.css")" rel="stylesheet" type="text/css" />
  <script src="@Url.Content("~/Scripts/jquery-1.5.1.min.js")" type="text/javascript"></script>
  <script src="@Url.Content("~/Scripts/jquery-ui-1.8.19.min.js")" type="text/javascript"></script>
  <script src="@Url.Content("~/Scripts/shCore.js")" type="text/javascript"></script>
  <script src="@Url.Content("~/Scripts/shBrushRazor.js")" type="text/javascript"></script>
  <script src="@Url.Content("~/Scripts/shBrushXml.js")" type="text/javascript"></script>
  <script type="text/javascript">
    $(function () {
      // Initialize the demo/code tabs on the page, if any.
      $(".demo-tabs").tabs();

      // Execute syntax highlighting.
      SyntaxHighlighter.all();
    });
  </script>
</head>

<body>
  <h1>My Demo Page</h1>
  <!-- Here's where the DemoPartial calls go. -->
</body>
</html>
```

**One thing you may get stuck on is the SyntaxHighlighter "brush" script for Razor.** "Brushes" are the way that the SyntaxHighlighter script knows what is a keyword, what's a constant, and so on, so it knows what to highlight. There isn't one by default for Razor. I cobbled one together on my own based on a copy/paste/modify on the shBrushXml.js brush that deals with XML and HTML. You can learn [how to create a custom brush on the SyntaxHighlighter site](http://alexgorbatchev.com/SyntaxHighlighter/manual/brushes/). **There's a download link at the bottom of this entry** so you can grab my totally unsupported, not entirely complete, you're-on-your-own-if-you-use-this brush for Razor.

Now that you have your page, you need the DemoPartial extension method.

First, create your static class for extension methods as well as your DemoPartial extension. For mine, I used the same overrides as the standard Html.Partial extension so I'd have feature-parity.

```csharp
public static class DemoHtmlExtensions
{
  public static MvcHtmlString DemoPartial(
    this HtmlHelper htmlHelper,
    string partialViewName)
  {
    return htmlHelper.DemoPartial(partialViewName, null, htmlHelper.ViewData);
  }

  public static MvcHtmlString DemoPartial(
    this HtmlHelper htmlHelper,
    string partialViewName,
    object model)
  {
    return htmlHelper.DemoPartial(partialViewName, model, htmlHelper.ViewData);
  }

  public static MvcHtmlString DemoPartial(
    this HtmlHelper htmlHelper,
    string partialViewName,
    ViewDataDictionary viewData)
  {
    return htmlHelper.DemoPartial(partialViewName, null, viewData);
  }

  public static MvcHtmlString DemoPartial(
    this HtmlHelper htmlHelper,
    string partialViewName,
    object model,
    ViewDataDictionary viewData,
    bool codeOnly = false)
  {
    // Here's the important bit.
  }
}
```

I marked the overload that's interesting - the one with the most parameters. You'll also notice the optional `codeOnly` parameter – I'll explain that in a minute.

**The first thing you have to do is generate a unique ID** for your set of demo/code tabs. It needs to be unique so you can use the extension method multiple times on the page. The unique ID is used in generating HTML for the jQuery UI tabs, which need some unique link targets.

```csharp
var tabSetName = HtmlHelper.GenerateIdFromName(
  String.Format(
    CultureInfo.InvariantCulture,
    "{0}-{1}",
    partialViewName,
    Guid.NewGuid()));
```

I realize that's sort of reaching back into our ASP.NET web forms past, but I couldn't think of a much better way without forcing the consumer to do that unique ID on their own. In the end, I wasn't too worried about it.

**Let's create a StringWriter where we can generate our output.** We'll
write the demo tab headers out first:

```csharp
using (var writer = new StringWriter(CultureInfo.InvariantCulture))
{
  writer.WriteLine(
    "<div class=\"demo-tabs\"><ul><li><a href=\"#{0}-1\">Demo</a></li><li><a href=\"#{0}-2\">Code</a></li></ul><div id=\"{0}-1\">",
    tabSetName);
}
```

What that does is:

-   Open a container with a special class of "demo-tabs" –
    `<div class="demo-tabs">`
-   Create an unordered list of two items. jQuery UI will turn these into the tab headers. This is where that unique ID comes into play – each tab contains a link to a unique anchor in the page.
    -   The first tab links to the demo part ("live render").
    -   The second tab links to the code part ("highlighted syntax").

Next we need to **write out the demo tab contents**. That's the part with the live render of the demo. It looks like this:

```csharp
if (codeOnly)
{
  writer.WriteLine("[View included for code only; switch to the code tab.]");
}
else
{
  writer.WriteLine(htmlHelper.Partial(partialViewName, model, viewData));
}
```

**Remember that `codeOnly` optional parameter?** That's so we can insert demos of things that may not have UI to them. It's an easy way to, say, show how a helper function works – include it via a partial demo view.

If we don't want a "live render" (we want "code only") we'll render a placeholder text block in the demo tab; otherwise we'll include the live render of the partial view in our output.

Next we need to **close the demo tab contents and start the code tab contents**:

```csharp
writer.WriteLine("</div><div id=\"{0}-2\">", tabSetName);
```

Here's where we almost begin to touch on that tricky reflection I was talking about.

**The next step is obviously to render the actual code into the view.** That means getting the partial view from the registered set of view engines.

I made a second extension method `FindPartialViewFile` that does exactly that. I will show you that in a minute. **For now, let's just pretend it exists** and works.

We need to:

-   Get the view file.
-   Determine which syntax highlighter to use (Razor or HTML/ASPX).
-   HTML-encode the view file contents and dump it to the code tab.

That looks like this:

```csharp
var partialViewFile = ViewEngines.Engines.FindPartialViewFile(
  htmlHelper.ViewContext.Controller.ControllerContext,
  partialViewName);
if (partialViewFile != null)
{
  string brush = null;
  switch (Path.GetExtension(partialViewFile.Name).ToUpperInvariant())
  {
    case ".CSHTML":
      brush = "razor";
      break;
    default:
      brush = "html";
      break;
  }
  writer.Write("<pre class=\"brush: {0}\">", brush);
  using (var reader = new StreamReader(partialViewFile.Open()))
  {
    writer.WriteLine(htmlHelper.Encode(reader.ReadToEnd()));
  }
  writer.WriteLine("</pre>");
}
else
{
  writer.WriteLine("<p>[Demo code file not available. Please see original source.]</p>");
}
```

First we use the FindPartialViewFile extension (which I'll show you in a minute) to locate the virtual file containing the view code. If the file comes back null, it means we can't locate the file so we'll render a little placeholder text. If it can be found, we figure out which syntax it is by using the file extension – if it isn't a .cshtml file, we fall back to use the standard HTML highlighting. Finally, we read the contents of the partial view, HTML-encode it, and dump it out to the code tab contents.

The last thing to do here is close the code tab contents and the overall tab container, then return the whole mess.

```csharp
writer.WriteLine("</div></div>");
return MvcHtmlString.Create(writer.ToString());
```

**The whole thing all put together nicely is available below in the download.**

OK, so now for the tricky bit – locating the virtual file containing the view code.

You'll notice I say "the virtual file" and not "the physical file."That's because ASP.NET uses a mechanism called [VirtualPathProvider](http://msdn.microsoft.com/en-us/library/system.web.hosting.virtualpathprovider.aspx) to abstract itself away from the filesystem. You can serve files from the disk... or embedded resources... or a zip file... or a database... or wherever else.

**The default ASP.NET MVC view engines (web forms, Razor) both interface with the VirtualPathProvider to do their file location.** They do this by deriving from a common [VirtualPathProviderViewEngine class](http://msdn.microsoft.com/en-us/library/system.web.mvc.virtualpathproviderviewengine.aspx)... and this is what I count on to do my crazy reflection-based view location magic.

Deep in the bowels of VirtualPathProviderViewEngine is a private method called `GetPath` that actually gets the virtual path to a view or partial view if the view engine is able to locate it. There are a bajillion undocumented parameters on this sucker (because it's private) but **it's the only way to actually tie a view name to a virtual file path**. So... we need access.

**First, create a new extension method class.** We're going to extend ViewEngineCollection so we can do that call you saw earlier. I don't like jamming a bunch of extension methods for different things into the same class, so I didn't.

We can get a reference to that `GetPath` method like so...

```csharp
private static readonly MethodInfo _getPathMethod =
  typeof(VirtualPathProviderViewEngine)
    .GetMethod("GetPath", BindingFlags.Instance | BindingFlags.NonPublic);
```

**You're now in ridiculously unsupported territory.**

To make it easier on ourselves to call this thing, **let's create a delegate with the same signature as `GetPath`**. It's long, it's ugly... it is what it is.

```csharp
private delegate string VirtualPathProviderViewEngineGetPath(
  ControllerContext controllerContext,
  string[] locations,
  string[] areaLocations,
  string locationsPropertyName,
  string name,
  string controllerName,
  string cacheKeyPrefix,
  bool useCache,
  out string[] searchedLocations);
```

Yeah, that's the signature. You can double-check in Reflector if you want. I'll wait.

Now that we have our private method reference and our convenience delegate, we need to...

-   Iterate through all of the view engines in the collection.
-   For each engine that's a VirtualPathProviderViewEngine, call the GetPath method on the engine.
    -   If it returns null, move to the next engine – the view wasn't found.
    -   If it returns a string, use the VirtualPathProvider to get a reference to the virtual file and return that.

In code, it looks like this:

```csharp
foreach (var viewEngine in viewEngines)
{
  var vppEngine = viewEngine as VirtualPathProviderViewEngine;
  if (vppEngine == null)
  {
    continue;
  }

  var getPathDelegate = (VirtualPathProviderViewEngineGetPath)Delegate.CreateDelegate(
    typeof(VirtualPathProviderViewEngineGetPath),
    vppEngine,
    _getPathMethod);
  string[] searchedLocations = null;
  var path = getPathDelegate(
    controllerContext,
    vppEngine.PartialViewLocationFormats,
    vppEngine.AreaPartialViewLocationFormats,
    "PartialViewLocationFormats",
    partialViewName,
    controllerContext.RouteData.GetRequiredString("controller"),
    "Partial",
    false,
    out searchedLocations);

  if (!String.IsNullOrEmpty(path))
  {
    return HostingEnvironment.VirtualPathProvider.GetFile(path);
  }
}

return null;
```

I got the list of parameters by checking out the MVC code for this thing. There really are hardcoded strings like that going in. They seem to be used as cache keys and such. In the end, you get the path to the partial view or you don't, and that's what matters.

**Whew! Now put that together with the DemoPartial extension and you're in business!**

-   Put your demo code into a standalone partial view.
-   In your main view, call Html.DemoPartial() and pass in the name of your partial view (and any other data). Just like Html.Partial only tabified.
-   Revel in how awesome your demo site is and how easy it is to maintain.

Below is the download for the complete source and my cobbled-up Razor syntax highlighter brush. **Standard disclaimers apply:**

-   It's free, and you get what you pay for.
-   Totally unsupported.
-   Works on my box.
-   Performance not guaranteed.
-   No warranty expressed or implied.
-   Don't say I didn't warn you.
-   Good luck and have fun.

[[**Download Source** – DemoHtmlExtensions, ViewEngineCollectionExtensions, Razor Syntax Highlighter Brush, Stub Main View – 5KB]({{ site.url }}/downloads/DemoPartial.zip)]
