---
layout: post
title: "Convert An Outlook Message Into A Task"
date: 2007-07-10 -0800
comments: true
disqus_identifier: 1229
tags: [gists,vbscript]
---
**UPDATED 7/11/2007:** Added handling for email subject line or first
line of body to be the task subject; also added Outlook security
information to get this to work.

I'm not lucky enough to have a Blackberry so I don't have access to my
task list via a mobile device.  I don't generally carry my Pocket PC
around and I don't try to get the wonky synchronization to work on my
crappy Motorola phone.  When I think of something and I'm out, I use the
phone's email capabilities to mail myself a one-liner that has the task
information in it, then when I come back to the office I use those as
tasks.

To that end, I wanted to set up a rule that would just take those
one-liners and process the mail into a task automatically.  Since I use
Outlook, I can do that with a rule that runs a script.  Here's how to do
this in Outlook 2003.  Not sure, but it might also work in 2007.
Haven't tried.

First, go to "Tools -> Macro -> Visual Basic Editor." This gets you to
the script editor.  In the "Project Explorer" open up "Project1" and you
should see a folder called "Microsoft Office Outlook."  Open that up and
you'll see "ThisOutlookSession."  Double-click that to open it.

You should be looking at a VBA editor window.  If you've already got
other scripts going, it might not be empty.  In that window, paste this:

```vbs
Sub ProcessMailItemIntoTask(Item As Outlook.MailItem)
    Dim strTaskName As String
    strTaskName = Trim(Item.Subject)

    If Len(strTaskName) < 1 Then
        ' No subject - use the first line of the body
        strTaskName = Trim(Item.Body)
        Dim intCrLfPos As Integer
        intCrLfPos = InStr(1, strTaskName, Constants.vbCrLf, vbTextCompare)
        If intCrLfPos > 0 Then
            strTaskName = Trim(Left(strTaskName, intCrLfPos - 1))
        End If
    End If

    ' Trim TASK: off the line
    Dim intKeyWordPos As Integer
    intKeyWordPos = InStr(1, strTaskName, "TASK:", vbTextCompare)
    If intKeyWordPos = 1 Then
        strTaskName = Trim(Right(strTaskName, Len(strTaskName) - 5))
    End If

    ' Create the task
    Dim objTask As Outlook.TaskItem
    Set objTask = Application.CreateItem(olTaskItem)
    objTask.Subject = strTaskName
    objTask.StartDate = Item.ReceivedTime
    objTask.Save
    Set objTask = Nothing
End Sub
```

What that script does is process any message into a task. It uses the
subject line of the mail (or the first line of the body if there is no
subject) as the task subject and the time the mail was received as the
start time for the task.  You'll notice it also pulls off the word
"TASK:" at the beginning of the line - this is going to be a keyword for
our rule.

Now that you've got the script, save it and close the VB editor.  Now,
back in Outlook, go to "Tools -> Rules and Alerts..."

Select the "New Rule..." option and start from a blank rule.  Select
"Check messages when they arrive" and click Next.  Select the conditions
"with specific words in the subject or body" and "sent only to me."  For
the "specific words" in the subject, use "TASK:" - this will be the
magic flag that tells us that this needs to be turned into a task.  For
the actions you want to take on the message, select "stop processing
more rules," "run a script," "mark it as read," and "delete it."  This
will handle the auto-processing feature of the message so it doesn't
hang around in your inbox after it's been taskified.  Finally, for the
script you want to run, select
"Project1.ThisOutlookSession.ProcessMailItemIntoTask."  That will call
your script to create a task item out of the subject line of the
message.

Once you hit Finish, you're done.  Now when you mail yourself a message
with the subject line like "TASK: Take shirts to cleaners" you'll get a
task added to your task list with the subject "Take shirts to
cleaners."  Pretty simple.  The only drawback is that it's a client-side
rule so you have to have Outlook running to process the rule.  That's
pretty simple, though - even if you don't have Outlook running all the
time, when the client starts up it runs rules and will process all of
the appropriate emails next time you fire it up.

Note that if this script tries to read the body of the message, you'll
get that annoying "Something is trying to read email addresses in
Outlook - allow for X minutes" dialog popping up.  Not sure why it
thinks we're looking at addresses if we're only looking at the body, but
oh well.

If you have trouble getting this to work, check two things:

First, make sure you've restarted Outlook once before trying it.  For
some reason Outlook needs to shut down and restart to take macro changes
into effect.

Second, you may need to change your macro security level.  Go to "Tools
-> Macro -> Security..." to see your security level.  This will only
run in "Medium" or "Low" setting because it's not signed.  **If you
change your security level, you do so at your own peril.**  I'm not
responsible if you get hit by the next big Internet worm.  If you don't
want to change your security level, you can [digitally sign your macro
project](http://office.microsoft.com/en-us/outlook/HA012317811033.aspx).
The digital signature route is the recommended way to go to stay safe,
but it's the biggest pain, too.
