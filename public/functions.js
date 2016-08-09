var currentpos = [2, 0];
var direction = [0, 0];
var questionNum = -1;
var questionList, mazearray, timer, dir;
var rowz = 12;
var colz = 20;
var maze = "";
var count = 0;
var moving = true;

function move1() {
	if (moving && mazearray[currentpos[0] + direction[0]] && mazearray[currentpos[0] + direction[0]][currentpos[1] + direction[1]]) {
		displayPlayer();
		if (mazearray[currentpos[0]][currentpos[1]] === 2) {
			if (questionList[questionNum]) {
				$("#correctSteps").append('<p>' + (questionNum + 1) + '. ' + questionList[questionNum][dir] + '</p><br />');
			}
			callQ();
			moving = false;
			return;
		}
		if (mazearray[currentpos[0]][currentpos[1]] === 3) {
			if (questionList[questionNum]) {
				$("#correctSteps").append('<p>' + (questionNum + 1) + '. ' + questionList[questionNum][dir] + '</p>');
			}
			youWin();
			clearInterval(timer);
			return;
		}
	} else if (moving) {
		youLose();
		// clearInterval(timer);
		return;
	}
}

function callQ() {
	questionNum++;
	$("#answer").val("");
	// need to create :hover and assign to possible answers to arrows
	if (questionList[questionNum].up !== "") {
		$('#col' + currentpos[0] + 'row' + (currentpos[1] - 1)).css({
			'background-image': "url('./Images/up.png')"
		});
		//On hover print potential answer to div 
		$('#col' + currentpos[0] + 'row' + (currentpos[1] - 1)).hover(
			function() {
				$( '#potentialAnswer' ).html(questionList[questionNum].up);
			}
		);
	}
		if (questionList[questionNum].right !== "") {
		$('#col' + (currentpos[0] + 1)+ 'row' + currentpos[1]).css({
			'background-image': "url('./Images/right.png')"
		});
		//On hover print potential answer to div 
		$('#col' + (currentpos[0] + 1)+ 'row' + currentpos[1]).hover(
			function() {
				$( '#potentialAnswer' ).html(questionList[questionNum].right);
			}
		);
	}
		if (questionList[questionNum].down !== "") {
		$('#col' + currentpos[0] + 'row' + (currentpos[1] + 1)).css({
			'background-image': "url('./Images/down.png')"
		});
		//On hover print potential answer to div 
		$('#col' + currentpos[0] + 'row' + (currentpos[1] + 1)).hover(
			function() {
				$( '#potentialAnswer' ).html(questionList[questionNum].down);
			}
		);
	}
		if (questionList[questionNum].left !== "") {
		$('#col' + (currentpos[0] - 1) + 'row' + currentpos[1]).css({
			'background-image': "url('./Images/left.png')"
		});
		//On hover print potential answer to div 
		$('#col' + (currentpos[0] - 1) + 'row' + currentpos[1]).hover(
			function() {
				$( '#potentialAnswer' ).html(questionList[questionNum].left);
			}
		);
	}
}

function submitQ() {
	var answer = $("#answer").val();
	if (answer === "") {
		alert("You must type your answer in the text box.");
	} else if (answer === questionList[questionNum].up) {
		direction = [0, -1];
		dir = "up";
		moving = true;
		return;
	} else if (answer === questionList[questionNum].right) {
		direction = [1, 0];
		moving = true;
		dir = "right";
		return;
	} else if (answer === questionList[questionNum].down) {
		direction = [0, 1];
		moving = true;
		dir = "down";
		return;
	} else if (answer === questionList[questionNum].left) {
		direction = [-1, 0];
		moving = true;
		dir = "left";
		return;
	} else {
		alert("Please enter a valid answer.");
	}
}

function displayPlayer() {
		if (direction[0] !== 0 || direction[1] !== 0) {
			$('#col' + currentpos[0] + 'row' + currentpos[1]).css({
				'background-color': 'transparent',
				'background-image': 'none'
			});
		}
		if (mazearray[currentpos[0]][currentpos[1]] === 2) {
			for (var i = -1; i <= 1; i = i + 2) {
				if (mazearray[currentpos[0] + i][currentpos[1]]) {
					$('#col' + (currentpos[0] + i) + 'row' + currentpos[1]).css({
					'background-image': 'none'
					});
				}
			}
			for (var j = -1; j <= 1; j = j + 2) {
				if (mazearray[currentpos[0]][currentpos[1] + j]) {
					$('#col' + currentpos[0] + 'row' + (currentpos[1] + j)).css({
					'background-image': 'none'
					});
				}
			}
		}
		currentpos[0] += direction[0];
		currentpos[1] += direction[1];
		$('#col' + currentpos[0] + 'row' + currentpos[1]).css({
			'background-image': "url('./Images/player.png')"
		});
}

function youWin() {
	// temporary
	$('.cell').css({
		'background-color': 'transparent'
	});
	// write function for what happens when player completes the maze
}

function youLose() {
	// temporary
	$('#col' + currentpos[0] + 'row' + currentpos[1]).css({
		'background-image': "url('./Images/player-lose.png')"
	});
	moving = false;
	setTimeout(function() {
		maze = "";
		count = 0;
		buildMaze();
		questionNum = -1;
		currentpos = [2,0];
		direction = [0,0];
		dir = "";
		$(".cell").css({
			'background-image': 'none',
			'background-color': 'black'
		});
		$("#potentialAnswer").html("Potential Answer");
		$("#correctSteps").html("");
		moving = true;
	}, 3500);
	// alert("You lose");
	// write function for what happens when player loses/goes off the board...return to last question?
}

function buildMaze() {
	maze += "<table>";

	for (var i = 0; i < rowz ; i++) {
		maze += '<tr id="row' + i + '">';
		for (var j = 0; j < colz; j++) {
			count++;
			maze += '<td class="cell" id="col' + j + 'row' + i + '" >';
			maze += "</td>";
		}
		maze += "</tr>";
	}

	maze += "</table>";

	$("#board").html(maze);
	$(".cell").css({
		"backgroundColor": "black",
		"height": $(".cell").width()
	});
}

function onResize() {
	$(".cell").css({
		"height": $(".cell").width()
	});
	$("#yourprocess").css({
		"height": $("#board").height()
	});
	$("#board").css({
		"height": $(".cell").height() * rowz
	});
}

function pressEnter(evt) {
	if (evt.keyCode == 13) {
		submitQ();
	}
}

function logOut(){
	$.post('/api/logout',
		function (data){
			window.location.href = "index.html";
		}
	);
}

function getQ() {
	var id = "express";
	$.get("/api/quesSet/" + id,
		function(data) {
			questionList = JSON.parse(data);
			getMaze();
		}
	);
}

function getMaze() {
	var id = "express";
	$.get("/api/maze/" + id,
		function(data) {
			mazearray = JSON.parse(data);
			move1();
		}
	);
}

$(document).ready(function() {
	buildMaze();
	getQ();
	$("#answer").keyup(pressEnter);
	timer = setInterval(function() {
		move1();
	}, 300);
	$('#logout').click(logOut);
});
