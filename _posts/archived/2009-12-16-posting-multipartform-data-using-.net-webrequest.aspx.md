---
layout: post
title: "Posting multipart/form-data Using .NET WebRequest"
date: 2009-12-16 -0800
comments: true
disqus_identifier: 1598
tags: [dotnet,gists]
---
While making my [ImageShack plugin for Windows Live Writer](/archive/2009/12/15/imageshackwriterplugin-upload-to-imageshack-from-windows-live-writer.aspx) I had to figure out how to make a web request that posts data to an endpoint in "multipart/form-data" format. That's a lot different than URL-encoding everything into a querystring format and sticking that in the body of the POST request. If you're uploading one or more files, you need to format things differently.

I looked all over for some built-in function that does this, but it doesn't seem to exist in the .NET base class library. Surprising, but also not surprising. I found [a question on StackOverflow](http://stackoverflow.com/questions/566462/upload-files-with-httpwebrequest-multipart-form-data) that talked about it and [an article with some tiny code snippets in it](http://blog.dmbcllc.com/2009/11/10/upload-a-file-via-webrequest-using-csharp/), but that didn't tell me what was really going on in the request and the code I found was either incomplete, confusing, or both.

So, in the spirit of "Not Invented Here," I decided to write my own. :)

First was figuring out what the format looked like in the request. [I found an article that showed just that](http://www.15seconds.com/Issue/001003.htm). Not a very thorough article, but it got me started. Let me boil it down in terms that [at least I] understand.

- **Generate a "boundary."** A boundary is a unique string that serves
  as a delimiter between each of the form values you'll be sending in
  your request. Usually these boundaries look something like

  `---------------------------7d01ecf406a6`

  with a bunch of dashes and a unique value.
- **Set the request content type** to `multipart/form-data; boundary=`
  and your boundary, like:

  `multipart/form-data; boundary=---------------------------7d01ecf406a6`
- **Any time you write a standard form value** to the request stream,
    you'll write:
  - Two dashes.
  - Your boundary.
  - One CRLF (`\r\n`).
  - A content-disposition header that tells the name of the form field you'll be inserting. That looks like:

    `Content-Disposition: form-data; name="yourformfieldname"`
  - Two CRLFs.
  - The value of the form field - not URL encoded.
  - One CRLF.

- **Any time you write a file**to the request stream (for upload),
    you'll write:
  - Two dashes.
  - Your boundary.
  - One CRLF (`\r\n`).
  - A content-disposition header that tells the name of the form
    field corresponding to the file and the name of the file. That
    looks like:

    `Content-Disposition: form-data; name="yourformfieldname"; filename="somefile.jpg"`
  - One CRLF.
  - A content-type header that says what the MIME type of the file
    is. That looks like:

    `Content-Type: image/jpg`
  - Two CRLFs.
  - The entire contents of the file, byte for byte. It's OK to
    include binary content here. Don't base-64 encode it or
    anything, just stream it on in.
  - One CRLF.

- **At the end of your request**, after writing all of your fields and
    files to the request, you'll write:
  - Two dashes.
  - Your boundary.
  - Two more dashes.

That's how it works. The problem is that it's not built-in to [the
HttpWebRequest
class](http://msdn.microsoft.com/en-us/library/system.net.httpwebrequest.aspx),
so you have some manual work to do. Lucky for you, I've got some
snippets that do a lot of heavy lifting.

First, here's a method you can use to create the boundary:

```csharp
/// <summary>
/// Creates a multipart/form-data boundary.
/// </summary>
/// <returns>
/// A dynamically generated form boundary for use in posting multipart/form-data requests.
/// </returns>
private static string CreateFormDataBoundary()
{
  return "---------------------------" + DateTime.Now.Ticks.ToString("x");
}
```

Next, here's an extension method I wrote for generic dictionaries with
string names and string values, sort of like you'd have if you were
generating a querystring or a regular post request. This method takes
the dictionary and writes the name/value pairs out to a supplied stream
in the proper format.

```csharp
using System;
using System.Collections.Generic;
using System.IO;
using System.Web;

namespace MultipartFormData
{
  /// <summary>
  /// Extension methods for generic dictionaries.
  /// </summary>
  public static class DictionaryExtensions
  {
    /// <summary>
    /// Template for a multipart/form-data item.
    /// </summary>
    public const string FormDataTemplate = "--{0}\r\nContent-Disposition: form-data; name=\"{1}\"\r\n\r\n{2}\r\n";

    /// <summary>
    /// Writes a dictionary to a stream as a multipart/form-data set.
    /// </summary>
    /// <param name="dictionary">The dictionary of form values to write to the stream.</param>
    /// <param name="stream">The stream to which the form data should be written.</param>
    /// <param name="mimeBoundary">The MIME multipart form boundary string.</param>
    /// <exception cref="System.ArgumentNullException">
    /// Thrown if <paramref name="stream" /> or <paramref name="mimeBoundary" /> is <see langword="null" />.
    /// </exception>
    /// <exception cref="System.ArgumentException">
    /// Thrown if <paramref name="mimeBoundary" /> is empty.
    /// </exception>
    /// <remarks>
    /// If <paramref name="dictionary" /> is <see langword="null" /> or empty,
    /// nothing wil be written to the stream.
    /// </remarks>
    public static void WriteMultipartFormData(
      this Dictionary<string, string> dictionary,
      Stream stream,
      string mimeBoundary)
    {
      if (dictionary == null || dictionary.Count == 0)
      {
        return;
      }
      if (stream == null)
      {
        throw new ArgumentNullException("stream");
      }
      if (mimeBoundary == null)
      {
        throw new ArgumentNullException("mimeBoundary");
      }
      if (mimeBoundary.Length == 0)
      {
        throw new ArgumentException("MIME boundary may not be empty.", "mimeBoundary");
      }
      foreach (string key in dictionary.Keys)
      {
        string item = String.Format(FormDataTemplate, mimeBoundary, key, dictionary[key]);
        byte[] itemBytes = System.Text.Encoding.UTF8.GetBytes(item);
        stream.Write(itemBytes, 0, itemBytes.Length);
      }
    }
  }
}
```

That takes care of regular form fields, but what about files? Here's an
extension method for FileInfo objects that will write the file out to a
supplied stream, also in the proper format:

```csharp
using System;
using System.IO;
using System.Text;

namespace MultipartFormData
{
  /// <summary>
  /// Extension methods for <see cref="System.IO.FileInfo"/>.
  /// </summary>
  public static class FileInfoExtensions
  {
    /// <summary>
    /// Template for a file item in multipart/form-data format.
    /// </summary>
    public const string HeaderTemplate = "--{0}\r\nContent-Disposition: form-data; name=\"{1}\"; filename=\"{2}\"\r\nContent-Type: {3}\r\n\r\n";

    /// <summary>
    /// Writes a file to a stream in multipart/form-data format.
    /// </summary>
    /// <param name="file">The file that should be written.</param>
    /// <param name="stream">The stream to which the file should be written.</param>
    /// <param name="mimeBoundary">The MIME multipart form boundary string.</param>
    /// <param name="mimeType">The MIME type of the file.</param>
    /// <param name="formKey">The name of the form parameter corresponding to the file upload.</param>
    /// <exception cref="System.ArgumentNullException">
    /// Thrown if any parameter is <see langword="null" />.
    /// </exception>
    /// <exception cref="System.ArgumentException">
    /// Thrown if <paramref name="mimeBoundary" />, <paramref name="mimeType" />,
    /// or <paramref name="formKey" /> is empty.
    /// </exception>
    /// <exception cref="System.IO.FileNotFoundException">
    /// Thrown if <paramref name="file" /> does not exist.
    /// </exception>
    public static void WriteMultipartFormData(
      this FileInfo file,
      Stream stream,
      string mimeBoundary,
      string mimeType,
      string formKey)
    {
      if (file == null)
      {
        throw new ArgumentNullException("file");
      }
      if (!file.Exists)
      {
        throw new FileNotFoundException("Unable to find file to write to stream.", file.FullName);
      }
      if (stream == null)
      {
        throw new ArgumentNullException("stream");
      }
      if (mimeBoundary == null)
      {
        throw new ArgumentNullException("mimeBoundary");
      }
      if (mimeBoundary.Length == 0)
      {
        throw new ArgumentException("MIME boundary may not be empty.", "mimeBoundary");
      }
      if (mimeType == null)
      {
        throw new ArgumentNullException("mimeType");
      }
      if (mimeType.Length == 0)
      {
        throw new ArgumentException("MIME type may not be empty.", "mimeType");
      }
      if (formKey == null)
      {
        throw new ArgumentNullException("formKey");
      }
      if (formKey.Length == 0)
      {
        throw new ArgumentException("Form key may not be empty.", "formKey");
      }
      string header = String.Format(HeaderTemplate, mimeBoundary, formKey, file.Name, mimeType);
      byte[] headerbytes = Encoding.UTF8.GetBytes(header);
      stream.Write(headerbytes, 0, headerbytes.Length);
      using (FileStream fileStream = new FileStream(file.FullName, FileMode.Open, FileAccess.Read))
      {
        byte[] buffer = new byte[1024];
        int bytesRead = 0;
        while ((bytesRead = fileStream.Read(buffer, 0, buffer.Length)) != 0)
        {
          stream.Write(buffer, 0, bytesRead);
        }
        fileStream.Close();
      }
      byte[] newlineBytes = Encoding.UTF8.GetBytes("\r\n");
      stream.Write(newlineBytes, 0, newlineBytes.Length);
    }
  }
}
```

Finally, you need to put all of that together when you make your web
request. That means setting the content type on your request, writing
the parameters to the request stream using the extension methods, and
getting the response back. An example of what this might look like is
here:

```csharp
public string ExecutePostRequest(
  Uri url,
  Dictionary<string, string> postData,
  FileInfo fileToUpload,
  string fileMimeType,
  string fileFormKey
){
  HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url.AbsoluteUri);
  request.Method = "POST";
  request.KeepAlive = true;
  string boundary = CreateFormDataBoundary();
  request.ContentType = "multipart/form-data; boundary=" + boundary;
  Stream requestStream = request.GetRequestStream();
  postData.WriteMultipartFormData(requestStream, boundary);
  if (fileToUpload != null)
  {
    fileToUpload.WriteMultipartFormData(requestStream, boundary, fileMimeType, fileFormKey);
  }
  byte[] endBytes = System.Text.Encoding.UTF8.GetBytes("--" + boundary + "--");
  requestStream.Write(endBytes, 0, endBytes.Length);
  requestStream.Close();
  using (WebResponse response = request.GetResponse())
  using (StreamReader reader = new StreamReader(response.GetResponseStream()))
  {
    return reader.ReadToEnd();
  };
}
```

Obviously you'll need to tailor the usage to your own needs, but this at least shows it in action.

I'm no expert on this by any means, but this is what got me through [the magic of file upload via POST to ImageShack](/archive/2009/12/15/imageshackwriterplugin-upload-to-imageshack-from-windows-live-writer.aspx), so hopefully it'll help someone else out there, too.
