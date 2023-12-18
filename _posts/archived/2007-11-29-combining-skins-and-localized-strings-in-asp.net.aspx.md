---
layout: post
title: "Combining Skins and Localized Strings in ASP.NET"
date: 2007-11-29 -0800
comments: true
disqus_identifier: 1311
tags: [gists,aspnet,dotnet]
---
Let's say you have some text on your web site that has an image inline.
Something like this:

> Fields with a
> ![!]({{ site.url }}/images/20071129failedvalidation1.gif) icon
> indicate failed validation.

You've seen that before.  You've probably done that before.  Now let's
say you're using [ASP.NET themes and
skins](http://msdn2.microsoft.com/en-us/library/ykzx33wh.aspx) to
control your look and feel, and that icon is different based on your
theme.  It might change to be:

> Fields with a
> ![!]({{ site.url }}/images/20071129failedvalidation2.gif) icon
> indicate failed validation.

You could have some ASPX code that handles that with the SkinID of the
image, right?

> `Fields with a <asp:Image ID="icon" runat="server" SkinID="validationIcon" /> icon indicate failed validation.`

Okay, that works acceptably, provided your skin defines an Image that
has a SkinID "validationIcon."  But you're a savvy ASP.NET developer and
you know better than to put literal strings like that right in your web
application - you put your strings in resx files and look them up at
runtime so your app can be localized.  Now what?

There are a few ideas you could try, but they don't work (or not well):

- **String.Format** - You could leave a `{0}` in the page text and try
    to String.Format the image into place.  That might work if you
    weren't skinning, but you need to take advantage of ASP.NET skins...
    so that won't work.
- **Client-side script** - You could try some client-side script to
    render the image to a hidden place on the page and then place it
    into a `<span />` or something in in the instructions, but that's
    kind of painful.
- **Break the text up into separate controls** - You could make the
    text three controls: the text before the image, the image, and the
    text after the image.  This could become hard to manage from a
    localization perspective (what if there isn't any text after the
    image?) and it's not terribly flexible.

The answer:
**[ParseControl](http://msdn2.microsoft.com/en-us/library/kz3ffe28.aspx)**.

The
**[System.Web.UI.Page](http://msdn2.microsoft.com/En-US/library/system.web.ui.page.aspx)**
class has a **ParseControl** method on it that it inherits from
**TemplateControl**.  You can use this to your advantage - just put the
markup inline into your resource string and use ParseControl method to
create a control hierarchy on the fly.  Then just swap the parsed
control hierarchy into your page where you want the text to display.
Put a Literal in your ASPX and do your string lookup...

`<asp:Literal ID="pageText" runat="server" Text="<%$Resources: MyResources, PageText %>"/>`

And in your resx file, put the entire text, *including the image
markup*:

```xml
<data name="PageText" xml:space="preserve">
  <value>Fields with a &lt;asp:Image ID="icon" runat="server" SkinID="validationIcon" /&gt; indicate failed validation.</value>
</data>`
```

See how that looks just like ASPX page markup?  Perfect.  Now in the
codebehind of your page class, replace the Literal with the control
hierarchy that gets parsed from the text in that very Literal:

```csharp
public partial class MyPage : System.Web.UI.Page
{
  protected void Page_Load(object sender, EventArgs e)
  {
    Control parsed = this.ParseControl(this.pageText.Text);
    Control parent = this.pageText.Parent;
    int index = parent.Controls.IndexOf(this.pageText);
    parent.Controls.AddAt(index, parsed);
    parent.Controls.Remove(this.pageText);
  }
}
```

In that example code, we:

- Parse the text that got looked up from resources into a control
    hierarchy.  This lets us account for localization while still
    providing the inline themed icon we're looking for.
- Grab the parent of the original control.  This is important because
    you need to insert the parsed control hierarchy into the proper spot
    in the control tree.
- Find the exact location of the original control in the parent's
    control structure.  This tells us where to put the parsed control
    hierarchy.
- Insert the parsed control hierarchy into the proper spot.
- Remove the original control from the hierarchy - we've replaced it,
    so it's no longer needed.

Pretty nifty, eh?  There are lots of other things you might want to
consider if you do this, but I'll leave them as "an exercise for the
reader," so to speak:

- The example replaces the control with the parsed hierarchy; you
    might instead wish to add the parsed hierarchy as a child of the
    control you're "replacing."
- If you use the same text twice in the same page, you may end up with
    control naming clashes; you might want to wrap the parsed control
    hierarchy in a naming container to avoid that.
- You probably don't want to repeat this code over and over in every
    page; you'd want to have a single service class that does this for
    you.

A tiny word of warning:  you probably don't want to do this on every
single string you localize. It's not super expensive, but it isn't
necessarily "free," either.  Here's the timing from trace output - you
can see the obvious difference in the amount of time the page Load event
(where I'm doing this) takes vs. the other events.

![Timings for parsing inline
controls.]({{ site.url }}/images/20071129parsetimings.gif)

It's only ~0.01 seconds, but you wouldn't want to, say, put this in the
middle of a big databinding block.
