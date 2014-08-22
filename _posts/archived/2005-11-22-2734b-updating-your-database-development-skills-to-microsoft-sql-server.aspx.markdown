---
layout: post
title: "2734B: Updating Your Database Development Skills to Microsoft SQL Server 2005, Part 1"
date: 2005-11-22 -0800
comments: true
disqus_identifier: 919
tags: [GeekSpeak]
---
I'm taking [Microsoft training course \#2734B: Updating Your Database
Development Skills to Microsoft SQL Server
2005](http://www.microsoft.com/learning/syllabi/en-us/2734bfinal.mspx).
I've got my
[MCSD](http://www.microsoft.com/learning/mcp/mcsd/default.asp); I really
just want to see what's new in SQL Server 2005 and how to use it. Rock
on, right?
 
 Day 1, we covered a general overview of SQL Server 2005 changes (enough
to give you a general idea of what the course will cover, but not enough
to really tell you anything), some of the T-SQL enhancements they've
added, and a bit on how they've updated the handling of XML in the
database.
 
 The first module, the overview, was pretty good for the beginners but
really didn't tell me much.
 
 The second module, the T-SQL updates, was neat. They added some stuff
that should have been there all along (`ALTER INDEX`, anyone?) and put
some really cool things in for partitioning. When we got to pivot
tables... well, I won't lie. I generally understand the concept of pivot
tables, but I'm not a data analyst and really don't care to be, so when
we got to the use of `PIVOT` and `UNPIVOT`, I took it in from an
academic standpoint but I can't say I totally *get it*. The new ranking
operators are cool, though, and I can see how they would be very useful.
And how can I forget the `TRY/CATCH` they've added? Love that.
 
 The third module, on handling XML, got a little more tricky. I feel
pretty comfortable in my XML skin and worked with SQL Server's `OPENXML`
and `SELECT...FOR XML` in the 2000 version, so that stuff wasn't new.
The added ability to format the output of the XML to the level now
available is very welcome, as is the ability to store XML as a native
data type (either validated or not).
 
 So what have I seen that I don't like?
 
 When we got into the trickier parts of the XML stuff - updating values
of attributes in stored XML fields, for example - the book got a bit
sparse. The lab would instruct you to do something like "change the
'foo' attribute in the document stored in field 'bar' in the first row
in the table to have the value 'val'" and when you went to look up the
syntax for that... well, good luck with that. I ended up opening the
solution and seeing how they did it (at which point it finally made
sense).
 
 The biggest issue, though, is how arbitrary some of the syntax has
become. It turns out that in some cases, T-SQL requires semicolons to
end statements and in other cases it doesn't. That makes it difficult,
but I figured out that they don't penalize you for ending every
statement in a semicolon, so maybe that's the new habit to get into. I
also don't like the inconsistency of the syntax - sometimes you specify
options in parentheses, sometimes you don't; sometimes the parameters
for a method are in [square brackets] and sometimes 'single quotes.' The
worst bit is that they seem to intermingle it all without any rhyme or
reason, so you might call a function like
`FUNCTION_CALL MODIFIER([param1], 'param2') 'param3', [param4]` even if
all of the parameters refer to database objects. Consistency! Pick
something and stick with it! It feels very much like all this was tacked
onto the end of T-SQL and they did their best not to alienate previous
T-SQL users but couldn't quite make it happen.
 
 Today, day 2, we're looking at the native SQL Server 2005 service
oriented architecture provisions. I'm liking it so far. Better than
SQLXML, anyway. It occurs to me that you could potentially replace
BizTalk with SQL Server 2005. I wonder if that's what they were going
for.
