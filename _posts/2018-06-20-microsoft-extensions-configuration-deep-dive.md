---
layout: post
title: "Deep Dive into Microsoft Configuration"
date: 2018-06-20 -0800
comments: true
tags: [net,json,xml]
description: ".NET Core introduced Microsoft.Extensions.Configuration as a replacement for app.config but there are a lot of things to know if you're going to use it effectively. This article tries to dive deeper into some of those topics."
---

When .NET Core was released, a new configuration mechanism came with it: [Microsoft.Extensions.Configuration](https://github.com/aspnet/Configuration). It's an improvement over the `System.Configuration` namespace in a lot of ways and much simpler to use, but there is still a lot to know to effectively take advantage of the features. This post tries to clarify some of the usage patterns and how the new system works based on questions and common issues I've seen "in the wild."

Also, it's [definitely worth looking at the official docs](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/configuration/?view=aspnetcore-2.1&tabs=basicconfiguration) since there are great examples in there, too.

**As of this writing, .NET Core 2.1.1 is out.** That's the version I'll be writing about here. If you show up in a year or three, this could be out of date.

# Everything is Key/Value

The most important thing to know about the new configuration system is that **everything boils down to key/value pairs**. You may have a pseudo-hierarchy of these key/value pairs so you can walk it like a tree, but in the end it's still key/value pairs, like a dictionary. No matter the input format, it all gets normalized.

- Keys are case-insensitive.
- Values are strings.
- The hierarchy delimiter is `:` when querying parsed configuration.
- Every configuration provider flattens their structure down to the same normalized format.

Let's look at some samples and see how they flatten out.

Here's a JSON file with some configuration:

```json
{
  "logging": {
    "enabled": true,
    "level": "Debug"
  },
  "components": {
    "database": {
      "connection": "connection-string"
    },
    "files": {
      "path": "/etc/path"
    }
  }
}
```

When this flattens out, you get:

```
components:database:connection = "connection-string"
components:files:path = "/etc/path"
logging:enabled = "True"
logging:level = "Debug"
```

I've sorted the configuration keys for easier reading. As you can see, it's all strings. The Boolean `true` has been converted to its string representation `True`.

Let's look at _the same configuration_ but in XML format:

```xml
<?xml version="1.0" encoding="utf-8" ?>
<root>
    <logging enabled="True">
        <level>Debug</level>
    </logging>
    <components>
        <database connection="connection-string" />
        <files path="/etc/path" />
    </components>
</root>
```

Things to notice in the XML format:

- The `<root>` element is throwaway. Configuration ignores the root element.
- You can specify child configuration items as _attributes_ or as _child elements with text_.
- The `logging:enabled` setting in XML is `True` to generate the same output as the JSON. If it had been `true`, since it's a string, the parsed output would have had `logging:enabled = "true"`.

Something important to note is that **`name` has a special meaning in XML configuration**. If you add a `name` attribute to an XML element it uniquely identifies that element. We'll get more into that later with _Ordinal Collections_ and _Advanced XML_.

Now that we've seen XML, how about INI format?

```ini
[logging]
enabled=True
level=Debug

[components]
files:path=/etc/path

[components:database]
connection=connection-string
```

Things to notice in the INI format:

- You can put a `:` in headings or in keys and it'll generate the proper flattened format.
- As with XML, the `logging:enabled` setting is `True` since it's a string by default and won't be seen as a Boolean.

You can specify configuration as environment variables! Since `:` doesn't work well in environment variables in all systems, you use `__` in the actual environment variable and it will get converted.

```batch
set COMPONENTS__DATABASE__CONNECTION=connection-string
set COMPONENTS__FILES__PATH=/etc/path
set LOGGING__ENABLED=True
set LOGGING__LEVEL=Debug
```

This will generate the keys in all caps, but that's OK because _keys are case insensitive_. You can still access them using lower case names like `logging:enabled` and you'll get the right thing.

Note by default the environment variable configuration source will bring _all environment variables in._ Maybe you want that, maybe you don't. I'll talk later about _Environment Variable Prefixes_ to show you how to filter and only get what you want.

And let's finish up with command line parameters:

`mycommand.exe --components:database:connection=connection-string --components:files:path=/etc/path --logging:enabled=True --logging:level=Debug`

Each switch gets converted to be a key and the value after the equals sign is the value. You can also do space delimited:

`mycommand.exe --components:database:connection connection-string --components:files:path /etc/path --logging:enabled True --logging:level Debug`

**Don't mix and match.** If some things have equals and some don't, weird things happen. For example, this:

`mycommand.exe --badswitch --goodswitch=value`

Yields this config:

```
badswitch = "--goodswitch=value"
```

I'll talk more about this later in the "Advanced Command Line" section.

# Overriding Values

One of the coolest things (I think) about the way the Microsoft Configuration system works is that you can use all these providers and set up a _configuration precedence_ to layer differnet config sources on top of each other.

For example, a common way to go in ASP.NET Core is:

- Base `appsettings.json`
- Environment-specific `appsettings.{EnvironmentName}.json`
- Environment variables
- Command line parameters

In this manner, the application can ship with some core defaults (`appsettings.json`). If you have environment-specific settings that don't need to change (without re-deploying a file) you could have an environment-specific JSON file like `appsettings.Staging.json` or `appsettings.Production.json`. Layer some environment variables on the top for things that get wired up on the fly (like URLs to services) or maybe API keys/secrets that need to be used by the app. Finally, last-minute must-have overrides that can go on the command line, like which port to listen on.

Building that up might look like this:

```csharp
var config = new ConfigurationBuilder()
  .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
  .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true, reloadOnChange: true)
  .AddEnvironmentVariables()
  .AddCommandLine(args)
  .Build();
```

Let's see what happens when we layer some configuration on. Pretend we're in the `Staging` environment and here's what's out there:

`appsettings.json` has...

```json
{
  "logging": {
    "includeScopes": false,
    "logLevel": {
      "default": "Debug"
    }
  }
}
```

`appsettings.Staging.json` has...

```json
{
  "logging": {
    "logLevel": {
      "default": "Warning"
    }
  }
}
```

Environment variables:

```batch
set ASPNETCORE_ENVIRONMENT=Staging
set LOGGING__LOGLEVEL__MICROSOFT=Information
```

Command line arguments:

`dotnet run --urls=http://*:5005`

What does that yield?

```
aspnetcore_environment = "Staging"
logging:includescopes = "False"
logging:loglevel:default = "Warning"
logging:loglevel:microsoft = "Information"
urls = "http://*:5005"
```

There are a few interesting things here.

- If you use the same _key_ in an override configuration, it will replace the corresponding _value_.
- You can _add_ configuration at override time, but **you can't _remove_ things**. The best you can do is _override a value with an empty string_.
- The `ASPNETCORE_ENVIRONMENT` value is `Staging`, which is a sort of [magic value for ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/host/web-host?view=aspnetcore-2.1&tabs=aspnetcore2x). I'll talk more about that later in _Environment Variable Prefixes_. That said, you'll also see it in the config as a flattened value if you choose to import everything. It gets the underscore in the name because it's not double-underscore `__` (the usual delimiter).
- The `urls` value will be picked up by the ASP.NET Core web host and that's what port it'll listen on. If you add arguments to your config, you'll see it, too.

I mentioned overriding with an empty string as a "fake way" to remove configuration. Specifying `null` as a value, even in JSON config, doesn't work. It reads the value and uses an empty string as the value instead of null. Further, there's no XML analogy to `null`, nor are there such analogies in most other providers.

Given everything in the config system is a key/value string pair, the closest you can get, then, is to set things to empty strings. When you read values, check for `String.IsNullOrEmpty()` before using the value.

**Since you can't remove things, specify _as little configuration as possible_ and behave correctly using defaults in your code when configuration isn't there.** This will save you a lot of time when you have some base configuration specifying a value that you don't want and you can't figure out how to override and "remove it."

# Ordinal Collections (Arrays)

Ordinal collections (think arrays) are a sort of interesting special case in configuration. It's pretty easy to think about it when using JSON like this:

```json
{
    "components": [{
        "database": {
            "enabled": true
        }
    }, {
        "files": {
            "enabled": false
        }
    }]
}
```

It's an array of two objects. But how does that _flatten out into key/value pairs_?

This is a big one, since JSON, INI, XML, environment variables, command line parameters, and other config sources all need to work together. You don't have "arrays" in environment variables. So what does it look like?

The answer is that **numeric 0-based keys get generated for each element**. The flattened config looks like this:

```
components:0:database:enabled = "True"
components:1:files:enabled = "False"
```

Knowing how this works is huge because when you try to intermingle different configuration formats and override values, you have to generate _the same key structure_.

Let's look at the same thing in XML:

```xml
<?xml version="1.0" encoding="utf-8" ?>
<root>
    <components name="0">
        <database enabled="True" />
    </components>
    <components name="1">
        <files enabled="false" />
    </components>
</root>
```

Notice in XML we had to _manually specify the numeric key_. As mentioned earlier, **`name` has a special meaning in XML configuration**. If you add a `name` attribute to an XML element it uniquely identifies that element. For ordinal collections the name is the index in the collection.

For reference let's look at some _bad XML configuration_ for ordinal collections:

```xml
<?xml version="1.0" encoding="utf-8" ?>
<!-- THIS WON'T WORK! MISSING NAMES! -->
<root>
    <components>
        <database enabled="True" />
    </components>
    <components>
        <files enabled="false" />
    </components>
</root>
```

This version missing names will generate:

```
components:database:enabled = "True"
components:files:enabled = "False"
```

Notice it's missing the _index_ part of the key. If you had JSON and XML config in the same system, the overrides would fail.

Let's look at INI:

```ini
[components:0]
database:enabled=True

[components:1]
files:enabled=False
```

INI files don't have a notion of ordinal collections so you need to manually specify the indexes in the keys.

Environment variables also gets manual specification:

```batch
set COMPONENTS__0__DATABASE__ENABLED=True
set COMPONENTS__1__FILES__ENABLED=False
```

So do command line parameters:

`mycommand.exe --components:0:database:enabled=True --components:0:files:enabled=False`

What happens if you skip an index?

```xml
<?xml version="1.0" encoding="utf-8" ?>
<root>
    <components name="1">
        <database enabled="True" />
    </components>
    <components name="4">
        <files enabled="false" />
    </components>
</root>
```

**It doesn't matter. It's all just string key/value.** The above XML will become:

```
components:1:database:enabled = "True"
components:4:files:enabled = "False"
```

Given that, how do we override things?

Let's say we start with a JSON file like we had before:

```json
{
    "components": [{
        "database": {
            "enabled": true
        }
    }, {
        "files": {
            "enabled": false
        }
    }]
}
```

We want to _enable the files component_ at runtime via the environment. To do that, we'd set an environment variable like this:

```batch
set COMPONENTS__1__FILES__ENABLED=True
```

If you then layer environment variables over the JSON configuration you'll get the desired effect:

```
components:0:database:enabled = "True"
components:1:files:enabled = "True"
```

How would you layer _two JSON files_ to get this to work?

You have to **fake out the indexing mechanism**. You can do this one of two ways. First, you can use _empty objects_ to pad out your overrides file:

```json
{
    "components": [{}, {
        "files": {
            "enabled": true
        }
    }, ]
}
```

The presence of the empty object there pushes the index of the "files" object forward so it matches the original index.

The other option is to just specify the index right in a key:

```json
{
    "components:1": {
        "files": {
            "enabled": true
        }
    }
}
```

Notice the index is in the key and there's no array at all. Either way it will flatten out and get the desired result.

**The complexity around ordinal collections is something to consider when you're picking a configuration format.** Especially if you want to override something in the environment or via command line at runtime, you'll have to know which _index_ to use in your override.

# No Built-In Validation

One of the things that made the old System.Configuration mechanism nice was the ability to put pretty rich type converters, default values, and configuration validation into the `ConfigurationSection` you write. The new Microsoft.Extensions.Configuration mechanism doesn't have any of this. You can sort of fake it by binding configuration to objects (which I'll cover later) but there's no notion of configuration "schema" or any sort of validation/annotation you can provide to ensure values are in a form you expect.

