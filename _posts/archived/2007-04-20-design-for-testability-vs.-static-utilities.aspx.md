---
layout: post
title: "Design For Testability vs. Static Utilities"
date: 2007-04-20 -0800
comments: true
disqus_identifier: 1184
tags: [testing]
---
I follow the whole "design-for-testability vs. design-for-usability"
debate and, in the interest of full disclosure, I'm a fan of *not*
designing for testability. Part of what I design has to be a usable API
and I can't have a lot of the cruft required in testable design when I
get to my finished product.

 I mean, think about it - if the .NET Framework was built using
design-for-testability, there's no way like 80% of the people using it
today would have been able to pick it up. Considering the [inability to
solve a FizzBuzz
problem](http://www.codinghorror.com/blog/archives/000781.html), somehow
I don't think having everything infinitely pluggable and flexible solely
to support the testing of the framework would have made it any easier to
use.

 Now think about the notion of the static utility class. Everyone has
one (or more) of those classes that are sealed and only provide a few
static helper methods. I mean, for .NET 1.1 folks, who didn't have their
own static *String.IsNullOrEmpty* implementation?

 On my project, we have a lot of static helpers that read, process, and
cache configuration data. The basic algorithm is something like this:

1. Check the cache for the data. If it's there, return it.
2. Data wasn't in cache, so open the config file.
3. XML deserialize the file or do whatever other processing needs to
    happen.
4. Cache and return the result.

 Here's some basic sample code:
    public sealed class ConfigService
    {
      private const string CacheKey = "CacheKeyForConfig";
      private const string ConfigPath = "/Config/myfile.config";
      public static System.Collections.ArrayList GetConfiguration()
      {
        System.Collections.ArrayList retVal = null;
        string configPath = ConfigPath;

        if(System.Web.HttpContext.Current != null)
        {
          retVal = System.Web.HttpContext.Current.Cache[CacheKey]
            as System.Collections.ArrayList;
          configPath = System.Web.HttpContext.Current.Server.MapPath(configPath);
        }
        if(retVal == null)
        {
          if(!File.Exists(configPath))
          {
            throw new FileNotFoundException(
              "Unable to read default configuration file.",
              configPath);
          }

          //... read/process the file... set the return value...

          if(System.Web.HttpContext.Current != null)
          {
            System.Web.HttpContext.Current.Cache.Insert(
              CacheKey,
              retVal,
              new System.Web.Caching.CacheDependency(configPath));
          }
        }

        return retVal;
      }
    }

 From an API standpoint, it's a one-liner:
ConfigService.GetConfiguration()

 But how do you test that? If you're running FxCop, your static utility
class "ConfigService" needs to be sealed. That sort of limits your
abilities to mock with several frameworks out there. The simple fact
this is a static method is limiting to some frameworks.

 Now, granted, you could write a class that provides cache retrieval
services specific to this helper and go to the trouble of instantiating
that class and... you know what, I'm already tired of typing that out. I
don't need all that. I'll never sub in a different cache provider for
anything *other* than testing. I don't want the consumer of the method
to even have to know about any of that (so they shouldn't have to pass
the cache instance in as a parameter, for example).

 But I do want to have this thing tested. If the object is in cache,
does it just return the object without further processing? If it's not,
does it read the file and does it then cache the results? I want the
design simple, I want it usable, and I don't want a lot of moving
pieces. In fact, ideally, the code would be about as simple as the
sample I posted.

 So you need to mock a few things, specifically around HttpContext.
(Possibly other things based on the implementation, but we're going for
simple here.)

 You can't really readily do that. Or can you? What if your test looked
like this:

    [TestFixture]
    public class ConfigServiceTest
    {
      [Test]
      public void GetConfiguration_NoCache_FileExists()
      {
        //...place a known good configuration in a temporary location...
        string pathToTemporaryConfig = ExtractConfigToTempFileAndGetPath();

        // Set up calls for the cache
        MockObject mockCache = MockManager.MockObject(typeof(System.Web.Caching.Cache), Constructor.Mocked);
        mockCache.ExpectGetIndex(null);
        mockCache.ExpectCall("Insert");

        // Set up calls for the server utility
        MockObject mockServer = MockManager.MockObject(typeof(System.Web.HttpServerUtility), Constructor.Mocked);
        mockServer.ExpectAndReturn("MapPath", pathToTemporaryConfig);

        // Set up calls for the context
        MockObject mockContext = MockManager.MockObject(typeof(System.Web.HttpContext), Constructor.Mocked);
        mockContext.ExpectGetAlways("Cache", mockCache.Object);
        mockContext.ExpectGetAlways("Server", mockServer.Object);

        // Use natural mocks to ensure the mock context is always returned
        using(RecordExpectations recorder = RecorderManager.StartRecording())
        {
          // Ensure any call for HttpContext always gets returned
          System.Web.HttpContext dummyContext = System.Web.HttpContext.Current;
          recorder.Return(mockContext.Object);
          recorder.RepeatAlways();
        }

        System.Collections.ArrayList actual = ConfigService.GetConfiguration();
        Assert.IsNotNull(actual, "The configuration returned should not be null.");
        // ... do other assertions that validate the returned config ...

        MockManager.Verify();
      }
    }

 Using [TypeMock](http://www.typemock.com), I was able to *easily mock a
web context* and test this code *without* having to impact the design or
the API usability.

 It sounds like I'm shilling for TypeMock, and maybe I am a little. On a
larger scale, though, I'm just happy I'm able to get full test coverage
without sacrificing my usable API.

 And if someone reports a defect with this code? Piece of cake to get a
mocked test into place that replicates the behavior and even easier to
track down the issue because I don't have all of these additional
unnecessary layers of abstraction to fight through. The code is simple -
simple to read, simple to understand, and simple to troubleshoot for the
next developer who has to try and fix it. You have to love that.
