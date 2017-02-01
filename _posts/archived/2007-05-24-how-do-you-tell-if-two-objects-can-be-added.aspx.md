---
layout: post
title: "How Do You Tell If Two Objects Can Be Added?"
date: 2007-05-24 -0800
comments: true
disqus_identifier: 1207
tags: [net]
---
I'm working on a
[DataGridColumn](http://msdn2.microsoft.com/en-us/library/system.web.ui.webcontrols.datagridcolumn.aspx)
that can automatically sum up the data in the column and display a total
of the data in the footer. This sort of thing comes in handy when
displaying tables with account activity or balance data in them and
allows you to just put the special column type right into the
[DataGrid](http://msdn2.microsoft.com/en-us/library/system.web.ui.webcontrols.datagrid.aspx)
without having to modify your page behavior to do the summation.

 So I created my column class have it set up so when the column is
databound, each cell in the column will contribute its bound value
toward a total. That's where I ran into a snag - since I don't know what
object type is being bound to the column, my "total" variable is just an
object... and base objects don't support addition.

 **How do you tell if an object type supports addition?**

 That's actually something I can't answer. My original thought was that
when you override the addition operator, the compiler generates a static
"Add" method for your data type. You can see this in Reflector. Here's
the System.Decimal class:

 ![System.Decimal supports the Add
method.](https://hyqi8g.dm2303.livefilestore.com/y2priOyuwCGkcEc5OEV2UFh_qytRwBbirJug66y5RV7Lx46g3God90YK8GIFvnulS3SARmke3wBzFw82dAyvH4HBVBz0vJqHJaCo7VmuRo8W4E/20070524decimaladd.png?psid=1)

 Notice there's a static method called "Add" that takes in two
System.Decimal objects and returns a System.Decimal object. That's what
you see when you override the addition operation.

 My idea was that I would get the first object being bound to the
column, get its type, and see if it had a static method called "Add"
that takes in two objects of that type and returns an object of that
type. If that method exists, I'll hold a reference to it and invoke it
for every subsequent data item being added.

 The problem is, this static "Add" method doesn't show up for other base
types. For example, there's no "Add" method for System.Int32:

 ![System.Int32 has no Add
method.](https://hyqi8g.dm1.livefilestore.com/y2pnPDAqbX_IDft2qOQRS1yJZvowCRBN9lEGol69pWfIA984qsM0JY_gPne_HZv2781XC88JzgVQdF9kNHnWKI49xgCcfV66P_vq47cwKPZCLg/20070524intnoadd.png?psid=1)

 So that idea won't work.

 I talked to [Hanselman](http://www.hanselman.com/blog/) and
[Sells](http://www.sellsbrothers.com/) and they both thought the "Add"
method would be there. No such luck.

 Right now I'm working around it by special casing all of the types in
mscorlib that I know we use that can be added together... but is there
some better way I can, through Reflection, determine if two objects can
be added (and then actually perform that addition)?
