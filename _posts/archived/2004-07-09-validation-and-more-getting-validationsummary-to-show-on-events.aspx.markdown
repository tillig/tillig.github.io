---
layout: post
title: "Validation And More: Getting ValidationSummary To Show On Events"
date: 2004-07-09 -0800
comments: true
disqus_identifier: 610
tags: [gists]
---
In creating various web apps, I use [Peter Blum's Professional
Validation and More](http://www.peterblum.com/VAM/Home.aspx) controls
for page validation and error display. If you don't, you really should.
They're much more flexible and robust than the Microsoft validation
controls are.

 One problem I ran into was in using the ValidationSummary control. I'm
generating a huge form using all sorts of validation, and I want the
ValidationSummary to display the list of errors on the form as they
happen. The issue is, the ValidationSummary only displays when the user
tries to submit the form - even if it's a client-side validation, you
only see it when the user clicks the submit button.

 I wanted my ValidationSummary to display real-time, rather than waiting
for the user to click the submit button. Here's a little method you can
use on your controls to make the page execute validation on a control
event. Just pass in your control and the name of the event ("onclick,"
"onchange," etc.) and this will handle the rest.

`/// <summary> /// Adds a call to the VAM page validation to a specified control's event. /// </summary> /// <param name="control">The control that should call validation.</param> /// <param name="eventName">The event that should fire validation (onClick, onChange, etc.)</param> protected void AddPageValidationEvent(WebControl control, string eventName){      string scriptKey = control.ClientID + "_" + eventName + "_VAMValidate";      if(!Page.IsStartupScriptRegistered(scriptKey)){           string scriptBase =                "<script type="text/javascript" language="javascript">\n" +                "<!-- \n" +                "VAM_AttachEvent(VAM_GetById("{0}"), "{1}", "{2}");\n" +                "-->\n" +                "</script>";           string eventAction = "VAM_ValidateGroup('', true);";           string completeScript = String.Format(scriptBase, control.ClientID, eventName, eventAction);           Page.RegisterStartupScript(scriptKey, completeScript);      } }`
