---
layout: post
title: "How to Set Up ASP.NET Core DataProtection in a Web Farm"
date: 2016-06-15 -0800
comments: true
tags: [aspnet,security]
description: "Setting up ASP.NET Core in a web farm is slightly complicated by the new data protection settings. This explains the things that need to line up in a web farm."
---
I've been working with ASP.NET Core in a web farm environment. Things worked great when deployed to an Azure Web App but in a different farm setting ([Pivotal Cloud Foundry](http://pivotal.io/platform)) I started getting an error I hadn't seen before: `System.AggregateException: Unhandled remote failure. ---> System.Exception: Unable to unprotect the message.State.`

This happened in context of the OpenID Connect middleware, specifically when a value encrypted by one instance of the ASP.NET Core application tried to be decrypted by a different instance of the application.

**The problem is that the values used in DataProtection weren't synchronized across all instances of the application.** This is a lot like the ASP.NET classic issue where you have to ensure all nodes in the farm have the machine key synchronized so ViewState and other things can be shared across application instances.

**Instead of machine key, ASP.NET Core uses [Microsoft.AspNetCore.DataProtection](https://github.com/aspnet/DataProtection)** for handling the encryption keys used to protect state values that get posted between the app and the client. [There is plenty of documentation on how this works](http://docs.asp.net/en/latest/security/data-protection/index.html) but not much in the way of a concise explanation of what it takes to get things working in a farm. Hopefully this wil help.

# How DataProtection Gets Added
Normally you don't manually add the data protection bits to the application pipeline. It's done for you when you call `services.AddMvc()` during the `ConfigureServices()` part of application startup. That `services.AddMvc()` line actually fans out into adding a lot of default services, some of which are the defaults for data protection.

# What to Synchronize
Instead of just machine key in ASP.NET Core, you have three things that must line up for a farm scenario:

- **The application discriminator.** This is a unique identifier for the application. This defaults to the path at which the application is installed, so if all of your farm machines are identical - including where, _physically_, the application is installed on the machine - this will automatically line up. [It's a property on the `DataProtectionOptions` class.](https://github.com/aspnet/DataProtection/blob/dev/src/Microsoft.AspNetCore.DataProtection/DataProtectionOptions.cs#L23)
- **The master encryption key.** This is the closest thing to machine key in the new system. This key is used to encrypt/decrypt a rotating session key that is, in turn, used to encrypt/decrypt the state data. [Several options ship for encryption](https://github.com/aspnet/DataProtection/blob/dev/src/Microsoft.AspNetCore.DataProtection/DataProtectionBuilderExtensions.cs) including DPAPI and certificates. [It appears this is not used if the platform is not Windows - session keys at rest don't appear to be encrypted on Linux or other non-Windows platforms.](http://docs.asp.net/en/latest/security/data-protection/implementation/key-encryption-at-rest.html#data-protection-implementation-key-encryption-at-rest)
- **The encrypted set of session keys.** This is a set of XML files that contain the valid session key(s) that can be used to encrypt/decrypt state data. [Only file system shares and the registry](https://github.com/aspnet/DataProtection/blob/dev/src/Microsoft.AspNetCore.DataProtection/DataProtectionBuilderExtensions.cs) are avilable out of the box.

# Why This Doesn't "Just Work" in All Farms

- **The application discriminator**, being based on the installed location of the app, is great if all machines in the farm are identical. If, instead, you're using some containerization techniques, a virtual filesystem, or otherwise don't have the app installed in the same location everywhere, you need to manually set this.
- **The master encryption key**, while not used on non-Windows environments, does otherwise need to be synchronized. If you choose to use a certificate, the current `EncryptedXml` mechanism used internally allows you to pass in a certificate for use in _encryption_ but in _decryption_ it requires the certificate to be in the machine certificate store. That requirement is less than stellar since it means you can't store the certificate in something like Azure Key Vault.
- **The encrypted set of session keys** is easy to persist in a file share... if the farm is allowed to store things in a common share and all the network ports are open to allow that. If you want to store in a different repository like a database or Redis, there's nothing out of the box that helps you.

# Why This Works in Azure Web Apps

[There is some documentation](http://docs.asp.net/en/latest/security/data-protection/configuration/default-settings.html#data-protection-default-settings) outlining how this works in Azure. In a nutshell:

- All applications are installed to the same location, so the application discriminator lines up.
- Keys aren't encrypted at rest, so there is no master encryption key.
- The session keys are put in a special folder location that is "magically" synchronized across all instances of the Azure Web App.

# Setting Your Own Options
To set your own options, call `services.AddDataProtection()` _after_ you call `services.AddMvc()` in your `ConfigureServices()` method in `Startup`. It will look something like this:

```csharp
public virtual IServiceProvider ConfigureServices(IServiceCollection services)
{
  services.AddMvc();
  services
    .AddDataProtection(opt => opt.ApplicationDiscriminator = "your-app-id")
    .ProtectKeysWithYourCustomKey()
    .PersistKeysToYourCustomLocation();
}
```

# Example Extensions
To help get you on your way, [I've published a couple of extensions on GitHub](https://github.com/tillig/DataProtection). They include:

- **XML encryption/decryption using a certificate that isn't required to be in a machine certificate store.** This allows you to store the master certificate in a repository like Azure Key Vault. This bypasses that requirement that the certificate be in the machine certificate store during decryption.
- **Encrypted XML storage in Redis.** This allows you to share the session keys in a Redis database rather than a file share.
