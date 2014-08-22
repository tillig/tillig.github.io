---
layout: post
title: "Storing Configuration Settings Behind a WCF Service"
date: 2008-12-16 -0800
comments: true
disqus_identifier: 1479
tags: [Web Development,.NET]
---
One of the challenges I'm facing in the project I'm working on is that
we want to store configuration values for the system in a central
location that can be accessed via a service... but that's not how most
.NET developers are used to working with configuration. Most folks are
used to
[ConfigurationManager](http://msdn.microsoft.com/en-us/library/system.configuration.configurationmanager.aspx)
or
[WebConfigurationManager](http://msdn.microsoft.com/en-us/library/system.web.configuration.webconfigurationmanager.aspx),
something like this:

    NameValueCollection config = (NameValueCollection)WebConfigurationManager.GetSection("mySection");
    this.SomeObject.Value = config["key"];

That's great if everything is stored in your app.config or web.config,
but if you've got everything behind a service, it's trickier. You've got
to get a proxy to your service, get the approriate values, handle
exceptions... it's a lot messier, and if you're trying to get a bunch of
devs up to speed using that, it's going to take a bit. Wouldn't it be
nice if they could just use the stuff they're used to?

There are a couple of ways that can happen.

First, you can use a
[ProtectedConfigurationProvider](http://msdn.microsoft.com/en-us/library/system.configuration.protectedconfigurationprovider.aspx)
implementation. You might be used to seeing these in the form of things
like the
[RsaProtectedConfigurationProvider](http://msdn.microsoft.com/en-us/library/system.configuration.rsaprotectedconfigurationprovider.aspx)
that you'd use to store settings encrypted in your configuration files.
The cool thing is, the ConfigurationManager doesn't really care what's
stored in the \<EncryptedData\> element in your config. For example,
when you use the RsaProtectedConfigurationProvider, you'll see something
like this in your config file:

    <?xml version="1.0" encoding="utf-8"?>
    <configuration>
      <mySection configProtectionProvider="RsaProtectedConfigurationProvider">
        <EncryptedData Type="http://www.w3.org/2001/04/xmlenc#Element"
          xmlns="http://www.w3.org/2001/04/xmlenc#">
          <EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#tripledes-cbc" />
          <KeyInfo xmlns="http://www.w3.org/2000/09/xmldsig#">
            <EncryptedKey xmlns="http://www.w3.org/2001/04/xmlenc#">
              <EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#rsa-1_5" />
              <KeyInfo xmlns="http://www.w3.org/2000/09/xmldsig#">
                <KeyName>Rsa Key</KeyName>
              </KeyInfo>
              <CipherData>
                <CipherValue>(encrypted data here)</CipherValue>
              </CipherData>
            </EncryptedKey>
          </KeyInfo>
          <CipherData>
            <CipherValue>(encrypted data here)</CipherValue>
          </CipherData>
        </EncryptedData>
      </mySection>
    </configuration>

But everything inside \<EncryptedData/\> is entirely up to the
configuration provider. Since you can define your own providers, what if
you did something like this:

    <?xml version="1.0"?>
    <configuration>
      <configSections>
        <section name="mySection"
          type="System.Configuration.AppSettingsSection, System.Configuration, Version=2.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a"/>
      </configSections>
      <configProtectedData>
        <providers>
          <add name="ServiceConfigurationProvider"
            type="Framework.ServiceConfigurationProvider, Framework"
            endpointName="WSHttpBinding_IConfigurationService"/>
        </providers>
      </configProtectedData>
      <mySection configProtectionProvider="ServiceConfigurationProvider">
        <EncryptedData>
          <values>
            <value key="value1"/>
            <value key="value2"/>
          </values>
        </EncryptedData>
      </mySection>
    </configuration>

See what we have there?

-   A custom section that (for simplicity) is just a key/value section
    like AppSettings.
-   A custom protected config provider that has a special extra
    configuration property - an endpoint name (that would correspond to
    something in your \<system.serviceModel\> configuration).
-   A section that uses the configuration provider you specified... and
    notice how the contents of the \<EncryptedData\> are simply keys?
    These are the values you'd want to retrieve from your configuration
    service.

So how would you do it? You could implement a provider that looks like
this:

    using System;
    using System.Configuration;
    using System.Xml;
    using System.Xml.Linq;
    using System.Collections.Generic;
    using System.Reflection;
    using System.ServiceModel;
    using System.Text;

    namespace Framework
    {
      public class ServiceConfigurationProvider : ProtectedConfigurationProvider
      {
        public string ServiceEndpointName { get; set; }

        public override XmlNode Decrypt(XmlNode encryptedNode)
        {
          List<string> keysToRetrieve = new List<string>();
          foreach (XmlNode value in encryptedNode.SelectNodes("/EncryptedData/values/value"))
          {
            XmlAttribute keyAttrib = value.Attributes["key"];
            if (keyAttrib != null && !String.IsNullOrEmpty(keyAttrib.Value))
            {
              string key = keyAttrib.Value;
              if (!keysToRetrieve.Contains(key))
              {
                keysToRetrieve.Add(key);
              }
            }
          }

          ChannelFactory<IConfigurationService> factory = new ChannelFactory<IConfigurationService>(this.ServiceEndpointName);
          IConfigurationService service = factory.CreateChannel();
          AppSettingsSection section = new AppSettingsSection();
          foreach (string key in keysToRetrieve)
          {
            section.Settings.Add(key, service.GetValue(key));
          }
          XmlDocument doc = new XmlDocument();
          StringBuilder builder = new StringBuilder();
          using (XmlWriter writer = XmlWriter.Create(builder))
          {
            typeof(AppSettingsSection)
            .GetMethod("SerializeToXmlElement", BindingFlags.Instance | BindingFlags.NonPublic)
            .Invoke(section, new object[] { writer, "root" });
          }
          doc.LoadXml(builder.ToString());
          return doc.DocumentElement;
        }

        public override XmlNode Encrypt(XmlNode node)
        {
          throw new NotImplementedException();
        }

        public override void Initialize(string name, System.Collections.Specialized.NameValueCollection config)
        {
          this.ServiceEndpointName = config["endpointName"];
          base.Initialize(name, config);
        }
      }
    }

**Note that, in the above, there's a lot I'm not doing to keep it
simple** - I'm not properly closing the service channel, I'm not
handling errors in the call, etc. It's for illustration purposes. I'm
also doing some reflection magic to get the AppSettingsSection to
serialize to XML so I don't have to manually do it. Wouldn't that be
nice if it was public?

The point is, you can use the protected configuration provider mechanism
to store things elsewhere - service, database, etc. Consuming something
like this would look exactly like the previous example. You'd literally
never know the difference as a consumer of the settings. **The problem
with this solution is that once the value is read, it's cached and never
re-read.** Which is to say, the service will only ever get called once.
If the configuration value changes in whatever data store the service is
wrapping, you'll never get it in your app. Also, if you wanted strong
typing, you'd have to implement a custom configuration section that
handles strong typing and that's what your provider would return from
the Decrypt method. (Like I said, a
simple [AppSettingsSection](http://msdn.microsoft.com/en-us/library/system.configuration.appsettingssection.aspx)
keeps it simple.)

**A solution that's chattier but overcomes this caching issue** is to
implement a special
[ConfigurationSection](http://msdn.microsoft.com/en-us/library/system.configuration.configurationsection.aspx).
In that section, you can simply have a method that wraps the service
call.

Your configuration file might look like this:

    <?xml version="1.0"?>
    <configuration>
      <configSections>
        <section name="mySection" type="Framework.ServiceConfigurationSection, Framework"/>
      </configSections>
      <mySection endpointName="WSHttpBinding_IConfigurationService"/>
    </configuration>

It's a little shorter, but you can still see there's a service endpoint
name in there that'd correspond to the configuration service you'll be
calling. You can also see that we're using a custom configuration
section rather than one of the standard out-of-the-box ones.

The ConfigurationSection implementation might look like this:

    using System;
    using System.Configuration;
    using System.ServiceModel;

    namespace Framework
    {
      public class ServiceConfigurationSection : ConfigurationSection
      {
        [ConfigurationProperty("endpointName", IsRequired = true)]
        public string ServiceEndpointName
        {
          get
          {
            return (string)this["endpointName"];
          }
          set
          {
            this["endpointName"] = value;
          }
        }

        public string GetValue(string key)
        {
          ChannelFactory<IConfigurationService> factory =
            new ChannelFactory<IConfigurationService>(this.ServiceEndpointName);
          IConfigurationService service = factory.CreateChannel();
          return service.GetValue(key);
        }
      }
    }

**Again, there's a lot I'm not doing in there to keep it simple**, but,
again, you see the idea - the GetValue method on the section wraps the
service call. Consuming this looks very similar to the original example:

    ServiceConfigurationSection config = (ServiceConfigurationSection)WebConfigurationManager.GetSection("mySection");
    this.SomeObject.Value = config.GetValue("key");

This version retrieves the value every time you ask for it, which gets
you around the caching issue. That said, the developer using this
mechanism should probably be made aware of what's going on so he or she
doesn't wonder why performance has gone down the tubes on that page that
uses 150 bajillion configuration values.

