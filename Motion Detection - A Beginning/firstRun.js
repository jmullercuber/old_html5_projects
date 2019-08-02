var frun = function() {
	diffBox.height = 480;
	diffBox.width = 640;
	newFrameA.height = 480;
	newFrameA.width = 640;
	BData = newContextA.getImageData(0, 0, newFrameA.width, newFrameA.height).data;
	
	// make it look like you're in a mirror
	newContextA.translate(newFrameA.width, 0);
	newContextA.scale(-1, 1);
	
	drawButtons();
	
	analyse();
}
