---
layout: post
title: "Your Mom's REST API"
date: 2015-04-02 -0800
comments: true
tags: [humor,rest]
---

I was browsing around the other day and found your mom's REST API. Naturally, I pulled my client out and got to work.

An abbreviated session follows:

```
GET /your/mom HTTP/1.1

HTTP/1.1 200 OK

PUT /your/mom HTTP/1.1
":)"

HTTP/1.1 402 Payment Required

POST /your/mom HTTP/1.1
"$"

HTTP/1.1 411 Length Required

PUT /your/mom HTTP/1.1
":)"

HTTP/1.1 406 Not Acceptable
HTTP/1.1 413 Request Entity Too Large
HTTP/1.1 200 OK
HTTP/1.1 200 OK
.
HTTP/1.1 200 OK
.
.
HTTP/1.1 200 OK
.
.
.
HTTP/1.1 502 Bad Gateway
HTTP/1.1 503 Service Unavailable
```

I think I need to get a new API key before she gives me the ol' 410. :)