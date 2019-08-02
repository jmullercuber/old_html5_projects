var mouseCoor = {
	x: 0,
	y: 0
};
var translations = {
	x: 0,
	y: 0
};
var showTrans = document.getElementById('showTranslations');
var showCoords = document.getElementById('showCoordinates');
var shouldUpdateGrid = true;
//''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
/*	I wanted the event that triggered the keyboard code to also trigger the mouse detection,
*	but that doesn't happen. So, I am continuously tracking the mouse as it moves.
*/
canvas.onmousemove = function(e) {
	var rect = canvas.getBoundingClientRect();
	mouseCoor.x = e.clientX - rect.left,
	mouseCoor.y = e.clientY - rect.top
	showCoords.innerHTML = " (" + (((Math.floor (mouseCoor.x/sz + translations.x)%dimensions)+dimensions)%dimensions) + ", " + (((Math.floor (mouseCoor.y/sz + translations.y)%dimensions)+dimensions)%dimensions) + ")";
};
//''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
plotOnMouse = function() {
	ploter ((((Math.floor (mouseCoor.x/sz + translations.x)%dimensions)+dimensions)%dimensions), (((Math.floor (mouseCoor.y/sz + translations.y)%dimensions)+dimensions)%dimensions), 1);
};
//''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
canvas.onmousedown = function() {
	plotOnMouse();
};
//''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
canvas.onkeydown = function(e) {
	e = e || window.event;
	if (e.keyCode === 80) {   // p is to pause
		shouldUpdateGrid = false;
	}
	else if (e.keyCode === 67) {   // c is to continue
		shouldUpdateGrid = true;
	}
	if (e.keyCode === 32) {   // space bar
		plotOnMouse();
	}
	if (e.keyCode === 71) {   // g is to randomly generate
		setIt("random");
	}
	if (e.keyCode === 82) {   // r is to restart
		setIt("clear");
	}
	
	
	if (e.keyCode === 65) {   // A
		translations.x --;
	}
	else if (e.keyCode === 68) {   // D
		translations.x ++;
	}
	if (e.keyCode === 87) {   // W
		translations.y --;
	}
	else if (e.keyCode === 83) {   // S
		translations.y ++;
	}
	showTrans.innerHTML = " (" + translations.x + ", " + translations.y + ")";

	/* I wanted to include some sort of functionality where pressing shift toggles your paintbox
	*	so you can dynamically make cells black or white, but it was making the program slow?
	*/
};