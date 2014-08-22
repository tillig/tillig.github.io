---
layout: post
title: "Disaster Recovery and Trouble-Free Continuous Integration"
date: 2007-02-07 -0800
comments: true
disqus_identifier: 1147
tags: [GeekSpeak]
---
We've all got our source code in source code control systems (right?)
that get backed up on a regular basis (*right?*) so we can reasonably
easily recover from any issues and get right back to coding. You might
even have a backup program running on your development workstation so
you can restore corrupted files or settings.
 
 **Are you backing up your continuous integration server?**
 
 "Why," you might ask, "would I back that up? If I have all of my source
in the backed-up source code control system, what else is there?"
 
 It's something I know I take for granted - the continuous integration
build server just being there and working. But ask yourself some
questions:

-   If you had to re-create your build server, how long would it take
    you?
-   If someone modifies your build configuration and messes it up, can
    you roll back the changes?
-   How easy is it to add or remove a project from your build
    configuration?
-   How easy is it to set up a brand new build server?

Sure, some of those don't sound like disaster recovery issues, but by
solving some of the issues, you can make your life easier on others.
 
 Here are some tips that might help you make your continuous integration
server experience a little more trouble-free. (We use
[CruiseControl.NET](http://ccnet.thoughtworks.com/) at Corillian, so
I'll use that in my examples.)

-   **Check in your build server configuration.** Store your build
    server configuration files (e.g., ccnet.config) in source code
    control, just like your product source. If you ever have to restore
    the configuration or roll back a bad change, this will make it
    vastly easier.
-   **Isolate build artifacts from the rest of the server.** Put
    everything that has to do with your build - your source, the build
    server configuration files, state information - in an isolated
    folder. If you can, put it on its own logical drive. This will help
    you in backing up, restoring, and moving to a new server (should you
    ever need to). You'll know that all you need for the build server to
    run is in this one folder; everything else is peripheral.
-   **Standardize everything.** Your source code repository layout. The
    build output structure. The format of logs that get generated.
    Everything. This doesn't sound like it'd be helpful in easing your
    continuous integration experience, but it is very helpful. By
    standardizing your source code repository layout across all the
    projects you build, it's far easier to script any large changes to
    the build configuration. It also makes your configuration files look
    a lot like copy/paste work with minor substitutions. This ties into
    the next tip...
-   **Generate your server configuration.** If you have a standard
    repository layout, a standard build output structure, and so on,
    you're only a step away from using a code generation tool to
    generate any server configuration you need. We have a small XML
    configuration file that has the differentiating bits for each
    project - the location of the source code repository, the name of
    the project, the version label prefix - and use
    [CodeSmith](http://www.codesmithtools.com) to generate our
    ccnet.config file. We use that same XML configuration file and
    CodeSmith to generate a NAnt script that automatically adds any
    folders for the projects on the build server and do the initial
    source code checkout. Using Subversion as our source code provider
    and tagging after each successful build, we can even script
    re-creation of the CruiseControl.NET state file for each project.
    **A keen side benefit of all this is that adding or removing a
    project on the server is as simple as updating the small XML
    configuration file and regenerating all the config.**
-   **Build on a virtual machine.** If your build server is a virtual
    machine, you can easily take periodic snapshots of the system and
    restore the whole system to a previous state. It also allows you to
    start new build servers easier by cloning a good build server image
    and creating/generating the configuration for your new projects.

Check out your continuous integration setup. If the server died a
horrible death in the middle of the night, how long would it take you to
get running again?
