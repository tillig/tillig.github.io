---
layout: post
title: "pMachine Update: How To Add Automatic Links To Comments"
date: 2004-06-14 -0800
comments: true
disqus_identifier: 585
tags: [Code Snippets]
---
I had a problem where I wanted to add a pMCode tag in pMachine to allow
me to automatically link to other pages on my site. For example,
normally you can use `[url=http://somesite.com]linktext[/url]` to create
links to other sites... but what if you want to link to pages in your
own site? Adding hard references like that makes the site sort of
inflexible if you change your URL or move to a different server (which
is the problem I had). Wouldn't it be nice if you could link to, say,
your comments page by doing something like this:
`[commentlink=123]linktext[/commentlink]`

So that's what I drummed up. It seems to work for my site, which only
hosts one blog, but it should work for multi-blog sites, too.
To enable this change, you'll need to edit your /pm/lib/pmcode.fns.php
file.

At the top of the `pmcode_decode` function, add the following:

    global $weblog;

Now add the following lines as shown, around line 305 in the file, with
the rest of the substitutions:

    // [commentlink=123]sometext[/commentlink]
    $str = preg_replace("/\[commentlink=(.*?)\](.*?)\[\/commentlink\]/i", "<a href=\"" . get_comments_link('\\1', $weblog) . "\">\\2</a>", $str);

Then copy and paste the following function in that same file, somewhere
toward the bottom:

    function get_comments_link($postid, $weblog = ""){
     global $db_multiweblogs, $db_categories, $db_weblog;
     global $db_members, $db_upload_prefs, $db_nonmembers, $pingserver_path;
     global $db_comments, $profileviewpage, $auto_xhtml, $url_rewriting, $sfx;

     if ($weblog == "") $weblog = "weblog";

     $db = new DB();
     $blogid_array = array();
     $sql = "select id,weblog from $db_multiweblogs order by id";
     $query = new DB_query($db, $sql);

     while ($query->db_fetch_object())
     {
      $blogid_array[$query->obj->weblog] = $query->obj->id;
     }

     unset($query);
     unset($sql);

     $catpage = (isset($blogid_array[$blog]))  ? $blogid_array[$blog] : "1";
     $pagespath = get_pref("pages_path_abs_$weblog","1");
     $comments_page = get_pref("comments_page_$weblog");

     $delim = '?id=';

     if ($url_rewriting == 1)
     {
      $delim = '/';
      $comments_page = str_replace($sfx, '', $comments_page);
     }

     $catrow     = 0;

     $comments_url = "$pagespath{$comments_page}$delim$prefix{$postid}_0_{$catpage}_{$catrow}_C";

     if ($url_rewriting == 1) $comments_url .= '/';

     return $comments_url;
    }

That should do it. Now you can use the new "commentlink" pMCode tag.
Just pass in the ID to the entry you want to link to, like this:
`[commentlink=123]linktext[/commentlink]`

Good luck!
