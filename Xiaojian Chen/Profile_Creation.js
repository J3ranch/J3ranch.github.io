/*Xiaojan Chen 905118702*/

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDwpG2spmCwUbpEH6daawXj5Qgo4CldOr0",
    authDomain: "ucscholarship-10628.firebaseapp.com",
    databaseURL: "https://ucscholarship-10628.firebaseio.com",
    projectId: "ucscholarship-10628",
    storageBucket: "ucscholarship-10628.appspot.com",
    messagingSenderId: "877779845443"
  };
  firebase.initializeApp(config);

  var firestore = firebase.firestore();
  const settings = {/* your settings... */ timestampsInSnapshots: true};
  firestore.settings(settings);


$( document ).ready(function(){
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

    $( "#create_Year").autocomplete({
        source: ["Freshman","Sophomore","Junior","Senior"],
        autoFocus: true,
        select: function( event, ui ) {
          //event.preventDefault();
          document.getElementById("create_Year").value = ui.item.value    //sent the autocomplete value to "pr2__answer"
        }
    });
    
});

var User_id = "wDnseS1njZWeo0i8kL3a";  //the id for current user

function summit(){
    var FN = document.getElementById("create_firstName").value;
    var LN = document.getElementById("create_lastName").value;
    var SH = document.getElementById("create_school").value;
    var MJ = document.getElementById("create_major").value;
    var DG = document.getElementById("create_degree").value;
    var GYR = document.getElementById("create_graduationYear").value;
    var YR = document.getElementById("create_Year").value;
    
    writeFirestore_profile(User_id, FN, LN, SH, MJ, DG, GYR, YR);
    setTimeout(function(){
        window.location.href ='../main_page.html';
    },1000);
}


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