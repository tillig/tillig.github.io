---
layout: post
title: "Separating Metadata Classes from Model Classes in DataAnnotations Using Custom TypeDescriptionProviders"
date: 2010-01-28 -0800
comments: true
disqus_identifier: 1609
tags: [dotnet,aspnet,gists,csharp]
---
I haven't done much work with [ASP.NET Dynamic
Data](http://www.asp.net/DynamicData/) but in a recent project I started
working with it and instantly ran into a dilemma. First, let me explain
the project setup.

I have a database project that outlines the schema of the database, the
stored procedures, all of that. I have a database client project that
has some services and a LINQ to SQL data context that I can distribute
to clients who want to go that way. I then have a Dynamic Data project
for managing the data and a separate web application that will consume
the data, both of which need the LINQ to SQL data context.

Switch on your suspension of disbelief for a second with respect to the
design. I could do a way better design going more SOA, or using a
repository pattern, or whatever, but it's a spike project and part of
the goal is for me to learn something about Dynamic Data, LINQ to SQL,
and so on.

Now, Dynamic Data uses the LINQ to SQL data context - from the client
assembly - to do its work and generate its screens. Here's the problem:

**In order to control the rendering of the Dynamic Data screens, I have
to have a metadata "buddy class" to describe it. In order to have a
"metadata buddy" class, I have to add an attribute to the generated LINQ
to SQL model class that points to the metadata type.**

See the problem? The Dynamic Data app is the only thing that cares about
the metadata "buddy class," so that's where the class will live... but
**if I have to mark up the original LINQ to SQL class in a separate
assembly to get that to happen, I'm hosed**.

Here's what a standard scenario looks like:

    [MetadataType(typeof(ResourceMetadata))]
    public partial class Resource
    {
      // Resource is a class in the LINQ to SQL
      // generated data context. A partial class
      // declaration allows us to put the metadata
      // attribute on it.
    }

    public class ResourceMetadata
    {
      // The metadata class can define hints for
      // the Dynamic Data UI as to how to render
      // view/edit controls for the similarly named
      // property on the LINQ to SQL model class.
      // This declaration says 'render this as a
      // ResourceValue type.'

      [UIHint("ResourceValue")]
      public object Value;
    }

As you can see, we have to mark up the LINQ to SQL class with that
[MetadataTypeAttribute](http://msdn.microsoft.com/en-us/library/system.componentmodel.dataannotations.metadatatypeattribute.aspx).
I don't want to do that... but how to keep the metadata separate from
the model?

**The key is in the Global.asax.cs of your Dynamic Data project.** The
line where you register the data context with the application:

    MetaModel model = new MetaModel();
    model.RegisterContext(typeof(DataLibrary.ResourceDataContext), new ContextConfiguration()
    {
      ScaffoldAllTables = true
    });

See that "new ContextConfiguration" bit? One of the parameters you can
pass is
"[MetadataProviderFactory](http://msdn.microsoft.com/en-us/library/system.web.dynamicdata.contextconfiguration.metadataproviderfactory.aspx)."
That parameter is a delegate that creates an instance of something
deriving from
"[System.ComponentModel.TypeDescriptionProvider](http://msdn.microsoft.com/en-us/library/system.componentmodel.typedescriptionprovider.aspx)."
The default behavior is similar to this:

    MetaModel model = new MetaModel();
    model.RegisterContext(typeof(DataLibrary.ResourceDataContext), new ContextConfiguration()
    {
      ScaffoldAllTables = true,
      MetadataProviderFactory =
        (type) => {
          return new AssociatedMetadataTypeTypeDescriptionProvider();
        }
    });

The default MetadataProviderFactory is
[System.ComponentModel.DataAnnotations.AssociatedMetadataTypeTypeDescriptionProvider](http://msdn.microsoft.com/en-us/library/system.componentmodel.dataannotations.associatedmetadatatypetypedescriptionprovider.aspx).
That provider uses an internal type (*of course* it's internal) that
gets the metadata type for a model class through reflection.

**In order to get your metadata class from somewhere other than
reflection, you need to make your own TypeDescriptionProvider.**

Fortunately, that's not actually too hard.

First, let's decide what we want to do: We want to have a static
mapping, similar to the MVC route table, that lets us manually map a
LINQ to SQL type to any metadata type we want. If there's no manual
mapping, we want to fall back to default behavior - get it through
reflection.

Now we know what we want the outcome to be, let's get cracking. Throw
together a place where you can hold the metadata mappings:

    using System;
    using System.Collections.Generic;

    namespace DynamicDataProject
    {
      public static class DisconnectedMetadata
      {
        public static Dictionary<Type, Type> Map { get; private set; }

        static DisconnectedMetadata()
        {
          Map = new Dictionary<Type, Type>();
        }
      }
    }

I suppose if you wanted to get really fancy with it you could have
add/remove/clear methods that have a bunch of thread locking around them
and such, but this is a simple way to go and most likely you're only
going to be registering mappings at app startup so all of that would
just be overkill.

Next we have to create a
[System.ComponentModel.CustomTypeDescriptor](http://msdn.microsoft.com/en-us/library/system.componentmodel.customtypedescriptor.aspx).
What a CustomTypeDescriptor does is get all of the information about the
various metadata - attributes and properties - on your buddy class. The
thing is, Microsoft already did all of that for us, they just
inconveniently marked the type they use -
System.ComponentModel.DataAnnotations.AssociatedMetadataTypeTypeDescriptor

- as internal. With a little fancy, maybe slightly unsupported,
reflection work we can pretty easily make use of the code that's already
there. Instead of doing a giant full implementation of a new
CustomTypeDescriptor, we can write a wrapper around the existing one.

    using System;
    using System.ComponentModel;
    using System.ComponentModel.DataAnnotations;
    using System.Reflection;

    namespace DynamicDataProject
    {
      public class DisconnectedMetadataTypeDescriptor : CustomTypeDescriptor
      {
        private static Type AssociatedMetadataTypeTypeDescriptor =
          typeof(AssociatedMetadataTypeTypeDescriptionProvider)
          .Assembly
          .GetType("System.ComponentModel.DataAnnotations.AssociatedMetadataTypeTypeDescriptor", true);

        public Type Type { get; private set; }
        public Type AssociatedMetadataType { get; private set; }
        private object _associatedMetadataTypeTypeDescriptor;

        public DisconnectedMetadataTypeDescriptor(ICustomTypeDescriptor parent, Type type)
          : this(parent, type, GetAssociatedMetadataType(type))
        {
        }

        public DisconnectedMetadataTypeDescriptor(ICustomTypeDescriptor parent, Type type, Type associatedMetadataType)
          : base(parent)
        {
          this._associatedMetadataTypeTypeDescriptor = Activator.CreateInstance(AssociatedMetadataTypeTypeDescriptor, parent, type, associatedMetadataType);
          this.Type = type;
          this.AssociatedMetadataType = associatedMetadataType;
        }

        public override AttributeCollection GetAttributes()
        {
          return AssociatedMetadataTypeTypeDescriptor.InvokeMember(
            "GetAttributes",
            BindingFlags.Instance | BindingFlags.Public | BindingFlags.InvokeMethod,
            null,
            this._associatedMetadataTypeTypeDescriptor,
            new object[] { }) as AttributeCollection;
        }

        public override PropertyDescriptorCollection GetProperties()
        {
          return AssociatedMetadataTypeTypeDescriptor.InvokeMember(
            "GetProperties",
            BindingFlags.Instance | BindingFlags.Public | BindingFlags.InvokeMethod,
            null,
            this._associatedMetadataTypeTypeDescriptor,
            new object[] { }) as PropertyDescriptorCollection;
        }

        public static Type GetAssociatedMetadataType(Type type)
        {
          if (type == null)
          {
            throw new ArgumentNullException("type");
          }

          // Try the map first...
          if (DisconnectedMetadata.Map.ContainsKey(type))
          {
            return DisconnectedMetadata.Map[type];
          }

          // ...and fall back to the standard mechanism.
          MetadataTypeAttribute[] customAttributes = (MetadataTypeAttribute[])type.GetCustomAttributes(typeof(MetadataTypeAttribute), true);
          if (customAttributes != null && customAttributes.Length > 0)
          {
            return customAttributes[0].MetadataClassType;
          }
          return null;
        }
      }
    }

**We're doing a few interesting things here** to be aware of:

- On static initialization, **we get a handle on the original
    AssociatedMetadataTypeTypeDescriptor** - the internal type that does
    all the attribute reflection action. If we don't get a reference to
    that type for some reason, we'll throw an exception so we
    immediately know.
- **We have a GetAssociatedMetadataType method** that you can pass any
    type to - ostensibly a LINQ to SQL model type - and you should come
    back with the correct metadata buddy class type. First we check the
    type mapping class that we created before and if it's not there, we
    fall back to the default behavior - getting the
    MetadataTypeAttribute off the LINQ to SQL class.
- **The two-parameter constructor, which is used by Dynamic Data, is
    where we call our GetAssociatedMetadataType method.** That's our
    point of interception.
- **The three-parameter constructor, which lets a developer manually
    specify the associated metadata type, creates an instance of the
    original AssociatedMetadataTypeTypeDescriptor** and passes the
    information into it first. We do that because that type has a bunch
    of validation it runs through to make sure everything is OK with the
    metadata type. Rather than re-implementing all of that validation,
    we'll use what's there. We'll hang onto that created object so we
    can use it later.
- **The GetAttributes and GetProperties overrides call the
    corresponding overrides in that
    AssociatedMetadataTypeTypeDescriptor** object we created. We do that
    because there's a lot of crazy stuff that goes into recursing down
    the metadata class tree to generate all of the metadata information
    and we don't want to replicate all of that. Again, use what's there.

That's the big work, seriously. **A wrapper around
AssociatedMetadataTypeTypeDescriptor pretty much does it.** Last thing
we have to do is create a System.ComponentModel.TypeDescriptionProvider
that will generate our descriptors. That's easy:

    using System;
    using System.ComponentModel;

    namespace DynamicDataProject
    {
      public class DisconnectedMetadataTypeDescriptionProvider : TypeDescriptionProvider
      {
        public DisconnectedMetadataTypeDescriptor Descriptor { get; private set; }
        public DisconnectedMetadataTypeDescriptionProvider(Type type)
          : base(TypeDescriptor.GetProvider(type))
        {
          this.Descriptor =
            new DisconnectedMetadataTypeDescriptor(
              base.GetTypeDescriptor(type, null),
              type);
        }

        public override ICustomTypeDescriptor GetTypeDescriptor(Type objectType, object instance)
        {
          return this.Descriptor;
        }
      }
    }

As you can see, **this basically just provides an override for the
"GetTypeDescriptor" method** and hands back our custom descriptor.

**That's the entirety of the infrastructure:**

- **The map.**
- **A CustomTypeDescriptor that looks in the map and then falls back
    to reflection.**
- **A TypeDescriptionProvider that uses our CustomTypeDescriptor.**

To use this mechanism, in your Dynamic Data project you need to register
the mappings and register the TypeDescriptionProvider. Remember the
"model.RegisterContext" call in the Global.asax.cs file in the
RegisterRoutes method? Add your mappings there and **when you call
RegisterContext, add a MetadataProviderFactory**:

    public static void RegisterRoutes(RouteCollection routes)
    {
      // Register types with the map
      DisconnectedMetadata.Map.Add(typeof(DataLibrary.Resource), typeof(DynamicDataProject.ResourceMetadata));

      // When you register the LINQ to SQL data context,
      // also register a MetadataProviderFactory pointing
      // to the custom provider.
      MetaModel model = new MetaModel();
      model.RegisterContext(typeof(DataLibrary.ResourceDataContext), new ContextConfiguration()
      {
        ScaffoldAllTables = true,
        MetadataProviderFactory =
        (type) =>
        {
          return new DisconnectedMetadataTypeDescriptionProvider(type);
        }
      });

      // ...and the rest of the method as usual.
    }

**That's it. Now you don't have to mark up your LINQ to SQL objects with
partial classes**- you can put your metadata "buddy classes" anywhere
you want.

**There are some optimizations you could make** for performance purposes
that I didn't do here for clarity. For example, rather than call
"InvokeMember" on every call to GetAttributes and GetProperties in the
CustomTypeDescriptor, you could cache references during static
construction to the MemberInfo corresponding to the two methods and
invoke the cached references. This should get the idea across, though.

And, of course, **the usual disclaimers apply**: YMMV, I'm not
responsible if this code burns your house down or crashes your app or
whatever, etc., etc. Works on My Machine!