To that end, **make sure you validate your configuration values before using them.** Maybe that's parsing things into strong object models (see below), maybe it's checking that values are in an expected format. It's not built in so it's up to you. **In the next section I'll show you an example of how to use Data Annotations validation with configuration binding.**

Also, **use `String.IsNullOrEmpty()` to check for presence/absence of values**. If you only check against `null` then you won't be able to "remove" configuration later if you need to by setting it to an empty string.

# Configuration Object Model

It really helps to know how to navigate around the configuration object model if you're going to do more than read just a small set of values.

You start your configuration with a `ConfigurationBuilder`. This is the object to which you'll attach the various things providing configuration.

```csharp
var builder = new ConfigurationBuilder();

builder.AddJsonFile("appsettings.json")
       .AddXmlFile("appsettings.xml")
       .AddIniFile("appsettings.ini")
       .AddEnvironmentVariables()
       .AddCommandLine(args);
```

The builder doesn't actually invoke any of the things that read configuration. It just gives you an opportunity to specify your configuration _sources_. It also has a `Properties` dictionary on it that you can use when people register sources. For example, if you wanted to ensure a particular source only gets registered one time with a `ConfigurationBuilder`, you could synchronize on that `Properties` dictionary.

Each time you call one of the extensions (`AddJsonFile`, `AddXmlFile`) that adds an `IConfigurationSource` to the `ConfigurationBuilder`. The `ConfigurationBuilder` keeps track of these until you tell it to `Build()`.

