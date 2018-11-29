var db = firebase.firestore();

db.settings({
  timestampsInSnapshots: true
});

function addScholarship() {
	document.getElementById("submit").setAttribute("disabled", "");

	db.collection("scholarships").add({
		apply_url: document.getElementById("apply_url").value,
		award: parseInt(document.getElementById("award").value),
		chance: document.getElementById("chance").value,
		description: document.getElementById("description").value,
		details_url: document.getElementById("details_url").value,
		image: document.getElementById("image").value,
		name: document.getElementById("name").value,
		one_line: document.getElementById("one_line").value,
		sid: parseInt(document.getElementById("sid").value),
		tags: document.getElementById("tags").value.split(","),
		requirements: {
			essays: parseInt(document.getElementById("essays").value),
			interviews: parseInt(document.getElementById("interviews").value),
			major: document.getElementById("major").value,
			ethnicity: document.getElementById("ethnicity").value,
			gpa: document.getElementById("gpa").value,
			year: document.getElementById("year").value,
			grad_year: document.getElementById("grad-year").value,
			degree: document.getElementById("degree").value,
			citizenship: document.getElementById("citizenship") === "true"
		},
		provider: document.getElementById("provider").value,
		deadline: document.getElementById("deadline").value
	});

	getNextSID();
}

function getNextSID() {
	db.collection("scholarships").orderBy("sid", "desc").limit(1).get().then(function(query) {
		query.forEach(function(doc) {
			document.getElementById("sid").value = doc.data().sid + 1;
			document.getElementById("submit").removeAttribute("disabled");
		})
	})
}

getNextSID();