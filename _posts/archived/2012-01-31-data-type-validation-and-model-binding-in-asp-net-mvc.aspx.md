---
layout: post
title: "Data Type Validation and Model Binding in ASP.NET MVC"
date: 2012-01-31 -0800
comments: true
disqus_identifier: 1765
tags: [dotnet,gists,aspnet,csharp]
---
When validating input in a web forms application, you need to [validate data types on the client and server side](http://msdn.microsoft.com/en-us/library/ie/ad548tzy.aspx) because you're working with text boxes and server controls. When you move to MVC, the [client-side validation is still an interesting problem](http://docs.jquery.com/Plugins/Validation#List_of_built-in_Validation_methods) to solve, but the server-side validation all happens as a by-product of model binding.

The [DefaultModelBinder](http://msdn.microsoft.com/en-us/library/system.web.mvc.defaultmodelbinder.aspx) has some special built-in provisions to handle data type parsing errors and automatically convert those into standardized model state errors.

If you're writing a custom model binder and you want to participate in this...

-   Get the value to parse from the value provider. If there is no value to parse, return null and you're done.
-   Create a ModelState object and set the Value property to the value you're about to parse.
-   Add the ModelState object to the incoming ModelBindingContext. -   Attempt to parse the value. If it's successful, great. Return the properly parsed value and you're done.
-   If you can't parse the value...
    -   Add a FormatException to the ModelState object.
    -   Return null.

A simple skeleton binder that does all that looks like this:

```csharp
using System;
using System.Web.Mvc;

namespace MyNamespace
{
  public class MyBinder : IModelBinder
  {
    public object BindModel(
      ControllerContext controllerContext,
      ModelBindingContext bindingContext)
    {
      var valueResult = bindingContext.ValueProvider.GetValue(bindingConext.ModelName);
      if(valueResult == null)
      {
        return null;
      }
      var modelState = new ModelState
      {
        Value = valueResult
      };
      bindingContext.ModelState.Add(bindingContext.ModelName, modelState);

      // Try to parse the value.
      object parsedValue = null;
      if(!TryParseValue(valueResult, out parsedValue)
      {
        // If you can't parse it, add a FormatException to the error list.
        modelState.Errors.Add(new FormatException());
      }

      // On success, return the parsed value; on fail, return null.
      return parsedValue;
    }
  }
}
```

**The key part of that is the FormatException.** After all is said and done, the DefaultModelBinder goes through the model state errors and finds all of the FormatExceptions that have been added. For each one it finds, it removes the FormatException and replaces it with a standardized message in the format:

`The value '{0}' is not valid for {1}.`

The {0} parameter is the original value result; the {1} parameter is the display name of the model/property being parsed.

**The question then becomes: How do you localize/customize the data type validation message?**

The DefaultModelBinder uses resources in the System.Web.Mvc assembly for its default set of error messages. There are two resource IDs to be aware of:

-   **PropertyValueInvalid**: The message for a value that couldn't be parsed and resulted in a FormatException. This gets a String.Format call on it where the first parameter is the attempted value and the second parameter is the name of the property. Default value: `The value '{0}' is not valid for {1}.`
-   **PropertyValueRequired**: The message for a value that wasn't available but is required, like a null sent in for an integer. No String.Format on this happens. Default value: `A value is required.`

**If you want to use your own strings, you need to set the**[**DefaultModelBinder.ResourceClassKey**](http://msdn.microsoft.com/en-us/library/system.web.mvc.defaultmodelbinder.resourceclasskey.aspx)**static property.**

`DefaultModelBinder.ResourceClassKey = "MyResources";`

Once you do that, whenever one of these resources is required, the DefaultModelBinder will use [HttpContext.GetGlobalResourceObject](http://msdn.microsoft.com/en-us/library/system.web.httpcontext.getglobalresourceobject.aspx) using the resource class key you provided and the ID noted earlier. Looking up the PropertyValueInvalid resource would effectively be a call to:

`HttpContext.GetGlobalResourceObject("MyResources", "PropertyValueInvalid");`

If you don't have the value in your resources, DefaultModelBinder will fall back and use the default version.

Unfortunately, **you can't change the resource IDs, the string formatting arguments, or anything else**... but at least you can change
the messages.
