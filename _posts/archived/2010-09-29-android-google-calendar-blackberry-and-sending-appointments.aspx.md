---
layout: post
title: "Android, Google Calendar, BlackBerry, and Sending Appointments"
date: 2010-09-29 -0800
comments: true
disqus_identifier: 1670
tags: [android]
---
My wife has a BlackBerry and I used to as well until [I switched to a
Droid
X](/archive/2010/09/28/tips-for-a-new-droid-x-owner-from-a-new.aspx).
One of the things we used to do to help each other remember stuff or get
things onto the other person's calendar (when using BlackBerry) was to
send an appointment via MMS to the other person. You could add an
appointment to your BlackBerry calendar, select it, and send it to
someone else. Really easy.

Problem is, that's not how Google Calendar works, which means when I
switched to Android, all hell broke loose. You can't export an event as
an iCal (.ics) or vCal (.vcs) file, which is basically what the
BlackBerry was doing. However, there is a way to do this, it's just
not... intuitive. At least not to me since I'm so used to shipping .ics
files around.

**Getting an Appointment from BlackBerry to Android/Google Calendar**

1.  Open the appointment on the BlackBerry.
2.  Send the appointment to the Google user's Gmail address (the account
    the calendar is hooked up to).
3.  When the Gmail user opens the appointment the BlackBerry user sent,
    Gmail displays it as a meeting invite and asks you if you'll be
    attending. Click the "Yes" link  in the email and it gets added to
    your calendar.

There's an alternate way to do this, too, but it involves saving the
.ics file that's attached to that incoming Gmail and going to Google
Calendar and running an import... but that's painful and not necessary.
Just click "yes" and call it good.

**UPDATE 12/22/2010**: Opening an appointment in Gmail appears to only
work if you do it from a desktop computer, and from the full view - not
just the basic HTML view. You can't open the appointment and accept it
right on the Android phone because the Gmail client on Android will
simply show the appointment as an attachment and not an invitation.

**Getting an Appointment from Android/Google Calendar to BlackBerry**

For this one, you need to have the email address attached to the
BlackBerry. Some people set up their Gmail or Hotmail or whatever so the
BlackBerry automatically picks it up, and if so, that'll work; other
people (like my wife) have a special email provided by the service
provider like `phonenumber@vzw.blackberry.net` that goes to the
BlackBerry. You'll need that address so you can get the email to the
BlackBerry's native email client, not, say, the Google Mail app
installed on the BlackBerry.

1.  Open the appointment in Google Calendar.
2.  Add a guest to the appointment and use the BlackBerry's email
    address (as discussed above) as the guest email.
3.  When Google Calendar asks you if you want to send a notification to
    the guest, say yes. This automatically sends the .ics file to the
    BlackBerry user on their phone.
4.  The BlackBerry user can open that email and add the appointment to
    their calendar using the attached .ics. Done.


