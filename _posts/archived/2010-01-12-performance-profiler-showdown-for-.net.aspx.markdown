---
layout: post
title: "Performance Profiler Showdown for .NET"
date: 2010-01-12 -0800
comments: true
disqus_identifier: 1606
tags: [GeekSpeak,net,Web Development]
---
I recently had to do some performance profiler evaluation for .NET
applications and I figured I'd share my results. Note that it's as
scientific as I could make a subjective review (e.g., "friendly UI"
might mean something different to you than to me), but maybe it'll help
you out. Also, I'm not a "profiler expert" and, while I've used
profilers before and understand generally what I'm looking at, this
isn't my primary job function.

The five profilers I tried out:

-   Visual Studio 2008 Team System Developer Edition (there's a profiler
    that comes along with the install of VSTS 2008 Developer).
-   [ANTS Performance Profiler
    5.2](http://www.red-gate.com/products/ants_performance_profiler/index.htm).
-   [Intel VTune Performance Analyzer
    9.1](http://software.intel.com/en-us/intel-vtune/).
-   [JetBrains dotTrace
    3.1](http://www.jetbrains.com/profiler/index.html).
-   [AutomatedQA AQtime
    6](http://forums.automatedqa.com/products/aqtime/).

I put an explanation of what each feature "means" in tooltip form, so
put your cursor over it if you don't understand what I'm talking about.
An "X" in the box means it has the feature.

Testing was done on a dual-2.8GHz processor machine running Windows
Server 2008 R2 64-bit and 4GB RAM.

 

VSTS 2008

ANTS Perf 5.2

VTune 9.1

dotTrace 3.1

AQtime 6

User Interface

Visual Studio integration

X

 

 

X

X

Standalone application

 

X

X

X

X

Friendly/easy to use

X

X

 

X

 

Robust reporting

 

X

?

 

X

Measurement Style

Sampling

X

X

X

X

X

Instrumentation

X

X

X

X

X

Measurements Recorded

CPU time

 

X

X

X

X

Wall-clock time

X

X

X

X

X

Additional perf counters

 

X

 

 

X

Notes

 

This requires Visual Studio, which means you have to have VS installed
on the machine running the app you're profiling. That said, this was the
easiest to get results from and the easiest to interpret.

In general this appeared to be the best balance between "robust" and
"usable" but I couldn't actually see the report that came out because it
locked up the UI thread on the machine and ate 3GB of memory. I've asked
about this [in the
forums](http://www.red-gate.com/messageboard/viewtopic.php?t=10249).
Turns out this is fixed in the next version, 6, [currently in
EAP](http://www.red-gate.com/MessageBoard/viewforum.php?f=110).

I couldn't actually get a profile to run using VTune since it complained
of being "unable to determine the processor architecture." As such, I
don't know how well the reporting works.

When I ran dotTrace 3.1 on a multi-proc system, I got several timings
that came out with negative numbers (-1,000,289 msec?). You can fix this
by setting the proc affinity for the thing you're profiling. I tried a
nightly build of dotTrace 4.0 and that's fixed. dotTrace 4.0 will also
let you profile a remote application - something the others don't
support.

AQtime has a lot of power behind it but lacks the usability of some of
the other profilers. It appears that if you take the time to really
tweak around on your profile project settings, you can get very specific
data from an analysis run, but doing that tweaking isn't a small feat. I
spent a good hour figuring out how to profile an ASP.NET application in
the VS dev server and setting it up. Also, while it very well may be due
to my lack of experience with the tool, AQtime had the most noticeable
impact on the application's runtime performance. It took several minutes
for the first page of my app to load in the browser.

For now, it looks like the VSTS profiler is my best bet. If I could
figure out the UI problem with ANTS, or if dotTrace 4.0 was out, I'd say
those options tie for my second choice. The VTune profiler seems to be
the most... technical... but it also desperately needs a UI refresh and
seems geared toward profiling unmanaged code, where managed code is a
"nice to have" rather than a first-class feature.

**UPDATE 1/21/2010**: I added AQtime to the list of profilers I tried
out. Also, I removed the "VS integration" checkmark from ANTS because,
while it adds a menu entry to VS, all it does is start up the external
application. I'm not counting that. Finally, I found out my ANTS problem
is fixed in the next version, 6, currently in EAP. Since it's not
released, I still have to go with the VSTS profiler, but once it's out,
I'd vote ANTS.

