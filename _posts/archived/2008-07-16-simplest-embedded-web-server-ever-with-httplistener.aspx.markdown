---
layout: post
title: "Simplest Embedded Web Server Ever with HttpListener"
date: 2008-07-16 -0800
comments: true
disqus_identifier: 1418
tags: [Code Snippets,Web Development,.NET]
---
While working on solving [a CR\_Documentor known
issue](/archive/2008/07/14/cr_documentor-known-issue-javascript-security-warning.aspx),
I realized I needed to have some sort of embedded web server running so
I could serve up dynamically generated content. I didn't need a full
ASP.NET stack, just something I could pipe a string to and have it serve
that up so a hosted IE control would be getting content from a "live
server" rather than from a file on disk or from in-memory DOM
manipulation... because both of those latter methods cause security
warnings to pop up.

I looked at creating a dependency on the ASP.NET development server,
WebDev.WebServer.exe, or the assembly that contains the guts of that,
WebDev.WebHost.dll, but both of those only get installed in certain
configurations of Visual Studio (I think it's when you install the
Visual Web Developer portion) and I couldn't really assume everyone had
that. [Paulo Morgado](http://weblogs.asp.net/paulomorgado/) then pointed
me to
[HttpListener](http://msdn.microsoft.com/en-us/library/system.net.httplistener.aspx),
and let me tell you, that's a pretty sweet solution.

Here's a very simple web server implementation that uses HttpListener.
You handle an event, provide some content for the incoming request, and
that's what the response content is. It doesn't read files from the
filesystem, it doesn't do auth, it doesn't do ASP.NET... it's just the
simplest of simple servers, which is exactly what I need for
CR\_Documentor.

**UPDATE 2/2/2009**: I found that the super-simple way I had things
caused some interesting and unfortunate race conditions which meant
things occasionally locked up for no particular reason. As such, I've
updated the code sample to use events to handle incoming requests and
show the listener running on a separate thread. It's still pretty
simple, all things considered, and I have it up and running in
CR\_Documentor.

    using System;
    using System.Globalization;
    using System.Net;
    using System.Threading;

    namespace HttpListenerExample
    {
      public class WebServer : IDisposable
      {
        public event EventHandler<HttpRequestEventArgs> IncomingRequest = null;

        public enum State
        {
          Stopped,
          Stopping,
          Starting,
          Started
        }

        private Thread _connectionManagerThread = null;
        private bool _disposed = false;
        private HttpListener _listener = null;
        private long _runState = (long)State.Stopped;

        public State RunState
        {
          get
          {
            return (State)Interlocked.Read(ref _runState);
          }
        }

        public virtual Guid UniqueId { get; private set; }

        public virtual Uri Url { get; private set; }

        public WebServer(Uri listenerPrefix)
        {
          if (!HttpListener.IsSupported)
          {
            throw new NotSupportedException("The HttpListener class is not supported on this operating system.");
          }
          if(listenerPrefix == null)
          {
            throw new ArgumentNullException("listenerPrefix");
          }
          this.UniqueId = Guid.NewGuid();
          this._listener = new HttpListener();
          this._listener.Prefixes.Add(listenerPrefix.AbsoluteUri);
        }

        ~WebServer()
        {
          this.Dispose(false);
        }

        private void ConnectionManagerThreadStart()
        {
          Interlocked.Exchange(ref this._runState, (long)State.Starting);
          try
          {
            if (!this._listener.IsListening)
            {
              this._listener.Start();
            }
            if (this._listener.IsListening)
            {
              Interlocked.Exchange(ref this._runState, (long)State.Started);
            }

            try
            {
              while (RunState == State.Started)
              {
                HttpListenerContext context = this._listener.GetContext();
                this.RaiseIncomingRequest(context);
              }
            }
            catch (HttpListenerException)
            {
              // This will occur when the listener gets shut down.
              // Just swallow it and move on.
            }
          }
          finally
          {
            Interlocked.Exchange(ref this._runState, (long)State.Stopped);
          }
        }

        public virtual void Dispose()
        {
          this.Dispose(true);
          GC.SuppressFinalize(this);
        }

        private void Dispose(bool disposing)
        {
          if (this._disposed)
          {
            return;
          }
          if (disposing)
          {
            if (this.RunState != State.Stopped)
            {
              this.Stop();
            }
            if (this._connectionManagerThread != null)
            {
              this._connectionManagerThread.Abort();
              this._connectionManagerThread = null;
            }
          }
          this._disposed = true;
        }

        private void RaiseIncomingRequest(HttpListenerContext context)
        {
          HttpRequestEventArgs e = new HttpRequestEventArgs(context);
          try
          {
            if (this.IncomingRequest != null)
            {
              this.IncomingRequest.BeginInvoke(this, e, null, null);
            }
          }
          catch
          {
            // Swallow the exception and/or log it, but you probably don't want to exit
            // just because an incoming request handler failed.
          }
        }

        public virtual void Start()
        {
          if (this._connectionManagerThread == null || this._connectionManagerThread.ThreadState == ThreadState.Stopped)
          {
            this._connectionManagerThread = new Thread(new ThreadStart(this.ConnectionManagerThreadStart));
            this._connectionManagerThread.Name = String.Format(CultureInfo.InvariantCulture, "ConnectionManager_{0}", this.UniqueId);
          }
          else if (this._connectionManagerThread.ThreadState == ThreadState.Running)
          {
            throw new ThreadStateException("The request handling process is already running.");
          }

          if (this._connectionManagerThread.ThreadState != ThreadState.Unstarted)
          {
            throw new ThreadStateException("The request handling process was not properly initialized so it could not be started.");
          }
          this._connectionManagerThread.Start();

          long waitTime = DateTime.Now.Ticks + TimeSpan.TicksPerSecond * 10;
          while (this.RunState != State.Started)
          {
            Thread.Sleep(100);
            if (DateTime.Now.Ticks > waitTime)
            {
              throw new TimeoutException("Unable to start the request handling process.");
            }
          }
        }

        public virtual void Stop()
        {
          // Setting the runstate to something other than "started" and
          // stopping the listener should abort the AddIncomingRequestToQueue
          // method and allow the ConnectionManagerThreadStart sequence to
          // end, which sets the RunState to Stopped.
          Interlocked.Exchange(ref this._runState, (long)State.Stopping);
          if (this._listener.IsListening)
          {
            this._listener.Stop();
          }
          long waitTime = DateTime.Now.Ticks + TimeSpan.TicksPerSecond * 10;
          while (this.RunState != State.Stopped)
          {
            Thread.Sleep(100);
            if (DateTime.Now.Ticks > waitTime)
            {
              throw new TimeoutException("Unable to stop the web server process.");
            }
          }

          this._connectionManagerThread = null;
        }
      }
      
      public class HttpRequestEventArgs : EventArgs
      {
        public HttpListenerContext RequestContext { get; private set; }

        public HttpRequestEventArgs(HttpListenerContext requestContext)
        {
          this.RequestContext = requestContext;
        }
      }
    }

With this simple wrapper, you can new-up a web server instance, start it
listening for requests, and handle the IncomingRequest event to serve up
the content you want. Dispose the instance and you're done. Here's what
it looks like in a simple console program host:

    using System;
    using System.IO;
    using System.Net;
    using System.Text;

    namespace HttpListenerExample
    {
      class Program
      {
        static void Main(string[] args)
        {
          const string ServerTestUrl = "http://localhost:11235/";
          using (WebServer listener = new WebServer(new Uri(ServerTestUrl)))
          {
            listener.IncomingRequest += WebServer_IncomingRequest;
            listener.Start();
            Console.WriteLine("Listener accepting requests: {0}", listener.RunState == WebServer.State.Started);
            Console.WriteLine("Making requests...");
            for(int i = 0; i < 10; i ++)
            {
              HttpWebRequest request = (HttpWebRequest)WebRequest.Create(ServerTestUrl);
              HttpWebResponse response = (HttpWebResponse)request.GetResponse();
              using(Stream responseStream = response.GetResponseStream())
              using(StreamReader responseStreamReader = new StreamReader(responseStream, Encoding.UTF8))
              {
                Console.WriteLine(responseStreamReader.ReadToEnd());
              }
              System.Threading.Thread.Sleep(1000);
            }
            
          }
          Console.WriteLine("Done. Press any key to exit.");
          Console.ReadLine();
        }
        
        public static void WebServer_IncomingRequest(object sender, HttpRequestEventArgs e)
        {
          HttpListenerResponse response = e.RequestContext.Response;
          string content = DateTime.Now.ToLongTimeString();
          byte[] buffer = Encoding.UTF8.GetBytes(content);
          response.StatusCode = (int)HttpStatusCode.OK;
          response.StatusDescription = "OK";
          response.ContentLength64 = buffer.Length;
          response.ContentEncoding = Encoding.UTF8;
          response.OutputStream.Write(buffer, 0, buffer.Length);
          response.OutputStream.Close();
          response.Close();
        }
      }
    }

I'm using this approach in CR\_Documentor to serve up the content
preview and maybe augment it a bit later so I can also serve images from
embedded resources and such, making the preview that much richer and
more accurate.

