/*Xiaojan Chen 905118702*/

//the firebase initialization is in the HTML file

//process URL data
var thisURL =document.URL;
var uID = thisURL.split('?')[1].split('uID=')[1];

var User_id = uID;  //the id for current user;

// for summit btn
function summit(){

    errorDialog = document.getElementById("error-message");
    var FN = document.getElementById("create_firstName").value;
    var LN = document.getElementById("create_lastName").value;
    var MJ = document.getElementById("create_major").value;
    var GYR = document.getElementById("create_graduationYear").value;
    var SH = document.getElementById("school_select").value;
    var DG = document.getElementById("degree_select").value;
    var YR = document.getElementById("year_select").value;

    if (FN.length === 0 || LN.length === 0) {
        console.log("Enter your First Name and/or Last Name");
        document.getElementById("error-message-container").style.display = "initial";
        errorDialog.textContent = "Enter your First Name and/or Last Name";
        document.getElementById("create_firstName").classList.add("error");
        document.getElementById("create_lastName").classList.add("error");
        
    }else{
        writeFirestore_profile(User_id, FN, LN, SH, MJ, DG, GYR, YR);
        setTimeout(function(){
            window.location.href ='../main_page.html'+'?uID='+uID;  //jump to main page, pass uID via URL
        },1000); //the timer is for uploading the profile to firestore
    }
    
    
}

//write the profile to firestore
function writeFirestore_profile(id, firstName, lastName, school, major, degree, graduationYear, year){
    var ref = firestore.collection("users").doc(id)
    ref.set({
        First_Name: firstName,
        Last_Name: lastName,
        School: school,
        Major: major,
        Degree: degree,
        Graduation_Year: graduationYear,
        Year: year
    })
    console.log("Profile Creation Saved!");
}