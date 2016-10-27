---
layout: post
title: "Windows 7 Supported Audio/Video Formats"
date: 2009-11-04 -0800
comments: true
disqus_identifier: 1586
tags: [media,windows]
---
In researching potential video formats for switching my DVD library from
VIDEO\_TS to something else ([due to file access time
issues](/archive/2009/10/26/one-year-retrospective-with-windows-home-server.aspx))
I found I had real trouble locating the list of audio and video formats
that Windows 7 supports out of the box. [The provided "supported
formats"
page](http://www.microsoft.com/windows/windows-media-center/learn-more/media-library/articles/media-library-file-types.aspx)
really isn't technical enough.

While I haven't determined which video format to move my library to, I
did get [a response to my question about this on the
forums](http://social.technet.microsoft.com/Forums/en-US/w7itpromedia/thread/fbdf8df9-b38c-4419-8a5d-19ee7ed0ef08).
Here's the info from there, for your convenience:

+----------------+----------------+----------------+----------------+----------------+
| Format Name    | File           | Container      | Video Decoders | Audio Decoders |
|                | Extensions     |                |                |                |
+================+================+================+================+================+
| MPEG-4         | .mp4 (A, V,    | ISO MPEG-4,    | H.264, MPEG-4  | AAC, MP3       |
|                | A+V) \         | AVI            | Advanced       |                |
|                | .m4a (A) \     |                | Simple Profile |                |
|                | .mov           |                | (ASP) and      |                |
|                |                |                | Simple Profile |                |
|                |                |                | (SP)           |                |
+----------------+----------------+----------------+----------------+----------------+
| 3GPP/3GPP2     | .3gp, .3g2 \   | 3GP            | H.264, MPEG-4  | AAC            |
|                | (A, V, A+V)    |                | Simple Profile |                |
|                |                |                | (SP)           |                |
+----------------+----------------+----------------+----------------+----------------+
| AAC            | .aac (A)       | ADTS           |                | AAC            |
+----------------+----------------+----------------+----------------+----------------+
| ASP in AVI     | .avi (V, A+V)  | AVI            | MPEG-4         | MP3, MS ADPCM  |
| (Compatible    |                |                | Advanced       |                |
| with DivX 4-6  |                |                | Simple Profile |                |
| video, Xvid    |                |                | (ASP)          |                |
| and 3ivx)      |                |                |                |                |
+----------------+----------------+----------------+----------------+----------------+
| AVCHD          | .m2t, m2ts,    | MPEG-2         | H.264          | Dolby Digital, |
|                | .mts (A, V,    | Transport      |                | LPCM           |
|                | A+V)           | Stream (TS)    |                |                |
+----------------+----------------+----------------+----------------+----------------+
| HDV            | .m2t, m2ts,    | MPEG-2         | MPEG-2         | MPEG-1 L2      |
|                | .mts (A, V,    | Transport      |                | (Layer 2)      |
|                | A+V)           | Stream (TS)    |                |                |
+----------------+----------------+----------------+----------------+----------------+

Or, split/arranged a different way:

+--------------------------------------+--------------------------------------+
| Category                             | Supported Types                      |
+======================================+======================================+
| Video Decoders                       | -   H.264/AVC Baseline, Main and     |
|                                      |     High Profiles (new in Windows 7) |
|                                      | -   MPEG-4 Advanced Simple Profile   |
|                                      |     (new in Windows 7) besides       |
|                                      |     Simple Profile                   |
|                                      | -   Subset of H.263 that overlaps    |
|                                      |     with MPEG-4 SP                   |
|                                      | -   Motion JPEG (new in Windows 7)   |
|                                      | -   WMV variants including VC1 and   |
|                                      |     WMV Screen                       |
|                                      | -   MPEG-1 and -2                    |
|                                      | -   DV                               |
+--------------------------------------+--------------------------------------+
| Audio Decoders                       | -   AAC, HE-AAC, HE-AAC v2 (new in   |
|                                      |     Windows 7)                       |
|                                      | -   Dolby Digital Plus (new in       |
|                                      |     Windows 7) besides Dolby         |
|                                      |     Digital/AC-3                     |
|                                      | -   WMA family of music decoders and |
|                                      |     speech decoders                  |
|                                      | -   MP3                              |
|                                      | -   MPEG-1 and -2                    |
+--------------------------------------+--------------------------------------+
| Image Decoders                       | -   HD Photo (JPEG-XR)               |
|                                      | -   JPEG                             |
|                                      | -   PNG                              |
|                                      | -   BMP                              |
|                                      | -   TIFF                             |
|                                      | -   GIF                              |
|                                      | -   ICO (Icon Format)                |
+--------------------------------------+--------------------------------------+
| Containers                           | -   MP4 and its close cousins MOV,   |
|                                      |     3GP, M4A (new in Windows 7)      |
|                                      | -   Media Center's WTV (new in Win7  |
|                                      |     and Media Center TV Pack) and    |
|                                      |     DVR-MS                           |
|                                      | -   MPEG-2 Transport Streams and its |
|                                      |     cousin AVCHD                     |
|                                      | -   MPEG-1 and -2 Program Streams    |
|                                      | -   AVI, WAV                         |
|                                      | -   ASF                              |
|                                      | -   DVD                              |
|                                      | -   ADTS                             |
+--------------------------------------+--------------------------------------+



