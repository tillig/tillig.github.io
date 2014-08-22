---
layout: post
title: "Convert Chars to Unicode Hex"
date: 2006-04-11 -0800
comments: true
disqus_identifier: 985
tags: [Code Snippets]
---
A minor follow-up to my [JavaScript and Unicode Character Validation
entry](/archive/2005/04/25/javascript-and-unicode-character-validation.aspx)
(and sort of a reminder to myself):
 
 Sometimes when working with characters in regular expressions it's nice
to be able to dump one or more characters as a line of Unicode hex
escape sequences. For example, `abc` becomes `\u0061\u0062\u0063`.
 
 Here's a quick snippet for a console app that will let you input a
series of characters and will dump out the list of characters entered as
Unicode hex:
 
    using System;
    public class DumpHexChars{
      public static void Main(){
        Console.Write("Enter chars to convert to Unicode hex: ");
        string chars = Console.ReadLine();
        string output = "";
        for(int i = 0; i < chars.Length; i++){
          output += String.Format("\\u{0:x4}", Convert.ToInt16(chars[i]));
        }
        Console.WriteLine(output);
        Console.ReadLine();
      }
    }


