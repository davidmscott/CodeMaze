var xpos = 2, ypos = 0;
var currentpos = [xpos,ypos];
var direction = [0, 0];
var questionNum = -1;
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
			'background-image': './public/Images/up.png/'
		});
	}
		if (questionList[questionNum].right !== "") {
		$('#col' + (currentpos[0] + 1)+ 'row' + currentpos[1]).css({
			'background-image': './public/Images/right.png/'
		});
	}
		if (questionList[questionNum].down !== "") {
		$('#col' + currentpos[0] + 'row' + (currentpos[1] + 1)).css({
			'background-image': './public/Images/down.png/'
		});
	}
		if (questionList[questionNum].left !== "") {
		$('#col' + (currentpos[0] - 1) + 'row' + currentpos[1]).css({
			'background-image': './public/Images/left.png/'
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
	setTimeout(function() {
		if (direction !== [0,0]) {
			$('#col' + currentpos[0] + 'row' + currentpos[1]).css({
				'background-color': 'none',
				'background-image': 'none'
			});
		}
		if (mazearray[currentpos[0]][currentpos[1]] === 2) {
			for (var i = -1; i <= 1; i + 2) {
				if (mazearray[currentpos[0] + i][currentpos[1]]) {
					$('#col' + (currentpos[0] + i) + 'row' + currentpos[1]).css({
					'background-image': 'none'
					});
				}
			}
			for (var j = -1; j <= 1; j + 2) {
				if (mazearray[currentpos[0]][currentpos[1] + j]) {
					$('#col' + currentpos[0] + 'row' + (currentpos[1] + j)).css({
					'background-image': 'none'
					});
				}
			}
		}
		xpos += direction[0];
		ypos += direction[1];
		$('#col' + currentpos[0] + 'row' + currentpos[1]).css({
			'background-image': './public/Images/player.png'
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