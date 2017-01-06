---
layout: post
title: "Diagnosing Google Calendar Sync Issues"
date: 2010-05-17 -0800
comments: true
disqus_identifier: 1641
tags: [GeekSpeak]
---
I'm using Google Calendar Sync to keep my Outlook calendar and Google
calendar synchronized and I've noticed a couple of meetings that don't
quite get synchronized right - the error message being "Participant is
neither attendee  nor organizer." (Yes, there are two spaces between
"attendee" and "nor.").

I haven't figured out what the problem there is but I did find this
interesting nugget to help you troubleshoot issues:

1.  Go to your Google Calendar log folder. On WinXP that'll be like
    C:\\Documents and Settings\\YOURUSERNAME\\Local
    Settings\\Application Data\\Google\\Google Calendar Sync\\logs
2.  Put a text file in there called "level.txt" and put one word in it:
    VERBOSE
3.  Run a sync from Google Calendar Sync. The log will come out a lot
    larger and will have a ton more logging information in it.
4.  Delete the "level.txt" file. You don't want verbose logging all the
    time.

Interestingly, for me the appointments that won't sync are all meetings
that my boss organized. Is Google Calendar trying to tell me something?
:)

UPDATE 5/27/10: [I switched to gSyncit to sync my
calendar](/archive/2010/05/25/calendar-and-contact-sync-software-recommendation-gsyncit.aspx).
