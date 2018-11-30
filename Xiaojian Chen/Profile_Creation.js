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
    if (FN.length == 0) {
        document.getElementById("error-message-container").style.display = "inline-block";
        errorDialog.textContent = "Please enter your first name";
        document.getElementById("create_firstName").classList.add("error");
    } else if (LN.length == 0) {
        document.getElementById("error-message-container").style.display = "inline-block";
        errorDialog.textContent = "Please enter your last name";
        document.getElementById("create_lastName").classList.add("error");
    } else if (MJ.length == 0) {
        document.getElementById("error-message-container").style.display = "inline-block";
        errorDialog.textContent = "Please enter your major";
        document.getElementById("create_major").classList.add("error");
    } else if (GYR.length != 4 || isNaN(GYR)) {
        document.getElementById("error-message-container").style.display = "inline-block";
        errorDialog.textContent = "Please enter a valid year";
        document.getElementById("create_graduationYear").classList.add("error");
    } else if (GPA.length == 0 || isNaN(GPA) || parseFloat(GPA).toFixed(2) < 0 || parseFloat(GPA).toFixed(2) > 4) {
        document.getElementById("error-message-container").style.display = "inline-block";
        errorDialog.textContent = "Please enter a valid GPA (0-4)";
        document.getElementById("create_gpa").classList.add("error");
    }else if(SH=="School"){
        document.getElementById("error-message-container").style.display = "inline-block";
        errorDialog.textContent = "Please Select your School";
        document.getElementById("school_select").classList.add("error");
    }else if(DG=="Degree"){
        document.getElementById("error-message-container").style.display = "inline-block";
        errorDialog.textContent = "Please Select your Degree";
        document.getElementById("degree_select").classList.add("error");
    }else if(CL=="Class Level"){
        document.getElementById("error-message-container").style.display = "inline-block";
        errorDialog.textContent = "Please Select your Class Level";
        document.getElementById("classLevel_select").classList.add("error");
    }else if(Eth=="Ethnicity"){
        document.getElementById("error-message-container").style.display = "inline-block";
        errorDialog.textContent = "Please Select your Ethnicity";
        document.getElementById("ethnicity_select").classList.add("error");
    }else if(USC=="US Citizenship"){
        document.getElementById("error-message-container").style.display = "inline-block";
        errorDialog.textContent = "Please Select your US Citizenship status";
        document.getElementById("us_citizenship_select").classList.add("error");
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