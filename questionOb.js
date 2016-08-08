/*
	Constructor function for a question
*/

function Questions(, questionNo, down, left, right, up, hint, note) {
	this.questionNo = questionNo;
	this.down = down;
	this.left = left;
	this.right = right;
	this.up = up;
	this.hint = hint;
	this.note = note;
}


/*{ 	"questionNo": 1,
		 "down": "mkdir name",
		 "left": "1",
		 "right": "2",
		 "up": " ", 
		 "hint": "Create location to install Express in.",
		 "note": "Directory name can't have express in it and cannot contain capital letters.  mkdir is short for make directory."
},

	In order to expose the Sighting constructor to to the outside,
	we have to assign it to the special
	keyword "module.exports".
*/
module.exports = Questions;