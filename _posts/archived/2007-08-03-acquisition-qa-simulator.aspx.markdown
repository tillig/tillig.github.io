---
layout: post
title: "Acquisition Q&A Simulator"
date: 2007-08-03 -0800
comments: true
disqus_identifier: 1248
tags: [General Ramblings]
---
Going through the process of being
[acquired](http://ir.checkfreecorp.com/phoenix.zhtml?c=94799&p=irol-newsArticle&ID=1000723&highlight=)
[twice](http://investors.fiserv.com/releasedetail.cfm?ReleaseID=258139)
in the last few months, I'm getting pretty used to how the information
dissemination process works.  In a nutshell, there really isn't any.

From one point of view, I get it - there's a lot to coordinate, and
legal requirements dictate that certain things can't be shared until
certain times and so on.  I get it.  I get it so much I'm really tired
of people reminding me about it because they think I don't get it.  I
promise.  I get it.

The other side - the side I seem to always be on is "The Dark Side." 
Not like [the Dark Side of the
Force](http://en.wikipedia.org/wiki/Dark_side_%28Star_Wars%29), more
like "people who are in the dark about any details about what's going
on."  This is actually the majority of the people most of the time, and
regardless of how "transparent" communications are supposed to be,
management (the people who "know stuff") generally seems to believe that
"more communication is better," even if there isn't actually anything to
communicate.

If you haven't been through this process, I thought I'd help you out by
throwing together a little Q&A simulator so you know what this is like.

First, imagine you've been notified of a very important all-hands
meeting.  It's mandatory.  You must attend.  Your very life depends on
it.

You get to the meeting, and the Person In Charge says, basically, "Hey,
folks, we've been acquired.  We figured this was the best move for the
company.  Any questions?"

Now's the time you get to ask all the questions you might have.  Try
them out in my handy simulator:

<script type="text/javascript">
var allAnswers = new Array();
allAnswers[0] = "We don't have an answer for that at this time.";
allAnswers[1] = "We're still working that out and we'll let you know as soon as we can.";
allAnswers[2] = "That hasn't really been decided yet.";
allAnswers[3] = "We'll have the answer for that in the near future.";
allAnswers[4] = "That's being discussed right now and we'll let you know when a decision has been made.";
allAnswers[5] = "That information isn't currently available, but we'll let you know when it is.";

var allThinking = new Array();
allThinking[0] = "Hmmmm...";
allThinking[1] = "Ummmm...";
allThinking[2] = "Well...";

function think()
{
	var i = Math.round((allThinking.length - 1) * Math.random());
	document.getElementById("answer").innerHTML = allThinking[i];
	setTimeout('generateAnswer()', 1000);
}

function generateAnswer()
{
	var i = Math.round((allAnswers.length - 1) * Math.random());
	document.getElementById("answer").innerHTML = allAnswers[i];
}
</script>

<p><b>Ask your question about the acquisition of the company:</b><br /><input type="text" /> <input type="button" value="Answer Me!" onclick="think();"/></p>
<p><b>Answer:</b><br /><span id="answer" /></p>

*...and there you have it.*

Now go to three or four of these in close succession - one for the whole
company, one for your division, one for your group within the
division... you get the idea.  Congratulations!  You've been through the
acquisition experience.

