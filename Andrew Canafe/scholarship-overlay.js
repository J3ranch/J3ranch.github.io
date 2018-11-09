// Get the modal
var modal = document.getElementById('scholarship-modal');

var btns;

// Get the <span> element that closes the modal
var close = document.getElementById("modal-close");

// When the user clicks on <span> (x), close the modal
close.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function applyButtons() {
	btns = document.getElementsByClassName("main-tr");

	while (btns === undefined) {console.log("hi")}

	for (var i = 0; i < btns.length; i++) {
		btns[i].onclick = function() {
	    	modal.style.display = "flex";
		}
	}
}

applyButtons();