function onload()
{
    var user = firebase.auth().currentUser;
    //var uID = user.uid;		//get user ID

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
        var uID = user.uid; //get current user uid
        window.location='main_page.html'+"?"+uID;   //passing uid
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

    if (email.length === 0 || password.length === 0) {
        console.log("Enter username and/or password");
        return;
    }

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode === 'auth/wrong-password')
        {
            console.log("Incorrect password");
            document.getElementById("incorrect-password").style.display = "block";
        }
        else if (errorCode === 'auth/invalid-email' || errorCode === 'auth/user-not-found')
        {
            console.log("Incorrect email or the user does not exist")
            document.getElementById("incorrect-email").style.display = "block";
        }

        console.log(errorCode);
        console.log(errorMessage);
        console.log("End of login function");
        // ...
    });
}
