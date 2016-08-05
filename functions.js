var currentpos = [xpos,ypos];
var direction = [0, 0];
var questionNum = 0;
// set guestionList variable

function move(){
	while (mazearray[xpos + direction[0]][ypos + direction[1]]) {
		displayPlayer();

		if (mazearray[xpos + direction[0]][ypos + direction[1]] === 2) {
			callQ();
			return;
		}

		if (mazearray[xpos + direction[0]][ypos + direction[1]] === 3) {
			youWin();
			return;
		}
	}
	youLose();
	return;
}

function callQ() {
	questionNum++;
	$("#answer").val("");
	// need to create :hover and assign to possible answers to arrows
	if (questionList[questionNum].up !== "") {
		$('#col' + currentpos[0] + 'row' + (currentpos[1] - 1)).css({
			'background-image': '/uparrow.img/'
		});
	}
		if (questionList[questionNum].right !== "") {
		$('#col' + (currentpos[0] + 1)+ 'row' + currentpos[1]).css({
			'background-image': '/rightarrow.img/'
		});
	}
		if (questionList[questionNum].down !== "") {
		$('#col' + currentpos[0] + 'row' + (currentpos[1] + 1)).css({
			'background-image': '/downarrow.img/'
		});
	}
		if (questionList[questionNum].left !== "") {
		$('#col' + (currentpos[0] - 1) + 'row' + currentpos[1]).css({
			'background-image': '/leftarrow.img/'
		});
	}
}

function submitQ() {
	var answer = $("#answer").val();
	if (answer === "") {
		alert("You must type your answer in the text box.");
	} else if (answer === questionList[questionNum].up) {
		direction = [0, -1];
		move();
		return;
	} else if (answer === questionList[questionNum].right) {
		direction = [1, 0];
		move();
		return;
	} else if (answer === questionList[questionNum].down) {
		direction = [0, 1];
		move();
		return;
	} else if (answer === questionList[questionNum].left) {
		direction = [-1, 0];
		move();
		return;
	}
}

function displayPlayer() {
	var timer = setTimeout(function() {
		$('#col' + currentpos[0] + 'row' + currentpos[1]).css({
			'background-color': 'none'
		});
		xpos += direction[0];
		ypos += direction[1];
		$('#col' + currentpos[0] + 'row' + currentpos[1]).css({
			'background-image': '/playerimage.img/'
		});
	}, 500);
}

function youWin() {
	// temporary
	alert("You win");
	// write function for what happens when player completes the maze
}

function youLose() {
	// temporary
	alert("You lose");
	// write function for what happens when player loses/goes off the board...return to last question?
}