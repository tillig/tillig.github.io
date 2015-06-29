---
layout: post
title: "NDepend 6 Released"
date: 2016-06-26 11:00:00 -0800
comments: true
tags: [net,vs,ndepend]
---
[NDepend 6 was recently released with a ton of new features.](http://www.ndepend.com/ndepend-v6) I've been working with NDepend for quite some time ([my earliest blog entry on it was for version 2.7](/archive/2008/03/28/ndepend---analyze-your-code.aspx)) and every release gets better. [It's been a couple of years since version 5 came out.](/archive/2013/10/28/ndepend-5-new-ui-new-features.aspx/) What's new?

The first thing you notice that's new when you start things up is **the additional integrations** they've added. It used to be just "install the extension for Visual Studio" but now there are icons for [TFS](http://www.ndepend.com/Docs/tfs-integration-ndepend), [TeamCity](http://www.ndepend.com/Docs/teamcity-integration-ndepend), [SonarQube](http://www.ndepend.com/Docs/sonarqube-integration-ndepend), and Reflector integration.

![NDepend 6 integrations](https://hyqi8g.dm2302.livefilestore.com/y2pMIp68NvkmrDUCzEWUosOm-DOXNbdlhfuxS0MArhBSO38aFA2n6OdXNJqEHUnjhXn1GTJ1c7HE7GuP5V9F_RuIg-QGIjuAZCtiNkqOTYnsUuldDusPhVTidlHaj7f2OWNQTDIlWwahuKC6ZrtAbkn5q8z7R-sWGFz7IPLBHyThOc/20150626_ndependintegration.png?psid=1)

**I'm particularly interested in the [TeamCity integration](http://www.ndepend.com/docs/teamcity-integration-ndepend/) because that's the build server I use.** I have manually integrated it in the past using MSBuild and some manual TeamCity configuration, but with the new add-in, I can just drop NDepend on the build server and have all that work done for me. There's even a specific NDepend build step type added and the report magically shows up in the dashboard. [There are some great step-by-step walkthrough videos on the NDepend site showing how to set this up.](http://www.ndepend.com/docs/teamcity-integration-ndepend/)

I decided to analyze some of the new code I've been working on. It was pretty easy to get my project started. I love how NDepend helps you figure out where to go next if you haven't used it before.

![NDepend beginner dialog](https://hyqi8g.dm2302.livefilestore.com/y2phohTOkPwqNk_2FR02fP8U8PNKvAfr7IbVBFs0wL3I4hwCL56T1wqihyNdDe4i9DZZ87DEsvjA_pRwiQYyi4PsjMXdr49JOmOa3siqimLnHt0FO63bgUi8vPov2GcZKHrx0hpHKhzGGiOuMoyxsL0uib1SpeVYiZiNUvi1DttJVo/20150626_ndependbeginner.png?psid=1)

**The report has improved by adding "how to fix" information to rule failures.** One of the challenges I've had in the past is that you could see what things might have failed a rule, but you didn't really have anything clearly "actionable" you could tell folks to fix. You had to kind of "know" what a rule meant. Now there's no guesswork.

[![Report showing how to fix violations](https://hyqi8g.dm2302.livefilestore.com/y2p1OA8dVhyYfqdnSN_Z_scgfWeK4H3gfpPRAnL4GIfoNmQp3RatIZ59__w0DdoBoLseliak0iUm2B2cJNms88sbUv35QDJ0kZDUrDj-Gis2XPB0HSp-I-B3WjPY2_lkUH_cIz8dTYpfM3r4NQkO8UPXBSu7OPRMax6y53DPKwBOrY/20150626_ndependhowtofix_sm.png?psid=1)](https://hyqi8g.dm2302.livefilestore.com/y2peKwsgpuzRoyHLdsXJ923YH1q9fIl7naobRffLuZ4K--cl7EpbGy7tiY4cYbBrJBR5KB5S6A_88dzJ7I9-vvClbdW472cVBqIfBSM1A2IZmht9HezrEcRMJWaqrkY6LxaW_DZgDPwewD_F2SBAVCsNBE2Fl-877nLkxevjSVCJl8/20150626_ndependhowtofix_lg.png?psid=1)

**One of my huge complaints with other tools (coverage, analysis) has been addressed - handling of async/await methods.** A lot of what I've been working on lately has been Web API code, which is async/await from the ground up. Have you ever looked at that stuff in a decompiler like Reflector? Or a code coverage tool? I've found you don't get any information on it ("Let's just omit it!"); you get incorrect information on it ("You don't have full coverage because you didn't cover all the cases in the generated state machine!"); or you get confusing information ("I'll show you all of the compiler generated methods that don't make sense!").

Reports are very clean and complete, but you don't see the compiler generated state machine junk. Finally!

**The metrics view just doubled in value by adding a second "dimension" to its display.** You used to be able to just change the size of an item in the view based on a specific metric; now you can compare one metric to a second metric by adding a sort of "heat map" style coloration to it.

**My favorite combination so far is to set the box size by "# IL Instructions" and set the color of the boxes by "IL Cyclomatic Complexity."** It gives you a pretty good indication of things that need to be refactored  - just look for the huge red boxes!

[![NDepend metrics view](https://hyqi8g.dm2302.livefilestore.com/y2pUAgLUcAc-d9YUk2-554enS4YlIiHqvmXawYuvLMxjX6tw2c-06qy9loDEFehAdcuz9a7euq8m6fSzPLb1Dd1ufsKdmQSkcHlt2eCri1WA1awfIHmG8zN4sXE-B6CojmWiKhOpHOj6zmV_4Fpxn-y6DdJc9ROB-d9kfJhF0b3dGs/20150626_ndependmetrics_sm.png?psid=1)](https://hyqi8g.dm2302.livefilestore.com/y2puoP4kFljGy3pPDvuNceehL7aPCdWFIN_BE0uc2cHZeVIBMDF4HkPZYr-cFPP-n1-43xNPQczvTgq6pqhJOdY3a-HvVgxg1hfpzxs8HLL16MtMIFxhH1JZtfVd3cXIPg02ZlNp6rffp4Ngv44lPvNzToIVR4n4ESWJ3n8Mu4KqDw/20150626_ndependmetrics_lg.png?psid=1)

**My favorite new feature is the shareable rule files.** We have a standard FxCop ruleset we use on all of our projects. We have a standard StyleCop ruleset we use on all of our projects. _We can finally have a standard NDepend ruleset we use on all of our projects._

You can create a rule file with all of your analysis rules stored _outside_ the project file and then tell projects to reference the central/common NDepend rules file.

![Create a rules file](https://hyqi8g.dm2302.livefilestore.com/y2pSE0sHKv_43uoiAjRVp_9cg5C8gOzmOR4LPYd0iOmNIiN6AED9e_sZlT20ENLsxnJnCLshViKqg4XDygxJcWL1e74T7oguhF76Ii8JlvBrs9sdVZIXGrC5XYDMnPuteEI6wGMsAJyHtp25fDAGxIRzXR-nj07cN2XPt2tsmNJ6BU/20150626_ndependcreaterules.png?psid=1)

Once you have a custom rules file, you can reference it from your project. You will probably want to switch the paths in your project to be relative to the project file so it works on your machine and the build server.

[![Change paths to relative](https://hyqi8g.dm2302.livefilestore.com/y2pRwdmNO019tetAi_zBHybekJAmf7F2MmFjj5bRQR_9XM4eEmzNIQYJqbwHdrufHZz0sYaWpztbfKlX5TPOrm-EKmY7fyVBUAS5BGCsPOk8qbed3wYVJh5LrIB_39U65-Msvh3jITV-h_V2YqggGAbodsEPv4y0DdCGvdfiMKyPX0/20150626_ndependpaths_sm.png?psid=1)](https://hyqi8g.dm2302.livefilestore.com/y2pYzH7pvLzkhUKx0DD_Nwy15dWw7NVxzGOzEnGFiBeeyLJNL2yh-EyQRbsbvFy2rvaBYhe35HdOjTR8bqP_CJ3256a0IjnAdVzEBmfrjusVbi4Kpdq2l7aHKuQ5WWcRPI21dWZA-i8LdG2QQmhWXIhD2O7MzoiFMbxnTqR4OfH7K8/20150626_ndependpaths_lg.png?psid=1)

**With every iteration, NDepend just gets more compelling.** I get so much insight from it about our code and areas we need to improve - things that are hard to see when you're neck deep in code and NuGet package references and under a deadline. [You owe it to yourself to check it out.](http://www.ndepend.com/ndepend-v6)

*Full disclosure: I got a free personal license
from [Patrick](http://codebetter.com/patricksmacchia/) at NDepend.
However, we have also purchased several licenses at work and make use of
it to great benefit.*

