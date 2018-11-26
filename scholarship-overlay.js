var closeModal = document.getElementById("close");

closeModal.onclick = function() {

	window.parent.postMessage({
	    'func': 'closeOverlay'
		}, "*");

}