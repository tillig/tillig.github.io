---
layout: post
title: "The Importance of TypeId in ASP.NET MVC DataAnnotations Validation Attributes"
date: 2010-03-02 -0800
comments: true
disqus_identifier: 1622
tags: [.NET,Web Development]
---
Messing around with ASP.NET MVC 2.0 (in VS2010 RC1), specifically the
validation done with DataAnnotations, and created a simple no-op custom
validator attribute like this:

    [AttributeUsage(AttributeTargets.Class, AllowMultiple = true, Inherited = true)]
    public sealed class MyCustomAttribute : ValidationAttribute
    {
      public MyCustomAttribute()
        : base("Custom Error Message: {0}")
      {
      }

      public override bool IsValid(object value)
      {
        return true;
      }
    }

Similar to the way the sample "PropertiesMustMatchAttribute" is set up -
enabled on a class so you attach it to the model, not a property on the
model, and set so you can have more than one.

I then created a simple model that used it like this:

    [MyCustom]
    [MyCustom]
    [MyCustom]
    public class MyModel
    {
      public string SomeField { get; set; }
      public string OtherField { get; set; }
    }

Notice I'm using my custom attribute three times there.

I then set up a quick view to edit the model, enabled validation, and
put a breakpoint in the "IsValid" method on my attribute.

I ran the editor, hit the "save" button (to post the "edited" content
back and get validated) and **the call to my custom validation ran only
one time**.

You know what I missed? **I didn't
implement** [**TypeId**](http://msdn.microsoft.com/en-us/library/system.attribute.typeid.aspx).

This is documented as being a "unique identifier used to identify two
attributes of the same type." What's not said there is that if
DataAnnotations (or, at least, the MVC validation portion) comes across
two attributes of the same type, it'll only look at one of them. By
default, TypeId is just the type of the attribute, so when two
attributes of the same type are encountered, they're considered "the
same."

**If you set your AttributeUsage to AllowMultiple, you absolutely must
implement TypeId.**

You can see this implemented in the MVC "PropertiesMustMatchAttribute"
as a new object (so they're never identical). Updating my simple
attribute like this...

    [AttributeUsage(AttributeTargets.Class, AllowMultiple = true, Inherited = true)]
    public sealed class MyCustomAttribute : ValidationAttribute
    {
      public MyCustomAttribute()
        : base("Custom Error Message: {0}")
      {
      }

      public override bool IsValid(object value)
      {
        return true;
      }

      private object _typeId = new object();
      public override object TypeId
      {
        get
        {
          return this._typeId;
        }
      }
    }

...causes my custom attribute to run all three times as expected.

What's the use case for multiple attributes of the same type? In the
case of the "PropertiesMustMatchAttribute" sample, maybe you have a
model for registering a user - email, email confirmation, new password,
new password confirmation. You want to make sure the two email fields
match and the two password fields match. Two instances of one attribute,
but working on different fields. Without implementing TypeId, only one
of the validation checks will happen.

Once you get it working, sure, you can optimize some (for example, the
"PropertiesMustMatchAttribute" could store the names of the properties
being compared so if someone actually does try to run redundant
validation it won't happen), but that's left as an implementation
detail.

