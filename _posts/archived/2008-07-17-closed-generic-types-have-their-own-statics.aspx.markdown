---
layout: post
title: "Closed Generic Types Have Their Own Statics"
date: 2008-07-17 -0800
comments: true
disqus_identifier: 1419
tags: [Code Snippets,.NET]
---
You really have to be careful when you use generic types. Say you have a
generic type Foo\<T\> like this:

    public class Foo<T>
    {
      public static string StaticValue = "Unset.";
    }

Fine, right? Well, what happens if you do this?

    Console.WriteLine("Foo<string>: {0}", Foo<string>.StaticValue);
    Console.WriteLine("Foo<int>: {0}", Foo<int>.StaticValue);
    Foo<string>.StaticValue = "String value.";
    Foo<int>.StaticValue = "Integer value.";
    Console.WriteLine("Foo<string>: {0}", Foo<string>.StaticValue);
    Console.WriteLine("Foo<int>: {0}", Foo<int>.StaticValue);

I bet you can guess what the output is.

    Foo<string>: Unset.
    Foo<int>: Unset.
    Foo<string>: String value.
    Foo<int>: Integer value.

That's right - **each closed generic type (a generic that has a type
parameter provided) has its own set of static values**.

Think about how that can bite you - if you have multiple parameters on
your generic type, like MyType\<T, U, V\>, and you have three different
types that are used in each of T, U, and V, you end up with 27 sets of
static values (it's combinatoric). Possibly not what you're thinking at
the time you write the code.

I really can't find any documentation on this. There's [a nice
CodeProject article about
it](http://www.codeproject.com/KB/cs/GenericStatic.aspx) that shows why
this can really work against you if you're trying to make a
strongly-typed generic singleton factory, but beyond that, MSDN really
only yields up [an FxCop rule that's fairly
unrelated](http://msdn.microsoft.com/en-us/library/ms182139.aspx).

Be careful with your generics and static values!

