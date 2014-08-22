---
layout: post
title: "Unfortunate Things with JSON, jQuery UI Datepicker, and Dates"
date: 2013-02-06 -0800
comments: true
disqus_identifier: 1808
tags: [Web Development]
---
I’m trying to write an HtmlHelper extension that lets you dump out
options that build a [jQuery UI
datepicker](http://jqueryui.com/datepicker/) on the client. (I know
there are some of these out there, but for various reasons I won’t get
into… I get to make one, too.)

Something that will let me do this:

`   `

@Html.DatePickerFor(m =\> m.SomeDate);

In doing that, I’ve uncovered a lot of frustration around getting the
options specified on the server over to the client and working in a
consistent format.

-   **JSON date serialization continues to be a joke.** I know there’s
    no date support, but it means you get to roll your own, [even if
    several folks say they’re “standardizing” on
    something](http://www.hanselman.com/blog/OnTheNightmareThatIsJSONDatesPlusJSONNETAndASPNETWebAPI.aspx).
    [jQuery.parseJSON](http://api.jquery.com/jQuery.parseJSON/) doesn’t
    seem to support any sort of date from what I can tell, which means
    you get into custom serialization/deserialization or using some
    third party utility. I ended up using the Microsoft
    [Sys.Serialization.JavaScriptSerializer](http://msdn.microsoft.com/en-us/library/bb310857%28v=vs.100%29.aspx)
    because I’m using a compatible mechanism on the server and perf
    isn’t really a necessity given you’ve only got a couple of date
    pickers on a page generally, each of which only have a couple of
    date-oriented options. 
-   **jQuery UI datepicker has its own date formatting mechanism**. It
    doesn’t use the same format strings as .NET, sprintf, strftime, or
    anything else I can figure. Same goes for parsing. That means
    integration with validation (or other stuff that needs to get the
    date on the client) is kind of painful. It also means you either end
    up [writing crazy date format
    converters](http://www.rajeeshcv.com/post/details/31/jqueryui-datepicker-in-asp-net-mvc)
    or you replace the date parsing/formatting wholesale. I ended up
    writing tiny proxy methods that make use of [the Microsoft
    parsing/formatting
    extensions](http://msdn.microsoft.com/en-us/library/bb310850%28v=vs.100%29.aspx)
    because then I can also let the default MVC model binder do whatever
    it needs to do in a locale-aware manner without having to
    special-case stuff. 
-   **jQuery UI datepicker localization is lacking.** In .NET resources,
    you have this sort of fallback mechanism where “en-US” falls back to
    “en” which falls back to invariant culture. You provide the most
    specific culture, fallback handles the rest. Not so with the jQuery
    UI datepicker. You have to sort of “know” whether the specific
    culture is supported and/or the general culture and set it directly
    yourself. This, of course, means dates from the server
    (String.Format style) will potentially be inconsistent with dates
    formatted on the client side. I ended up generating all of the
    localized options on the server and piping them to the client rather
    than using the script-based localization. 
-   **jQuery.data() hates camelCase attributes.** Yeah, I know HTML
    attributes are all supposed to be lowercase. But try this with
    jQuery 1.9.0: Set up an HTML element like this: 
    `<div id=”test” data-someDataHere=”1”>Content</div>       `now try
    and get that using jQuery.data(): 
    `var data = $(“#test”).data().someDataHere;` 
    It won’t work. You’ll get some sort of exception down in the bowels
    of things because it’s looking for an attribute that’s all
    lower-case-dashes like `data-some-data-here `rather than the actual
    attribute name.

Anyway, I got to find these through experience so hopefully it’ll help
others save some time.

