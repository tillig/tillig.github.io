---
layout: post
title: "FluentValidation and MVC - From Server to Client"
date: 2013-04-17 -0800
comments: true
disqus_identifier: 1816
tags: [net,aspnet]
---
We do a lot of interesting stuff with
[FluentValidation](http://fluentvalidation.codeplex.com/) at work and
more than a few times I've had to give the whiteboard presentation of
how a server-side FluentValidation validator makes it to [jQuery
validation rules](http://docs.jquery.com/Plugins/Validation) on the
client and back. I figured it was probably time to just write it up so I
can refer folks as needed.

Let's start out with a simple model we want to validate. We'll carry
these examples with us in the walkthrough so you have something concrete
to tie back to.

    public class MyModel
    {
      public string Name { get; set; }
      public int Age { get; set; }
    }

On the server, we'd validate that model using FluentValidation by
implementing `FluentValidation.AbstractValidator<T>` like this:

    public class MyModelValidator : AbstractValidator<MyModel>
    {
        public MyModelValidator()
        {
          RuleFor(m => m.Name)
            .NotEmpty()
            .WithMessage("Please provide a name.");

          RuleFor(m => m.Age)
            .GreaterThan(21)
            .WithMessage("You must be over 21 to access this site.");
        }
    }

First let's look at the way rules are set up in FluentValidation. You'll
see that each call to `RuleFor` points to a property we want to
validate. Calling `RuleFor` sort of starts a "stack" of validators that
are associated with that property. Each method that adds a validation
(`NotEmpty`, `GreaterThan`) adds that validator to the "stack" and then
sets it as "active" so other extensions that modify behavior
(`WithMessage`) will know which validator they're modifying.

A more complex setup might look like this:

    RuleFor(m => m.Name)                        // Start a new validation "rule" with a set of validators attached
      .NotEmpty()                               // Add a NotEmptyValidator to the stack and make it "active"
      .WithMessage("Please provide a name.")    // Set the message for the NotEmptyValidator
      .Matches("[a-zA-Z]+")                     // Add a RegularExpressionValidator to the stack and make it "active"
      .WithMessage("Please use only letters."); // Set the message for the RegularExpressionValidator

In a server-side only scenario, when you validate an object each "rule"
gets iterated through and each validator associated with that "rule"
gets executed. More or less. There's a bit of complexity to it, but
that's a good way to explain it without getting into the weeds.

**ASP.NET MVC ships with an abstraction around model validation
that**[**starts with a
`ModelValidatorProvider`**](http://msdn.microsoft.com/en-us/library/system.web.mvc.modelvalidatorprovider.aspx)**.**
Out of the box, MVC has support for DataAnnotations attributes. ([Rachel
Appel has a great walkthrough of how that
works](http://rachelappel.com/asp-net-mvc/how-data-annotations-for-asp-net-mvc-validation-work/).)
From the name, you can guess that **what this does is *provide
validators for your models*.** When MVC wants to validate your model (or
determine how it's validated), it asks the set of registered
`ModelValidatorProvider `objects and they return the validators. It's
dumb when I say it out loud, but the class names start getting really
long and a little confusing, so I just wanted to bring this up now: if
you start getting confused, really *stop to read the name of the class
you're confused about*. It'll help, trust me, because they all start
sounding the same after a while.

FluentValidation has an associated FluentValidation.Mvc library that has
the MVC adapter components. In there is a
`FluentValidationModelValidatorProvider`. To get this hooked in, you
need to register that `FluentValidationModelValidatorProvider `with MVC
at application startup. The easiest way to do this is by calling
`FluentValidationModelValidatorProvider.Configure()`, which
automatically adds the provider to the list of available providers and
also lets you do some additional configuration as needed.

**Things you can do in
`FluentValidationModelValidatorProvider.Configure`**:

-   Specify the validator factory to use on the server to retrieve
    FluentValidation validators corresponding to models.
-   Add mappings for custom validators that map between the server-side
    FluentValidation validator and the MVC client-side validation logic.

**Right now we'll talk about the validator factory piece**. I'll get to
the custom validator mappings later.

As mentioned, when you run
`FluentValidationModelValidatorProvider.Configure()`, you can tell it
which `FluentValidation.IValidatorFactory `to use for mapping
server-side validators (like the `MyModelValidator`) to models (like
`MyModel`). Out of the box, FluentValidation ships with the
`FluentValidation.Attributes.AttributedValidatorFactory`. This factory
type lets you attach validators to your models with attributes, like
this:

    [Validator(typeof(MyModelValidator))]
    public class MyModel
    {
      // ...
    }

That's one way to go, but I find that to be somewhat inflexible. I also
don't like my code too closely tied together like that, so instead, in
MVC, I like to use the `DependencyResolver `to get my model-validator
mappings. FluentValidation doesn't ship with a factory that uses
`DependencyResolver`, but it's pretty easy to implement:

    public class DependencyResolverModelValidatorFactory : IValidatorFactory
    {
      public IValidator GetValidator(Type type)
      {
        if (type == null)
        {
          throw new ArgumentNullException("type");
        }
        return DependencyResolver.Current.GetService(typeof(IValidator<>).MakeGenericType(type)) as IValidator;
      }

      public IValidator<T> GetValidator<T>()
      {
        return DependencyResolver.Current.GetService<IValidator<T>>();
      }
    }

**Using that validator factory, you need to register your validators
with your chosen**`DependencyResolver `so that they're exposed as
`IValidator<T>` (like `IValidator<MyModel>`). Luckily
`AbstractValidator<T> `implements that interface, so you're set. In
[Autofac](https://autofac.googlecode.com) (my IoC container of choice)
the validator registration during container setup would look like...

    containerBuilder.RegisterType<MyModelValidator>().As<IValidator<MyModel>>();

To register the model validator factory with FluentValidation, we'd do
that during `FluentValidationModelValidatorProvider.Configure()` at
application startup, like this:

    FluentValidationModelValidatorProvider.Configure(
      provider =>
      {
        provider.ValidatorFactory = new DependencyResolverModelValidatorFactory();
      });

**Let's checkpoint.** Up to now we have:

-   **A custom validator** for our model.
-   **A validator factory** for FluentValidation that will tie our
    validator to our model using dependency resolution.
-   **FluentValidation configured in MVC** to be a source of model
    validations.

Next let's talk about **how the FluentValidation validators get their
results into the MVC `ModelState`** for server-side validation.

ASP.NET MVC has a class called `ModelValidator` that is used to abstract
away the concept of model validation. It's responsible for generating
the validation errors that end up in `ModelState` as well as the set of
client validation rules that define how the browser-side behavior gets
wired up. The ModelValidator class has two methods, each of which
corresponds to one of these responsibilities.

-   **Validate**: Executes server-side validation of the model and
    returns the list of results.
-   **GetClientValidationRules**: Gets metadata in the form of
    `ModelClientValidationRule` objects to send to the client so script
    can do client-side validation.

For DataAnnotations, there are implementations of
`ModelValidator `corresponding to each attribute. For FluentValidation,
there are `ModelValidator `implementations that correspond to each
server-side validation type. For example, looking at our
`MyModel.Name `property, we have a `NotEmptyValidator `attached to it.
That `NotEmptyValidator `maps to a
`FluentValidation.Mvc.RequiredFluentValidationPropertyValidator`. These
mappings are maintained by the `FluentValidationModelValidatorProvider`.
(Remember I said you could add custom mappings during the call to
Configure? This is what I was talking about.)

**When MVC needs the set of `ModelValidator `implementations associated
with a model, the basic process is this:**

-   The `ModelValidatorProviders.Providers.GetValidators` method is
    called. This iterates through the registered providers to get all
    the validators available. Eventually the
    `FluentValidationModelValidatorProvider `is queried.
-   The `FluentValidationModelValidatorProvider `uses the registered
    `IValidatorFactory `(`DependencyResolverModelValidatorFactory`) to
    get the FluentValidation validator (`MyModelValidator`) associated
    with the model (`MyModel`).
-   The `FluentValidationModelValidatorProvider `then looks at the rules
    associated with the property being validated (`MyModel.Name`) and
    converts each validator in the rule (`NotEmptyValidator`) into its
    mapped MVC `ModelValidator `type
    (`RequiredFluentValidationPropertyValidator`).
-   The list of mapped `ModelValidator `instances is returned to MVC for
    execution.

**Here's where it starts coming together.**

When you do an MVC HtmlHelper call to render a data entry field for a
model property, it looks something like this:

    @Html.TextBoxFor(m => m.Name)

Internally, during the textbox generation, a bit more happens under the
covers:

-   The input field HTML generation process calls
    `ModelValidatorProviders.Providers.GetValidators `for the field.
    (This is the process mentioned earlier.)
-   The `ModelValidator`(s) returned each have
    `GetClientValidationRules` called to get the set of
    `ModelClientValidationRule` data defining the client-side validation
    info.
-   The `ModelClientValidationRule `objects get converted to `data-val-`
    attributes that will be attached to the input field.

Using our example, if we did that `Html.TextBoxFor(m => m.Name)` call…

-   The `FluentValidationModelValidatorProvider `would, through the
    process mentioned earlier, yield a
    `RequiredFluentValidationPropertyValidator `corresponding to the
    `NotEmptyValidator `we're using on the `Name `field.
-   That `RequiredFluentValidationPropertyValidator `would have
    `GetClientValidationRules `called to get the client-side validation
    information. I happen to know that the
    `RequiredFluentValidationPropertyValidator `returns a
    `ModelValidationRequiredRule`.
-   Each of the `ModelClientValidationRule `objects (in this case, just
    the `ModelValidationRequiredRule`) would be converted to `data-val-`
    attributes on the textbox.

What's in a `ModelClientValidationRule `and how does it translate to
attributes?

Basically **each `ModelClientValidationRule `corresponds to a jQuery
validation type**. The `ModelValidationRequiredRule `is basically just a
pre-populated `ModelClientValidationRule `derivative that looks like
this:

    new ModelClientValidationRule
    {
      ValidationType = "required",
      ErrorMessage = "Please provide a name."
    }

The `ValidationType `corresponds to [the name of a jQuery validation
type](http://docs.jquery.com/Plugins/Validation#List_of_built-in_Validation_methods)
and the error message is the one we specified way back when we defined
our FluentValidation validator.

When that gets converted into data-val- attributes, it ends up looking
like this:

    <input type="text" ... data-val-required="Please provide a name." />

That's how the validation information gets from the server to the
client. Once it's there, it's time for script to pick it up.

**MVC uses jQuery validation** to execute the client-side validation. It
takes advantage of a library **jQuery Unobtrusive Validation** which is
used to parse the `data-val-` attributes into client-side logic. The
attributes fairly well correspond one-to-one with existing jQuery
validation rules. For example, `data-val-required` corresponds to [the
required() validation
method](http://docs.jquery.com/Plugins/Validation/Methods/required).
That jQuery Unobtrusive Validation library reads the attributes and maps
them (and their values) into jQuery validation actions that are attached
to the form. Standard jQuery validation takes it from there.

**The whole process for validating a submitted form is**:

-   The `Html.TextBoxFor `call gets the set of validators for the field
    and attaches the `data-val-` attributes to it using the process
    described earlier.
-   jQuery Unobtrusive Validation parses the attributes on the client
    and sets up the client-side validation.
-   When the user submits the form, jQuery validation executes. Assuming
    it passes, the form gets submitted to the server.
-   During model binding, the MVC `DefaultModelBinder `gets the list of
    `ModelValidator `instances for the model using the process described
    earlier.
-   Each `ModelValidator `gets its `Validate `method called. Any
    failures will get added to the `ModelState `by the
    `DefaultModelBinder`. In our case, the
    `RequiredFluentValidationPropertyValidator `will pass through to our
    originally configured `NotEmptyValidator `on the server side and the
    results of the `NotEmptyValidator `will be translated into
    `ModelValidationResult `objects for use by the `DefaultModelBinder`.

**Whew! That's a lot of moving pieces.** But that should explain how it
comes together so you at least know what you're looking at.

When you want to add a custom server-side validator, you have to hook
into that process. Knowing the steps outlined above, you can see you
have a few things to do (and a few places where things can potentially
break down).

**The basic steps for adding a new custom FluentValidation validator in
MVC are**:

-   **Create your server-side validator.** This means implementing
    `FluentValidation.Validators.IPropertyValidator`. It's what gets
    used on the server for validation but doesn't do anything on the
    client. I'd look at existing validators to get ideas on how to do
    this, since it's a little different based on whether, say, you're
    comparing two properties on the same object or comparing a property
    with a fixed value. I'd recommend starting by looking at a validator
    that does something similar to what you want to do. The beauty of
    open source.
-   **Add an extension method that allows your new validator type** to
    participate in the fluent grammar. The standard ones are in
    `FluentValidation.DefaultValidatorExtensions`. This is how you get
    nice syntax like `RuleFor(m => m.Name).MyCustomValidator();` for
    your custom validator.
-   **Create a
    `FluentValidation.Mvc.FluentValidationPropertyValidator `corresponding
    to your server-side validator.** This will be responsible for
    creating the appropriate `ModelClientValidationRule `objects to tie
    your server-side validator to the client and for executing the
    corresponding server-side logic. (Really the work is in the
    client-side part of things. The base
    `FluentValidationPropertyValidator `already passes-through logic to
    your custom server-side validator so you don't have to really *do
    anything* to get that to happen.)
-   **Add a mapping between your server-side validator and your
    `FluentValidationPropertyValidator`.** This takes place in
    `FluentValidationModelValidatorProvider.Configure`. Let's talk about
    that.

**Remember earlier I said we'd talk about adding custom validator
mappings to the `FluentValidationModelValidatorProvider `**during
configuration time? You need to do that if you write your own custom
validator. When you want to map a server-side validator to a client-side
validator, it looks like this:

    FluentValidationModelValidatorProvider.Configure(
      provider =>
      {
        provider.ValidatorFactory = new DependencyResolverModelValidatorFactory();
        provider.Add(
          typeof(MyCustomValidator),
          (metadata, context, rule, validator) => new MyCustomFluentValidationPropertyValidator(metadata, context, rule, validator));
      });

**There are mappings already for the built-in validators.** You just
have to add your custom ones. Unfortunately, the actual list of mappings
itself isn't documented anywhere I can find, so [you'll need to look at
the static constructor on
`FluentValidationModelValidatorProvider`](http://fluentvalidation.codeplex.com/SourceControl/changeset/view/f8bfa66ff2a28f731f126fedf22dfaa35438ba7f#src/FluentValidation.Mvc3/FluentValidationModelValidatorProvider.cs)
to see what maps to what by default.

**I won't walk through the full creation of an end-to-end custom
validator here.** That's probably another article since this is already
way, way too long without enough pictures to break up the monotony.
Instead, I'll just mention a couple of gotchas.

**GOTCHA: DERIVING FROM OUT-OF-THE-BOX VALIDATORS
**Say you have a custom email validator. You decide you want to shortcut
a few things by just deriving from the original email validator and
overriding a couple of things. Sounds fine, right?

    public class MyCustomEmailValidator : EmailValidator

Or maybe you don't do that, but you do decide to implement the standard
FluentValidation email validator interface:

    public class MyCustomEmailValidator : PropertyValidator, IEmailValidator

The gotcha here is that server-side-to-client-side mapping that I showed
you earlier. FluentValidation maps by type and already ships with
mappings for the out-of-the-box validators. If you implement your custom
validator like this, chances are you're going to end up with the default
client-side logic rather than your custom one. The default was
registered first, right? It'll never get to your override… and there's
not really a way to remove mappings.

You also**don't want to override the mapping** like this:

    provider.Add(
      typeof(IEmailValidator),
      (metadata, context, rule, validator) => new MyCustomFluentValidationPropertyValidator(metadata, context, rule, validator));

You don't want to do that because then when you use the out-of-the-box
email validator, it'll end up with your custom logic.

This is really painful to debug. Sometimes this is actually what you
want - reuse of client (or server) logic but not both… but generally,
you want a unique custom validator from end to end.

Recommendation: **Don't implement the standard interfaces unless you
plan on *replacing the standard behavior across the board*** and not
using the out-of-the-box validator of that type. (That is, if you want
to totally replace everything about client and server validation for
`IEmailValidator`, then implement `IEmailValidator `on your server-side
validator and don't use the standard email validator anymore.)

**GOTCHA: CUSTOM VALIDATION LAMBDAS ONLY RUN ON THE SERVER**
Say you don't want to implement a whole custom validator and would
rather use the FluentValidation lambda syntax like this:

    RuleFor(m => m.Age).Must(val => val - 2 > 6);

That lambda will only run on the server. Maybe that's OK for a quick
one-off, but if you want corresponding client-side validation you
actually need to implement the end-to-end solution. There's no automated
functionality for translating the lambdas into script, nor is there an
automatic facility for converting this into an AJAX remote validation
call. (But that's a pretty neat idea.)

**GOTCHA: MVC CLIENT-SIDE VALIDATION ADAPTERS OVERLAP TYPES**
If you dive deep enough, you'll notice that certain server-side
FluentValidation validators boil down to the same
`ModelClientValidationRule `values when it's time to emit the
`data-val-` attributes. For example, the FluentValidation
`GreaterThanValidator `and `LessThaValidator `both end up with
`ModelClientValidationRule `values that say the validation type is
"range" (not "min" or "max" as you might expect). What that means is
that on the server side, this looks sweet and works:

    RuleFor(m => m.Age).GreaterThan(5).LessThan(10);

But when you try to render the corresponding textbox, you're going to
get an exception telling you that you can't put "range" validation twice
on the same field. Problem.

What it means is that **when you create custom validations, you have to
be mindful of which jQuery rule you're going to associate it with on the
client**. It also means you have to be creative, sometimes, about how
you set up MVC validations on the server to make sure you don't have
problems when it comes to adapting things to the client-side. Stuff that
works on the server won't necessarily work in MVC.

[**For reference, here's a SUPER ABBREVIATED SEQUENCE DIAGRAM of how it
comes
together.**](https://hyqi8g.bl3302.livefilestore.com/y2pAkJvoBp4pDUwMdl9QALDoQ4dHFLDJcqeeZRv1M52VYiLJP_Om31ivzvJRfdXnsYvWvMmE0_LnBKI_tamZK-CY0cy6x-6P9yDsRP7IEky_Yg/20130417_FluentValidationSequence.png?psid=1)
Again, there are several steps omitted here, but this should at least
jog your memory and help you visualize all the stuff I mentioned above.

