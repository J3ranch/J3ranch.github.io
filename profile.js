//Andrew Canafe and Xiaojian Chen
//profile.js
//the firebase initialization is in the HTML file

//go back button
function goback(){
    window.location.href ='./main_page.html'+'?uID='+uID;  //jump to main page, pass uID via URL
}

document.addEventListener("DOMContentLoaded", function() {
  console.log("start");
  render_profile();
});

//render profile
function render_profile() {
	var myDoc = firestore.collection("users").doc(uID);
	myDoc.get().then(function(doc) {
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
	}).catch(function(err) { });
}


  