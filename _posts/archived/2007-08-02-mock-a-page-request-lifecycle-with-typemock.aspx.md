---
layout: post
title: "Mock a Page Request Lifecycle with TypeMock"
date: 2007-08-02 -0800
comments: true
disqus_identifier: 1246
tags: [testing,aspnet,gists,csharp,dotnet]
---
Let's say you're writing a service like an
[HttpModule](http://msdn2.microsoft.com/en-us/library/system.web.ihttpmodule.aspx) that
performs an action against each page that gets served up.  Maybe it does
something like [move the viewstate to the bottom of the
page](http://blog.madskristensen.dk/post/An-HttpModule-that-moves-ViewState-to-the-bottom.aspx),
update a property on the page, or fudge the control hierarchy a bit.

The thing is, you want to unit test it, but how?  Mocking an
[HttpContext](http://msdn2.microsoft.com/en-us/library/system.web.httpcontext.aspx)
is [hard
enough](http://haacked.com/archive/2007/06/19/unit-tests-web-code-without-a-web-server-using-httpsimulator.aspx),
and many times you end up going down the [UI
automation](http://watin.sourceforge.net/)
[road](http://www.hanselman.com/blog/PermaLink.aspx?guid=944a5284-6b8d-4366-81e8-2e241401e1b3).
Ugly.

Enter [TypeMock](http://www.typemock.com).

A few lines of code, setting up the minimum amount of stuff, and you can
mock just enough context to actually get a full page request lifecycle
to execute - events and all.  So say your service needs to be called
during the page PreInit and you can check the results of whatever you
did during Load... here's what that looks like:

```csharp
[Test(Description = "Tests an external influence on the page lifecycle.")]
public void MyPageServiceTest()
{
  Page page = new Page();

  MockObject<HttpBrowserCapabilities> mockBrowser = MockManager.MockObject<HttpBrowserCapabilities>(Constructor.NotMocked);
  mockBrowser.ExpectGetAlways("PreferredRenderingMime", "text/html");
  mockBrowser.ExpectGetAlways("PreferredResponseEncoding", "UTF-8");
  mockBrowser.ExpectGetAlways("PreferredRequestEncoding", "UTF-8");
  mockBrowser.ExpectGetAlways("SupportsMaintainScrollPositionOnPostback", false);

  MockObject<HttpRequest> mockRequest = MockManager.MockObject<HttpRequest>(Constructor.Mocked);
  mockRequest.ExpectGetAlways("FilePath", "/default.aspx");
  mockRequest.ExpectGetAlways("HttpMethod", "GET");
  mockRequest.ExpectGetAlways("Browser", mockBrowser.Object);

  MockObject<HttpResponse> mockResponse = MockManager.MockObject<HttpResponse>(Constructor.Mocked);

  HttpContext mockContext = new HttpContext(mockRequest.Object, mockResponse.Object);

  using (StringWriter stringWriter = new StringWriter())
  using (HtmlTextWriter htmlWriter = new HtmlTextWriter(stringWriter))
  {
    mockBrowser.AlwaysReturn("CreateHtmlTextWriter", htmlWriter);
    page.PreInit +=
      delegate(object sender, EventArgs e)
      {
        // Perform some action
      };
    page.Load +=
      delegate(object sender, EventArgs e)
      {
        // Check/Assert the results of your action
      };
    page.ProcessRequest(mockContext);
  }
}
```

Obviously the majority of this could be wrapped up into a library or
something, but I show it here to illustrate that, at least in ASP.NET
2.0, *this is all it takes*.

(You'll notice that I'm using the [Reflective
mocks](http://www.typemock.com/Docs/UserGuide/index.php?topic=FirstMockUsingGenericHelper.html)
instead of the [Natural
mocks](http://www.typemock.com/Docs/UserGuide/index.php?topic=FirstNaturalMock.html)
that I prefer in TypeMock.  The reason is that I'm mocking a couple of
internal things and mocking non-public items requires the Reflective
mocks.  By mocking these internal convenience methods, I can greatly
reduce the amount of setup for this to run.)
