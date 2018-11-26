// Get the modal
var modal = document.getElementById('scholarship-modal');

var btns;

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function applyButtons() {
    btns = document.getElementsByClassName("scholarship");

    for (var i = 0; i < btns.length; i++) {
        btns[i].onclick = function() {
            modal.style.display = "flex";
        }

        btns[i].addEventListener("keyup", function(event) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Number 13 is the "Enter" key on the keyboard
            if (event.keyCode === 13) {
                // Trigger the button element with a click
                event.target.click();
            }
        });
    }
}

applyButtons();

if (window.addEventListener) {
    window.addEventListener("message", onMessage, false);        
} 
else if (window.attachEvent) {
    window.attachEvent("onmessage", onMessage, false);
}

function onMessage(event) {
    // Check sender origin to be trusted
    //if (event.origin !== "http://example.com") return;

    var data = event.data;

    if (typeof(window[data.func]) == "function") {
        window[data.func].call();
    }
}

// Function to be called from iframe
function closeOverlay() {
    modal.style.display = "none";
}