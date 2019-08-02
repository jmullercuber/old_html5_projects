var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.fillStyle="black";
ctx.strokeStyle="black";
var dimensions = 50;
var grid = new Array(dimensions), sz, intervalID;
var ruley = [[3],[2,3]]
var speed=2;
//'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

function init() {
	for (var t=0;t < dimensions;t++) {
		grid[t] = new Array(dimensions);
		for (var u=0; u < dimensions;u++) {
			grid[t][u] = 0;
		}
	}

	ploter (9,11,1);
	ploter (9,13,1);
	ploter (10,10,1);
	ploter (11,10,1);
	ploter (12,10,1);
	ploter (12,13,1);
	ploter (13,10,1);
	ploter (13,11,1);
	ploter (13,12,1);

	intervalID = setInterval(draw, 1000/speed);
}

//'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

var ploter = function (xt, yt, n) {
	grid[yt][xt] = n;
};

var getSmaller = function (x) {	// The unsually long expression compensates for negative translations :l
	return ((x%dimensions)+dimensions)%dimensions;
};

var testSpot = function(sx, sy) {
	var stuff = 0;
	// Moore Neighborhood
	for (var m=-1; m<2; m++) {
		for (var n=-1; n<2; n++) {
			if (!(m===0 && n===0)) {
				// Meaning of totalistic, or sum...
				stuff+= grid[getSmaller(sy+m)][getSmaller(sx+n)];
			}
		}
	}

	for (var k=0; k < ruley [grid[sy][sx]].length; k++) {
		if (stuff === ruley [grid[sy][sx]+0][k]) {
			return 1;
		}
	}
	return 0;	// If we get to this part of the code, then dead.
};

var setIt = function(typeOfSet) {
	for (var u=0; u < dimensions;u++) {
		for (var w=0; w<dimensions;w++) {
			if (typeOfSet === "random") {
				grid[u][w]=(Math.floor(Math.random()*2));
			}
			else if (typeOfSet === "clear") {
				grid[u][w]=0;
			}
		}
	}
};
//''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

var draw = function() {
	ctx.clearRect(0,0,canvas.width,canvas.height); // clear canvas
	sz = canvas.width/dimensions;
	for(var y = 0; y < dimensions; y++) {
		for(var x = 0; x < dimensions; x++) {
			ctx.strokeRect(x*sz, y*sz, sz, sz);
			if(grid[getSmaller(y+translations.y)][getSmaller(x+translations.x)]) {
				ctx.fillRect(x*sz+1, y*sz+1, sz-2, sz-2);
			}
		}
	}
//''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
	if (shouldUpdateGrid)
	{
		var theSaveMeGrid = new Array(dimensions);
		for(var y = 0; y < dimensions; y++) {
			theSaveMeGrid[y] = new Array(dimensions);
			for(var x = 0; x < dimensions; x++) {
				theSaveMeGrid[y][x] = testSpot(x, y);
			}
		}
	grid = theSaveMeGrid;
	}
};

init();