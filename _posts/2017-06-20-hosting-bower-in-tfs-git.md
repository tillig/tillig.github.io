---
layout: post
title: "Hosting Bower Packages in TFS Git"
date: 2017-01-01 -0800
comments: true
tags: [javascript,tfs]
description: "Referencing a Bower package in TFS Git wasn't as straightforward as one might have thought."
---

For better or worse, I'm trying to host a Bower package in a Git repository hosted in Team Foundation Server 2013.

Something I noticed when trying to install the package into my project is that the default Git credential manager was totally being ignored. That is, this was happening:

```
PS> bower install --save http://my.tfs.server:8080/tfs/Collection/Project/_git/my-package
bower my-package#*      not-cached http://my.tfs.server:8080/tfs/Collection/Project/_git/my-package#*
bower my-package#*         resolve http://my.tfs.server:8080/tfs/Collection/Project/_git/my-package#*
bower my-package#*        download http://my.tfs.server:8080/tfs/Collection/Project/_git/my-package
bower my-package#*           EHTTP Status code of 401
```

I had authenticated to the TFS server before and credentials should have been stored using the Windows Credential Manager. Doing a `git ls-remote` on the repo didn't prompt me for credentials.

[The answer, as it turns out](https://social.msdn.microsoft.com/Forums/vstudio/en-US/a1986859-59d3-426c-8b17-6a0f3382e2ca/use-git-on-tfs-to-host-bower-component?forum=TFService), is to **prefix the URL with `git+`** and suddenly the credential manager kicks in.

```
PS> bower install --save git+http://my.tfs.server:8080/tfs/Collection/Project/_git/my-package
bower my-package#*      not-cached http://my.tfs.server:8080/tfs/Collection/Project/_git/my-package#*
bower my-package#*         resolve http://my.tfs.server:8080/tfs/Collection/Project/_git/my-package#*
bower my-package#*        checkout 1.2.3
bower my-package#*        progress Receiving objects:  14% (15702/112154), 71.73 MiB | 9.57 MiB/s
bower my-package#*        progress Receiving objects:  20% (22431/112154), 81.10 MiB | 9.51 MiB/s
...
```