---
layout: post
title: "2010 Retrospective"
date: 2010-12-22 -0800
comments: true
disqus_identifier: 1686
tags: [personal]
---
It's that time of year again - time to look back and see how productive
I've been (or not, as the case may be).

In January I came upon a problem where I needed to point to the UI
metadata "buddy class" for .NET DataAnnotations using configuration
rather than attributes. It was a tough problem, but [I solved it and
posted a
solution](/archive/2010/01/28/separating-metadata-classes-from-model-classes-in-dataannotations-using-custom.aspx).
I also took a look at .NET performance issues. I explored [the cost of
having many assemblies vs. few assemblies in your
build](/archive/2010/01/19/reduce-build-overhead-with-better-code-organization.aspx)
and did [a side-by-side comparison of several .NET performance
profilers](/archive/2010/01/12/performance-profiler-showdown-for-.net.aspx).
I [played a little Grand Theft
Auto](/archive/2010/01/11/grand-theft-auto-4-episodes-from-liberty-city.aspx).
Oh, and I upgraded my Windows Home Server and (a few months later)
[discovered the peril of using the WD Green drives in
it](/archive/2010/01/07/windows-home-server-storage-upgraded.aspx) after
[working through some
issues](/archive/2010/02/05/working-through-perfectdisk-for-whs-issues.aspx).

In February I updated [my command-prompt-here
round-up](/archive/2007/11/20/command-prompt-here-round-up.aspx) to
include VS2010. I worked with DevExpress to [post a video about my
CR\_CodeTweet plugin for
DXCore](/archive/2010/02/08/cr_codetweet-on-devexpress-blog.aspx). I ran
into [a few issues with Netflix streaming to my
Xbox](/archive/2010/02/18/network-issues-and-netflix-streaming.aspx)
that seemed to be fixed by running ethernet cable rather than using
wireless. [I updated
CR_Documentor](/archive/2010/02/01/cr_documentor-2.4.0.0-released.aspx)
with the ability to "pause" the preview and assign shortcut keys to
various actions.

