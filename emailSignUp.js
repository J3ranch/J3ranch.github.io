
var forms = document.querySelectorAll('.validate');
for (var i = 0; i < forms.length; i++) {
	forms[i].setAttribute('novalidate', true);
}
var hasError = function (field) {
	// Don't validate submits, buttons, file and reset inputs, and disabled fields
	if (field.type === 'submit' || field.type === 'button') return;

	var validity = field.validity;

	// If valid, return null
	if (validity.valid) 
		return;
	if (validity.valueMissing)
		return '*Please fill out this field.';
	if (validity.typeMismatch) {
		if (field.type === 'email') 
			return '*Please enter a valid email address.';
	}
	// If pattern doesn't match
	if (validity.patternMismatch) {
		if (field.hasAttribute('title')) return field.getAttribute('title');
	}

}

var showError = function (field, error) {

	// Get field id or name
	var id = field.id || field.name;
	if (!id) return;

	// Check if error message field already exists
	// If not, create one
	var message = field.form.querySelector('.error-message#error-for-' + id );
	if (!message) {
		message = document.createElement('p');
		message.className = 'error-message';
		message.id = 'error-for-' + id;
		field.parentNode.insertBefore(message, field.nextSibling );
	}
	
	// Add ARIA role to the field
	field.setAttribute('aria-describedby', 'error-for-' + id);

	// Update error message
	message.innerHTML = error;
	// Show error message
	message.style.display = 'block';
	message.style.visibility = 'visible';
};

var removeError = function (field) {

	
	// Remove ARIA role from the field
	field.removeAttribute('aria-describedby');

	// Get field id or name
	var id = field.id || field.name;
	if (!id) return;

	// Check if an error message is in the DOM
	var message = field.form.querySelector('.error-message#error-for-' + id + '');
	if (!message) return;

	// If so, hide it
	message.innerHTML = '';
	message.style.display = 'none';
	message.style.visibility = 'hidden';
};

document.addEventListener('blur', function (event) {
	// Only run if the field is in a form to be validated
	if (!event.target.form.classList.contains('validate')) return;

	// Validate the field
	var error = hasError(event.target);

	if (error) {
		showError(event.target, error);
		return;
	}
	removeError(event.target);
}, true);


$(document).ready(function(){
	
	$(function () {
		$('form > input').keyup(function() {
			var empty = false;
			$('form > input').each(function() {
				if ($(this).val() == '') {
				empty = true;
				}
			});
			if (empty) {
				$('#signupButton').attr('disabled', 'disabled');
			} else {
				$('#signupButton').removeAttr('disabled');
			}
		});
	});
	
	
	$("#signupButton").click(function(){
		var password = $("#password").val();
		var confirmPassword = $("#confirmPassword").val();
		var email = $("#email").val();
		var confirmEmail = $("#confirmEmail").val();
		
		
		//display error if password mismatch
		if(!(password).match(confirmPassword)){
			var showError = document.createElement('p');
			$(this).closest('form').find("input[type=password], textarea").val("");
			$(showError).addClass('error-message');
			$(showError).text('*Error: Password mismatch');
			$(".showErrorAfterSubmit").html(showError);
		
		}
		
		//display error if email mismatch
		if(!(email).match(confirmEmail)){
			var showError = document.createElement('p');
			$(this).closest('form').find("input[type=password], textarea").val("");
			$(this).closest('form').find("input[type=email], textarea").val("");
			$(showError).addClass('error-message');
			$(showError).text("*Error: Email mismatch");
			$(".showErrorAfterSubmit").html(showError);

		}
		
		//write user information to firebase and automatically login 
		if((password).match(confirmPassword) && (email).match(confirmEmail)){
			firebase.auth().createUserWithEmailAndPassword(email, password)
			.then(()=>{
				console.log('Signup successful.');
				firebase.auth().signInWithEmailAndPassword(email, password)
				.catch((error)=> {
					// Handle Errors here.
					var errorCode = error.code;
					var errorMessage = error.message;
				});

				var user = firebase.auth().currentUser;
				var uID = user.uid;		//get user ID

				if (user) 
				{
					console.log("Logged in");
				   	window.location='Xiaojian Chen\\Profile Creation.html?'+uID;	//send user ID via URL
				}

			})
			//display error when user's email is already signed up
			.catch((error)=> {
				var errorCode = error.code;
				var errorMessage = error.message;
				if (errorCode === 'auth/email-already-in-use'){
					var showError = document.createElement('p');
					$(showError).addClass('error-message');
					$(showError).text('*This email is already in use. Please try another email!');
					$(".showErrorAfterSubmit").html(showError);
				}
				console.log(errorCode);
				console.log(errorMessage);
			})
			$("form")[0].reset();//reset all fields
	
		}
		
		$('#signupButton').attr('disabled', 'disabled');//disable sign-up button after submitted the form
	
	});
	
	//use "enter" key for signUp button
	var input = document.getElementById("form");
		  input.addEventListener("keyup", function(event){
			    event.preventDefault();
			    if (event.keyCode === 13) 
			    {
			   document.getElementById("signupButton").click();
			    }
	});
})

