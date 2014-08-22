---
layout: post
title: "Four Types of Code Examples and How to Escape Their Traps"
date: 2011-03-18 -0800
comments: true
disqus_identifier: 1703
tags: [GeekSpeak]
---
If you're writing a programming article or an email to your team, many
times you'll probably try to provide an example code snippet to
illustrate the point you're trying to make. The problem is, regardless
of the example, you will most likely fall into one of these losing
traps:

**THE PROSE EXAMPLE**

This example is where you try to describe the code in a paragraph like
this one, in natural language.

> When registering a component for dependency injection, be aware of the
> lifetime you choose for the component. Choosing the wrong lifetime may
> mean the component lives longer than you intend. For example, if you
> have a component that keeps state information based on the current
> incoming request, you don't want to keep it around as a singleton.

The trap here is that many people stop reading about five words in and
don't pay attention to what you're trying to say.
[TL;DR](http://en.wikipedia.org/wiki/Wikipedia:Too_long;_didn%27t_read).
Even if the example you're trying to explain requires some additional
detail, attention spans wane and... you're not even reading this
anymore, are you?

**THE FOOBAR EXAMPLE**

This example is intentionally obscured from a naming perspective so that
people ignore the names and focus on what the code is actually doing.
[The names "foo" and "bar" are commonly used as
placeholders.](http://en.wikipedia.org/wiki/Foobar) For example, if you
wanted to demonstrate automatically implemented properties in C\#, you
might show a class like this:

    public class Foo
    {
      public string Bar { get; set; }
    }

It's shorter and more direct than prose, which will keep those ADD
engineers at bay... but the trap with this one is that you'll get people
who **can't work through the concepts because of the ambiguous naming**,
or they **can't figure out where the concept applies because the example
was not concrete enough** to make sense.

To address this, you get into...

**THE IMPRECISE CONCRETE EXAMPLE**

This is when you want to show a quick example of something but you don't
want people to get hung up on the names for things. The implementation
really isn't important, it's just an example. Like if you wanted to
demonstrate numeric parsing...

    public class Address
    {
      public int PostalCode { get; private set; }

      public void ParseAndSetPostalCode(string input)
      {
        this.PostalCode = Int32.Parse(input);
      }
    }

The good part is that it's more concrete, so the folks who couldn't
figure out the Foobar example can see where a concept might be used. On
the other hand, with imprecise examples you inevitably get **trapped by
people complaining about the design of the code**. "Are you sure you
wouldn't want to check for null first? What if the input isn't a numeric
string?"

You see this a lot with some of the quick demos given at presentations -
the code isn't 100% complete and tested (because it's a demo) but people
do the
[Monday-morning-quarterback](http://en.wikipedia.org/wiki/List_of_sports_idioms#M)
thing and wonder why that wasn't included.

So, that leads you to...

**THE PRECISE CONCRETE EXAMPLE**

This type of example is when you provide some code where all the details
are there. It addresses the shortcomings in the imprecise example, but
comes with it's own issues. Like if you were demonstrating how one might
use ACLs in the filesystem...

    using System;
    using System.IO;
    using System.Security.AccessControl;

    namespace SomeNamespace
    {
      public static class FileInfoExtensions
      {
        public static void AllowFullControl(this FileInfo file, string username)
        {
          if (file == null)
          {
            throw new ArgumentNullException("file");
          }
          if (username == null)
          {
            throw new ArgumentNullException("username");
          }
          if (username.Length == 0)
          {
            throw new ArgumentException("Username may not be empty.", "username");
          }
          if (!file.Exists)
          {
            throw new FileNotFoundException(String.Format("Unable to find file {0}", file.FullName), file.FullName);
          }
          var acl = file.GetAccessControl();
          var rule = new FileSystemAccessRule(username, FileSystemRights.FullControl, AccessControlType.Allow);
          acl.AddAccessRule(rule);
          file.SetAccessControl(acl);
        }
      }
    }

There are actually *three* problems with this one.

**First, the whole concept you were trying to illustrate is now lost in
details.** People have stopped looking at the conceptual/high-level
thing you were providing an example of and now they're focused on your
error checking and code format. Along with this, these examples are
usually sort of long, so you run into the prose example problem again

Second, and related to that first issue, **these examples totally open
the door to**[**nitpickers** (a la Raymond
Chen)](http://blogs.msdn.com/b/oldnewthing/archive/2008/01/30/7315957.aspx).
"Your string formatting wasn't culture sensitive and you didn't localize
the exception message!"

Finally, **you get people**[**copy/pasting the code** as though it's
production-ready](http://www.codinghorror.com/blog/2009/05/the-bathroom-wall-of-code.html)
without bothering to see if it does everything they need it to do,
sometimes without even testing the code.

**HOW DO YOU ESCAPE THE TRAPS?**

**The root of the problem is that people learn in different ways.** Some
people need that prose example or the Foobar example so they can focus
on the concept rather than the details; others need more precise
examples so they can see how things actually work in a more "real-world"
environment.

**There is a two-part solution** to this, and it requires cooperation on
everyone's part.

**For the people providing examples: Provide multiple examples of the
same concept but using different styles.** Describe in prose what you're
going to demonstrate and then give a precise concrete example. Or give
an imprecise concrete example and clarify it in prose with maybe another
example in the Foobar format. The idea here is that between two or more
examples, at least one will make sense to folks, or they'll be able to
put concepts from the different examples together to make a complete
picture.

**The drawback to having multiple examples is that it is longer**, so
you'll want to put the shortest bits first to draw the attention in and
convey the most info you can up front. This is similar to [the pyramid
structure used when people write news
stories](http://journalism.about.com/od/writing/a/storystructure.htm).

**For the people reading examples: Don't get stuck in the details.**
There is an unspoken contract between folks reading an example and folks
presenting examples. When a person is trying to convey some information
to you in a succinct fashion, they have to trim things down for time or
readability. As the recipient of that information, you need to
understand and agree to that. If you get stuck on naming or nitpicking,
stop for a second and realize you're missing the point. If the example
is talking about file permissions and there's a missing null check,
don't worry about it unless you think it actually fundamentally affects
your understanding of the example. **Feel free to ask questions, but
before you do, ask yourself if the question is constructive or would
help you understand better... or if you're just trying to be right about
something.**

**WHAT OTHER TRAPS ARE THERE?**

Did I miss an example trap? Ideas on how to provide better examples?
Leave a comment!

