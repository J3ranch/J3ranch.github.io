
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

	// $(function() {
	
	// $("#confirmPassword").keyup(function() {
	// 	var password = $("#password").val();
	// 	$("#er").html(password == $(this).val()
	// 	    ? "Passwords match."
	// 	    : "Passwords do not match!"
	// 	);
	//  });
	// });
	$("#signupButton").click(function(){
		var password = $("#password").val();
		var confirmPassword = $("#confirmPassword").val();
		var email = $("#email").val();
		var confirmEmail = $("#confirmEmail").val();
		var showError = document.createElement('p');
		if(!(password).match(confirmPassword)){
			
			$(this).closest('form').find("input[type=password], textarea").val("");
			$(showError).addClass('error-message');
			$(showError).text('*Error: Password mismatch');
			$("#showErrorAfterSubmit").html(showError);
		}
	
		else if(!(email).match(confirmEmail)){

			$(this).closest('form').find("input[type=password], textarea").val("");
			$(this).closest('form').find("input[type=email], textarea").val("");
			$(showError).addClass('error-message');
			$(showError).text("*Error: Email mismatch");
			$("#showErrorAfterSubmit").replaceWith(showError);
		}
		else{
			firebase.auth().createUserWithEmailAndPassword(email, password)
			.catch(function(error) {
				var errorCode = error.code;
				var errorMessage = error.message;
				if (errorCode === 'auth/email-already-in-use') {
					$(showError).addClass('error-message');
					$(showError).text('*This email is already in use. Please try another email!');
					$("#showErrorAfterSubmit").replaceWith(showError);
					return;
				} 
			});

			//Send email verification option
			// var user = firebase.auth().currentUser;
			// user.sendEmailVerification().then(function(){
  			// // Email sent.
			// }).catch(function(error) {
  			// // An error happened.
			// });
			function redirect(){
				window.location='Xiaojian Chen\\Profile Creation.html';
			}
			$("form")[0].reset();
		}
		$('#signupButton').attr('disabled', 'disabled');
	});
// 	var input = document.getElementById("#signupButton");
//   	input.addEventListener("keyup", function(event) 
//   	{
//     		event.preventDefault();
//     		if (event.keyCode === 13) 
//     	{
//         	document.getElementById("signupButton").click();
//     	}
//   })
})
