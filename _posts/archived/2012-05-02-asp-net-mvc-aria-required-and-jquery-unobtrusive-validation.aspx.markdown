---
layout: post
title: "ASP.NET MVC, aria-required, and jQuery Unobtrusive Validation"
date: 2012-05-02 -0800
comments: true
disqus_identifier: 1780
tags: [aspnet,javascript]
---
I saw [this interesting
article](https://blogs.msdn.com/b/stuartleeks/archive/2012/05/01/asp-net-mvc-adding-aria-required-attribute-for-required-fields.aspx?Redirected=true)
about using model metadata in ASP.NET MVC to add the `aria-required`
attribute to required input fields. The approaches there are all totally
valid and work great if you have the requirement to add the attribute
*on the server-side*.

However, if you're using jQuery unobtrusive validation, you've already
got some metadata you can use *from the client side*. Required fields
all get the `data-val-required` attribute associated with them:

    <input
      data-val="true"
      data-val-required="This is a required field."
      id="RequiredField"
      name="RequiredField"
      type="text"
      value="" />

The attribute only exists on required fields. With that, it's easy
enough to jQuery your way to freedom and leisure:

    $(function () {
      $('[data-val-required]').attr('aria-required', true);
    });

...and now all of your required fields have the appropriate ARIA
attribute.

