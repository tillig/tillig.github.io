/*

Emotifier 1.2 by Travis Illig
Loosely based on the ASCII text generator at
http://www.javascriptkit.com/script/script2/asciitext.shtml

Converts text into emoticons that can be used in MSN Messenger.

Due to the message limits in Messenger, it's recommended that only four
characters be converted at a time.  But... if you wanna do more, that's up
to you.  Heh.

This script is free, no warranty expressed or implied.  Take it and have fun.
Use at your own risk.  No animals were harmed in its making.

*/

var chara = new Array(5);
var charb = new Array(5);
var charc = new Array(5);
var chard = new Array(5);
var chare = new Array(5);
var charf = new Array(5);
var charg = new Array(5);
var charh = new Array(5);
var chari = new Array(5);
var charj = new Array(5);
var chark = new Array(5);
var charl = new Array(5);
var charm = new Array(5);
var charn = new Array(5);
var charo = new Array(5);
var charp = new Array(5);
var charq = new Array(5);
var charr = new Array(5);
var chars = new Array(5);
var chart = new Array(5);
var charu = new Array(5);
var charv = new Array(5);
var charw = new Array(5);
var charx = new Array(5);
var chary = new Array(5);
var charz = new Array(5);
var char1 = new Array(5);
var char2 = new Array(5);
var char3 = new Array(5);
var char4 = new Array(5);
var char5 = new Array(5);
var char6 = new Array(5);
var char7 = new Array(5);
var char8 = new Array(5);
var char9 = new Array(5);
var char0 = new Array(5);
var charExclamation = new Array(5);
var charAtSign = new Array(5);
var charPound = new Array(5);
var charDollar = new Array(5);
var charPercent = new Array(5);
var charCaret = new Array(5);
var charAmp= new Array(5);
var charStar = new Array(5);
var charOpenParen = new Array(5);
var charCloseParen = new Array(5);
var charspace = new Array(5);

chara[0]=":o:@:@:@:o";
chara[1]=":@:o:o:o:@";
chara[2]=":@:@:@:@:@";
chara[3]=":@:o:o:o:@";
chara[4]=":@:o:o:o:@";

charb[0]=":@:@:@:@:o";
charb[1]=":@:o:o:o:@";
charb[2]=":@:@:@:@:o";
charb[3]=":@:o:o:o:@";
charb[4]=":@:@:@:@:o";

charc[0]=":o:@:@:@:o";
charc[1]=":@:o:o:o:@";
charc[2]=":@:o:o:o:o";
charc[3]=":@:o:o:o:@";
charc[4]=":o:@:@:@:o";

chard[0]=":@:@:@:@:o";
chard[1]=":@:o:o:o:@";
chard[2]=":@:o:o:o:@";
chard[3]=":@:o:o:o:@";
chard[4]=":@:@:@:@:o";

chare[0]=":@:@:@:@:@";
chare[1]=":@:o:o:o:o";
chare[2]=":@:@:@:@:o";
chare[3]=":@:o:o:o:o";
chare[4]=":@:@:@:@:@";

charf[0]=":@:@:@:@:@";
charf[1]=":@:o:o:o:o";
charf[2]=":@:@:@:@:o";
charf[3]=":@:o:o:o:o";
charf[4]=":@:o:o:o:o";

charg[0]=":o:@:@:@:@";
charg[1]=":@:o:o:o:o";
charg[2]=":@:o:@:@:@";
charg[3]=":@:o:o:o:@";
charg[4]=":o:@:@:@:o";

charh[0]=":@:o:o:o:@";
charh[1]=":@:o:o:o:@";
charh[2]=":@:@:@:@:@";
charh[3]=":@:o:o:o:@";
charh[4]=":@:o:o:o:@";

chari[0]=":@:@:@:@:@";
chari[1]=":o:o:@:o:o";
chari[2]=":o:o:@:o:o";
chari[3]=":o:o:@:o:o";
chari[4]=":@:@:@:@:@";

