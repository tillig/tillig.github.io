---
layout: post
title: "Unit Testing an ASP.NET VirtualPathProvider"
date: 2010-06-17 -0800
comments: true
disqus_identifier: 1651
tags: [net,aspnet,testing,gists,csharp]
---
[The VirtualPathProvider
class](http://msdn.microsoft.com/en-us/library/system.web.hosting.virtualpathprovider.aspx)
is (in my opinion) a fairly underused mechanism for extending where
different files in your application come from. You can create providers
that get files from zip archives, databases, or anywhere else you need.

The problem is, unit testing them is a nightmare. You either have to run
the tests from inside a real web app or you have to set up so many mocks
that your tests become fragile or unmanageable. Ugh.

**Turns out there's a third option - create a special AppDomain that has
just enough real setup** to support working with the ASP.NET
[HostingEnvironment](http://msdn.microsoft.com/en-us/library/system.web.hosting.hostingenvironment.aspx)
and VirtualPathProviders.

Here's a sample test fixture that does just that:

    using System;
    using System.IO;
    using System.Reflection;
    using System.Web.Hosting;
    using NUnit.Framework;

    namespace MyTests
    {
      [TestFixture]
      public class MyTestFixture
      {
        // Instance property for the HostingEnvironment-enabled AppDomain.
        private AppDomain _hostingEnvironmentDomain = null;

        [TestFixtureSetUp]
        public void TestFixtureSetUp()
        {
          // Create the AppDomain that will support the VPP.
          this._hostingEnvironmentDomain =
            AppDomain.CreateDomain("HostingEnvironmentDomain",
            AppDomain.CurrentDomain.Evidence,
            AppDomain.CurrentDomain.SetupInformation,
            AppDomain.CurrentDomain.PermissionSet);

          // Set some required data that the runtime needs.
          this._hostingEnvironmentDomain.SetData(".appDomain", "HostingEnvironmentDomain");
          this._hostingEnvironmentDomain.SetData(".appId", "HostingEnvironmentTests");
          this._hostingEnvironmentDomain.SetData(".appPath", Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location));
          this._hostingEnvironmentDomain.SetData(".appVPath", "/");
          this._hostingEnvironmentDomain.SetData(".domainId", "HostingEnvironmentTests");

          // Initialize the hosting environment.
          HostingEnvironment environment = this._hostingEnvironmentDomain.CreateInstanceAndUnwrap(typeof(HostingEnvironment).Assembly.FullName, typeof(HostingEnvironment).FullName) as HostingEnvironment;

          // Finally, register your VPP instance so you can test.
          this.Execute(() =>
            {
              HostingEnvironment.RegisterVirtualPathProvider(new TestVirtualPathProvider());
            });
        }

        [TestFixtureTearDown]
        public void TestFixtureTearDown()
        {
          // When the fixture is done, tear down the special AppDomain.
          AppDomain.Unload(this._hostingEnvironmentDomain);
        }

        [Test]
        public void FileExists()
        {
          // Use the special "Execute" method to run code
          // in the special AppDomain.
          this.Execute(() =>
            {
              Assert.IsTrue(HostingEnvironment.VirtualPathProvider.FileExists("~/Root/Folder1/Page1.aspx"));
            });
        }

        // This method allows you to execute code in the
        // special HostingEnvironment-enabled AppDomain.
        private void Execute(CrossAppDomainDelegate testMethod)
        {
          this._hostingEnvironmentDomain.DoCallBack(testMethod);
        }
      }
    }

The difficult bit is setting up the special AppDomain, but once you do
that and initialize the HostingEnvrionment, you can use the
VirtualPathProvider just like you would in a real environment. The
special AppDomain thinks the "root" of your application is in the same
location as the executing unit test assembly, so there shouldn't be any
issues with the runtime locating assemblies or anything.

Standard disclaimers apply: YMMV, I'm not responsible if it crashes your
server, etc.

