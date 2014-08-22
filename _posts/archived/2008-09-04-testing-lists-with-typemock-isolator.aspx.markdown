---
layout: post
title: "Testing Lists with Typemock Isolator"
date: 2008-09-04 -0800
comments: true
disqus_identifier: 1443
tags: [Code Snippets,.NET]
---
I've seen this question a few times in the [Typemock
forums](http://www.typemock.com/community/index.php) so I figured I'd
post a little something on it:

**How do you mock a list using Typemock Isolator?**

The challenge we currently have is that Isolator can't mock types that
are declared in mscorlib, which includes things like List\<T\>, so if
you expose a list in your class, you have some potentially interesting
mocking challenges, depending on how you choose to expose it.

If you wrap the list in methods/properties on your class, when you set
up mocks, you'll be setting up mocks against your class - not the list -
so there is no problem there. If you expose the list as a public field,
that's where the challenge sets in.

Below is a code snippet showing an example class that does both things:
it has a method and a property that "wrap" a list, and it has a public
list field. Below that, you'll see tests that illustrate different ways
to handle the situations using Typemock Isolator.

    public class ListExample
    {
      // Publicly accessible list field
      public List<string> PublicList = new List<string>();
      
      // Private list that gets "wrapped" by methods/properties
      private List<string> _privateList = new List<string>();
      
      // Wraps the indexer of the private list
      public string this[int index]
      {
        get
        {
          return _privateList[index];
        }
        set
        {
          _privateList[index] = value;
        }
      }
      
      // Wraps the Add method on the private list
      public void Add(string value)
      {
        _privateList.Add(value);
      }
    }

    [TestFixture]
    [VerifyMocks]
    public class ListTestFixture
    {
      // The problem we have is you can't mock types in mscorlib
      // so you need to either wrap the list or mock the field.

      [Test]
      public void WrappedList()
      {
        // If the list is "wrapped" in members of a type not
        // in mscorlib, we have it pretty easy because the
        // mocks get set up against the members on the ListExample
        // type, not against the List<T> object.
        
        ListExample example = new ListExample();
        using(RecordExpectations recorder = RecorderManager.StartRecording())
        {
          // No matter what index we ask for, we always want
          // the "expected" value to come back.
          string dummy = example[0];
          recorder.Return("expected");
          recorder.RepeatAlways();
        }
        
        // Put these values into the list...
        example.Add("a");
        example.Add("b");
        example.Add("c");
        
        // ...But what we get out is the mock value.
        // We can even ask for out of range indices.
        Assert.AreEqual("expected", example[0]);
        Assert.AreEqual("expected", example[1]);
        Assert.AreEqual("expected", example[2]);
        Assert.AreEqual("expected", example[3]);
        Assert.AreEqual("expected", example[4]);
      }
      
      [Test]
      public void FieldListMocks()
      {
        // Here the challenge is that there aren't any
        // members on the ListExample object that wrap
        // the list so we've actually got to "mock" the
        // list proper.
        
        // To accomplish the mock, we'll modify the object's
        // state by poking in our expected field value.
        ListExample example = new ListExample();
        ObjectState state = new ObjectState(example);
        List<string> expectedList = new List<string>();
        expectedList.Add("expected");
        state.SetField("PublicList", expectedList);
        
        // Now when we ask for the list, we're getting the
        // expected list, not the original member.
        Assert.AreEqual("expected", example.PublicList[0]);
        
        // When we're done, we can reset things back to the
        // original values, which means the real PublicList
        // will be back - and will still be empty.
        state.ResetState();
        Assert.IsEmpty(example.PublicList);
      }
      
      [Test]
      public void FieldListReflection()
      {
        // Of course, you can always do it the brute
        // force way, too, through reflection. It doesn't
        // look much different from the ObjectState version,
        // above, but we can't "return to the original
        // value" at the end of the test.
        ListExample example = new ListExample();
        List<string> expectedList = new List<string>();
        expectedList.Add("expected");
        
        typeof(ListExample)
          .GetField("PublicList",
            BindingFlags.GetField | BindingFlags.Instance | BindingFlags.Public)
          .SetValue(example, expectedList);
        
        // Now when we ask for the list, we're getting the
        // expected list, not the original member.
        Assert.AreEqual("expected", example.PublicList[0]);
      }
    }

As you can see, testing with the list solely as a backing data store and
exposing the values only through members on your own class is far easier
and less... code-smelly... than exposing the list directly as a field.
Generally speaking, [you shouldn't expose public or protected fields
anyway](http://msdn.microsoft.com/en-us/library/ta31s3bc.aspx), opting
for property get/set instead to allow for more flexible implementations
later should the need arise. That said, if you have something you've got
to test using a public list field, above are some ways to do it.