charj[0]=":@:@:@:@:@";
charj[1]=":o:o:@:o:o";
charj[2]=":o:o:@:o:o";
charj[3]=":@:o:@:o:o";
charj[4]=":o:@:o:o:o";

chark[0]=":@:o:o:o:@";
chark[1]=":@:o:o:@:o";
chark[2]=":@:@:@:o:o";
chark[3]=":@:o:o:@:o";
chark[4]=":@:o:o:o:@";

charl[0]=":@:o:o:o:o";
charl[1]=":@:o:o:o:o";
charl[2]=":@:o:o:o:o";
charl[3]=":@:o:o:o:o";
charl[4]=":@:@:@:@:@";

charm[0]=":@:o:o:o:@";
charm[1]=":@:@:o:@:@";
charm[2]=":@:o:@:o:@";
charm[3]=":@:o:o:o:@";
charm[4]=":@:o:o:o:@";

charn[0]=":@:o:o:o:@";
charn[1]=":@:@:o:o:@";
charn[2]=":@:o:@:o:@";
charn[3]=":@:o:o:@:@";
charn[4]=":@:o:o:o:@";

charo[0]=":o:@:@:@:o";
charo[1]=":@:o:o:o:@";
charo[2]=":@:o:o:o:@";
charo[3]=":@:o:o:o:@";
charo[4]=":o:@:@:@:o";

charp[0]=":@:@:@:@:o";
charp[1]=":@:o:o:o:@";
charp[2]=":@:@:@:@:o";
charp[3]=":@:o:o:o:o";
charp[4]=":@:o:o:o:o";

charq[0]=":o:@:@:@:o";
charq[1]=":@:o:o:o:@";
charq[2]=":@:o:o:o:@";
charq[3]=":@:o:@:o:@";
charq[4]=":o:@:@:@:@";

charr[0]=":@:@:@:@:o";
charr[1]=":@:o:o:o:@";
charr[2]=":@:@:@:@:o";
charr[3]=":@:o:@:o:o";
charr[4]=":@:o:o:@:@";

chars[0]=":o:@:@:@:@";
chars[1]=":@:o:o:o:o";
chars[2]=":o:@:@:@:o";
chars[3]=":o:o:o:o:@";
chars[4]=":@:@:@:@:o";

chart[0]=":@:@:@:@:@";
chart[1]=":o:o:@:o:o";
chart[2]=":o:o:@:o:o";
chart[3]=":o:o:@:o:o";
chart[4]=":o:o:@:o:o";

charu[0]=":@:o:o:o:@";
charu[1]=":@:o:o:o:@";
charu[2]=":@:o:o:o:@";
charu[3]=":@:o:o:o:@";
charu[4]=":o:@:@:@:o";

charv[0]=":@:o:o:o:@";
charv[1]=":@:o:o:o:@";
charv[2]=":o:@:o:@:o";
charv[3]=":o:@:o:@:o";
charv[4]=":o:o:@:o:o";

charw[0]=":@:o:o:o:@";
charw[1]=":@:o:o:o:@";
charw[2]=":@:o:@:o:@";
charw[3]=":@:@:o:@:@";
charw[4]=":@:o:o:o:@";

charx[0]=":@:o:o:o:@";
charx[1]=":o:@:o:@:o";
charx[2]=":o:o:@:o:o";
charx[3]=":o:@:o:@:o";
charx[4]=":@:o:o:o:@";

chary[0]=":@:o:o:o:@";
chary[1]=":o:@:o:@:o";
chary[2]=":o:o:@:o:o";
chary[3]=":o:o:@:o:o";
chary[4]=":o:o:@:o:o";

charz[0]=":@:@:@:@:@";
charz[1]=":o:o:o:@:o";
charz[2]=":o:o:@:o:o";
charz[3]=":o:@:o:o:o";
charz[4]=":@:@:@:@:@";

char1[0]=":o:@:@:o:o";
char1[1]=":@:o:@:o:o";
char1[2]=":o:o:@:o:o";
char1[3]=":o:o:@:o:o";
char1[4]=":@:@:@:@:@";