Each `IConfigurationSource` is responsible for building an `IConfigurationProvider`. When `ConfigurationBuilder.Build()` is called, each `IConfigurationSource.Build()` is called in turn to build the configuration providers.

An `IConfigurationProvider` is what actually reads in and parses the configuration. It provides a normalized view on top of the configuration so the system can query the key/value pairs and have them all nice, flat, and colon-delimited.

You have a _set_ of these configuration providers, so you need something to handle the "merging" of all the providers and provide that single, unified view. This is where the `IConfigurationRoot` comes in. It keeps track of the final, built set of providers. This is what comes out of `ConfigurationBuilder.Build()`.

When you ask an `IConfigurationRoot` for a configuration item, it iterates through the set of providers (in reverse order - that's how the "override" works) until it finds the value, then returns the first value found. **If no value is found, it returns `null`.**

From the `IConfigurationRoot` you can ask directly for a key like `logging:level` _or_ you can ask for an `IConfigurationSection`, which gives you a localized view of a sub-tree of the configuration. `root.GetSection("logging")` will get you the part of configuration that starts with `logging:`.

Everything under the `IConfigurationRoot` is an `IConfigurationSection`. This is where you'll spend most of your time. An `IConfigurationSection` has these methods and properties:

- `Key`: The local config key based on the current section. If you were looking at the `logging:level` section, the `Key` would be `level`.
- `Path`: The full path to the key from the root of config. This would be like `logging:level`.
- `Value`: If the configuration key has a value, this is it. Otherwise this value will be `null`.
- `this[key]`: The configuration value of a child of this section.
- `GetSection(key)`: Gets a child `IConfigurationSection` of this section.
- `GetChildren()`: Gets the set of all child `IConfigurationSection` values from this section.
- `GetReloadToken()`: Gets the change token that the configuration system is watching for configuration changes.

This is easier to see if we look at some code. Let's say we have the following configuration:

`appsettings.json`:

```json
{
  "debug": true,
  "logging": {
    "includeScopes": false,
    "logLevel": {
      "default": "Debug"
    }
  }
}
```

`overrides.json`:

```json
{
  "logging": {
    "logLevel": {
      "default": "Warning"
    }
  }
}
```

The flattened configuration will look like:

```
debug = "True"
logging:includescopes = "False"
logging:loglevel:default = "Warning"
```

Let's build the configuration and wander around.

```csharp
// This will track the configuration sources we'll merge.
var builder = new ConfigurationBuilder();

// Add two JsonConfigurationProviders to the builder.
builder.AddJsonFile("appsettings.json")
       .AddJsonFile("overrides.json");

// Run through all the providers and build up the sources.
// This will actually read the JSON files and parse them.
var configRoot = builder.Build();

// Ask for a value by absolute path. This will be
// the string "False"
var includeScopes = configRoot["logging:includescopes"]

// Grab the logging section so we can look at it.
var loggingSection = configRoot.GetSection("logging");
foreach(var child in loggingSection.GetChildren())
{
    // Inspect the path, key, and value of each child.
    // This will output:
    //
    // logging:includeScopes (includeScopes) = False
    // logging:logLevel (logLevel) = (null)
    //
    // Notice the path is the absolute path, the key is
    // relative to the parent section. Also notice it's
    // only _immediate_ children you get.
    Console.WriteLine(
      "{0} ({1}) = {2}",
      child.Path,
      child.Key,
      child.Value ?? "(null)")
}

// You can get the logging:loglevel section by absolute path...
var logLevelSection = configRoot.GetSection("logging:loglevel");
// ...or you can get it as a child of the logging section we got earlier...
logLevelSection = loggingSection.GetSection("loglevel");

// Now we can look at the children again:
foreach(var child in logLevelSection.GetChildren())
{
    // This will output:
    //
    // logging:logLevel:default (default) = Warning
    Console.WriteLine(
      "{0} ({1}) = {2}",
      child.Path,
      child.Key,
      child.Value ?? "(null)")
}

// What happens if we ask for something that doesn't exist?
// WE GET BACK AN EMPTY SECTION, NOT AN EXCEPTION. You can't
// ask for a specific section by name to test if it was defined
// in configuration.
var doesNotExist = configRoot.GetSection("does:not:exist");

// This will output:
//
// does:not:exist (exist) = (null)
Console.WriteLine(
  "{0} ({1}) = {2}",
  doesNotExist.Path,
  doesNotExist.Key,
  doesNotExist.Value ?? "(null)")

// If you absolutely need to check to see if something _exists_
// rather than if it's just null (undefined), you need to look at
// the _parent section_ to see if it has a child with the name.
// Make sure you do a case-insensitive comparison! Keys aren't
// case sensitive.
var checkSectionExists =
    configRoot.GetSection("does:not")
              .GetChildren()
              .Any(c =>
                   c.Key.Equals("exist", StringComparison.OrdinalIgnoreCase));

```

As you can see, there is a lot of power in the new system, but also a little challenge with respect to checking for values or existence of an item. Also, since everything comes out as strings, it means a lot of parsing... but hold on, check this next section out.

# Binding to Objects

Since everything comes out as strings one of the first things you're likely going to do is parse the strings into strongly typed objects. You're going to have a lot of `Int32.TryParse()` and stuff all over the place. But wait! There's another package for you!

**Microsoft.Extensions.Configuration.Binder brings the parsing to you.** If you don't want to stay in string-land, this package adds helpful configuration binding/conversion to the mix.

Let's say we have a configuration that looks like this:

```
debug = "True"
logging:includescopes = "False"
logging:loglevel:default = "Warning"
logging:maxmessagelength = "255"
```

Cool. Once we've built up the configuration root, we can start getting parsed values pretty easily:

```csharp
// maxMessageLength will be the integer 255
// Note keys are case-insensitive so we can use camelCase here
// in our code if we really want.
var maxMessageLength = configRoot.GetValue<int>("logging:maxMessageLength");

// debug will be the Boolean true
var debug = configRoot.GetValue<bool>("debug");

// includeScopes will be the Boolean false
var loggingSection = configRoot.GetSection("logging");
var includeScopes = loggingSection.GetValue<bool>("includeScopes");
```

OK, that works well for getting one-off values. What if we want to get a whole section of values at the same time? Sure. You can create a couple of object classes like this:

```csharp
public class LoggingSection
{
    public bool IncludeScopes { get; set; }
    public int MaxMessageLength { get; set; }
    public LogLevelSettings LogLevel { get; set; }
}

public class LogLevelSettings
{
    public Microsoft.Extensions.Logging.LogLevel Default { get; set; }
    public Microsoft.Extensions.Logging.LogLevel Identity { get; set; }
}
```

Now you can read and parse the whole thing at once.

```csharp
var logSettings = configRoot.GetSection("logging").Get<LoggingSection>();

// This will output:
//
// Max message length: 255
// Include scopes: False
// Default level: Warning
// Identity level: Trace
Console.WriteLine("Max message length: {0}", logSettings.MaxMessageLength);
Console.WriteLine("Include scopes: {0}", logSettings.IncludeScopes);
Console.WriteLine("Default level: {0}", logSettings.LogLevel.Default);
Console.WriteLine("Identity level: {0}", logSettings.LogLevel.Identity);
```

That's pretty cool, right?

But, wait, how did `logSettings.LogLevel.Identity` become `LogLevel.Trace`?

You noticed there's no configuration for that. Since that's not defined the value becomes `default(T)`, in this case, the default value for the `Microsoft.Extensions.Logging.LogLevel` enumeration, which is `LogLevel.Trace`.

Under the covers, the configuration binder is mostly using type converters obtained from `System.ComponentModel.TypeDescriptor.GetConverter(Type)` to convert values from string. If you need more robust support, like deserializing list values or custom types, you'll need to implement base .NET type conversion on your type and enable string deserialization.

Anyway, once you have it deserialized, you can validate on the values if needed. For example, you could use the `System.ComponentModel.DataAnnotations` validation pretty easily with some attributes...

```csharp
public class LoggingSection
{
    public bool IncludeScopes { get; set; }

    // The max length has to be between 10 and 100...
    // but the configuration is set at 255 right now!
    [Range(10, 100)]
    public int MaxMessageLength { get; set; }
    public LogLevelSettings LogLevel { get; set; }
}
```

Then run the validation yourself:

```csharp
var loggingSection = config.GetSection("logging").Get<LoggingSection>();
var validationResults = new List<ValidationResult>();

// This will output:
//
// Logging configuration is invalid!
// - The field MaxMessageLength must be between 10 and 100.
if (!Validator.TryValidateObject(
      loggingSection,
      new ValidationContext(loggingSection),
      validationResults,
      true))
{
  Console.WriteLine("Logging configuration is invalid!");
  foreach (var validationResult in validationResults)
  {
    Console.WriteLine("- {0}", validationResult.ErrorMessage);
  }
}
```

# Default Providers

Out of the box there are several providers shipped (you can always see the latest [in the repo](https://github.com/aspnet/Configuration/)):

- Azure Key Vault (bind secrets from the vault into your app)
- Command Line
- Environment Variables
- INI Files
- JSON Files
- Key-Per-File (bind a directory of files as config - file name is the key, file contents are the value)
- User Secrets (dev-time secrets that normally get replaced by something like Azure Key Vault in production)
- XML Files

Any or all of these can be used together to layer configuration into your application. You can also write your own custom provider to, for example, read configuration out of Redis or SQL.

# Refreshing on Change

When configuration is initially built the usual pattern is to read all the configuration from the underlying source and store it in-memory in a dictionary for later retrieval.

Some (but not all) configuration providers allow for the configuration source to change at runtime and have that source reload its configuration to pick up changes.

Out of the box, the providers that allow for reload on change are the file-based providers:

- INI Files
- JSON Files
- XML Files

Conversely, some providers do not handle change events. In this case, you'd have to manually rebuild configuration or handle the change/update yourself. Usually this is either because there's not a reasonable way to receive a change event; or it doesn't make sense that the values would change during runtime:

- Azure Key Vault
- Command Line
- Environment Variables
- Key-Per-File
- User Secrets (the underlying provider here is JSON files but the code specifically turns off the reload on change flag)

# Environment Variable Prefixes

When you use environment variables as a configuration source, you may get a lot of junk you didn't really want. To avoid that, you can signal the provider to only include variables that have a given prefix.

Let's say you have these environment variables:

```batch
set RANDOM_VALUE=BlipBlipBlip
set COMPONENTS__DATABASE__CONNECTION=connection-string
set COMPONENTS__FILES__PATH=/etc/path
set LOGGING__ENABLED=True
set LOGGING__LEVEL=Debug
```

If you added all the environment variables like this...

```csharp
var config = new ConfigurationBuilder()
    .AddEnvironmentVariables()
    .Build();
```

You'd get everything, even maybe stuff you don't want:

```
components:database:connection = "connection-string"
components:files:path = "/etc/path"
logging:enabled = "True"
logging:level = "Debug"
random_value = "BlipBlipBlip"
```

Uh oh, that `random_value` snuck in. Instead, let's prefix the variables we like:

```batch
set RANDOM_VALUE=BlipBlipBlip
set CONFIGURATION_COMPONENTS__DATABASE__CONNECTION=connection-string
set CONFIGURATION_COMPONENTS__FILES__PATH=/etc/path
set CONFIGURATION_LOGGING__ENABLED=True
set CONFIGURATION_LOGGING__LEVEL=Debug
```

Now specify a prefix in the configuration build:

```csharp
var config = new ConfigurationBuilder()
    .AddEnvironmentVariables("CONFIGURATION_")
    .Build();
```

The prefix gets trimmed off and the correct environment variables make it in:

```
components:database:connection = "connection-string"
components:files:path = "/etc/path"
logging:enabled = "True"
logging:level = "Debug"
```

**There are some prefixes that have special meaning.**

Out of the box, there are several prefixes that automatically provide help in configuration of connection strings.

- `MYSQLCONNSTR_` - MySQL connection string
- `SQLAZURECONNSTR_` - SQL Azure connection string
- `SQLCONNSTR_` - SQL connection string
- `CUSTOMCONNSTR_` - Custom provider connection string

If you use these, it deserializes differently.

```batch
set MYSQLCONNSTR_MYSQLDATABASE=connect-to-mysql
set SQLAZURECONNSTR_SQLAZUREDATABASE=connect-to-sqlazure
set SQLCONNSTR_SQLDATABASE=connect-to-sql
set CUSTOMCONNSTR_CUSTOMRESOURCE=connect-to-custom
```

If you bring all of the environment variables in (don't specify a prefix) you get:

```
connectionstrings:customresource = "connect-to-custom"
connectionstrings:mysqldatabase = "connect-to-mysql"
connectionstrings:mysqldatabase_providername = "MySql.Data.MySqlClient"
connectionstrings:sqlazuredatabase = "connect-to-sqlazure"
connectionstrings:sqlazuredatabase_providername = "System.Data.SqlClient"
connectionstrings:sqldatabase = "connect-to-sql"
connectionstrings:sqldatabase_providername = "System.Data.SqlClient"
```

The prefix indicates which database provider will be automatically added to configuration. This appears to be primarily useful in moving Azure environment variables over to the application environment.

ASP.NET Core also has several things it uses in the `ASPNETCORE_` prefix. [The complete list is in the documentation](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/host/web-host?view=aspnetcore-2.1&tabs=aspnetcore2x) but some common ones are:

- `ASPNETCORE_ENVIRONMENT`: Defines the environment name. Typically `Development`, `Staging`, or `Production`.
- `ASPNETCORE_URLS`: Defines the addresses/ports on which the server should listen.
- `ASPNETCORE_WEBROOT`: If your web root isn't `wwwroot`, this override can be used to point to the new location.

# Advanced Command Line

When you add command line parameters to configuration, the parser lets you use one of two formats:

- Each argument is a pair separated by `=` like `--key=value`
- Argument pairs are used so they alternate key/value/key/value like `/key value`

It doesn't matter which format you use, but you have to pick one. You can't mix and match.

Rules for specifying keys:

- Keys can start with `-`, `--`, or `/` (and you can mix/match these)
- If a key starts with `-` it's considered to be a shortened version of a longer key so you need to provide a mapping.
- If you specify the same key on the command line twice, last in wins.

Here are some examples:
```powershell
# YES
myapp.exe --key1 value1 /key2 value2 -k3 value3
myapp.exe --key1=value1 --key2=value2 /key3=value3

# NO (can't use both space and equals for delimiters)
myapp.exe --key1 value1 /key2=value2
```

Notice in that first example line there's a short switch `-k3`. To use that, we'd need to provide a mapping to a longer key or we'll get an exception.

```csharp
var mappings = new Dictionary<string, string>
{
    // Be sure to include the leading dash on the key
    // but leave it off the value!
    { "-k3", "key3" }
};
var config = new ConfigurationBuilder()
    .AddCommandLine(args, mappings)
    .Build();
```

Finally, be aware that, like with environment variable prefixes, some systems you work with will find special meaning in some command line switches. For example, if you're working with ASP.NET Core, the web host accepts a `--urls` command line parameter [as the set of locations on which it should listen](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/host/web-host?view=aspnetcore-2.1&tabs=aspnetcore2x).

There's no built-in filtering for command line arguments the way there is for environment variables with prefixes, so be aware when you're building your app.

# Advanced XML

Given the previous .NET configuration system was so rooted in XML it's understandable that many folks coming in start out looking at how to transform existing XML config into new XML config.

It's your call if you decide to do that, but be aware of a few things when using XML:

- You can't include a DTD or parsing will fail.
- You can't include a namespace or parsing will fail.
- You can't include elements that may be perceived as "duplicates" or parsing will fail. You must disambiguate with the `name` attribute.

That last one can easily bite you. Let's look at an XML file with some gotchas:

```xml
<?xml version="1.0" encoding="utf-8" ?>
<!-- THIS IS AN INVALID FILE -->
<root>
  <components route="100">
    <database enabled="True" />
  </components>
  <components route="200">
    <database enabled="False" />
    <files enabled="False" />
  </components>
</root>
```

So, we don't have any DTD or namespaces, so that's fine, but what else is wrong?

There are two `components` elements that the parser will see as identical. Even though the `route` values are different, the parser will still see them as redefining the same thing twice. We need to disambiguate with names. Let's change `route` to `name`.

```xml
<?xml version="1.0" encoding="utf-8" ?>
<!-- THIS IS A VALID FILE -->
<root>
  <components name="100">
    <database enabled="True" />
  </components>
  <components name="200">
    <database enabled="False" />
    <files enabled="False" />
  </components>
</root>
```

Note even though there's a `database` element in both `components` elements, they're not seen as identical because the parent on each has a `name`. It'll flatten out to this:

```
components:100:database:enabled = "True"
components:100:name = "100"
components:200:database:enabled = "False"
components:200:files:enabled = "True"
components:200:name = "200"
```

As you can see, `name` shows up in the key hierarchy and becomes a key/value of its own. In any case, you need that to disambiguate.

If you have multiple XML files, you can add a prefix on the elements by setting a `name` on the root element:

```xml
<?xml version="1.0" encoding="utf-8" ?>
<root name="settings">
  <components>
    <database enabled="False" />
    <files enabled="False" />
  </components>
</root>
```

This will become:

```
settings:components:database:enabled = "False"
settings:components:files:enabled = "False"
settings:name = "settings"
```

One thing you can do in XML that you can't in the other providers is encrypt the XML. Encrypted XML generally looks like this:

```xml
<?xml version="1.0" encoding="utf-8" ?>
<root name="settings">
  <components>
    <database enabled="False" />
    <EncryptedData Type="http://www.w3.org/2001/04/xmlenc#Element"
                   xmlns="http://www.w3.org/2001/04/xmlenc#">
      <EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#aes256-cbc" />
      <KeyInfo xmlns="http://www.w3.org/2000/09/xmldsig#">
        <EncryptedKey xmlns="http://www.w3.org/2001/04/xmlenc#">
          <EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#kw-aes128" />
          <KeyInfo xmlns="http://www.w3.org/2000/09/xmldsig#">
            <KeyName>myKey</KeyName>
          </KeyInfo>
          <CipherData>
            <CipherValue>KPE...SNg==</CipherValue>
          </CipherData>
        </EncryptedKey>
      </KeyInfo>
      <CipherData>
        <CipherValue>Vwl8...64a</CipherValue>
      </CipherData>
    </EncryptedData>
  </components>
</root>
```

The encrypted XML portion entirely replaces the element being encrypted along with all its contents. This is commonly used to encrypt passwords or other secrets in XML.

A full example showing both how to encrypt and decrypt XML in configuration is seen [in the XML configuration provider unit tests](https://github.com/aspnet/Configuration/blob/7405009c24b4fbbc33e872cf7fbff98a9fa946e4/test/Config.Xml.Test/XmlConfigurationTest.cs#L401-L452).

# Testing Using launchSettings.json

You will no doubt want to test your configuration setup to ensure things are being read in/parsed correctly. That's easy when it's file based, but what about command line parameters and environment variables?

Visual Studio and .NET Core allow you to put a file called `launchSettings.json` in the `Properties` folder under your project. You'll get one for free with an ASP.NET project, but it works fine with .NET console apps, too.

[The full JSON schema for `launchSettings.json` is available](https://github.com/SchemaStore/schemastore/blob/master/src/schemas/json/launchsettings.json) but here's one that works for a .NET console app:

```json
{
  "profiles": {
    "No Config": {
      "commandName": "Project",
      "environmentVariables": {
      }
    },
    "Environment Config": {
      "commandName": "Project",
      "environmentVariables": {
        "CONFIGURATION_COMPONENTS__DATABASE__CONNECTION": "connection-string",
        "CONFIGURATION_COMPONENTS__FILES__PATH": "/etc/path",
        "MYSQLCONNSTR_MYSQL": "MySQL"
      }
    },
    "Command Line Config": {
      "commandName": "Project",
      "commandLineArgs": "--components:database:connection=connection-string /components:files:path=/etc/path"
    }
  }
}
```

When you add that to your project, Visual Studio will detect that you have three different run configurations you can choose from. They'll appear as a dropdown next to the green "Play" button so you can select one before you start debugging.

This is a really great way to do quick configuration changes without modifying base configuration files or code.

In an ASP.NET Core project, you'll likely see there's an element under `environmentVariables` called `ASPNETCORE_ENVIRONMENT`. You can use that to switch your local dev work to emulate staging or production.

# Key Takeaways

It's a long article, so there are a lot of takeaways.

- It's all colon-delimited key/value pairs.
- Override values by using the same key as a previously defined configuration item.
- Specify as little configuration as possible and have your app function with reasonable defaults when the configuration isn't present.
- Ordinal collections (arrays) use numbered indexes for names.
- Make sure you validate/parse configuration before using it.
- Use `String.IsNullOrEmpty()` to check for presence of a config value.
- Ordinal collections use the index as part of the key.
- Use object binding to handle conversion to strong types.
- Consider data annotations validation to deal with configuration validation.
- Only file-based providers handle reloading on change events.
- Use environment variable prefixes to import subsets of the environment.
- Don't mix-and-match command line argument specs if you can avoid it.
- With great XML power comes a great many gotchas.
- Test environment variables and command line parameters using `launchSettings.json`.