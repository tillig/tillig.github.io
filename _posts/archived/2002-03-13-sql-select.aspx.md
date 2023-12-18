---
layout: post
title: "SQL SELECT"
date: 2002-03-13 -0800
comments: true
disqus_identifier: 21
tags: [sql]
---
Warning: I'm gonna geek out on you now. If you understand what this one
says, cool. If not, don't worry about it. It's not a topic for
everyone.

 So.

 I went to a lunchtime training at work today on SQL. I know a meager
amount, enough to get by in my daily programming duties. I pick up a
little here and there as I go, and I manage to get the job done.

 This guy at work taught us **25 different ways** to use the SELECT
statement in SQL. It was unbelieveable. I understand it *so much better*
now. Little tricks to get query results properly formatted and such...
doing calculations on result sets... it totally rocked.

 The last example he showed was how he helped his eighth grade daughter
solve a calculus problem *in SQL*. Not the most computationally
efficient process (the SQL Server version of the program took 50 seconds
to run; the VB version took 8 seconds), but the fact that you can do it
is pretty darn cool in my book.

 Also, the concept of *NULL* is a lot more clear in the context of SQL.
I guess I never realized that (at least with SQL Server) you have to
*specifically ask* for values that are NULL or they don't get returned
in the result set. For example, the statement

 SELECT name, city, state FROM address\_table WHERE state \<\> 'CA'

 will ***not*** return rows where the state is NULL. I guess I figured
it would, since NULL obviously doesn't equal 'CA' but apparently you
have to specifically ask for those, like this:

 SELECT name, city, state FROM address\_table WHERE state \<\> 'CA' OR
state IS NULL

 Funky. But it was cool to learn that stuff, especially some of the more
advanced syntax involving calculations on the result set (totals,
etc.).

 Well, enough geeking for now.

 SQL SELECT - *Minute to learn, lifetime to master.*
