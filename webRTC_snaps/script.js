var videoBox = document.getElementById("showCamera");
var frameBox = document.getElementById("showPlane");

// Cross-Browser
window.URL = window.URL || window.webkitURL;
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

// What we want to access
var inputChannels = {
	video: true,
	audio: false
};

// If we get an error...
var fail = function (e) {
	alert("Oh, no, we've got a problem. Check the console.");
	console.log(e);
};

// Let's get this started!
var act = function (localStream) {
	videoBox.src = window.URL.createObjectURL (localStream);
	videoBox.onloadedmetadata = play;	// not nessecary, but allows us to do future stuff
};

// Now what?
var play = function () {
	
};

// Check for getUserMedia
if (!navigator.getUserMedia) {
	fail();
}
else {
	// Actually make the call
	navigator.getUserMedia (inputChannels, act, fail);
}