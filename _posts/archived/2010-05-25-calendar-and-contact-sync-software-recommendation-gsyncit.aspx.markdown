---
layout: post
title: "Calendar and Contact Sync Software Recommendation: gSyncit"
date: 2010-05-25 -0800
comments: true
disqus_identifier: 1644
tags: [General Ramblings]
---
I'm on a Blackberry Curve right now and I'd like to move to an
Android-based phone. Since Android plays so nicely with Google apps
(calendar, contacts, etc.) and as I'd like to have everything in a nice
central location, I figured I needed to get my info Googlefied.

I need keep the following in sync:

-   **Outlook**: My current system of record. Meetings get scheduled
    here, I do most of my daily work here.
-   **Blackberry Curve**: My phone (for now).
-   **Google**: A centrally accessible place, plus my interface with the
    Android phone I want to get (not sure on model yet).

For the Blackberry, the Blackberry Desktop Manager software works fine
to sync. It's not awesome - actually, it feels very fragile - but it
mostly works. For the calendar, there are some odd issues with recurring
appointments, reminders, and meeting attendees that I'm not thrilled
with, but no showstoppers. Contacts appear to sync perfectly.

That leaves **getting Outlook synchronized with Google**, which is not
an uncommon problem.

**Failure 1:**[**Plaxo**](http://www.plaxo.com)

I've had a Plaxo account for a long time and a year or two back I
upgraded to the premium account because I had some Outlook profile
issues that caused all of my contacts to be lost. Having the automated
remote backup for contacts was a lifesaver and still gives me peace of
mind.

Plaxo has the ability to synchronize with various places, which is cool.
Unfortunately, Google used to be one of those places but is not anymore.
Calendar sync was working great until a couple of months ago, but
contact sync never worked. Odd since Plaxo is a contact-based product.
Research in the forums tells me they're aware of the issue but there's
no schedule for a fix.

**Failure 2:**[**SyncMyCal**](http://www.syncmycal.com)

SyncMyCal came recommended to me by a couple of different friends who
have been using it successfully, though I'm not sure how. I didn't find
any problems during my trial period, so I purchased... and then
instantly found four problems.

-   **Some Outlook contact fields don't sync right.** I couldn't figure
    out exactly what the pattern here was, but I noticed that some of my
    contacts were not synchronizing. SyncMyCal tries to synchronize some
    Outlook contact fields as "user defined fields" in Google (because
    Outlook has so many fields on a contact) but sometimes it only sends
    over the field value and forgets to send a key. In Google, each
    custom contact field has to be a key/value pair. You end up getting
    a Google API error if you don't do it right... and SyncMyCal doesn't
    always do it right.
-   **Reminder information isn't synchronized if you don't set up your
    Google calendar with a default reminder.** In order for meeting
    reminder information to be synchronized to Google, you have to go
    into your Google calendar settings and configure a default reminder
    value. If you don't, none of the appointments that get synchronized
    will have the reminders attached. This was a hard one to figure out,
    but at least there's a workaround.
-   **Contacts with multiple mailing addresses don't synchronize all
    addresses.** Say you have a contact with a work address and a home
    address. SyncMyCal picks one (apparently arbitrarily) and that's the
    one that gets synchronized with Google. The other address(es) don't
    get synchronized or even acknowledged. (Multiple *email* addresses
    synchronize fine; it's multiple *physical mailing addresses* that
    have problems.)
-   **Recurrence exceptions don't synchronize from Google to Outlook
    correctly.** Set up a recurring appointment in Google that runs
    every weekday for two weeks. On the second week, delete the Tuesday
    and Thursday appointments. Move the Wednesday appointment to one
    hour later. Now sync back to Outlook - SyncMyCal will still show the
    deleted appointments and the moved appointment will still be in its
    original slot. It doesn't properly bring those exceptions back from
    Google. (It does, however, send exceptions properly from Outlook to
    Google.)

Finally, support for SyncMyCal is horrendous. You file a ticket, you get
back a copy/paste response about how they're sorry for the
inconvenience... but no real solution. A month later, they'll send you a
patch for the old version of their product and give you a bunch of steps
to run through involving backing up your data, uninstalling/reinstalling
SyncMyCal, etc. When you finally do it, the patch they send won't even
communicate with Google, let alone synchronize. You report that, rinse
and repeat. **It's like they didn't actually try any of the patches
they're sending you.**

**Why are they sending me patches for the old version of the product?**
That doesn't even make sense. I asked about that, too, and got an
unclear answer about design problems or something.

Anyway, I reported all of these issues over four months ago and have had
no resolution on any of them. I can't really turn on two-way
synchronization if neither calendar nor contact sync actually works.
There goes $25.

**Failure 3:**[**Google Calendar
Sync**](http://www.google.com/support/calendar/bin/answer.py?hl=en&answer=89955)

Google Calendar Sync wasn't that bad, but I found that it didn't
actually sync all of my meetings properly. I couldn't ascertain the
pattern here, either, except that it would sync appointments (no
attendees) and some meetings... just not all meetings. I'd get an error
in my synchronization log saying "Participant is neither attendee  nor
organizer."

There are tons of [forum
posts](http://www.google.com/support/forum/p/Calendar/thread?tid=02166cbb08d34084&hl=en)
about this with just as many different things that "fixed it" for
people. I tried all of the fixes people recommended and none of them got
all of my meetings synchronizing. (Though, interestingly enough, two-way
sync didn't delete the meetings, either. They just sort of got ignored.)

**Success:**[**gSyncit**](http://www.daveswebsite.com/software/gsync/)

gSyncit does calendar and contact sync... but also task and memo sync,
too, which is more than the above products do. I've been running two-way
sync on the calendar, tasks, and memos now for a couple of weeks and it
correctly synchronizes everything - recurrence exceptions, reminders,
everything.

**The only problems I've had with calendar sync involve really crazy
recurrence exceptions and time zones.**

I've caught it a couple of times where I was messing around and created
a recurrence exception on Google, synchronized to Outlook, updated it in
Google, and it didn't properly update back to Outlook... but I was
intentionally testing the boundaries so I probably did something really
edge case there. (Just be aware, is all.) I tried to set up a specific
reproduction but haven't figured out quite the exact set of steps.

Also, I've had a couple of weird issues involving time zones - like if a
meeting organizer sets something up at 12:15 EST, that's 9:15 PST... but
somehow it gets interpreted as 9:15 EST - the local time, the remote
time zone - and ends up appearing at the wrong local time (in this
example, 6:15 PST). It's only happened for two meetings (neither of
which I was going to anyway...). I reported it this morning and got an
answer from support within 15 minutes. (The SLA is 24 - 48 hours, but I
won't complain about a 15 minute turnaround!) This is apparently an
issue with Google Calendar not handling time zone issues well. The
author is working on a fix that may resolve the issue.

**I have not yet run contact sync two-way, but one-way from Outlook to
Google works perfectly.** It caught the multiple mailing addresses
without issue, correctly located the contacts I already had in Google
and added to their profiles... just fine. Honestly, the only reason I
haven't done two-way sync is because I have to clean up my contacts in
Google a bit - I'm afraid I'm going to get a ton of junk flooding into
Outlook that I don't want. I have full faith that the two-way sync will
work fine.

**UPDATE 5/25/2010 12:00P:** I enabled two-way contact sync between
Outlook and Google "My Contacts" folder after doing some cleanup and it
worked very well. It did add some contacts to Outlook that were in my
Google "My Contacts" group that I didn't want, but after I moved them
out of "My Contacts" into "All Contacts," they were properly removed
from Outlook. I also had a couple of duplicates appear where in Outlook
I had one email address for a person and in Google I had a different
address. A little manual merge action fixed that up without issue and
now I'm two-way-syncing my way to freedom and leisure.

**It's pretty flexible** - you can sync multiple Outlook calendars to
Google calendars (and you choose the mappings). You can sync your
contacts with specific groups (e.g., the "My Contacts" group in Google
rather than the "All Contacts" group). Memos get synchronized as Google
docs and you can put them in a specific GDocs folder to keep them
separate.

The only weird thing is that tasks synchronize with a separate calendar
and show up as events. The reason is, apparently, that there's no Google
API to interface with the actual task list. I'm OK with that.

Downside: You can't really tell at a glance when the last time you
synchronized was or the number of items synchronized. The best you can
do is look at the debug/error log, but it's not straightforward.

Anyway, if you're looking for sync software, [check out
gSyncit](http://www.daveswebsite.com/software/gsync/). I really like it,
and for $15 (at the time of this writing), you can't really beat it.

