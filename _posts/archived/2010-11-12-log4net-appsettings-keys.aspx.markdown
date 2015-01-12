---
layout: post
title: "log4net AppSettings Keys"
date: 2010-11-12 -0800
comments: true
disqus_identifier: 1681
tags: [net]
---
There doesn't appear to be anywhere on the log4net site where the "magic
app setting keys" are listed with their explanations and I always have
to re-discover them on each project, so I figured I'd post them for
later.

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Key                        Type      Description                                                                                                                                                                                                                                                                                                                                                      Example Values
  -------------------------- --------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------
  `log4net.Config`           string    Application-relative path to the default log4net XML configuration file. If you populate this value, the first time you get a logger on the default repository log4net will read and auto-configure itself using this file. Note that it doesn't set a FileSystemWatcher on it so if you change the file later the changes won't be automatically picked up. \   `config\log4net.config            ``http://remoteserver/config/log4net.config`
                                        
                                       The value can also be a URL to an external file. If it is, log4net will actually do a WebRequest and go get the remote configuration file.                                                                                                                                                                                                                       

  `log4net.Internal.Debug`   Boolean   Enables logging for log4net itself. If you're writing custom log appenders or other things that integrate with log4net, this is super helpful                                                                                                                                                                                                                    `true            ``false`

  `log4net.Internal.Quiet`   Boolean   Silences the log4net internal logging. Overrides the value set for `log4net.Internal.Debug`.                                                                                                                                                                                                                                                                     `true            ``false`
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Here's a sample configuration file snippet that shows these in action.

    <?xml version="1.0"?>
    <configuration>
      <appSettings>
        <add key="log4net.Config" value="config\log4net.config" />
        <add key="log4net.Internal.Debug" value="false" />
      </appSettings>
    </configuration>

