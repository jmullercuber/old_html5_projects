// Much help thanks too
// http://www.adobe.com/devnet/html5/articles/javascript-motion-detection.html
// Yes, Adobe! The article was written by Romuald Quantin


var videoBox = document.getElementById("showCamera");
var diffBox = document.getElementById("showDifferences")
var diffBoxX = diffBox.getContext("2d");
var newFrameA = document.getElementById("cannedVideo");
var newContextA = newFrameA.getContext("2d");
var arbitImgData, BData;

// Okay, so source --> newFrame,
// and blended --> BData

// Do we have a problem with the variables, (references the canvas) updating?

var analyse = function () {
	// update ImageData....s
	newContextA.drawImage(videoBox, 0, 0);
	var AData = newContextA.getImageData(0, 0, newFrameA.width, newFrameA.height).data;
	
	// I had used getI..D.., while the tut said createI..D..
	arbitImgData = newContextA.getImageData(0,0,newFrameA.width, newFrameA.height);
//Did the difference cause problems?
	
	// for every pixel...
	for (var i=0; i < (AData.length / 4); i++) {	// cool format (flattened)
		var diff = Math.abs(((AData[4*i] + AData[4*i+1] + AData[4*i+2])-(BData[4*i] + BData[4*i+1] + BData[4*i+2]))/3);
		diff = ((diff > 0x30) ? 0xFF:0);	//0xFF=white, 0=black
		arbitImgData.data[4*i] = diff;
		arbitImgData.data[4*i+1] = diff;
		arbitImgData.data[4*i+2] = diff;
		arbitImgData.data[4*i+3] = 0xFF;
	}
	
	diffBoxX.putImageData(arbitImgData, 0, 0);
	BData = AData;
	//release objects
	AData = null;
	seCool();
	setTimeout(analyse, 1000/60);	// 60 frames a second
};