char2[0]=":o:@:@:@:o";
char2[1]=":@:o:o:o:@";
char2[2]=":o:o:o:@:o";
char2[3]=":o:@:@:o:o";
char2[4]=":@:@:@:@:@";

char3[0]=":o:@:@:@:o";
char3[1]=":@:o:o:o:@";
char3[2]=":o:o:@:@:o";
char3[3]=":@:o:o:o:@";
char3[4]=":o:@:@:@:o";

char4[0]=":@:o:o:@:o";
char4[1]=":@:o:o:@:o";
char4[2]=":@:@:@:@:@";
char4[3]=":o:o:o:@:o";
char4[4]=":o:o:o:@:o";

char5[0]=":@:@:@:@:@";
char5[1]=":@:o:o:o:o";
char5[2]=":o:@:@:@:o";
char5[3]=":o:o:o:o:@";
char5[4]=":@:@:@:@:o";

char6[0]=":o:@:@:@:@";
char6[1]=":@:o:o:o:o";
char6[2]=":@:@:@:@:o";
char6[3]=":@:o:o:o:@";
char6[4]=":o:@:@:@:o";

char7[0]=":@:@:@:@:@";
char7[1]=":o:o:o:@:o";
char7[2]=":o:o:@:o:o";
char7[3]=":o:@:o:o:o";
char7[4]=":@:o:o:o:o";

char8[0]=":o:@:@:@:o";
char8[1]=":@:o:o:o:@";
char8[2]=":o:@:@:@:o";
char8[3]=":@:o:o:o:@";
char8[4]=":o:@:@:@:o";

char9[0]=":o:@:@:@:o";
char9[1]=":@:o:o:o:@";
char9[2]=":o:@:@:@:@";
char9[3]=":o:o:o:o:@";
char9[4]=":@:@:@:@:o";

char0[0]=":o:@:@:@:o";
char0[1]=":@:@:o:o:@";
char0[2]=":@:o:@:o:@";
char0[3]=":@:o:o:@:@";
char0[4]=":o:@:@:@:o";

charExclamation[0]=":o:o:@:o:o";
charExclamation[1]=":o:o:@:o:o";
charExclamation[2]=":o:o:@:o:o";
charExclamation[3]=":o:o:o:o:o";
charExclamation[4]=":o:o:@:o:o";

charAtSign[0]=":o:@:@:@:o";
charAtSign[1]=":@:o:@:@:@";
charAtSign[2]=":@:o:@:@:@";
charAtSign[3]=":@:o:o:o:o";
charAtSign[4]=":o:@:@:@:o";

charPound[0]=":o:@:o:@:o";
charPound[1]=":@:@:@:@:@";
charPound[2]=":o:@:o:@:o";
charPound[3]=":@:@:@:@:@";
charPound[4]=":o:@:o:@:o";

charDollar[0]=":o:o:@:o:o";
charDollar[1]=":o:@:@:@:@";
charDollar[2]=":o:o:@:o:o";
charDollar[3]=":@:@:@:@:o";
charDollar[4]=":o:o:@:o:o";

charPercent[0]=":@:o:o:o:@";
charPercent[1]=":o:o:o:@:o";
charPercent[2]=":o:o:@:o:o";
charPercent[3]=":o:@:o:o:o";
charPercent[4]=":@:o:o:o:@";

charCaret[0]=":o:o:@:o:o";
charCaret[1]=":o:@:o:@:o";
charCaret[2]=":o:o:o:o:o";
charCaret[3]=":o:o:o:o:o";
charCaret[4]=":o:o:o:o:o";

charAmp[0]=":o:@:@:o:o";
charAmp[1]=":@:o:o:@:o";
charAmp[2]=":o:@:@:@:o";
charAmp[3]=":@:o:@:@:o";
charAmp[4]=":o:@:@:o:@";

charStar[0]=":o:o:@:o:o";
charStar[1]=":@:o:@:o:@";
charStar[2]=":o:@:@:@:o";
charStar[3]=":@:o:@:o:@";
charStar[4]=":o:o:@:o:o";

