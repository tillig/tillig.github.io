---
layout: post
title: "Using ASP.NET MVC 5 IAuthenticationFilter for Authentication Challenges"
date: 2013-09-27 -0800
comments: true
disqus_identifier: 1826
tags: [.NET,Code Snippets,Web Development]
---
One of the new ASP.NET MVC 5 features, authentication filters, has
dreadfully little documentation. There’s [a Visual Studio Magazine
article on
it](http://visualstudiomagazine.com/articles/2013/08/28/asp_net-authentication-filters.aspx),
but that basically replicates the
[AuthorizeAttribute](http://msdn.microsoft.com/en-us/library/system.web.mvc.authorizeattribute.aspx)
in a different way. It doesn’t really explain much else.

Diving into [the
source](https://github.com/ASP-NET-MVC/aspnetwebstack/blob/master/src/System.Web.Mvc/Filters/IAuthenticationFilter.cs)
doesn’t tell you too much, either. The [context you get in the
filter](https://github.com/ASP-NET-MVC/aspnetwebstack/blob/master/src/System.Web.Mvc/Filters/AuthenticationChallengeContext.cs)
has a little more of an idea about what you should be doing, but… it’s
really not enough.

The real magic happens in the `ControllerActionInvoker.InvokeAction`
method. [The source
shows](https://github.com/ASP-NET-MVC/aspnetwebstack/blob/master/src/System.Web.Mvc/ControllerActionInvoker.cs)
that the general flow is like this:

1.  MVC action gets selected.
2.  `IAuthenticationFilter.OnAuthentication` executes.
3.  If there is any result set from `OnAuthentication`, then
    `IAuthenticationFilter.OnAuthenticationChallenge` executes.
4.  `IAuthorizationFilter.OnAuthorization` executes. (The
    `AuthorizeAttribute`.)
5.  If there is any result set from `OnAuthorization`, then
    `IAuthenticationFilter.OnAuthenticationChallenge` executes.
6.  Assuming the user is authenticated/authorized, the controller action
    executes.
7.  `IAuthenticationFilter.OnAuthentication` executes.

From the comments in the code, it appears the intent is that you somehow
“chain” action results together. I’m not sure what that means, whether
there’s [a decorator
pattern](http://en.wikipedia.org/wiki/Decorator_pattern) intended or
whether the design assumes that authentication challenges would just add
specific HTTP headers to the response or what.

However, here’s a simple scenario that I came up with that lets you
inject some sort of security challenge into a UI flow using the
`IAuthenticationFilter`.

**First, let’s create a custom result type.** We’ll use this result as a
“flag” in the system to indicate the user needs to be challenged. We’ll
derive it from `HttpUnauthorizedResult` so if, for whatever reason, it
“slips through the system,” the user will be denied access.

    public class ChallengeResult : HttpUnauthorizedResult
    {
      public ChallengeResult(string postAction)
      {
        this.PostAction = postAction;
      }

      public string PostAction { get; private set; }
    }

The result stores the location where the user needs to return in order
to complete the operation after they've been challenged.

**Next, let’s create our filter.** This filter won’t do anything during
the authentication portion of its lifecycle, but it will handle
challenges. In this case, it’ll look for our challenge result and take
action if the user needs to be challenged.

    public class ChallengeFilter : IAuthenticationFilter
    {
      public void OnAuthentication(AuthenticationContext filterContext)
      {
        // Do nothing.
      }

      public void OnAuthenticationChallenge(AuthenticationChallengeContext filterContext)
      {
        var result = filterContext.Result as ChallengeResult;
        if (result == null)
        {
          // If it's something other than needing a challenge, move on.
          return;
        }

        // Save the location where the user needs to be returned.
        filterContext.RequestContext.HttpContext.Session["postAction"] = result.PostAction;

        // Send the user to be challenged.
        var helper = new UrlHelper(filterContext.RequestContext);
        var url = helper.Action("Index", "Challenge");
        filterContext.Result = new RedirectResult(url);
      }
    }

**You'll notice the filter sends the user to a challenge controller.**
That’s the controller with the form that requires the user to answer a
question or re-enter credentials or whatever. We’ll come back to that in
a second. Before we do that, let’s see how we’d consume this filter so
we can get challenged.

**Here’s what you do in the controller** where you need to issue a
challenge:

-   Check to see if the user’s authorized. If they are, let the
    operation proceed.
-   If they’re not…
    -   Store any form state you’ll need to complete the operation.
    -   Issue the challenge result so the filter can pick it up.

A very, very simple controller might look like this:

    public class DoWorkController
    {
      public ActionResult Index()
      {
        // Display the view where the user enters
        // data or whatever.
        return View();
      }

      [HttpPost]
      [ActionName("Index")]
      [ValidateAntiForgeryToken]
      public ActionResult IndexNext(Model model)
      {
        // Handle form submission - POST/REDIRECT/GET.
        if (!this.ModelState.IsValid)
        {
          return View(model);
        }

        // Store the data so we can use it in later steps
        // and possibly in the challenge.
        this.Session["data"] = model;
        return this.RedirectToAction("Review");
      }

      public ActionResult Review()
      {
        var model = (Model)this.Session["data"];
        return View(model);
      }

      [HttpPost]
      [ActionName("Review")]
      [ValidateAntiForgeryToken]
      public ActionResult ReviewNext()
      {
        var model = (Model)this.Session["data"];
        var authorized = this.Session["authorized"];

        // Here's where you determine if the user needs to
        // be challenged.
        if (UserNeedsChallenge(model) && authorized == null)
        {
          // On successful challenge, POST back to the Review action.
          return new ChallengeResult(this.Url.Action("Review"));
        }

        // If the user gets here, they're authorized or don't need
        // a challenge. Do the work, clear any authorization status,
        // and issue a confirmation view.
        PerformWork(model);
        this.Session.Remove("authorized");
        return this.RedirectToAction("Confirm");
      }

      public ActionResult Confirm()
      {
        // Display some sort of success message about
        // the operation performed.
        var model = (Model)this.Session["data"];
        return View(model);
      }
    }

**This is obviously not copy/paste ready for use.** There are all sorts
of things wrong with that sample, like the fact the session data is
never cleared, we don’t have the ability to handle multiple windows
running multiple operations at a time, and so on. The idea holds, though
– you need to persist the form data somewhere so you can send the user
over to be challenged and then resume the operation when you come back.
Maybe you can create a service that holds that information in a
database; maybe you invent a backing store in session that has a more
“keyed” approach so each operation has a unique ID. **Whatever it is,
the important part is that persistence.**

OK, so now we have a custom result, a filter that looks for that result
and sends the user to be challenged, and a controller that uses some
business logic to determine if the user needs the challenge.

**The next piece is the challenge controller.** This is the controller
that asks the user a question, prompts for credentials, or whatever, and
resumes the operation once the user successfully answers.

I won’t put the whole controller in here – that’s up to you. But on
successfully answering the question, that’s the tricky bit. If you’re
doing things right, you’re not doing anything “important” (deleting
records, modifying data) on a GET request, so you will need to issue a
POST to the appropriate endpoint. You also have to mark the operation as
authorized so the POST to the original controller will skip the
challenge.

And don't forget handling the unauthorized scenario - if the user fails
the challenge, you don't want them to be able to "go back and try again"
so you need to clear out all the state related to the operation.

    public class ChallengeController : Controller
    {
      // Other actions in this controller should take care of
      // running the user through the gamut of questions or
      // challenges. In the end, after the final challenge is
      // verified, you need to resume the transaction.
      [HttpPost]
      [ValidateAntiForgeryToken]
      public ActionResult VerifyAnswer(ChallengeModel challenge)
      {
        if (!this.ModelState.IsValid)
        {
          return this.View(challenge);
        }

        // Remove the POST action. It's make-it-or-break-it time.
        var postAction = this.Session["postAction"].ToString();
        this.Session.Remove("postAction");

        if(!AnswerIsCorrect(challenge.Answer))
        {
          // If the user doesn't make it through all the challenges,
          // clear the data and deny them access.
          this.Session.Remove("authorized");
          this.Session.Remove("data");
          return RedirectToAction("Denied");
        }

        // If they do get the challenge right, authorize the operation
        // and resume where they left off. Send them to a special "success"
        // view with the post action.
        this.Session["authorized"] = true;
        return this.View("Success", postAction);
      }
    }

**Again, this is not copy/paste ready.** It’s just to show you the
general premise – if they fail the challenge, you need to remember to
clean things up and totally deny access; if they succeed, authorize the
challenge and send them on their way.

**The final question is in that Success view how to resume the
transaction.** The easiest way is to issue a very tiny view with a POST
action to the original location and auto-submit it via script. That
might look something like this:

    @model string
    @{
      Layout = null;
    }
    <!DOCTYPE html>
    <html><head><title>Successful Authorization</title></head>
    <body>
    <form method="post" action="@this.Model" id="successform">
    @Html.AntiForgeryToken()
    <input type="submit" value="Process Transaction" />
    </form>
    <script>document.getElementById("successform").submit();</script>
    </body>
    </html>

Nothing too fancy, but works like a charm.

Now when the user succeeds, this form will load up, a POST will be
issued back to the original controller doing work, and since the
authorization value is set, the user won’t be challenged again –
everything will just succeed.

Last thing to do – register that challenge filter in the global filters
collection. That way when you issue the challenge result from your
controller, the filter will catch it and do the redirect.

    public class FilterConfig
    {
      public static void RegisterGlobalFilters(GlobalFilterCollection filters)
      {
        filters.Add(new AuthorizeAttribute());
        filters.Add(new HandleErrorAttribute());

        // Add that challenge filter!
        filters.Add(new ChallengeFilter());
      }
    }

**You're done!** You’re now using the `IAuthenticationFilter` to issue a
challenge to verify a transaction prior to committing it. This is what I
see the primary value of the new `IAuthenticationFilter` as being,
though I wish there was a bit more guidance around it.

**There’s a huge, huge ton of room for improvement in the stuff I showed
you above. Please, please, please do not just copy/paste it into your
app and start using it like it’s production-ready.** You need to
integrate your own business logic for challenging people. You need to
make sure people can’t start two different transactions, authorize one,
and then complete the other one. You need to protect yourself against
[all the standard OWASP
stuff](https://www.owasp.org/index.php/Category:OWASP_Top_Ten_Project).
What I’ve shown you here is proof-of-concept spike level stuff that
probably would have been really difficult to follow if I put in all the
bells and whistles. I’ll leave that as an exercise to the reader.

> *Minor aside*: It seems to me that there’s some ambiguity between
> “authentication” and “authorization” here. The `AuthorizeAttribute`
> sort of mixes the two, determining both if the user’s authenticated
> (they have identified themselves) and, optionally, if the user is in a
> specific role or has a specific name. The `IAuthenticationFilter` runs
> before authorization, which is correct, but with the addition of the
> ability to challenge built in… it seems that it’s more suited to
> authorization – I’ve already proved who I am, but I may need to be
> challenged to elevate my privileges or something, which is an
> authorization thing.

