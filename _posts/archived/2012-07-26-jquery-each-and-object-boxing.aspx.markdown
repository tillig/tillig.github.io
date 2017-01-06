---
layout: post
title: "jQuery.each and Object Boxing"
date: 2012-07-26 -0800
comments: true
disqus_identifier: 1786
tags: [javascript,gists]
---
I just spent like six hours trying to figure this out, so profit from my
experience.

I have some custom code wiring up [jQuery Validation](http://docs.jquery.com/Plugins/Validation) in a form and for some reason, [the jQuery "html" method](http://api.jquery.com/html/) was causing a "HIERARCHY_REQUEST_ERR: DOM Exception 3" whenever validation errors were being displayed. After banging my head against it for a while and getting some help from a co-worker, we found it came down to [the `$.each` iterator](http://api.jquery.com/jQuery.each/).

I was compiling up a list of error messages and using the `$.each` to add them to settings for a jQuery validator. It looked something like this:

```javascript
var parsed = {
  required: "A is required",
  notEqual: "A must not equal B"
};
$.each(parsed, function(rulename){
  options.messages[prefix + rulename] = this;
});
```

As you can see, I wasn't doing a straight extension - I needed to add a prefix to the hash key, so I iterated through. **The gotcha is that `this` in the iterator loop isn't actually literally the same as the value of the item.**

More explicitly:

```javascript
var parsed = {
  required: "A is required",
  notEqual: "A must not equal B"
};
// typeof parsed.required === "string"

$.each(parsed, function(rulename){
  // typeof this === "object"
  options.messages[prefix + rulename] = this;
});
```

That type conversion was what was causing the problem. Way down the
line, after wiring everything up to jQuery Validation, the validator
would try to do something roughly like this:

```javascript
$("<span />").html(message)
```

At the time of execution, `message` wasn't a string, it was an object, so the DOM threw a tantrum and resulted in "HIERARCHY_REQUEST_ERR: DOM Exception 3".

**The answer is to not use `this` in the iterator.** Instead, provide the second parameter to the iterator function that brings along with it the original item value:

```javascript
var parsed = {
  required: "A is required",
  notEqual: "A must not equal B"
};
$.each(parsed, function(rulename, message){
  options.messages[prefix + rulename] = message;
});
```

That way the string value isn't boxed into an object and you won't lose
the type information.

