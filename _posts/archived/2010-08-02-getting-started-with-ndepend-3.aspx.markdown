---
layout: post
title: "Getting Started with NDepend 3"
date: 2010-08-02 -0800
comments: true
disqus_identifier: 1658
tags: [net]
---
I was fortunate enough to get my hands on a license for NDepend 3 so I
decided to take it for a spin. I'd had [some experience with NDepend
2](/archive/2008/03/28/ndepend---analyze-your-code.aspx) and thought it
would be interesting to see the new, cool stuff.

**Install is still reasonably easy.** It's still just a zip file -
unzip, drop your license XML file in the folder along with the
application, and you're up and running. That said, one of the things
that's changed since I last wrote about NDepend is that my development
environment is as a non-admin user on Windows Server 2008 R2 with the
User Account Control turned on. In that scenario, it's *not quite as
simple* as unzip and go if you want to put the application in the
Program Files folder as is recommended. The steps I had to go through:

1.  Unzip the program to a folder on my desktop.
2.  Copy my license XML file into that folder.
3.  [Use the streams tool from Sysinternals to unblock all the
    files](/archive/2010/05/19/unblocking-multiple-files-at-once.aspx).
4.  Copy the folder from my desktop to the Program Files folder. (This
    will ask for admin credentials.)
5.  Create a folder at C:\\ProgramData\\Microsoft\\Windows\\Start
    Menu\\Programs\\NDepend so I can have a shortcut to the program in
    the Start Menu. (This will ask for admin credentials.)
