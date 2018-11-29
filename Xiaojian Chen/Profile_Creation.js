/*Xiaojan Chen 905118702*/

//the firebase initialization is in the HTML file

//process URL data
var thisURL =document.URL;
var uID = thisURL.split('?')[1].split('uID=')[1];

var User_id = uID;  //the id for current user;

$( document ).ready(function(){
    //autocomplete for Degree textbox
    $( "#create_degree").autocomplete({
        source: ["Associate of Arts (A.A.)","Associate of Science (A.S.)",
        "Bachelor of Arts (B.A.)","Bachelor of Science degree (B.S.)",
        "Master of Arts (M.A.)", "Master of Science (M.S.)","Ph.D"
    ],
        autoFocus: true,
        select: function( event, ui ) {
          //event.preventDefault();
          document.getElementById("create_degree").value = ui.item.value    //sent the autocomplete value to "pr2__answer"
        }
    });

    //autocomplete for Year textbox
    $( "#create_Year").autocomplete({
        source: ["Freshman","Sophomore","Junior","Senior"],
        autoFocus: true,
        select: function( event, ui ) {
          //event.preventDefault();
          document.getElementById("create_Year").value = ui.item.value    //sent the autocomplete value to "pr2__answer"
        }
    });
    
});

// for summit btn
function summit(){

    errorDialog = document.getElementById("error-message");
    var FN = document.getElementById("create_firstName").value;
    var LN = document.getElementById("create_lastName").value;
    var SH = document.getElementById("create_school").value;
    var MJ = document.getElementById("create_major").value;
    var DG = document.getElementById("create_degree").value;
    var GYR = document.getElementById("create_graduationYear").value;
    var YR = document.getElementById("create_Year").value;

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