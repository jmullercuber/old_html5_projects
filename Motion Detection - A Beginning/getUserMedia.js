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
	videoBox.srcObject = localStream;
	videoBox.onloadedmetadata = setTimeout(frun, 1000);
};

// Check for getUserMedia
if (!navigator.getUserMedia) {
	fail();
}
else {
	// Actually make the call
	navigator.getUserMedia(inputChannels, act, fail);
}