charOpenParen[0]=":o:o:@:o:o";
charOpenParen[1]=":o:@:o:o:o";
charOpenParen[2]=":o:@:o:o:o";
charOpenParen[3]=":o:@:o:o:o";
charOpenParen[4]=":o:o:@:o:o";

charCloseParen[0]=":o:@:o:o:o";
charCloseParen[1]=":o:o:@:o:o";
charCloseParen[2]=":o:o:@:o:o";
charCloseParen[3]=":o:o:@:o:o";
charCloseParen[4]=":o:@:o:o:o";

charspace[0]=":o:o:o:o:o";
charspace[1]=":o:o:o:o:o";
charspace[2]=":o:o:o:o:o";
charspace[3]=":o:o:o:o:o";
charspace[4]=":o:o:o:o:o";

var spacer = ":o";
var border = ":|";

function emotify(infieldID, outfieldID){
	// Get the input field
	var infield = document.getElementById(infieldID);
	if(infield == null){
		alert("Unable to locate input field '" + infieldID + "' - cannot emotify.");
		return;
	}

	// Get the output field
	var outfield = document.getElementById(outfieldID);
	if(outfield == null){
		alert("Unable to locate output field '" + outfieldID + "' - cannot emotify.");
		return;
	}

	// Ensure there's something to ejamify
	var intext = infield.value;
	if(intext == null || intext == ""){
		alert("Please enter text in the input field.");
		return;
	}

	// Convert to a single case
	intext = intext.toLowerCase();

	var outtext = "";
	outtext += repeatChar(border, (intext.length * 5) + intext.length + 1) + "\n";

	var lines = new Array(5);
	var i;
	for(i = 0; i < 5; i++){
		lines[i] = "";
	}

	for(i = 0; i < intext.length; i++) {

		if(intext.charAt(i) == " ") {lines[0] += charspace[0]; lines[1] += charspace[1]; lines[2] += charspace[2]; lines[3] += charspace[3]; lines[4] += charspace[4]; }
		if(intext.charAt(i) == "a") {lines[0] += chara[0]; lines[1] += chara[1]; lines[2] += chara[2]; lines[3] += chara[3]; lines[4] += chara[4]; }
		if(intext.charAt(i) == "b") {lines[0] += charb[0]; lines[1] += charb[1]; lines[2] += charb[2]; lines[3] += charb[3]; lines[4] += charb[4]; }
		if(intext.charAt(i) == "c") {lines[0] += charc[0]; lines[1] += charc[1]; lines[2] += charc[2]; lines[3] += charc[3]; lines[4] += charc[4]; }
		if(intext.charAt(i) == "d") {lines[0] += chard[0]; lines[1] += chard[1]; lines[2] += chard[2]; lines[3] += chard[3]; lines[4] += chard[4]; }
		if(intext.charAt(i) == "e") {lines[0] += chare[0]; lines[1] += chare[1]; lines[2] += chare[2]; lines[3] += chare[3]; lines[4] += chare[4]; }
		if(intext.charAt(i) == "f") {lines[0] += charf[0]; lines[1] += charf[1]; lines[2] += charf[2]; lines[3] += charf[3]; lines[4] += charf[4]; }
		if(intext.charAt(i) == "g") {lines[0] += charg[0]; lines[1] += charg[1]; lines[2] += charg[2]; lines[3] += charg[3]; lines[4] += charg[4]; }
		if(intext.charAt(i) == "h") {lines[0] += charh[0]; lines[1] += charh[1]; lines[2] += charh[2]; lines[3] += charh[3]; lines[4] += charh[4]; }
		if(intext.charAt(i) == "i") {lines[0] += chari[0]; lines[1] += chari[1]; lines[2] += chari[2]; lines[3] += chari[3]; lines[4] += chari[4]; }
		if(intext.charAt(i) == "j") {lines[0] += charj[0]; lines[1] += charj[1]; lines[2] += charj[2]; lines[3] += charj[3]; lines[4] += charj[4]; }
		if(intext.charAt(i) == "k") {lines[0] += chark[0]; lines[1] += chark[1]; lines[2] += chark[2]; lines[3] += chark[3]; lines[4] += chark[4]; }
		if(intext.charAt(i) == "l") {lines[0] += charl[0]; lines[1] += charl[1]; lines[2] += charl[2]; lines[3] += charl[3]; lines[4] += charl[4]; }
		if(intext.charAt(i) == "m") {lines[0] += charm[0]; lines[1] += charm[1]; lines[2] += charm[2]; lines[3] += charm[3]; lines[4] += charm[4]; }
		if(intext.charAt(i) == "n") {lines[0] += charn[0]; lines[1] += charn[1]; lines[2] += charn[2]; lines[3] += charn[3]; lines[4] += charn[4]; }
		if(intext.charAt(i) == "o") {lines[0] += charo[0]; lines[1] += charo[1]; lines[2] += charo[2]; lines[3] += charo[3]; lines[4] += charo[4]; }
		if(intext.charAt(i) == "p") {lines[0] += charp[0]; lines[1] += charp[1]; lines[2] += charp[2]; lines[3] += charp[3]; lines[4] += charp[4]; }
		if(intext.charAt(i) == "q") {lines[0] += charq[0]; lines[1] += charq[1]; lines[2] += charq[2]; lines[3] += charq[3]; lines[4] += charq[4]; }
		if(intext.charAt(i) == "r") {lines[0] += charr[0]; lines[1] += charr[1]; lines[2] += charr[2]; lines[3] += charr[3]; lines[4] += charr[4]; }
		if(intext.charAt(i) == "s") {lines[0] += chars[0]; lines[1] += chars[1]; lines[2] += chars[2]; lines[3] += chars[3]; lines[4] += chars[4]; }
		if(intext.charAt(i) == "t") {lines[0] += chart[0]; lines[1] += chart[1]; lines[2] += chart[2]; lines[3] += chart[3]; lines[4] += chart[4]; }
		if(intext.charAt(i) == "u") {lines[0] += charu[0]; lines[1] += charu[1]; lines[2] += charu[2]; lines[3] += charu[3]; lines[4] += charu[4]; }
		if(intext.charAt(i) == "v") {lines[0] += charv[0]; lines[1] += charv[1]; lines[2] += charv[2]; lines[3] += charv[3]; lines[4] += charv[4]; }
		if(intext.charAt(i) == "w") {lines[0] += charw[0]; lines[1] += charw[1]; lines[2] += charw[2]; lines[3] += charw[3]; lines[4] += charw[4]; }
		if(intext.charAt(i) == "x") {lines[0] += charx[0]; lines[1] += charx[1]; lines[2] += charx[2]; lines[3] += charx[3]; lines[4] += charx[4]; }
		if(intext.charAt(i) == "y") {lines[0] += chary[0]; lines[1] += chary[1]; lines[2] += chary[2]; lines[3] += chary[3]; lines[4] += chary[4]; }
		if(intext.charAt(i) == "z") {lines[0] += charz[0]; lines[1] += charz[1]; lines[2] += charz[2]; lines[3] += charz[3]; lines[4] += charz[4]; }
		if(intext.charAt(i) == "0") {lines[0] += char0[0]; lines[1] += char0[1]; lines[2] += char0[2]; lines[3] += char0[3]; lines[4] += char0[4]; }
		if(intext.charAt(i) == "1") {lines[0] += char1[0]; lines[1] += char1[1]; lines[2] += char1[2]; lines[3] += char1[3]; lines[4] += char1[4]; }
		if(intext.charAt(i) == "2") {lines[0] += char2[0]; lines[1] += char2[1]; lines[2] += char2[2]; lines[3] += char2[3]; lines[4] += char2[4]; }
		if(intext.charAt(i) == "3") {lines[0] += char3[0]; lines[1] += char3[1]; lines[2] += char3[2]; lines[3] += char3[3]; lines[4] += char3[4]; }
		if(intext.charAt(i) == "4") {lines[0] += char4[0]; lines[1] += char4[1]; lines[2] += char4[2]; lines[3] += char4[3]; lines[4] += char4[4]; }
		if(intext.charAt(i) == "5") {lines[0] += char5[0]; lines[1] += char5[1]; lines[2] += char5[2]; lines[3] += char5[3]; lines[4] += char5[4]; }
		if(intext.charAt(i) == "6") {lines[0] += char6[0]; lines[1] += char6[1]; lines[2] += char6[2]; lines[3] += char6[3]; lines[4] += char6[4]; }
		if(intext.charAt(i) == "7") {lines[0] += char7[0]; lines[1] += char7[1]; lines[2] += char7[2]; lines[3] += char7[3]; lines[4] += char7[4]; }
		if(intext.charAt(i) == "8") {lines[0] += char8[0]; lines[1] += char8[1]; lines[2] += char8[2]; lines[3] += char8[3]; lines[4] += char8[4]; }
		if(intext.charAt(i) == "9") {lines[0] += char9[0]; lines[1] += char9[1]; lines[2] += char9[2]; lines[3] += char9[3]; lines[4] += char9[4]; }
		if(intext.charAt(i) == "!") {lines[0] += charExclamation[0]; lines[1] += charExclamation[1]; lines[2] += charExclamation[2]; lines[3] += charExclamation[3]; lines[4] += charExclamation[4]; }
		if(intext.charAt(i) == "@") {lines[0] += charAtSign[0]; lines[1] += charAtSign[1]; lines[2] += charAtSign[2]; lines[3] += charAtSign[3]; lines[4] += charAtSign[4]; }
		if(intext.charAt(i) == "#") {lines[0] += charPound[0]; lines[1] += charPound[1]; lines[2] += charPound[2]; lines[3] += charPound[3]; lines[4] += charPound[4]; }
		if(intext.charAt(i) == "$") {lines[0] += charDollar[0]; lines[1] += charDollar[1]; lines[2] += charDollar[2]; lines[3] += charDollar[3]; lines[4] += charDollar[4]; }
		if(intext.charAt(i) == "%") {lines[0] += charPercent[0]; lines[1] += charPercent[1]; lines[2] += charPercent[2]; lines[3] += charPercent[3]; lines[4] += charPercent[4]; }
		if(intext.charAt(i) == "^") {lines[0] += charCaret[0]; lines[1] += charCaret[1]; lines[2] += charCaret[2]; lines[3] += charCaret[3]; lines[4] += charCaret[4]; }
		if(intext.charAt(i) == "&") {lines[0] += charAmp[0]; lines[1] += charAmp[1]; lines[2] += charAmp[2]; lines[3] += charAmp[3]; lines[4] += charAmp[4]; }
		if(intext.charAt(i) == "*") {lines[0] += charStar[0]; lines[1] += charStar[1]; lines[2] += charStar[2]; lines[3] += charStar[3]; lines[4] += charStar[4]; }
		if(intext.charAt(i) == "(") {lines[0] += charOpenParen[0]; lines[1] += charOpenParen[1]; lines[2] += charOpenParen[2]; lines[3] += charOpenParen[3]; lines[4] += charOpenParen[4]; }
		if(intext.charAt(i) == ")") {lines[0] += charCloseParen[0]; lines[1] += charCloseParen[1]; lines[2] += charCloseParen[2]; lines[3] += charCloseParen[3]; lines[4] += charCloseParen[4]; }
		if(i < intext.length - 1){lines[0] += spacer; lines[1] += spacer; lines[2] += spacer; lines[3] += spacer; lines[4] += spacer; }
	}

	for(i = 0; i < 5; i++){
		outtext += border + lines[i] + border + "\n";
	}
	outtext += repeatChar(border, (intext.length * 5) + intext.length + 1);

	outfield.value = outtext;
}

function repeatChar(charToRepeat, numTimesToRepeat){
	if(charToRepeat == null || charToRepeat == "" || numTimesToRepeat == null || numTimesToRepeat < 1){
		return "";
	}

	var retVal = "";
	var counter = 0;
	for(counter = 0; counter < numTimesToRepeat; counter++){
		retVal += charToRepeat;
	}
	return retVal;
}
