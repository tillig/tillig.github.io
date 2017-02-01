---
layout: post
title: "FxCop Rule Recommendations"
date: 2008-10-30 -0800
comments: true
disqus_identifier: 1460
tags: [net]
---
I love FxCop and static analysis tools in general. Anything that can
help me write better, more standard and usable code that follows best
practices is a great thing. I like running FxCop on any of my projects
as part of the continuous integration cycle with all of the rules turned
on.

Well, all but a select few.

See, while the out-of-the-box rules are great, there are a few that
don't seem to jive with almost any of the projects I've ever been on.
Here's the list of rules I *don't* run, and a few I consider not running
based on project needs and goals.

**Don't run:**

-   **[CA2210 -
    AssembliesShouldHaveValidStrongNames](http://msdn.microsoft.com/en-us/library/ms182127.aspx)**:
    I like being able to consume third-party components, some of which
    might be open source. Unfortunately, not all of these will be
    strongly-named, and you can't have a strong-named assembly that
    depends on assemblies that aren't strong-named. Strong naming also
    becomes problematic when you want to provide or consume a plugin
    framework where people can easily drop assemblies into a folder and
    have them registered with an app. Versioning nightmare. Strong name
    where it makes sense, but not everything needs it.
-   **[CA1020 -
    AvoidNamespacesWithFewTypes](http://msdn.microsoft.com/en-us/library/ms182130.aspx)**:
    You run into this a lot when you have several assemblies
    contributing to a single namespace or when you're early in a project
    and you're still building things up. It might be okay to turn on
    later, but honestly, I never do.
-   **[CA1014 -
    MarkAssembliesWithClsCompliant](http://msdn.microsoft.com/en-us/library/ms182156.aspx)**:
    If I'm working in a very small project or something entirely
    standalone where I don't depend on anything else, I can get this to
    work. If it's not just a small project or standalone, I try marking
    things as CLS-compliant and all hell breaks loose. I start marking
    individual types as non-CLS-compliant based on compiler
    recommendations, which causes other types to be marked as
    non-CLS-compliant, and eventually nearly every type is marked as
    non-CLS-compliant. The root cause is usually that some central class
    has a dependency on some third-party component that isn't
    CLS-compliant. In the end, it doesn't seem worth the trouble. (Of
    course, I only really have C# clients for my stuff, so this might
    change if/when I have other languages needing to consume my output.)
-   **[CA1805 -
    DoNotInitializeUnnecessarily](http://msdn.microsoft.com/en-us/library/ms182274.aspx)**:
    This is basically, "Don't say 'bool x = false;'" because
    initializing fields to default values is redundant. I'm a huge fan
    of being explicit, though, and while it might be redundant, the
    microperf you get doesn't outweigh the long-term readability and
    maintainability of the code.
-   **[CA2243 -
    AttributeStringLiteralsShouldParseCorrectly](http://msdn.microsoft.com/en-us/library/bb264490.aspx)**:
    This one says that any string literal that you pass to an attribute
    needs to be parseable into a System.Uri, System.Guid, or
    System.Version. That's crap. Metadata attributes can be used for so
    much more than conveying those three types of information and
    ignoring every instance of where you might want to do that is just a
    pain.
-   **[CA1016 -
    MarkAssembliesWithAssemblyVersion](http://msdn.microsoft.com/en-us/library/ms182155.aspx)**:
    Most of my projects run in continuous integration and it's the
    responsibility of the build server to properly assign the assembly
    version... but we run static analysis on developer environments,
    too, and a developer build is always version 0.0.0.0, which equates
    to "no version" and fails this rule. I know the assembly will be
    properly versioned in production so I don't need a rule constantly
    popping up warnings in a development environment to tell me there's
    a problem that I don't actually have.

**Consider not running**:

-   **[CA1044 -
    PropertiesShouldNotBeWriteOnly](http://msdn.microsoft.com/en-us/library/ms182165.aspx)**:
    When you use dependency injection, you may legitimately have
    set-only properties on something. Most of the time, yeah, you'll
    want an associated "get" for the property, but maybe not, depending
    on your design.
-   **[CA1303 -
    DoNotPassLiteralsAsLocalizedParameters](http://msdn.microsoft.com/en-us/library/ms182187(VS.80).aspx)**:
    This one makes you localize all of your exception messages... and
    that's sort of painful if you're not distributing your stuff to
    folks who need localized exception messages.
-   **[CA1702 -
    CompoundWordsShouldBeCasedCorrectly](http://msdn.microsoft.com/en-us/library/bb264474.aspx)**:
    Turning this on, when you have a domain-specific language you're
    working with, can cause a dictionary-related nightmare. For example,
    you might have "Doghouse" as a word (a legitimate compound word) and
    it'll say "it should be DogHouse." Uh, no. So then you get to fight
    with the dictionary, which is a never-ending battle. Leave this on
    until you start really running into it and see how much
    dictionary-battling you'd have to do to comply before just turning
    it off. One or two words, no big deal. A full grammar, problems.
-   **[CA1724 -
    TypeNamesShouldNotMatchNamespaces](http://msdn.microsoft.com/en-us/library/ms182257.aspx)**:
    The description of this rule on MSDN says it'll only get raised if
    you have a type that is called "Collections," "Forms," "System," or
    "UI." I have run into this in several other cases - like a type
    named "MyNamespace.Security" (with security-related utility methods
    in it" conflicting with "System.Web.Security." Watch and see where
    you run into this - it may or may not be worth running.
-   **[CA2209 -
    AssembliesShouldDeclareMinimumSecurity](http://msdn.microsoft.com/en-us/library/ms182325(VS.80).aspx)**:
    If you haven't fought code access security before, go ahead and keep
    this enabled. Good luck with that. Sometimes it can be solved with a
    one-line assembly attribute. Most times it becomes a gordian knot of
    horrors.
-   **[CA1006 -
    DoNotNestGenericTypesInMemberSignatures](http://msdn.microsoft.com/en-us/library/ms182144.aspx)**:
    This one says you can't, say, declare a parameter or return value of
    type IList\<ICollection\<String\>\> because it's confusing and hard
    to use. The side effect is that you also can't have things like
    IList\<Guid?\> because the nullable Guid? is considered a generic.
    When you're writing WCF service contracts, you really need that
    nullable type there because it affects the schema that gets
    generated and helps with interoperability. If you have a lot of
    these... well, this rule becomes more of a nuisance than anything.
    Depending on your design goals, you may or may not want this rule.
-   **Rules involving URLs as System.Uri instead of System.String**:
    There are several rules that tell you if you have a method or
    property that has "Url" in it that it needs to be of type System.Uri
    instead of System.String. Particularly at a web tier, passing
    System.Uri around is a pain that you really don't need. In other
    places, maybe it's helpful. Depends on your project. These rules
    are:
    -   [CA1054 -
        UriParametersShouldNotBeStrings](http://msdn.microsoft.com/en-us/library/ms182174.aspx)
    -   [CA1055 -
        UriReturnValuesShouldNotBeStrings](http://msdn.microsoft.com/en-us/library/ms182176.aspx)
    -   [CA1056 -
        UriPropertiesShouldNotBeStrings](http://msdn.microsoft.com/en-us/library/ms182175.aspx)

Every other rule I leave on, and for the most part I don't exclude
warnings - I fix the issue raised. In some cases it seems sort of
stupid, but when the end product comes out, it's consistent,
maintainable, and consumable by others. Just the way I like it.

