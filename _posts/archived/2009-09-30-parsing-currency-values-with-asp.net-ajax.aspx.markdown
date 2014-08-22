---
layout: post
title: "Parsing Currency Values with ASP.NET AJAX"
date: 2009-09-30 -0800
comments: true
disqus_identifier: 1570
tags: [Web Development,Code Snippets]
---
I had to parse a culture-sensitive currency value from a string and
couldn't figure out how to do it. I'm using ASP.NET AJAX to do
`String.localeFormat("{0:c}", value)` for writing a currency value to a
textbox, but getting it back out... not so easy. The
`Number.parseLocale` extension provided with ASP.NET AJAX is cool for
parsing out numbers in a culture-sensitive fashion... if they don't have
a currency symbol.

So, time to hook that up. Here's what I came out with:

    Number.parseCurrency = function Number$parseCurrency(str) {  /// <summary>  /// Parses a string containing a culture-sensitive currency value into a number.  /// </summary>  /// <param name="str" type="String">  /// The numeric string with optional currency symbol to convert into a number.  /// </param>  /// <returns type="Number" />  var currencySymbol = Sys.CultureInfo.CurrentCulture.numberFormat.CurrencySymbol;  var numberOnly = str.replace(/\s+/g, '').replace(eval("/\\" + currencySymbol + "/g"), '');  var parsed = Number.parseLocale(numberOnly);  if (isNaN(parsed)) {    // Try all 5 possible negative number formats.    var customCi = Sys.CultureInfo.InvariantCulture;    for (var i = 0; i < 5; i++) {      customCi.numberFormat.NumberNegativePattern = i;      parsed = Number._parse(numberOnly, customCi);      if (!isNaN(parsed)) {        break;      }    }  }  return parsed;}

What it's doing:

1.  Get the currency symbol for the current culture.
2.  Take the currency-formatted string and remove all whitespace and
    that currency symbol. Now you have a number that is either positive
    or ostensibly adheres to one of the known negative number formats.
3.  Parse that string in a culture-sensitive fashion into a number.
    Usually this will work straight-off. Unfortunately, the negative
    currency format can sometimes differ from the negative number
    format. For example, a negative number might be `-1.23`, but a
    negative currency format might be like `($1.23)`. So if the parsing
    comes back as not-a-number, chances are that's what you're hitting.
4.  If the parsed value comes back as not-a-number, we know there are
    five pre-defined negative number formats that are possible in
    ASP.NET AJAX: 
     `["(n)","-n","- n","n-","n -"]` 
     For each of those possible formats...
    1.  Create a temporary culture, based on the Invariant culture, that
        uses the selected negative number pattern. (When you ask for the
        Invariant culture it actually creates a brand new instance every
        time, so doing this won't change the built-in Invariant
        culture.)
    2.  Try to manually parse the number given your custom culture.
    3.  If it succeeded, return that value.

At the end of all that if you still come out with NaN, it's not a
currency value.

If someone knows a better way to do this, I'm all ears.

If you want it, go for it. YMMV, no warranty expressed nor implied. If
you find a defect, post to the comments and I'll update.