6.  Create a shortcut to VisualNDepend.exe on my desktop (because you
    can't create a shortcut directly in the Start Menu).
7.  Move the shortcut from the desktop to the folder I created in the
    Start Menu. (This will ask for admin credentials.)

So, not insurmountable, but more than a single step. **It would be nice
if there was an actual installer that did all this for me in a future
version of NDepend.**

The first thing I noticed was a slight update in the welcome screen that
made installing the Visual Studio and Reflector add-ins a little more
prominent.

![NDepend welcome
screen.](https://hyqi8g.blu.livefilestore.com/y2p2S7_KL64bBAKjMwTfBQKqPaLu8SakVhGsfX6he4VHQTEkuMztIaa1A7WIwxoTlD4_PeanFBq9KBrWjoKwc9OIIVPFU0xN5SC1SK4Qr4ZW7s/20100802ndependstartpag.png?psid=1 "NDepend welcome screen.")

Clicking on one of the install buttons will bring you to the respective
place in the options dialog for Visual NDepend. Click "Install" and
things "just work," which is awesome:

![NDepend options screen for installing the Visual Studio
plugin.](https://hyqi8g.bl3302.livefilestore.com/y2pb8eYGvhnODjf6kobZkfwMzcnTkoGi3Wfs15jrT55cjZtAy1xrNSEF85wy3LWA8uoHqf1RjkauNVViNUN6GWZNqOMAJXRohpgWBqm-wIdpuA/20100802ndependinstallv.png?psid=1 "NDepend options screen for installing the Visual Studio plugin.")

**I noticed that the Ribbon is still not the default interface used by
NDepend**, so you'll want to go into the options and specify to use
Ribbon rather than regular menu/tool bars. The Ribbon is still easier to
figure out.

![NDepend options for selecting an interface
choice.](https://hyqi8g.blu.livefilestore.com/y2panNb8ZT3t5lr_niK03l-KIKzy1Gv5QRuAFMn8aglcUasS2lOLsv44dHDn1KQ8QBQIvvhNLbFghPcnRDv6606v1uA2qdPhLpNafekEWo93jA/20100802selectribbonint.png?psid=1 "NDepend options for selecting an interface choice.")

The project I chose to analyze this time was
[Autofac](http://autofac.googlecode.com), the open source dependency
injection framework.

From the Visual NDepend welcome screen, I clicked the "Create
Project..." link and I got a small dialog to fill out:

![New NDepend Project
dialog.](https://hyqi8g.bl3302.livefilestore.com/y2p1utJQBECN-vmZDQ0hrtd4f1G_c9_6J8EN-YyfMbRh3vPjcOqN1sRJeZzbIvYosNJW7VUL2tZpBPAXExRmWsy_99kdjPinvGQZ5TJ9wmek6o/20100802newproject1.png?psid=1 "New NDepend Project dialog.")

That gets you to the project properties window.

![New project properties window, ready for assemblies to be
added.](https://hyqi8g.blu.livefilestore.com/y2p_jsbz0VMqvpp7P33oKru7d7cpiSYYVYT___aDXH5RsoQbt-jXFDEwgMHxqexngKePDF1w0pj6uCYRnrx0fUHLRLwEgcntrGl9MWFgoKKilA/20100802newproject2.png?psid=1 "New project properties window, ready for assemblies to be added.")

Something I noticed when taking screen shots is that the smallest I
could make the window and still have all the buttons visible was about
1200 pixels wide. If you're running in a lower resolution monitor, you
may be out of luck. Something to consider.

The first thing I noticed (sort of by accident) was this little icon in
the corner of the window...

![Informational icon in the bottom right corner of the NDepend
window.](https://hyqi8g.bl3301.livefilestore.com/y2p8bQOgJDtoDrr7RwRTGH2miSSnXeI2_eGJzWMBkq-3U6TKHNmdAOyRCT_wgBQ67dGw8T-3GUP5Mu1wmKPCdjHbdEsiWPTufzFaJ156Svwmpc/20100802infoicon.png?psid=1 "Informational icon in the bottom right corner of the NDepend window.")

I'm not sure if it was there in the last version of NDepend or not, but
it's cool. Hovering over it tells you what's going on:

![Hovering over the info icon gives you feedback on what you should do
next.](https://hyqi8g.bl3301.livefilestore.com/y2pJ3QjGBxzTZbAX7uz8N4v08imRhKzrHoJa3GrLjUnUsDQ3SotsH9nM3wQgbZMAWEL0AyIXKhHtR4ANAXy3g_QDOq7Qh7wEpkNHbm301_gn7k/20100802infoiconwithinf.png?psid=1 "Hovering over the info icon gives you feedback on what you should do next.")

It's sort of like a little "what do I do next?" cue. Very nifty.

I clicked the "Add Assemblies of a Visual Studio Solution" button and
selected the Autofac core solution.

!["Add Assemblies of a VisualStudio Solution"
button.](https://hyqi8g.bl3301.livefilestore.com/y2pgrXiiS36-cf02f-6ZpqZnbyfd8PDWm81MDcQlV26Ad96UMAjc8A5EE6o-qyDIYFGksmTS6SovngrxIyyOsl5pviEggzB1u5TqPXO9CEfCgg/20100802addvssolution.png?psid=1 ""Add Assemblies of a VisualStudio Solution" button.")

After removing all of the unit test assemblies and demo project
assemblies, I was left with some errors. As it turns out, NDepend wasn't
getting the assemblies from their target folders - it was trying to get
them from the bin folders of some of the demo projects.

To fix this, I had to do two things.

First, I rebuilt the solution to make sure the assemblies to analyze
were in the associated build output locations (bin\\Debug for each).

Second, I had to click the "View Folders" button, switch to "relative
path mode," and delete the folders from the test and demo assemblies.

![Viewing and fixing up the folders for a
project.](https://hyqi8g.bl3301.livefilestore.com/y2p27BNOx0VNr2u4_426IghnWpH2OtHXWWtAIN_XL3OhZVpArxowAvjPl7E6P7XnWVOLztrsPWYffKYgt-pg6qyUobvwU0W2BgG7RNJ_7V_nh8/20100802folderlocationf.png?psid=1 "Viewing and fixing up the folders for a project.")

Side note:**I still think things should default to "relative path
mode"** because if you're going to share the NDepend project with other
team members and check it into your source tree, you don't want to be
using absolute paths. I also found it**pretty unintuitive that the
target .NET framework version was only revealed as an option** when you
opened up the folder view. I don't feel like it has anything to do with
folders. But I digress.

Once I did that, all of the target assemblies were properly located.

![Target assemblies
fixed.](https://hyqi8g.blu.livefilestore.com/y2pWFtWBb8j6XtsR4y-tJmz8QFxM9Y1LIMG7WwK7_gOirgbYu89hUFP6dWInSCrDplht0Buf33GJDigBLSlSEF0iPk5jAdUlua3hCkKbE46uyw/20100802assemblyfixes.png?psid=1 "Target assemblies fixed.")

The next thing I noticed was that the MVC 2 assembly, referenced by one
of my targets (Autofac.Integration.Web.Mvc) wasn't found.

![Dependency error - System.Web.Mvc can't be
located.](https://hyqi8g.bl3301.livefilestore.com/y2p21uvfMLAhkTa8PoLRrtVM_TkFmACwI7beZ8e2K5Cy3aHaAACQ0RKC0Bp4_fTAqsYAjcCcZ7rkzSRvlssXWtjt01OvIp3BrmmjIQeFlvxOTo/20100802dependencyerror.png?psid=1 "Dependency error - System.Web.Mvc can't be located.")

To fix that, I had to open up the folder view again and add a new search
folder to C:\\Program Files (x86)\\Microsoft ASP.NET\\ASP.NET MVC
2\\Assemblies - where System.Web.Mvc.dll is located. That's when I ran
into a problem:

**NDepend keeps the .NET Framework search folders as absolute paths
regardless of whether your project is in "relative path mode," but in
"relative path mode" you can't add a new absolute path folder
yourself.** You also can't add a new "framework location" so it knows to
search for it next time. That means, for the MVC 2 assembly, unless I
keep a local copy in my project's source, there's still no way I can
share this project with my team. Why? Because in relative path mode, I
may check my project out in a different location on my drive than other
team members and the relative path to the MVC 2 assembly will break.
Problem. I even tried manually hacking the project file. It sticks as
long as you don't open the project up in Visual NDepend again, at which
point it switches everything back to absolute paths.

![The folder list after adding a location for MVC
2.](https://hyqi8g.bl3302.livefilestore.com/y2p0EhOl2DbxZU5-tU9ij7KzcXj1W5qOUx6SD-LfNNne-ncbg_7ww_0tEePelGjtOT4MlDlMOb8KbvHUaYyBQtUvvHldpLP4n7hfFjuJiOkwog/20100802dependencyfixes.png?psid=1 "The folder list after adding a location for MVC 2.")

For the sake of this article, we'll move past that. **Hopefully this
will be fixed in a future version because it's sort of a showstopper for
adding NDepend to continuous integration on MVC projects.**

The thing about this is, it looks like it was a painful process but it
wasn't that bad. There were a couple of hiccups, but all of this took
just a couple of minutes. It just wasn't quite as easy as I think it
should be. That said, once you have it all set up, you don't have to do
it again - just reuse the project file next time you want to run
analysis.

Once I had the MVC 2 assembly located, everything was found, so I hit
the big green 'Run Analysis' arrow and let it roll!

When it was done running (it only took a few seconds), I got a report
that popped up in my browser.

![Header from the HTML report that pops up after NDepend
analysis.](https://hyqi8g.bl3301.livefilestore.com/y2pL0vMCik65BbYw0EuTSaVTj3paRVTqc9dJTFirJ3O3QVZXDPbIuVuIaPTlMb2ktCd22xTEqQxX3aTtz65u_rcb-JauOBvOKr6TjK6ROuOxgs/20100802htmlreport.png?psid=1 "Header from the HTML report that pops up after NDepend analysis.")

There is a ton of information in this report including notes on methods
you should look at refactoring (e.g., things that take too many
parameters) and so on. In many cases, the warnings that come up are very
similar to things you'd see coming out of FxCop, but with a more
in-depth analysis. For example, NDepend can tell you about methods that
are poorly commented:

![Definition of the CQL query showing not enough
comments.](https://hyqi8g.bl3301.livefilestore.com/y2pP1vOCyqvyHb17HGvRzWuSetUpcoBb1J_a-j05rcVjBClqFMoC6J3lJwR-VQHP6tgYcRUr1PXwSfu8Qd1a2WTy2b2U3oYTUdbuQR0yajOH5M/20100802commenterror.png?psid=1 "Definition of the CQL query showing not enough comments.")

It also includes some really cool diagrams, like "abstractness vs.
instability":

![Abstractness vs. Instability
graph.](https://hyqi8g.blu.livefilestore.com/y2p72NG4zNYT0MaAz73I6vJPFic87Xc5-8yLhdd5Fkjp3vetUe8MT0a2ZQndz89l4rBpVfPsE7KhUcSQV784hMz8bqK-OPTum5vi8sZlm4iMBk/20100802abstractvsinsta.png?psid=1 "Abstractness vs. Instability graph.")

In this case, Autofac looks pretty good! You can also see a diagram
showing the dependency graph between assemblies:

![Assembly dependency
graph.](https://hyqi8g.bl3301.livefilestore.com/y2pCXePGBxgsDCsju4-Z2yF6TMnJmHD7eWesroSz48PqY0lXlldRmNYASrcZrMgWEF9nYXpn8dxYjQtuCBFnZ-zbNETNKlWkhKbUc5i2OB0cFE/20100802componentdepend.png?psid=1 "Assembly dependency graph.")

Again, reasonably clean for Autofac.

Flipping back to the Visual NDepend UI, you can see the same information
but can navigate around in an interactive fashion.

![Navigating a report visually in
NDepend.](https://hyqi8g.bl3302.livefilestore.com/y2pvrhsruzovwZcR1RKh9fJ86wH3aTe3uuFIOtUAJZu1gsP86oWhmmzBTpPEqq1sITtsKwcPxF84rNknOpna-rwIR0eR2io1S0Du6V_pb77D80/20100802reportnavigatio.png?psid=1 "Navigating a report visually in NDepend.")

For example, I looked at the Code Quality section of queries and looked
at the list of methods that are considered too big from a "number of
lines of code" standpoint. In Autofac's case, there is just one:
Autofac.Configuration.ConfigurationSettingsReader.Load. Clicking that, I
can see a lot of information about the method:

![Detailed method info
view.](https://hyqi8g.bl3301.livefilestore.com/y2p1ODEm_agaxdAPd-0g1Dq-04LEHDhYQFp1dM7peMBq4Hd8EQRNWAKDfFhGqH1BK79Ylnq3bNyt1bjqZicryacjhifXqnD8GMn5X7EuWd8CzA/20100802methodinfo.png?psid=1 "Detailed method info view.")

Double-clicking on the method will open up the source file in Visual
Studio so I can see it for myself. Or I can right-click on the method
and open it up in Reflector (which is faster than viewing source in VS).
(**You can use the NDepend options to switch your source editor tool to
something like Notepad, which is a good idea.** Do that. It makes
opening source files much faster.)

There is a lot to look at. Very interesting stuff that's well worth
checking out.

**One good way to get this going for your team is to [integrate it with
your continuous integration
build](http://www.ndepend.com/NDependConsole.aspx).** After you run your
FxCop analysis and unit tests, run NDepend and integrate the report into
the dashboard. It'll help get people familiar with some of the things to
look for and keep them mindful of their development. It sort of sucks to
see code you wrote show up as failing some of the "code quality"
queries, believe me.

**One shortfall of the build integration with NDepend is that there are
only two levels of query: WARN and SELECT**. WARN queries will output a
build warning; SELECT queries just introduce information into the
report. Neither one necessarily fails the build. It would be nice to
have ERROR query types, too, to allow you to fail the build. I've
mentioned this to the folks at NDepend before and it was going to be
"considered" but it's not there yet.

**Especially for larger teams where you probably have a technical lead
or architect looking at statistics and making decisions about how to
design things, this is a fantastic tool.** For the average team member,
you'll probably look at the report occasionally, but you probably won't
run the reports all the time or anything. On the other hand, integrated
into the build and with someone sort of looking at the overall direction
of the project, this becomes exceptionally powerful.

[**Head over to NDepend and check it out.**](http://www.ndepend.com)
It's well worth your time and better than ever.

