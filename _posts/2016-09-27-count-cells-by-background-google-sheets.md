---
layout: post
title: "Counting Cells by Background Color in Google Sheets"
date: 2016-09-27 -0800
comments: true
tags: [javascript]
description: "If you're looking for a way to count the number of cells in a Google Sheet based on background/highlight color, here's how."
---
I was working on my annual PTO schedule and thought it would be nice to collaborate on it with my wife, but also make it easy to visually indicate which days I was taking off.

Google Sheets is great for that sort of thing, so I started out with the calendar template. Then I wanted to highlight (with a background color) which days I was taking off.

That works well, but then I also wanted to see how many days I was planning to make sure I didn't use too many vacation days.

**How do you count cells in Google Sheets by background color?**

[One way is to use the "Power Tools" add-on in Sheets.](https://www.ablebits.com/office-addins-blog/2015/10/30/count-colored-cells-google-sheets/) You have to use the "Pro" version if you go that route, so consider that. I think the pro version is still free right now.

I did try that and had some trouble getting it to work. Maybe I was just doing it wrong. The count was always zero.

Instead, I wrote a script to do this. It was based on [this StackOverflow question](http://stackoverflow.com/questions/14365436/count-the-cells-with-same-color-in-google-spreadsheet) but I wanted my function to be parameterized, where the stuff in the question wasn't.

**First, go to "Tools > Script Editor..."** in your sheet and paste in this script:


```js
/**
 * Counts the number of items with a given background.
 *
 * @param {String} color The hex background color to count.
 * @param {String} inputRange The range of cells to check for the background color.
 * @return {Number} The number of cells with a matching background.
 */
function countBackground(color, inputRange) {
  var inputRangeCells = SpreadsheetApp.getActiveSheet().getRange(inputRange);
  var rowColors = inputRangeCells.getBackgrounds();
  var count = 0;

  for(var r = 0; r < rowColors.length; r++) {
    var cellColors = rowColors[r];
    for(var c = 0; c < cellColors.length; c++) {
      if(cellColors[c] == color) {
        count++;
      }
    }
  }

  return count;
}
```

Once that's in, you can save and exit the script editor.

**Back in your sheet, use the new function** by entering it like a formula, like this:

`=countBackground("#00ff00", "B12:X17")`

It takes two parameters:

- The first parameter is the **color** of background highlight. It's a hexadecimal color since that's how Sheets stores it. The example I showed above is the bright green background color.
- The second parameter is the **cell range** you want the function to look at. This is in the current sheet. In the example, I'm looking at the range from B12 through X17.

**Gotcha: Sheets caches function results.** I found that Google Sheets caches the output of custom function execution. What that means is that you enter the function (like the example above), it runs and calculates the number of items with the specified background, and then it won't automatically run again. You change the background of one of the cells, the function doesn't just run again and the value of the count/total doesn't update. This is a Google Sheets thing, trying to optimize performance. What it means for you is that **if you change cell backgrounds, you need to change the function temporarily to get it to update.**

For example, say you have a cell that has this:

`=countBackground("#00ff00", "B12:X17")`

You update some background colors and want your count to update. Change the function to, say, look at a different range temporarily:

`=countBackground("#00ff00", "B12:X18")`

Then change it back:

`=countBackground("#00ff00", "B12:X17")`

By changing it, you force Google Sheets to re-run it. I haven't found any button or control to force the methods to update or re-run so this is the way I've been tricking it.
