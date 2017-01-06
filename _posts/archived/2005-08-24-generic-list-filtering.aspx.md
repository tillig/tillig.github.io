---
layout: post
title: "Generic List Filtering"
date: 2005-08-24 -0800
comments: true
disqus_identifier: 873
tags: [gists,csharp,net]
---
While .NET provides the sorting of collections through things like
[Array.Sort](http://msdn.microsoft.com/library/en-us/cpref/html/frlrfSystemArrayClassSortTopic.asp)
and the
[IComparer](http://msdn.microsoft.com/library/en-us/cpref/html/frlrfsystemcollectionsicomparerclasstopic.asp)
interface, there's no real generic ability to filter elements out of a
collection based on arbitrary criteria.

[dasBlog](http://www.dasblog.net/) implements collection-specific
filtering in the various strongly-typed collections by adding static
methods to the collections that allow you to pass in a collection and a
filter criteria delegate and have a new, filtered version of the
collection returned to you.

I thought it might be handy to have a more generic version of that
ability so you could filter any collection implementing the
[IList](http://msdn.microsoft.com/library/en-us/cpref/html/frlrfsystemcollectionsilistclasstopic.asp)
interface. It would allow you to have a single way to filter lists of
any type - all you'd have to do is cast the resulting collection back to
the type you originally passed in.

Here's what I came up with:

```csharp
using System;
using System.Collections;

namespace Paraesthesia.Collections {

  public delegate bool ListFilterCriteria(object obj);

  public sealed class ListFilter {

    private ListFilter(){}

    public static IList Filter(IList toFilter, ListFilterCriteria criteria){
      // Check parameters
      if(toFilter == null){
        throw new ArgumentNullException("toFilter", "The IList to filter must not be null.");
      }
      if(criteria == null){
        throw new ArgumentNullException("criteria", "The collection filter criteria must not be null.");
      }

      // Get the invocation list
      System.Delegate[] invocationList = criteria.GetInvocationList();
      if(invocationList.Length < 1){
        throw new ArgumentException("There must be at least one delegate in the invocation list of the filter criteria.", "criteria");
      }

      // Create the output collection
      IList filtered = null;
      try{
        // Get the input collection type
        Type inputType = toFilter.GetType();

        // Create the new object
        filtered = Activator.CreateInstance(inputType) as IList;
      }
      catch(Exception err){
        throw new NotSupportedException("Error occurred while creating new collection to contain filtered list.", err);
      }
      if(filtered == null){
        throw new NotSupportedException("Unable to create new collection to contain filtered list (constructor invocation returned null).");
      }

      // Perform the filtering
      foreach(object obj in toFilter){
        bool include = true;
        foreach(ListFilterCriteria individualCriteria in invocationList){
          include = include && individualCriteria(obj);
          if(!include){
            break;
          }
        }
        if(include){
          filtered.Add(obj);
        }
      }

      // Filtering complete; return the filtered collection
      return filtered;
    }
  }
}
```


 The idea is that you create a method that takes in an object and
returns a Boolean indicating if it should be included in the filtered
collection or not. Then pass your collection through the filter with the
criteria specified and a filtered version of the collection gets
returned to you - cast it back to the appropriate type and continue on
your merry way.

 Your filter criteria might look like this:

```csharp
using System;

namespace MyNamespace{
  public class MyCriteriaClass{
    public static bool FilterThreeChars(object obj){
      String toCheck = obj as String;
      if(toCheck == null){
        return false;
      }
      return toCheck.Length == 3;
    }
  }
}
```


 Then your use of the filter might look like this:

```csharp
using System;
using System.Collections.Specialized;
using Paraesthesia.Collections;

namespace MyNamespace{
  public class MyTestClass{
    public void TestTheFilter(){
      // Create the original collection
      StringCollection coll = new StringCollection();
      coll.Add("a");
      coll.Add("bc");
      coll.Add("def");
      coll.Add("ghij");
      coll.Add("klmno");

      // Set up the filter criteria delegate
      ListFilterCriteria criteria =
        new ListFilterCriteria(MyCriteriaClass.FilterThreeChars);

      // Filter the collection
      StringCollection filtered = ListFilter.Filter(coll, criteria) as StringCollection;

      // The filtered collection only contains "def"
    }
  }
}
```

I did some performance testing on this versus a similarly structured
filtering service that is strongly-typed and the two were comparable.
Your mileage may vary.

Note: Code is provided free, but also without support. If it breaks,
doesn't work, isn't optimized to your liking, etc., feel free to fix it,
but I'm not going to actively answer questions on it or help you figure
out why it's not working for you.
