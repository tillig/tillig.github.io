---
layout: post
title: "Autofac and Autofac.Configuration 4.0.0-beta6 Released"
date: 2015-08-05 -0800
comments: true
tags: [autofac]
---

Today we pushed the following packages with support for DNX beta 6:

- [Autofac 4.0.0-beta6-110](https://www.nuget.org/packages/Autofac/4.0.0-beta6-110)
- [Autofac.Framework.DependencyInjection 4.0.0-beta6-110](https://www.nuget.org/packages/Autofac.Framework.DependencyInjection/4.0.0-beta6-110)
- [Autofac.Configuration 4.0.0-beta6-248](https://www.nuget.org/packages/Autofac.Configuration/4.0.0-beta6-248)

**This marks the first release of the Autofac.Configuration package for DNX and includes a lot of changes.**

Previous Autofac.Configuration packages relied on `web.config` or `app.config` integration to support configuration. With DNX, the new configuration mechanism is through [Microsoft.Framework.Configuration](https://www.nuget.org/packages/Microsoft.Framework.Configuration) and external configuration that isn't part of `web.config` or `app.config`.

While this makes for a cleaner configuration story with a lot of great flexibility, it means if you want to switch to the new Autofac.Configuration, you have some migration to perform.

[**There is a lot of documentation with examples on the Autofac doc site showing how new configuration works.**](http://autofac.readthedocs.org/en/latest/configuration/xml.html)

A nice benefit is you can now use JSON to configure Autofac, which can make things a bit easier to read. A simple configuration file might look like this:

``` json
{
    "defaultAssembly": "Autofac.Example.Calculator",
    "components": [
        {
            "type": "Autofac.Example.Calculator.Addition.Add, Autofac.Example.Calculator.Addition",
            "services": [
                {
                    "type": "Autofac.Example.Calculator.Api.IOperation"
                }
            ],
            "injectProperties": true
        },
        {
            "type": "Autofac.Example.Calculator.Division.Divide, Autofac.Example.Calculator.Division",
            "services": [
                {
                    "type": "Autofac.Example.Calculator.Api.IOperation"
                }
            ],
            "parameters": {
                "places": 4
            }
        }
    ]
}
```

If you want, you can still use XML, but it's not the same as the old XML - you have to make it compatible with Microsoft.Framework.Configuration. Here's the above JSON config converted to XML:

``` xml
<?xml version="1.0" encoding="utf-8" ?>
<autofac defaultAssembly="Autofac.Example.Calculator">
    <components name="0">
        <type>Autofac.Example.Calculator.Addition.Add, Autofac.Example.Calculator.Addition</type>
        <services name="0" type="Autofac.Example.Calculator.Api.IOperation" />
        <injectProperties>true</injectProperties>
    </components>
    <components name="1">
        <type>Autofac.Example.Calculator.Division.Divide, Autofac.Example.Calculator.Division</type>
        <services name="0" type="Autofac.Example.Calculator.Api.IOperation" />
        <injectProperties>true</injectProperties>
        <parameters>
            <places>4</places>
        </parameters>
    </components>
</autofac>
```

When you want to register configuration, you do that by building up your configuration model first and then registering that with Autofac:

``` c#
// Add the configuration to the ConfigurationBuilder.
var config = new ConfigurationBuilder();
config.AddJsonFile("autofac.json");

// Register the ConfigurationModule with Autofac.
var module = new ConfigurationModule(config.Build());
var builder = new ContainerBuilder();
builder.RegisterModule(module);
```

Again, [check out the documentation for some additional detail including some of the differences and new things we're supporting](http://autofac.readthedocs.org/en/latest/configuration/xml.html) using this model.

Finally, big thanks to the Microsoft.Framework.Configuration team [for working to get collection/array support into the configuration model](https://github.com/aspnet/Configuration/issues/115).