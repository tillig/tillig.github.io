---
layout: post
title: "Replace jQuery Validation Message Formatting with ASP.NET AJAX String.format()"
date: 2009-09-29 -0800
comments: true
disqus_identifier: 1568
tags: [Web Development,Code Snippets]
---
I'm working on a site where we're using both ASP.NET AJAX and jQuery to
get things done. This includes [jQuery
Validation](http://bassistance.de/jquery-plugins/jquery-plugin-validation/)
for client-side validation functionality.

One of the things that comes with jQuery Validation is a
[\$.validator.format
method](http://docs.jquery.com/Plugins/Validation/jQuery.validator.format)
that replaces the {n} style parameters in a string with arguments -
basically, a very lightweight
[String.format](http://www.asp.net/AJAX/Documentation/Live/ClientReference/Global/JavascriptTypeExtensions/StringTypeExt/StringFormatFunc.aspx).

ASP.NET AJAX provides a really nice implementation of String.format that
is pretty full-featured and understands format strings. For example, you
can do String.format("{0:d}", mydate) to format a date in short date
format. Snazzy stuff. Unfortunately, the jQuery Validation one isn't
that robust... so I figured I'd marry the two worlds. Allow you to still
use the \$.validator.format method, just like you always do, but under
the covers it'll pass through to ASP.NET AJAX to do the
replacement/formatting.

Make sure you've got the ASP.NET AJAX, jQuery, and jQuery Validation
script libraries registered in your page, then do this:

    (function($) {  if ($.validator) {    $.validator.format = function(source, params) {      if (arguments.length == 1)        return function() {          var args = $.makeArray(arguments);          args.unshift(source);          return $.validator.format.apply(this, args);        };      if (arguments.length > 2 && params.constructor != Array) {        params = $.makeArray(arguments).slice(1);      }      if (params.constructor != Array) {        params = [params];      }      var toEval = "String.localeFormat(source, __);";      var paramEval = new Array();      for (var i = 0; i < params.length; i++) {        Array.add(paramEval, "params[" + i + "]");      }      toEval = toEval.replace(/__/, paramEval.join(","));      return eval(toEval);    };  }})(jQuery);

Basically we keep the currying bit that comes out of the box with
\$.validator.format but replace the bit that does the replacement work
with the ASP.NET AJAX String.format. That should replace the existing
\$.validator.format method with a
syntactically-and-functionally-equivalent, but slightly more robust,
implementation.

**UPDATE 9/30/09**: The original version didn't work if there was more
than one parameter value you were validating against, like in a range
where there's a min and a max value. The new version takes that into
account. The crazy eval junk at the end is because you can't do
String.localeFormat("...", Array) - the string formatting in ASP.NET
AJAX doesn't like it if you pass an array rather than an explicit list
of arguments. The eval thing dynamically builds a valid statement like
String.localeFormat(source, params[0], params[1]..., params[n]) and
evaluates that so it works.

