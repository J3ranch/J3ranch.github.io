

//Andrew Canafe and Xiaojian Chen
//profile.js
//the firebase initialization is in the HTML file

//go back button
function goback() {
  window.location.href = './main_page.html?uID=' + uID; //jump to main page, pass uID via URL
}

document.addEventListener("DOMContentLoaded", function () {
  render_profile();
});

//render profile
function render_profile() {
  var myDoc = firestore.collection("users").doc(uID);
  myDoc.get().then(function (doc) {
    if (doc.exists) {
      document.getElementById("create_firstName").value = doc.data().First_Name;
      document.getElementById("create_lastName").value = doc.data().Last_Name;
      document.getElementById("create_major").value = doc.data().Major;
      document.getElementById("create_graduationYear").value = doc.data().Graduation_Year;
      document.getElementById("create_gpa").value = doc.data().GPA;
      document.getElementById("school_select").value = doc.data().School;
      document.getElementById("degree_select").value = doc.data().Degree;
      document.getElementById("year_select").value = doc.data().Class_Level;
      document.getElementById("ethnicity_select").value = doc.data().Ethnicity;
      document.getElementById("us_citizenship_select").value = doc.data().US_Citizenship;
      console.log("Document data:", doc.data());
    }
  }).catch(function (err) {});
}

function submit() {
  errorDialog = document.getElementById("error-message");
  var FN = document.getElementById("create_firstName").value;
  var LN = document.getElementById("create_lastName").value;
  var MJ = document.getElementById("create_major").value;
  var GYR = document.getElementById("create_graduationYear").value;
  var SH = document.getElementById("school_select").value;
  var DG = document.getElementById("degree_select").value;
  var CL = document.getElementById("year_select").value;
  var GPA = document.getElementById("create_gpa").value;
  var ETH = document.getElementById("ethnicity_select").value;
  var USC = document.getElementById("us_citizenship_select").value;

  document.getElementById("error-message-container").style.display = "none";
  document.getElementById("create_firstName").classList.remove("error");
  document.getElementById("create_firstName").classList.remove("error");
  document.getElementById("create_major").classList.remove("error");
  document.getElementById("create_graduationYear").classList.remove("error");
  document.getElementById("create_gpa").classList.remove("error");

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
  } else {
    writeFirestore_profile(uID, FN, LN, SH, MJ, DG, GYR, CL, GPA, ETH, USC);
    setTimeout(function () {
      window.location.href = './main_page.html?uID=' + uID;
    }, 1000);
  }
}

//write the profile to firestore
function writeFirestore_profile(id, firstName, lastName, school, major, degree, graduationYear, classLevel, gpa, ethnicity, us_citizenship) {
  var ref = firestore.collection("users").doc(uID);
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
  });
  console.log("Profile Creation Saved!");
}

