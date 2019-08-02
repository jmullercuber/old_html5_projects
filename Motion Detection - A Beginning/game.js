var pos={x:0, y:0};
var gameDiv = document.getElementById("gameArea");
var gameArea = gameDiv.getContext("2d");
gameDiv.height = 480;
gameDiv.width = 640;
var dragonScales = 640/480;
gameArea.fillStyle="black";
gameArea.translate(gameDiv.width/2, gameDiv.height/2);
gameArea.scale(1,-1);
// now it's like a traditional 4-quadrant Cartesian coordinate system

var changeMan = function(xd, yd) {
	if (Math.abs(pos.x+xd)+3 < gameDiv.width/2) {pos.x += xd;}
	if (Math.abs(pos.y+yd)+3 < gameDiv.height/2) {pos.y += yd;}
};

var buttonsList =	[[0,0,125,75,-5,0,"left"],		// please excuse the 360/480 canvas size
			 [640-125,0,125,75,5,0,"right"],	// that's the size the canvas is rendered via css
			 [0,480-75,75,75,0,5,"up"],	// 480/640 is the camera input, so data is handeled that way
			 [640-75,480-75,75,75,0,-5,"down"]];
var drawButtons = function() {
	document.getElementById("controls-box").style.position="relative";
	for (var i=0; i<buttonsList.length; i++) {
		var newBut = document.getElementById("controls-box").appendChild(document.createElement("div"));
		newBut.className = "button";
		newBut.style.left=buttonsList[i][0]/dragonScales+3;	// 3 accounts for canvas border
		newBut.style.top=buttonsList[i][1]/dragonScales+8;	// 8=5+3 accounts for canvas margin and border
		newBut.style.width=buttonsList[i][2]/dragonScales;
		newBut.style.height=buttonsList[i][3]/dragonScales;
		newBut.innerHTML = buttonsList[i][6];
		newBut.id = buttonsList[i][6];
	}
};
var seCool = function() {
	var livesCounter;
	for (var i=0; i<buttonsList.length; i++) {
		livesCounter = 0;
		for (var j=0; j<buttonsList[i][3]; j++) {		// for every row
			for (var k=0; k<buttonsList[i][2]; k++) {	// for every pixel in row
				livesCounter += (arbitImgData.data[4*((buttonsList[i][0]+k) + 640*(buttonsList[i][1]+j))]==0xFF?1:0);
				arbitImgData.data[4*((buttonsList[i][0]+k) + 640*(buttonsList[i][1]+j))+1]=0;
				arbitImgData.data[4*((buttonsList[i][0]+k) + 640*(buttonsList[i][1]+j))+2]=0;
			}
		}
		document.getElementById(buttonsList[i][6]).innerHTML = buttonsList[i][6] + ": " + livesCounter;
		if (livesCounter > 15) {
			changeMan(buttonsList[i][4], buttonsList[i][5]);
			document.getElementById(buttonsList[i][6]).style.color = "rgb(255, 255, 0)";
			//console.log("moving"); // for some reason i can't log to the console like this, (more than once)!?
		}
		else {
			document.getElementById(buttonsList[i][6]).style.color = "#aa80aa";
		}
	}
	diffBoxX.putImageData(arbitImgData, 0, 0);	// since its been changed, moving turn red
	gameArea.clearRect(-gameDiv.width/2, -gameDiv.height/2, gameDiv.width, gameDiv.height); // clear canvas
	gameArea.fillRect(pos.x-3, pos.y-3, 6, 6);
};

document.getElementById("resetPos").onclick = function() {
	pos={x:0, y:0};
};
