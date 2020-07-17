---
layout: post
title: "Class Descriptions According To Cajun Man"
date: 2004-10-13 -0800
comments: true
disqus_identifier: 676
tags: [humor,net]
---
I'm not sure how my mind works or why it thinks of these things. Maybe
I'm thinking of work too much. Thing is, I've had to explain this
"Navigation Service" class that we're working on more times than I care
to count. (The Navigation Service is a class that helps in providing
navigational menus, breadcrumb trails, and other navigational artifacts
by maintaining an object hierarchy representing the site... basically.)

 So I was on the way home last night and decided it might be described
best by [Adam Sandler's "Cajun
Man"](http://www.amazon.com/exec/obidos/ASIN/1573627305/mhsvortex)
character:
> **Presenter:** The Navigation Service provides an object-oriented view
> of the site map, related links, and quick links for a site. You can
> use it to display, for example, a tree-view of the available pages for
> a site.
>
>  **Cajun Man:** Hierarchical presenta-*shawn*.
>
>  **Presenter:** The Navigation Service is accessed through a property
> available in the base page class. You could cache an instance of the
> Navigation Service class and then access that cached instance through
> the property on the page.
>
>  **Cajun Man:** Single-*tawn*.
>
>  **Presenter:** When getting a reference to the Navigation Service,
> you don't actually create the instance directly. Instead, call the
> static "GetNavigationService" method and it will get an instance for
> you.
>
>  **Cajun Man:** Factory crea-*shawn*.
>
>  **Presenter:** What the Navigation Service does is it takes the
> navigation.config file and reads it into an object model based on the
> file schema.
>
>  **Cajun Man:** XML deserializa-*shawn*.
>
>  **Presenter:** Then it does some manual processing to make the
> objects just a little bit "smarter" than that, filling in calculated
> values and such.
>
>  **Cajun Man:** Initializa-*shawn*.
>
>  **Presenter:** If you have a bunch of, for example, "Item" elements
> in the "Site," those will come out in the Navigation Service as a...
>
>  **Cajun Man:** Strongly-typed collec-*shawn*.
>
>  **Presenter:** Right. And if there are no elements in a collection,
> you end up with...
>
>  **Cajun Man:** Empty collec-*shawn*.
>
>  **Presenter:** Well, no... actually you get a null value, though the
> Navigation Service could be updated to make any null collections be
> empty collections. That way you could just iterate over the collection
> rather than having to check for null all the time.
>
>  **Cajun Man:** No NullReferenceExcep-*shawn*.



 ...that's as far as I got before I made it home and my train of thought
was lost, but I think you see how it goes. While I'm nowhere near as
funny as Adam Sandler, maybe I can use this to explain (in a memorable
fashion) how this thing works. Heh.