In March we upgraded our FIOS speed at home and [I published a few tips
on getting that to work for
you](/archive/2010/03/01/tips-for-new-higher-speed-verizon-fios-subscribers.aspx).
I showed you [how to switch your active DXCore
version](/archive/2010/03/02/how-to-switch-your-active-dxcore-version.aspx)
so if you have more than one installed you can easily change which one
you're working with. [I explained the importance of the "TypeId"
property](/archive/2010/03/02/the-importance-of-typeid-in-asp.net-mvc-dataannotations-validation-attributes.aspx)
in ASP.NET MVC DataAnnotations custom attribute types. I posted [a list
of books I'd consider worthy of teaching "enterprise application
development"](/archive/2010/03/15/enterprise-application-development-books.aspx)
in .NET. I found that [if you install a DXCore plugin and forget to
unblock it, it may not
work](/archive/2010/03/29/dxcore-plugins-may-be-blocked-by-windows-security.aspx).
Later I showed [how to unblock multiple files at
once](/archive/2010/05/19/unblocking-multiple-files-at-once.aspx). (This
is still the \#1 reason people think
[CR_Documentor](http://cr-documentor.googlecode.com) is broken - they
forget to unblock it and Windows security stops it from running.) And I
showed [how to get your continuous integration build running FxCop from
VS2010 without having to install Visual Studio on the build
server](/archive/2010/03/29/updating-your-continuous-integration-build-to-run-fxcop-from-vs2010.aspx).

In April I [upgraded my home theater receiver to an Onkyo
TX-NR3007](/archive/2010/04/12/the-great-receiver-install-of-10.aspx)
and posted [a few findings after a couple weeks of
use](/archive/2010/04/27/two-weeks-in-with-the-onkyo-tx-nr3007.aspx). [I
released
DX\_FormatOnSave](/archive/2010/04/13/dx_formatonsave-format-documents-in-visual-studio-when-you-save.aspx)
- a DXCore plugin that will automatically format documents in Visual
Studio when you hit the save button so you never have to remember to do
it yourself. I had [some fun with Windows Aero Flip
3D](/archive/2010/04/16/fun-with-windows-aero-flip-3d.aspx) when trying
to bind a custom mouse shortcut to it. The big April event, though, was
[our vacation to San
Francisco](/archive/2010/04/27/2010-vacation-in-san-francisco-ca.aspx),
where we took the train down there. Good times.

May was pretty productive, particularly from a testing and coverage
perspective. I showed [how to run a different NUnit version with
TestDriven.NET](/archive/2010/05/03/how-to-run-a-different-nunit-version-with-testdriven.net.aspx)
than the one actually packaged with the plugin. I showed [how to fix the
\#20000
error](/archive/2010/05/03/typemock-isolator-ncover-and-the-20000-error.aspx)
when running Typemock Isolator and NCover. I gave you [a utility to
allow non-admin users to develop using Typemock
Isolator](/archive/2010/05/04/enable-typemock-isolator-for-a-non-admin-user.aspx).
The big one in May was that I showed you [how to fail your build using
NCover
3.4.x](/archive/2010/05/06/failing-the-build-with-ncover-3.4.x.aspx) and
higher since the "standard" version doesn't actually let you fail the
build when your coverage falls below minimum numbers. On a personal
note, I [finished my 30th laser hair removal
treatment](/archive/2010/05/10/laser-hair-removal-before-and-after.aspx)
and called it done; moved my DVD library off of my Windows Home Server
and [onto a Synology
DS1010+](/archive/2010/05/20/moving-to-a-synology-ds1010.aspx); and got
my calendar and contacts [syncing between Outlook and Google using
GSyncIt](/archive/2010/05/25/calendar-and-contact-sync-software-recommendation-gsyncit.aspx).

June started out with me discovering that [the
AllowPartiallyTrustedCallersAttribute can cause VerificationException to
be thrown if you test with
coverage](/archive/2010/06/04/verificationexception-during-coverage-check-your-security-attributes.aspx).
(I think this has been fixed in recent versions of NCover, but I'd have
to check.) I told you [how to test WCF services while developing as a
non-admin](/archive/2010/06/11/developing-as-a-non-admin-testing-wcf-services.aspx).
Finally, I told you [how to unit test an ASP.NET
VirtualPathProvider](/archive/2010/06/17/unit-testing-an-asp.net-virtualpathprovider.aspx).

In July Jenn and I ran [the Independence Day fireworks show in Happy
Valley](/archive/2010/07/07/happy-valley-fireworks-2010.aspx). I
released [multitenant dependency injection support for Autofac as a part
of the AutofacContrib
project](/archive/2010/07/28/introducing-autofaccontrib.multitenant-multitenant-dependency-injection-with-autofac.aspx).
I also told you [how to consume the MSDeploy staged output in a WiX
installer](/archive/2010/07/30/how-to-consume-msdeploy-staged-web-site-output-in-a.aspx)
so you can deploy a prepared web site using WiX rather than MSDeploy.

In August [I upgraded to NDepend
3](/archive/2010/08/02/getting-started-with-ndepend-3.aspx) (a fantastic
tool getting better all the time) and explained how to get yourself
going with it. I [reviewed the book *Testing ASP.NET Web
Applications*](/archive/2010/08/06/book-review-testing-asp.net-web-applications.aspx)
(liked it). And I showed you [how to fix error 1625 with the Adobe
Reader
update](/archive/2010/08/23/error-1625-with-adobe-reader-update-on-windows-server-2008.aspx).

September saw [another release of
CR_Documentor](/archive/2010/09/17/cr_documentor-2.5.0.0-released.aspx),
this time with a vastly overhauled syntax preview engine. For folks
writing DXCore plugins, [I showed you how to make your plugin "official"
and put yourself in the "About" box for
DXCore](/archive/2010/09/22/make-your-dxcore-plugin-official.aspx). I
showed you [how to get your iTunes playlists to show up in Asset
UPnP](/archive/2010/09/26/creating-playlists-in-asset-upnp.aspx).
Finally, I switched from a Blackberry Curve to a Droid X, so I posted
some [tips for new Android phone
owners](/archive/2010/09/28/tips-for-a-new-droid-x-owner-from-a-new.aspx)
and an explanation on [how to send event invitations from a Blackberry
to a Droid and
back](/archive/2010/09/29/android-google-calendar-blackberry-and-sending-appointments.aspx)
(which my wife and I do a lot).

October hit me with a couple of technology problems right up front.
First I had trouble syncing my iPod with iTunes as it kept getting stuck
with a message "verifying iPod..." so [I explained how to fix
that](/archive/2010/10/08/itunes-stuck-on-quotverifying-ipodquot-try-resetting-sync-history.aspx).
Then my Droid X had a problem where it wouldn't calibrate the compass,
so [I explained how to fix that,
too](/archive/2010/10/08/android-and-the-red-compass-calibration-problem.aspx).
Then, back to iTunes, I found that [iTunes will actually crash under
certain circumstances if you have a single bad
track](/archive/2010/10/13/itunes-crashes-on-one-bad-track.aspx) (how's
that for fault tolerance?) so I showed how to try to solve that one. In
development, I wondered [where all the Microsoft solutions for complex
problems
are](/archive/2010/10/15/where-are-the-microsoft-solutions-for-complex-projects.aspx).
I still haven't gotten a reasonable answer. (Oh, and we got [259
trick-or-treaters this
year](/archive/2010/11/01/259-trick-or-treaters.aspx).)

In November I [upgraded my blog to Subtext
2.5.2.0](/archive/2010/11/03/upgraded-to-subtext-2-5-2-0.aspx) and
[figured out an
issue](/archive/2010/11/03/the-subtext-2-5-2-0-email-debacle-solved.aspx)
where it wasn't sending email anymore. I bought myself a Kinect and [had
a good time with that](/archive/2010/11/05/an-evening-with-kinect.aspx).
I also [documented some AppSettings configuration
keys](/archive/2010/11/12/log4net-appsettings-keys.aspx) for log4net
that are handy and that I constantly forget about.

The posting sort of got a little lax here in December (though I did
[sneak in an update to
CR_Documentor](/archive/2010/12/22/cr_documentor-2-6-0-0-released.aspx))
due to [the birth of my daughter, Phoenix Aeralynn, on Thanksgiving
day](/archive/2010/12/01/phoenix-aeralynn-illig.aspx). She came a little
early, but I had started winding down my development activities toward
the end of November anyway in anticipation of her arrival, hence the
post drought. I'm on paternity leave for the entirety of December,
handling the usual hectic nature of the holiday season whilst getting
used to the whole "being a parent" thing.

In all, it's been a pretty good year. Even without all those other
things, Phoenix is accomplishment enough. (Now, granted, I feel like [a
little detail was left out of all of those eager parents explaining how
"wonderful" or "rewarding" parenting
is](http://www.ted.com/talks/rufus_griscom_alisa_volkman_let_s_talk_parenting_taboos.html),
but she's still pretty great.)

![Jenn holds Phoenix the
Elf.](http://lh5.ggpht.com/_P1NCAbHEm2Q/TRI2bheIQ3I/AAAAAAAAB1c/4Zan6Fz5LPY/s400/20101218-114123.jpg)

Happy holidays, folks!

