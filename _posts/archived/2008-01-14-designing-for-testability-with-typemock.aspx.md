---
layout: post
title: "Designing for Testability with TypeMock"
date: 2008-01-14 -0800
comments: true
disqus_identifier: 1336
tags: [GeekSpeak,dotnet]
---
Design for testability vs. API as a deliverable (or
test-what's-designed) is something [I've blogged about
before](http://paraesthesia.com/archive/2006/10/05/mocking-debate-heats-up.aspx)
and it does sort of boil down to a religious debate. I'm currently on
the "test what's designed" side because, for me, API is a deliverable.
I'm also not a big fan of some of the sacrifices you have to make when
you design for testability, like losing your encapsulation.

Regardless of your views, mocking is still something you can most likely
take advantage of in your unit tests. You could use one of the open
source frameworks out there like
[Rhino.Mocks](http://www.ayende.com/projects/rhino-mocks.aspx). It'll
work. If you have access to [TypeMock](http://www.typemock.com), though,
or if your project already has TypeMock in it, there's no need to move
away from it or be scared that it's "too powerful."

You can still design for testability using TypeMock. You just need to
follow one simple rule:

**Restrict your TypeMock use to ["Natural"
mocks](http://www.typemock.com/Docs/UserGuide/index.php?topic=NaturalMocks.html).**

That's it. That's the secret. As long as you stick to the TypeMock
[RecorderManager](http://www.typemock.com/Docs/UserGuide/index.php?topic=TypeMock.RecorderManager.html)
and
[RecordExpectations](http://www.typemock.com/Docs/UserGuide/index.php?topic=TypeMock.RecordExpectations.html)
objects when setting your mocks up, only using "Natural" mocks, you can
still satisfy your design-for-testability urges.

And, hey, it doesn't hurt that you'll be able to do those more powerful
things should you need to, right?
