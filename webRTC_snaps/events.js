/*
 *	I guess I could make this more object-oriented..
 *		might ease on memory because every button isn't referencing it's own, individual function
 *	
 *	Hopefully I'll later understand what this means
*/
var snappies = 0;
var snap = function () {	// onmousedown instead?
	// Oh, I need to add a counter too
	snappies++;
	
	var newParentDiv = frameBox.appendChild(document.createElement("div"));
	newParentDiv.className = "littleWindow"
	var numbering = document.createElement("p");
	numbering.className = "numbering";
	numbering.innerHTML = snappies + ".";
	newParentDiv.appendChild(numbering);
	
	var newCanvas = newParentDiv.appendChild(document.createElement("canvas"));
	newCanvas.height = videoBox.videoHeight;	// not in the css because what if videoHeight is different?
	newCanvas.width = videoBox.videoWidth;
	newCanvas.getContext("2d").drawImage(videoBox, 0, 0);
	newCanvas.hidden = true;
	
	var newImg = newParentDiv.appendChild(document.createElement("img"));
	newImg.src = newCanvas.toDataURL("image/png");
	
	var potHolder = newParentDiv.appendChild(document.createElement("div"));
	potHolder.className = "smallBox";
	
	var newMinus = potHolder.appendChild(document.createElement("div"));
	newMinus.className = "miniButton";
	newMinus.innerHTML = "-"
	newMinus.onclick = function () {
		newParentDiv.parentNode.removeChild(newParentDiv);
	};
	
	var newDownload = potHolder.appendChild(document.createElement("a"));
	var now = new Date();
	newDownload.className = "miniButton";
	newDownload.download = "Selfie #" + snappies + " @ " + (new Date())  + ".png";
	newDownload.innerHTML = "↓"
	newDownload.onclick = function () {
		newDownload.href = newCanvas.toDataURL("image/png");
	};
};

videoBox.onclick = snap;
