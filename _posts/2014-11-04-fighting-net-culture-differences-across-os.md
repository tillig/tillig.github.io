---
layout: post
title: "Fighting .NET Culture Differences Across OSes"
date: 2014-11-04 -0800
comments: true
tags: [testing,culture]
---
One of the projects I work on has some dynamic culture-aware currency formatting stuff that goes and we, of course, have tests around that.

I'm in the process of moving our build from Windows Server 2008R2 to Windows Server 2012 and I found that a lot of our tests are failing. I didn't change any of the code, just updated a couple of lines of build script. What gives?

**It appears Windows Server 2012 has different culture settings installed** than the previous platforms. [Per the documentation](http://msdn.microsoft.com/en-us/library/system.globalization.cultureinfo.aspx), "Windows versions or service packs can change the available cultures" and it appears I'm getting hit by that.

I cobbled together a quick program to do some testing using [LINQPad](http://www.linqpad.net/).

```csharp
var nfi = CultureInfo.CreateSpecificCulture("as-IN").NumberFormat;
Console.WriteLine("{0}:{1}:{2}",
  nfi.CurrencyNegativePattern,
  nfi.CurrencyPositivePattern,
  nfi.CurrencySymbol);
```

The results were the same on Windows 7 and Windows Server 2008R2 but different on Windows Server 2012:

Item | Windows 7 | Windows 2008R2 | Windows 2012
---|---|---|---
CurrencyNegativePattern | 12 | 12 | 12
CurrencyPositivePattern | 1 | 1 | **2**
CurrencySymbol | ₹ | ₹ | ₹

Notice the positive pattern is different? Yeah. That's not the only culture or item that differs across the installed cultures.

So... now I have to figure out a way to craft our tests to be a little more... dynamic(?)... about the expected value vs. the actual value.