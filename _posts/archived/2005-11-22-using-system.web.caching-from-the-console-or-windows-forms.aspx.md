---
layout: post
title: "Using System.Web.Caching From The Console Or Windows Forms"
date: 2005-11-22 -0800
comments: true
disqus_identifier: 920
tags: [gists,csharp,dotnet]
---
I'm looking at different ways to provide caching from within an
application so I can read in some information from a file, keep it in
memory, and have cache dependencies perform a callback to update the
cache whenever the file changes.

This is simple to do in an ASP.NET app using the
[System.Web.Caching.Cache](http://msdn.microsoft.com/library/default.asp?url=/library/en-us/cpref/html/frlrfsystemwebcachingcacheclasstopic.asp)
object that you find in
[HttpRequest](http://msdn.microsoft.com/library/default.asp?url=/library/en-us/cpref/html/frlrfSystemWebHttpContextClassCacheTopic.asp).
Just add something to the cache with a cache dependency and you're set.
But what about if you're working in a console or Windows Forms app?

I did an experiment and it looks like you can access the cache from any
application as long as you access it through HttpRuntime directly. I
haven't tested to see if this works on a machine that doesn't have IIS
installed, but I don't see why it wouldn't.

Below is my experiment code. It's a console app that reads/writes the
cache with a file dependency that constantly changes. Running it, you
can see that the cache is doing what you expect, just like in a web
app.

```csharp
using System;
using System.Diagnostics;
using System.IO;
using System.Web;
using System.Web.Caching;

namespace ConsoleApplication1{
  class Class1{
    const string KEY = "mykey";
    const string FILENAME = "dependency.txt";

    /// <summary>
    /// The main entry point for the application.
    /// </summary>
    [STAThread]
    static void Main(string[] args){
      WriteFile();
      InsertItem();

      for(int i = 0; i < 1000; i++){
        ReadItem();
        WriteFile();
      }
      ReadItem();

      if(Debugger.IsAttached){
        Console.ReadLine();
      }
    }

    static void InsertItem(){
      DateTime t = DateTime.Now;
      Console.WriteLine("Inserting item into cache: {0:m.s.ffffff}", t);
      HttpRuntime.Cache.Insert(
          KEY,
          t,
          new CacheDependency(Path.GetFullPath(FILENAME)),
          DateTime.MaxValue,
          TimeSpan.Zero,
          CacheItemPriority.Default,
          new CacheItemRemovedCallback(CallBack));
    }

    static void ReadItem(){
      object item = HttpRuntime.Cache[KEY];
      if(item == null){
        Console.WriteLine("Item is null.");
      }
      else if(item is DateTime){
        Console.WriteLine("Item is {0:m.s.ffffff}", item);
      }
      else{
        Console.WriteLine("Item is wrong type: {0}", item.GetType());
      }
    }

    static void WriteFile(){
      if(File.Exists(FILENAME)){
        File.Delete(FILENAME);
      }
      Console.WriteLine("Removing file.");
      FileStream stm = File.Create(FILENAME);
      stm.Close();
      Console.WriteLine("Wrote file.  File exists: {0}", File.Exists(FILENAME));
    }

    static void CallBack(string key, object value, CacheItemRemovedReason reason){
      Console.WriteLine("Callback invoked: {0}", reason);
      InsertItem();
    }
  }
}
```

 If anyone finds a problem with it, do leave me a comment with
reproduction info. Seems to work, though, which is pretty cool.
