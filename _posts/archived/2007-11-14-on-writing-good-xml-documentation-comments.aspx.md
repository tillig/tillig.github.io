---
layout: post
title: "On Writing Good XML Documentation Comments"
date: 2007-11-14 -0800
comments: true
disqus_identifier: 1303
tags: [net,vs]
---
![XML doc comment
screenshot](https://hyqi8g.dm1.livefilestore.com/y2pSzirCKiqfZ7igVyqiqQF8i7XWa-fisSddJHoJcOwv-FFdqbxYWVCDUr-X4-vxuOs3ERYFqPimcigMPuNcZqYjKFPG2Z8qvJYYBz0ylS7jls/20071114xmlcomment.png?psid=1)It
occurred to me the other day that there's information out there about
the technical aspects of writing XML doc comments in .NET code (i.e.,
the markup tags) but there's nothing out there about what you should put
in that markup.  While not every developer is also a technical writer or
novelist, sometimes all the users of your code have to go on is the
documentation you generate, so it's important to write it well.

And, no, you can't just defer your users to
[Reflector](http://www.aisto.com/roeder/dotnet/).  You'd actually be
amazed at how many people don't even know what Reflector is.

**TL;DR - THE GOLDEN RULES OF DOCUMENTATION** There's a lot here. If you
don't take anything else away, please at least take these two things:

-   **Write like it’s MSDN.** After you write the documentation, read it
    back to yourself, maybe even out loud. Does it sound like something
    you’d read from MSDN? How’s the grammar? They have smart people
    writing docs over there - learn from them the same as you "View
    Source" to learn good HTML.
-   **Write like the reader doesn’t have the source code.** Write the
    doc, then collapse all the method definitions so all you see is XML
    doc. Go get a coffee. Come back. Now read the documentation. Does it
    tell you everything you will need to know to work with the function?
    Pretend the reader doesn't have Reflector (you'd be surprised, lots
    don't).

Given those two rules, here are some tips on writing better XML doc
comments:

1.  **Think about what you'd like to see and write that.**  I
    intentionally made this the number one rule because it's the most
    important.  When you're writing your documentation, step outside
    yourself for a minute and think, "If I was handed just this assembly
    and a help doc, and I didn't have access to Reflector or anything
    like that, what sort of documentation would help me to understand
    how to use this code?"  Remember:
    -   Your users won't necessarily have the source to refer to, and
        even if they do, you shouldn't force them to resort to that.
    -   Not everyone knows everything you know about the code.
    -   The flow of control may not actually be as obvious as you
        think.
2.  **Learn the markup.**  If you only know about the \<summary/\> tag
    that gets put in when you hit `///` (or `'''`, for you VB people),
    you don't know XML doc comments.  [MSDN has the reference for the
    base tag
    set](http://msdn2.microsoft.com/en-us/library/5ast78ax(VS.80).aspx)
    but there is a good [reference here that includes a set of fairly
    widely accepted
    extensions](http://issuu.com/pchew/docs/xml_document_guide). 
    There's a lot more to comments than the summary.
3.  **Keep the \<summary/\> short.**  The content in the `<summary/>`
    and `<param/>` tags shows up in Intellisense in the Visual Studio
    IDE.  Don't write a novel there - one sentence, maybe two tops is
    all you need.  Leave the detailed comments for the `<remarks/>`
    section.
4.  **Don't explain something in terms of itself.**  The documentation
    is where you should expound on what's going on and, in some cases,
    why.  Say you have a custom "ICoolThing" interface and you implement
    that in a "ReallyCoolThing" class.  A bad `<summary/>` would be, "An
    implementation of the ICoolThing interface that is really cool." 
    That's not at all helpful - it doesn't tell you anything.  Instead,
    try something like, "Cool thing used to render XML doc comments." 
    (Or whatever it's used for.)  Explaining something in terms of
    itself isn't clarifying, it's just redundant.
5.  **Write in complete sentences...**  Writing code is a very terse
    experience.  There's a grammar, and it [generally] reads well
    enough,  but it's a different beast than writing documentation. 
    Documentation is where you need to describe in full, complete
    sentences and paragraphs what's going on.
6.  **...But be straightforward and don't go overboard with
    verbosity.**  Basically, "know when to say when."  You're not
    writing a legal document.  You're not writing a scientific research
    paper.  (Or maybe you are, but you know what I mean.)  Don't "fluff
    up" your docs with extra language.  Don't over-formalize the
    language.  Make it easy to read, explain what's going on, and call
    it a day.
7.  **I can has grammarz?**  Use proper spelling, grammar, and
    punctuation.  If you're not confident in your writing abilities,
    have someone who is good at this proofread for you.  (Or, better
    still, integrate the proofreading into your code review process. 
    You *have* a code review process, *right*?)  It may seem
    unimportant, but these things can make your documentation far easier
    to understand and may even give users more confidence in your code. 
    (If the person writing the code can't write a decent sentence, would
    you really have the confidence that all of the error handling and
    such is done right?)  The only time you can write your docs with bad
    spelling, grammar, and punctuation is if you're writing in
    [LOLCODE](http://lolcode.com/).
8.  **Read your own documentation.**  Once you've written your docs,
    read them through to see if they make sense.  This sounds like
    common sense, but it's amazing how many times I've seen docs get
    written and the author never actually read through them to see if
    they were intelligible.  Docs aren't a write-only stream - read and
    revise as necessary.
9.  **Remember that whitespace doesn't render.**  Or at least not like
    you think it does.  Don't forget that you're writing in XML -
    throwing in a standard line break isn't going to actually get you
    onto a new line.  So, for example, this:
     
    `/// <remarks>     /// This is the first line.     /// This is the second line.     /// </remarks>`
     
     Renders as:
     
     `This is the first line. This is the second line.`
     
     Create paragraphs by using `<para>...</para>` tags (similar to the
    `<p>...</p>` in HTML - put your content between the `<para>` and
    `</para>` tags).  Generally you won't actually want single line
    breaks anywhere because in the 80% case, you'll actually be wanting
    to use a different construct - a list, a table, or paragraphs.  A
    revised version of the above block would be:
     
    `/// <remarks>     /// <para>     /// This is the first line.     /// </para>     /// <para>     /// This is the second line.     /// </para>     /// </remarks>`
     
     The exception to this rule is the `<code/>` tag - whitespace is
    respected in there because it's assumed to be a code snippet.
10. **Hyperlink, hyperlink, hyperlink.**  The beauty of XML doc comments
    is how easily you can cross-reference related topics.  If you're
    talking about one method from the documentation on another method,
    use a `<see />` tag to add a link to the relevant method right from
    the comment body.  If there are related topics that are really
    important but may not have been linked to from the body of the
    comment (or maybe they warrant special attention via additional
    links), use `<seealso />` tags at the bottom of your comment block.
11. **Use special markup for reserved words.**  One of the extensions
    that NDoc added is the ability to use `<see />` tags on certain
    reserved words.  When the documentation rendering engine sees these
    reserved words, it can apply special formatting or perform common
    expansions on them.  The syntax for this is
    `<see langword="reservedword" />`.  For example:
     `<see langword="true" />`
     ...renders as...
     `true`
     ...and...
     `<see langword="null" />`
     ...renders as...
     `a null reference (Nothing in Visual Basic)`
     
     The recognized words are:
    -   abstract
    -   false
    -   null
    -   sealed
    -   static
    -   true
    -   virtual
12. **Add valid code samples wherever possible.**  Nothing helps a
    developer like seeing a code snippet.  The key is to not only add
    these snippets where possible (in a nested `<code/>` tag inside the
    `<example/>` tag) but also to make sure they're valid.  This is
    sometimes a hard task.  A good way to come up with a valid snippet
    is to actually write a small demo program and copy the code from
    that - that way you know the snippet works.
13. **Don't forget to XML encode entities.**  Again, you're writing XML,
    so don't forget that `<` needs to be `&lt;`, `>` needs to be `&gt;`,
    and so on.  The compiler will generally catch errors for you, but
    sometimes things work when they shouldn't and you'll get some
    unexpected results.
14. **Update your doc when you update your code.**  The worst problem
    you'll run into is that the doc you wrote six months ago doesn't
    actually reflect what the code is doing.  It's easy to overlook
    updating your docs because the build doesn't break when your docs
    are wrong.  Incorrect documentation is actually worse than bad
    documentation because while bad docs are hard to read, incorrect
    docs will potentially lead your users to spin wheels wondering why
    things aren't working as documented.
15. **Make documentation a priority.**  Don't let documentation be a
    second class citizen to cranking out the code.  Give it equal rights
    in your development process and let developers on your team know
    that documentation is important, too.  If documentation isn't seen
    to be important, it won't get the focus it needs.  Add documentation
    to your checklist of what needs to be finished before a task is
    marked complete.

There are a few tools out there that can help you improve your XML doc
comment writing experience.  My two favorites are:

-   [GhostDoc](http://submain.com/products/ghostdoc.aspx)- Gives you a
    starting point for writing XML documentation.  Really helpful when
    you're implementing interfaces or overriding methods because it can
    grab the docs from the base method and use that as your starting
    point.
-   [CR\_Documentor](http://cr-documentor.googlecode.com) - Shows a
    preview of what your documentation will look like when rendered. 
    Also adds some XML documentation templates to the editor context
    menu.
-   [CodeRush
    Templates](/archive/2012/08/08/use-coderush-templates-to-help-write-xml-api-documentation.aspx)
    - Expand templates to write documentation quickly and consistently.

**Write the docs you'd like to see.** Start with that, and the rest
should fall into place for you.

