var currentpos = [xpos,ypos];
var direction = [0, 0];

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
	// write function for what happens when player completes the maze
}

function youLose() {
	// write function for what happens when player loses/goes off the board...return to last question?
}