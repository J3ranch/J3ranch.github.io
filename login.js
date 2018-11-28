function onload()
{
    var user = firebase.auth().currentUser;

    if (user) 
    {
        console.log("Logged in");
        window.location='main_page.html';
    }
}

firebase.auth().onAuthStateChanged(function(user) {

    console.log("In onAuthStateChanged");

    if (user) 
    {
        console.log("Logged in");
        window.location='main_page.html';
    }
    else
    {
        console.log("Not logged in");
        // window.location='index.html';
    }
});

function login() {
    // console.log('In login function');

    email = document.getElementById("email").value;
    password = document.getElementById("password").value;
    document.getElementById("error-message-container").style.display = "initial";
    errorDialog = document.getElementById("error-message");

    if (email.length === 0 || password.length === 0) {
        console.log("Enter username and/or password");
        errorDialog.textContent = "Enter username and/or password";
        document.getElementById("email").classList.add("error");
        document.getElementById("password").classList.add("error");
        return;
    }

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode === 'auth/wrong-password')
        {
            console.log("Incorrect password");
            errorDialog.textContent = "Incorrect password";
            document.getElementById("password").classList.add("error");
            document.getElementById("email").classList.remove("error");
        }
        else if (errorCode === 'auth/invalid-email' || errorCode === 'auth/user-not-found')
        {
            console.log("Incorrect email or the user does not exist")
            errorDialog.textContent = "Incorrect email or the user does not exist";
            document.getElementById("email").classList.add("error");            
            document.getElementById("password").classList.remove("error");
        }

        console.log(errorCode);
        console.log(errorMessage);
        console.log("End of login function");
    });
}
