---
layout: post
title: "My Handbrake Settings for SD Video"
date: 2014-06-21 -0800
comments: true
disqus_identifier: 1845
tags: [media]
---
I've been ripping a lot of SD video lately, converting my full-disc
VIDEO_TS folder images to .m4v files for use with Plex, and I've
learned quite a bit about what I like (or don't) and things I have to
look for in the final conversion. Surprisingly enough, default settings
never seem to work quite right for me.

The settings I use are some minor changes to the "High Profile" default.
I'll note the differences.

**Updated 1/2/2015 for 0.10.0 Handbrake release.**

Picture

-   Width/Height: nil (let it auto-correct)
-   Anamorphic: Loose
-   Modulus: 2
-   Cropping: Automatic

Filters

-   Detelecine: Off
-   Decomb: Default
-   Deinterlace: Off
-   Denoise: Off
-   Deblock: Off
-   Grayscale: Unchecked

Video

-   Video Codec: H.264 (x.264)
-   Framerate FPS: Same as source
-   Constant Framerate (this is different than High Profile)
-   x264 Preset: Slower
-   x264 Tune: Film, Animation, or Grain (depends on the source – I
    change this per item ripped; this is different than High Profile)
-   H.264 Profile: High
-   H.264 Level: 4.1
-   Fast Decode: Unchecked
-   Extra Options: Empty
-   Quality: Constant Quality 18 (this is different than High Profile)

Audio

Track 1:

-   Source: The best AC3 sound track on there with the most channels.
    (It usually does a good job of auto-detecting.)
-   Codec: AAC (FDK) (this is different than High Profile)
-   Bitrate: 256 (this is different than High Profile)
-   Samplerate: Auto
-   Mixdown: Dolby Pro Logic II
-   DRC: 0.0
-   Gain: 0

Track 2:

-   Source: Same as Track 1.
-   Codec: AC3 Passthru

Track 3 (depending on source)

-   Source: The DTS track, if there is one.
-   Codec: DTS Passthru

Subtitles: Generally none, but there are some movies that need them, in
which case I'll add one track. High Profile (and my settings) generally
don't include this.

-   Source: English (VobSub)
-   Forced Only: Unchecked
-   Burn In: Checked
-   Default: Unchecked
-   Everything else default.

Chapters: I do select "Create chapter markers" but I let the automatic
detection do the naming and timing.

This seems to give me the best bang for my buck. I tried with lower
quality settings and such, but it never quite got where I wanted it.
With these settings, I generally can't tell the difference between the
original source and the compressed version.

I've found that I have to check for a few things to see if something needs to be tweaked or re-ripped.

-   **Cropping**: About 80% of the time, Handbrake does an awesome job
    cropping the letterbox off and cleaning up the sides. That other
    20%, you get this odd floating black bar on one or more of the sides
    where the picture wasn't cropped right. This is much easier to catch
    if you always use the "Preview" button on the "Picture" tab. You can
    scan through the video and adjust the manual crop settings easily.
-   **Film grain**: By default I try the "Film" x264 Tune setting for
    most movies unless I'm sure there's a grain or high level of detail
    to it. Nevertheless, sometimes I'll come across a film where dark
    spots have the background appear as though it's "moving" – like a
    thousand little grains of sand vibrating. If I see that, I re-rip
    and switch to the "Grain" x264 Tune setting and that fixes it right
    up. I also sometimes see a film that looks like all the definition
    was lost and things are blocky – in this case, I'll also switch to
    "Grain."
-   **Lip sync**: I started out using the default "Variable Framerate"
    setting on the Video tab. I'm now in the process of re-ripping like
    a quarter of my movies because I didn't stop to see if the lips were
    synchronized with the words in the soundtrack. By switching to
    "Constant Framerate," everything syncs up and looks right. I've
    since switched my default setting to Constant Framerate.

**Making new presets is more reliable if you modify the XML settings directly.** Your presets file is located in your user application data folder, like `C:\Users\Travis\AppData\Roaming\HandBrake\user_presets.xml`. I found that if you modify an existing preset and then save a new preset based on that, it's totally affected by whether or not you have a file loaded to rip, what sorts of audio tracks are there, and so on. If you want a good preset, it's best to select the preset you want to modify, make the changes, and then use a diff program to compare the built-in setting XML to the user setting XML file. It's pretty easy to tell what you changed (the XML is easy to read), so just copy the built-in setting and update the XML with your specific changes.

Here's my current `user_presets.xml` file:

``` xml
<?xml version="1.0"?>
<ArrayOfPreset xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <Preset>
    <Category>User Presets</Category>
    <Description />
    <IsBuildIn>false</IsBuildIn>
    <IsDefault>true</IsDefault>
    <Name>Illig High Profile - SD Film</Name>
    <PictureSettingsMode>Custom</PictureSettingsMode>
    <UseDeinterlace>false</UseDeinterlace>
    <Task>
      <Title>0</Title>
      <Angle>0</Angle>
      <PointToPointMode>Chapters</PointToPointMode>
      <StartPoint>0</StartPoint>
      <EndPoint>0</EndPoint>
      <OutputFormat>Mp4</OutputFormat>
      <OptimizeMP4>false</OptimizeMP4>
      <IPod5GSupport>false</IPod5GSupport>
      <Width xsi:nil="true" />
      <Height xsi:nil="true" />
      <MaxWidth xsi:nil="true" />
      <MaxHeight xsi:nil="true" />
      <Cropping>
        <Top>0</Top>
        <Bottom>0</Bottom>
        <Left>0</Left>
        <Right>0</Right>
      </Cropping>
      <HasCropping>false</HasCropping>
      <Anamorphic>Loose</Anamorphic>
      <DisplayWidth xsi:nil="true" />
      <KeepDisplayAspect>false</KeepDisplayAspect>
      <PixelAspectX>0</PixelAspectX>
      <PixelAspectY>0</PixelAspectY>
      <Modulus>2</Modulus>
      <Deinterlace>Off</Deinterlace>
      <Decomb>Default</Decomb>
      <Detelecine>Off</Detelecine>
      <Denoise>Off</Denoise>
      <DenoisePreset>Weak</DenoisePreset>
      <DenoiseTune>None</DenoiseTune>
      <Deblock>0</Deblock>
      <Grayscale>false</Grayscale>
      <VideoEncodeRateType>ConstantQuality</VideoEncodeRateType>
      <VideoEncoder>X264</VideoEncoder>
      <FramerateMode>CFR</FramerateMode>
      <Quality>18</Quality>
      <VideoBitrate xsi:nil="true" />
      <TwoPass>false</TwoPass>
      <TurboFirstPass>false</TurboFirstPass>
      <Framerate xsi:nil="true" />
      <AudioTracks>
        <AudioTrack>
          <Bitrate>256</Bitrate>
          <DRC>0</DRC>
          <IsDefault>false</IsDefault>
          <Encoder>fdkaac</Encoder>
          <Gain>0</Gain>
          <MixDown>DolbyProLogicII</MixDown>
          <SampleRate>0</SampleRate>
          <SampleRateDisplayValue>Auto</SampleRateDisplayValue>
          <ScannedTrack>
            <TrackNumber>0</TrackNumber>
            <SampleRate>0</SampleRate>
            <Bitrate>0</Bitrate>
          </ScannedTrack>
          <TrackName />
        </AudioTrack>
        <AudioTrack>
          <Bitrate>256</Bitrate>
          <DRC>0</DRC>
          <IsDefault>false</IsDefault>
          <Encoder>Ac3Passthrough</Encoder>
          <Gain>0</Gain>
          <MixDown>Auto</MixDown>
          <SampleRate>0</SampleRate>
          <SampleRateDisplayValue>Auto</SampleRateDisplayValue>
          <ScannedTrack>
            <TrackNumber>0</TrackNumber>
            <SampleRate>0</SampleRate>
            <Bitrate>0</Bitrate>
          </ScannedTrack>
          <TrackName />
        </AudioTrack>
      </AudioTracks>
      <AllowedPassthruOptions>
        <AudioAllowAACPass>true</AudioAllowAACPass>
        <AudioAllowAC3Pass>true</AudioAllowAC3Pass>
        <AudioAllowDTSHDPass>true</AudioAllowDTSHDPass>
        <AudioAllowDTSPass>true</AudioAllowDTSPass>
        <AudioAllowMP3Pass>true</AudioAllowMP3Pass>
        <AudioEncoderFallback>Ac3</AudioEncoderFallback>
      </AllowedPassthruOptions>
      <SubtitleTracks />
      <IncludeChapterMarkers>true</IncludeChapterMarkers>
      <ChapterNames />
      <X264Preset>Slower</X264Preset>
      <QsvPreset>Quality</QsvPreset>
      <H264Profile>High</H264Profile>
      <H264Level>4.1</H264Level>
      <X264Tune>Film</X264Tune>
      <FastDecode>false</FastDecode>
      <X265Preset>VeryFast</X265Preset>
      <H265Profile>Main</H265Profile>
      <X265Tune>None</X265Tune>
      <PreviewStartAt xsi:nil="true" />
      <PreviewDuration xsi:nil="true" />
      <IsPreviewEncode>false</IsPreviewEncode>
      <PreviewEncodeDuration>0</PreviewEncodeDuration>
      <ShowAdvancedTab>false</ShowAdvancedTab>
    </Task>
    <UsePictureFilters>true</UsePictureFilters>
  </Preset>
  <Preset>
    <Category>User Presets</Category>
    <Description />
    <IsBuildIn>false</IsBuildIn>
    <IsDefault>false</IsDefault>
    <Name>Illig High Profile - SD 2D Anim</Name>
    <PictureSettingsMode>Custom</PictureSettingsMode>
    <UseDeinterlace>false</UseDeinterlace>
    <Task>
      <Title>0</Title>
      <Angle>0</Angle>
      <PointToPointMode>Chapters</PointToPointMode>
      <StartPoint>0</StartPoint>
      <EndPoint>0</EndPoint>
      <OutputFormat>Mp4</OutputFormat>
      <OptimizeMP4>false</OptimizeMP4>
      <IPod5GSupport>false</IPod5GSupport>
      <Width xsi:nil="true" />
      <Height xsi:nil="true" />
      <MaxWidth xsi:nil="true" />
      <MaxHeight xsi:nil="true" />
      <Cropping>
        <Top>0</Top>
        <Bottom>0</Bottom>
        <Left>0</Left>
        <Right>0</Right>
      </Cropping>
      <HasCropping>false</HasCropping>
      <Anamorphic>Loose</Anamorphic>
      <DisplayWidth xsi:nil="true" />
      <KeepDisplayAspect>false</KeepDisplayAspect>
      <PixelAspectX>0</PixelAspectX>
      <PixelAspectY>0</PixelAspectY>
      <Modulus>2</Modulus>
      <Deinterlace>Off</Deinterlace>
      <Decomb>Default</Decomb>
      <Detelecine>Off</Detelecine>
      <Denoise>Off</Denoise>
      <DenoisePreset>Weak</DenoisePreset>
      <DenoiseTune>None</DenoiseTune>
      <Deblock>0</Deblock>
      <Grayscale>false</Grayscale>
      <VideoEncodeRateType>ConstantQuality</VideoEncodeRateType>
      <VideoEncoder>X264</VideoEncoder>
      <FramerateMode>CFR</FramerateMode>
      <Quality>18</Quality>
      <VideoBitrate xsi:nil="true" />
      <TwoPass>false</TwoPass>
      <TurboFirstPass>false</TurboFirstPass>
      <Framerate xsi:nil="true" />
      <AudioTracks>
        <AudioTrack>
          <Bitrate>256</Bitrate>
          <DRC>0</DRC>
          <IsDefault>false</IsDefault>
          <Encoder>fdkaac</Encoder>
          <Gain>0</Gain>
          <MixDown>DolbyProLogicII</MixDown>
          <SampleRate>0</SampleRate>
          <SampleRateDisplayValue>Auto</SampleRateDisplayValue>
          <ScannedTrack>
            <TrackNumber>0</TrackNumber>
            <SampleRate>0</SampleRate>
            <Bitrate>0</Bitrate>
          </ScannedTrack>
          <TrackName />
        </AudioTrack>
        <AudioTrack>
          <Bitrate>256</Bitrate>
          <DRC>0</DRC>
          <IsDefault>false</IsDefault>
          <Encoder>Ac3Passthrough</Encoder>
          <Gain>0</Gain>
          <MixDown>Auto</MixDown>
          <SampleRate>0</SampleRate>
          <SampleRateDisplayValue>Auto</SampleRateDisplayValue>
          <ScannedTrack>
            <TrackNumber>0</TrackNumber>
            <SampleRate>0</SampleRate>
            <Bitrate>0</Bitrate>
          </ScannedTrack>
          <TrackName />
        </AudioTrack>
      </AudioTracks>
      <AllowedPassthruOptions>
        <AudioAllowAACPass>true</AudioAllowAACPass>
        <AudioAllowAC3Pass>true</AudioAllowAC3Pass>
        <AudioAllowDTSHDPass>true</AudioAllowDTSHDPass>
        <AudioAllowDTSPass>true</AudioAllowDTSPass>
        <AudioAllowMP3Pass>true</AudioAllowMP3Pass>
        <AudioEncoderFallback>Ac3</AudioEncoderFallback>
      </AllowedPassthruOptions>
      <SubtitleTracks />
      <IncludeChapterMarkers>true</IncludeChapterMarkers>
      <ChapterNames />
      <X264Preset>Slower</X264Preset>
      <QsvPreset>Quality</QsvPreset>
      <H264Profile>High</H264Profile>
      <H264Level>4.1</H264Level>
      <X264Tune>Animation</X264Tune>
      <FastDecode>false</FastDecode>
      <X265Preset>VeryFast</X265Preset>
      <H265Profile>Main</H265Profile>
      <X265Tune>None</X265Tune>
      <PreviewStartAt xsi:nil="true" />
      <PreviewDuration xsi:nil="true" />
      <IsPreviewEncode>false</IsPreviewEncode>
      <PreviewEncodeDuration>0</PreviewEncodeDuration>
      <ShowAdvancedTab>false</ShowAdvancedTab>
    </Task>
    <UsePictureFilters>true</UsePictureFilters>
  </Preset>
  <Preset>
    <Category>User Presets</Category>
    <Description />
    <IsBuildIn>false</IsBuildIn>
    <IsDefault>false</IsDefault>
    <Name>Illig High Profile - SD Grain</Name>
    <PictureSettingsMode>Custom</PictureSettingsMode>
    <UseDeinterlace>false</UseDeinterlace>
    <Task>
      <Title>0</Title>
      <Angle>0</Angle>
      <PointToPointMode>Chapters</PointToPointMode>
      <StartPoint>0</StartPoint>
      <EndPoint>0</EndPoint>
      <OutputFormat>Mp4</OutputFormat>
      <OptimizeMP4>false</OptimizeMP4>
      <IPod5GSupport>false</IPod5GSupport>
      <Width xsi:nil="true" />
      <Height xsi:nil="true" />
      <MaxWidth xsi:nil="true" />
      <MaxHeight xsi:nil="true" />
      <Cropping>
        <Top>0</Top>
        <Bottom>0</Bottom>
        <Left>0</Left>
        <Right>0</Right>
      </Cropping>
      <HasCropping>false</HasCropping>
      <Anamorphic>Loose</Anamorphic>
      <DisplayWidth xsi:nil="true" />
      <KeepDisplayAspect>false</KeepDisplayAspect>
      <PixelAspectX>0</PixelAspectX>
      <PixelAspectY>0</PixelAspectY>
      <Modulus>2</Modulus>
      <Deinterlace>Off</Deinterlace>
      <Decomb>Default</Decomb>
      <Detelecine>Off</Detelecine>
      <Denoise>Off</Denoise>
      <DenoisePreset>Weak</DenoisePreset>
      <DenoiseTune>None</DenoiseTune>
      <Deblock>0</Deblock>
      <Grayscale>false</Grayscale>
      <VideoEncodeRateType>ConstantQuality</VideoEncodeRateType>
      <VideoEncoder>X264</VideoEncoder>
      <FramerateMode>CFR</FramerateMode>
      <Quality>18</Quality>
      <VideoBitrate xsi:nil="true" />
      <TwoPass>false</TwoPass>
      <TurboFirstPass>false</TurboFirstPass>
      <Framerate xsi:nil="true" />
      <AudioTracks>
        <AudioTrack>
          <Bitrate>256</Bitrate>
          <DRC>0</DRC>
          <IsDefault>false</IsDefault>
          <Encoder>fdkaac</Encoder>
          <Gain>0</Gain>
          <MixDown>DolbyProLogicII</MixDown>
          <SampleRate>0</SampleRate>
          <SampleRateDisplayValue>Auto</SampleRateDisplayValue>
          <ScannedTrack>
            <TrackNumber>0</TrackNumber>
            <SampleRate>0</SampleRate>
            <Bitrate>0</Bitrate>
          </ScannedTrack>
          <TrackName />
        </AudioTrack>
        <AudioTrack>
          <Bitrate>256</Bitrate>
          <DRC>0</DRC>
          <IsDefault>false</IsDefault>
          <Encoder>Ac3Passthrough</Encoder>
          <Gain>0</Gain>
          <MixDown>Auto</MixDown>
          <SampleRate>0</SampleRate>
          <SampleRateDisplayValue>Auto</SampleRateDisplayValue>
          <ScannedTrack>
            <TrackNumber>0</TrackNumber>
            <SampleRate>0</SampleRate>
            <Bitrate>0</Bitrate>
          </ScannedTrack>
          <TrackName />
        </AudioTrack>
      </AudioTracks>
      <AllowedPassthruOptions>
        <AudioAllowAACPass>true</AudioAllowAACPass>
        <AudioAllowAC3Pass>true</AudioAllowAC3Pass>
        <AudioAllowDTSHDPass>true</AudioAllowDTSHDPass>
        <AudioAllowDTSPass>true</AudioAllowDTSPass>
        <AudioAllowMP3Pass>true</AudioAllowMP3Pass>
        <AudioEncoderFallback>Ac3</AudioEncoderFallback>
      </AllowedPassthruOptions>
      <SubtitleTracks />
      <IncludeChapterMarkers>true</IncludeChapterMarkers>
      <ChapterNames />
      <X264Preset>Slower</X264Preset>
      <QsvPreset>Quality</QsvPreset>
      <H264Profile>High</H264Profile>
      <H264Level>4.1</H264Level>
      <X264Tune>Grain</X264Tune>
      <FastDecode>false</FastDecode>
      <X265Preset>VeryFast</X265Preset>
      <H265Profile>Main</H265Profile>
      <X265Tune>None</X265Tune>
      <PreviewStartAt xsi:nil="true" />
      <PreviewDuration xsi:nil="true" />
      <IsPreviewEncode>false</IsPreviewEncode>
      <PreviewEncodeDuration>0</PreviewEncodeDuration>
      <ShowAdvancedTab>false</ShowAdvancedTab>
    </Task>
    <UsePictureFilters>true</UsePictureFilters>
  </Preset>
</ArrayOfPreset>
```
