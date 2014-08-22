---
layout: post
title: "JavaScript and Unicode Character Validation"
date: 2005-04-25 -0800
comments: true
disqus_identifier: 803
tags: [Code Snippets]
---
I'm struggling right now with the fact that JavaScript/ECMAScript
doesn't allow for Unicode character classes in regular expressions. For
example, if I want to set up a client-side JavaScript validation
expression on a numeric field, I'd want to do something like `^\d+$` as
my regular expression, right? Match one or more digits?
 
 The problem is that in JavaScript, `\d` expands out to `[0-9]`, which
technically isn't all of the digits, if you think about all of the other
alphabets out there that exist and don't use 0 through 9 to indicate
numbers.
 
 In .NET, they solve this by mapping to Unicode character classes. So
`\d` maps to `\p{Nd}`, which is the Unicode character class for digits.
Much more global, right? So how do you do that on the client side?
 
 Well, I figure you have to expand the character classes on the server
side and then feed those to the client. JavaScript supports Unicode
character codes with a hexadecimal character code, so you can say like
\\uFFFF or whatever to specify a particular character. So you need to
take `\d` and expand to the full set of Unicode characters.
 
 Using `\d` as our example, a C\# snippet that expands the digits looks
like this:
 
    static void Main(string[] args){
      string Nd = UnicodeExpansion(System.Globalization.UnicodeCategory.DecimalDigitNumber);
      Console.WriteLine(Nd);
      Console.ReadLine();
    }

    /// <summary>
    /// Expands a Unicode character set into an ECMAScript compatible character
    /// range string.
    /// </summary>
    /// <param name="category">
    /// The Unicode character category to expand.
    /// </param>
    /// <returns>
    /// A <see cref="System.String" /> that can be used in an ECMAScript regular
    /// expression.
    /// </returns>
    /// <remarks>
    /// <para>
    /// ECMAScript (JavaScript) does not inherently understand Unicode in regular
    /// expressions, which results in incorrect validation when using character
    /// classes (\w, \s, \d, etc.).
    /// </para>
    /// <para>
    /// This method expands a <see cref="System.Globalization.UnicodeCategory" />
    /// into a string that can be used in an ECMAScript regular expression.  For
    /// example, the category <see cref="System.Globalization.UnicodeCategory.LetterNumber" />
    /// expands to <c>\u2160-\u2183\u3007\u3021-\u3029\u3038-\u303a</c>.
    /// </para>
    /// </remarks>
    public static string UnicodeExpansion(System.Globalization.UnicodeCategory category){
      // The fully expanded block of characters
      string expansion = "";
      // Low-end of the character block
      int blockLow = -1;
      // High-end of the character block
      int blockHigh = -1;
      // Marks whether the current block has been written
      bool blockWritten = false;

      for(int charVal = 0; charVal <= Char.MaxValue; charVal++){
        // Get the category of the current character
        System.Globalization.UnicodeCategory charCat = Char.GetUnicodeCategory(Convert.ToChar(charVal));

        // We haven't written anything this loop; used to ensure
        // all blocks get written at the end.
        blockWritten = false;

        // Ignore characters that don't match the category.
        if(charCat != category){
          continue;
        }

        if(blockLow == -1){
          // Handle the very first block
          blockLow = charVal;
          blockHigh = charVal;
        }
        else if(
          // charVal skipped some characters OR
          blockHigh + 1 != charVal ||
          // We're at the end of the set of characters
          blockHigh + 1 > Char.MaxValue 
          ){

          // Write the block to the expansion string
          if(blockLow == blockHigh){
            // This is a one-character block
            expansion += String.Format(@"\u{0:x4}", blockLow);
          }
          else{
            // This is a multi-char block
            expansion += String.Format(@"\u{0:x4}-\u{1:x4}", blockLow, blockHigh);
          }

          // Start a new block
          blockWritten = true;
          blockLow = charVal;
          blockHigh = charVal;
        }
        else{
          // We're still in the same block; increment the high end of the block.
          blockHigh = charVal;
        }      
      }

      // If we didn't write the last block, write it now
      if(!blockWritten){
        if(blockLow == blockHigh){
          // This is a one-character block
          expansion += String.Format(@"\u{0:x4}", blockLow);
        }
        else{
          // This is a multi-char block
          expansion += String.Format(@"\u{0:x4}-\u{1:x4}", blockLow, blockHigh);
        }
        blockWritten = true;
      }

      return expansion;
    }


 
 For `\d`, it expands out to:
 
`\u0030-\u0039\u0660-\u0669\u06f0-\u06f9\u0966-\u096f\u09e6-\u09ef\u0a66-\u0a6f\u0ae6-\u0aef\u0b66-\u0b6f\u0be7-\u0bef\u0c66-\u0c6f\u0ce6-\u0cef\u0d66-\u0d6f\u0e50-\u0e59\u0ed0-\u0ed9\u0f20-\u0f29\u1040-\u1049\u1369-\u1371\u17e0-\u17e9\u1810-\u1819\uff10-\uff19`
 
 Which means that rather than `^[\d]+$` to validate, you'd use
`^[\u0030-\u0039\u0660-\u0669\u06f0-\u06f9\u0966-\u096f\u09e6-\u09ef\u0a66-\u0a6f\u0ae6-\u0aef\u0b66-\u0b6f\u0be7-\u0bef\u0c66-\u0c6f\u0ce6-\u0cef\u0d66-\u0d6f\u0e50-\u0e59\u0ed0-\u0ed9\u0f20-\u0f29\u1040-\u1049\u1369-\u1371\u17e0-\u17e9\u1810-\u1819\uff10-\uff19]+$`.
 
 You can try this out at
[http://www.regular-expressions.info/javascriptexample.html](http://www.regular-expressions.info/javascriptexample.html).
Seems to work pretty well.
 
 I'm using numbers as my example here, though the same thoughts could be
applied to letters or any other character classes. Like in JavaScript,
`\w` maps to `[a-zA-Z_0-9]`, which is obviously not all the possible
letters out there.
 
 You could even take this a further step and pre-calculate all of the
Unicode character blocks at application start time and cache the common
character class expansions for use in regex translation on the server
side.
 
 *Updated 9/9/2005 for boundary condition logic error and again on
9/11/2005 to fix accidental omission of the last block (thanks cougio);
modified the method to be a standalone static for easier cut and paste
into applications; added comments for readability.*
