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
    var CL = document.getElementById("classLevel_select").value;
    var GPA = parseFloat(document.getElementById('create_gpa').value).toFixed(2);
    var Eth = document.getElementById('ethnicity_select').value;
    var USC = document.getElementById('us_citizenship_select').value

    //checking the input of first name and last name
    if (FN.length === 0 || LN.length === 0) {
        console.log("Please enter your First Name and/or Last Name");
        document.getElementById("error-message-container").style.display = "initial";
        errorDialog.textContent = "Enter your First Name and/or Last Name";
        document.getElementById("create_firstName").classList.add("error");
        document.getElementById("create_lastName").classList.add("error");
        
     //checking the input of GPA   
    }else if(GPA<0 || GPA >4){
        console.log("Please enter a valid GPA number (0~4)");
        document.getElementById("error-message-container").style.display = "initial";
        errorDialog.textContent = "Enter a valid GPA number (0~4)";
        document.getElementById("create_gpa").classList.add("error");
    }else{
        writeFirestore_profile(User_id, FN, LN, SH, MJ, DG, GYR, CL,GPA,Eth,USC);
        setTimeout(function(){
            window.location.href ='../main_page.html'+'?uID='+uID;  //jump to main page, pass uID via URL
        },1000); //the timer is for uploading the profile to firestore
    }
    
    
}

//write the profile to firestore
function writeFirestore_profile(id, firstName, lastName, school, major, degree, graduationYear, classLevel, gpa, ethnicity, us_citizenship){
    var ref = firestore.collection("users").doc(id)
    ref.set({
        First_Name: firstName,
        Last_Name: lastName,
        School: school,
        Major: major,
        Degree: degree,
        Graduation_Year: graduationYear,
        Class_Level: classLevel,
        GPA: gpa,
        Ethnicity: ethnicity,
        US_Citizenship: us_citizenship
    })
    console.log("Profile Creation Saved!");
}