---
layout: post
title: "How to Manually Upgrade Rosetta"
date: 2022-11-03 -0800
comments: true
tags: [mac]
description: "Rosetta is used to enable a Mac with Apple silicon to use apps built for Intel. Usually auto-update works. If not, here's how to manually do it."
---

Rosetta is used to enable a Mac with Apple silicon to use apps built for Intel. Most of the time, [you'll get prompted to install it the first time you need it](https://support.apple.com/en-us/HT211861) and after that the automatic software update process will take over. However, in some environments the automatic mechanisms don't work - maybe it's incorrectly blocked or the update isn't detecting things right. Here's how to update Rosetta manually.

First, get your OS build number: 🍎 -> About This Mac -> More Info.

![The 'About This Mac' window - click the 'More Info' button]({{ site.url }}/images/20221103_about.png)

Click on the Version XX.X field and it should expand to show you the build number. It will be something like `22A380`.

![The 'More Info' window showing the build number]({{ site.url }}/images/20221103_moreinfo.png)

Go to [the software catalog for Rosetta](https://swscan.apple.com/content/catalogs/others/index-rosettaupdateauto-1.sucatalog.gz) and search for your build number. You should see your build-specific package. The build number is in `ExtendedMetaInfo`:

```xml
<dict>
  <key>ServerMetadataURL</key>
  <string>https://swcdn.apple.com/content/downloads/38/00/012-92132-A_1NEH9AKCK9/k8s821iao7kplkdvqsovfzi49oi54ljrar/RosettaUpdateAuto.smd</string>
  <key>Packages</key>
  <array>
    <dict>
      <key>Digest</key>
      <string>dac241ee3db55ea602540dac036fd1ddc096bc06</string>
      <key>Size</key>
      <integer>331046</integer>
      <key>MetadataURL</key>
      <string>https://swdist.apple.com/content/downloads/38/00/012-92132-A_1NEH9AKCK9/k8s821iao7kplkdvqsovfzi49oi54ljrar/RosettaUpdateAuto.pkm</string>
      <key>URL</key>
      <string>https://swcdn.apple.com/content/downloads/38/00/012-92132-A_1NEH9AKCK9/k8s821iao7kplkdvqsovfzi49oi54ljrar/RosettaUpdateAuto.pkg</string>
    </dict>
  </array>
  <key>ExtendedMetaInfo</key>
  <dict>
    <key>ProductType</key>
    <string>otherArchitectureHandlerOS</string>
    <key>BuildVersion</key>
    <string>22A380</string>
  </dict>
</dict>
```

Look for the URL value (the `.pkg` file). Download and install that. Rosetta will be updated.
