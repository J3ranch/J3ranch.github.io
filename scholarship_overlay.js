// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
});

var closeModal = document.getElementById("close");

closeModal.onclick = function() {

	window.parent.postMessage({
	    'func': 'closeOverlay'
		}, "*");

}

function getURLParameter(param) {
    var url = window.location.search;
   	var paramString = url.substring(1);
   	var paramArray = paramString.split("&");

   	for (var i = 0; i < paramArray.length; i++) {
   		var keyPair = paramArray[i].split("=");

   		if (keyPair[0] == param) {
   			if (keyPair[1] != "null") {
   				return parseInt(keyPair[1]);
   			}
   		}
   	}

   	return -1;	
}

function getData(sid) {
	if (sid == -1) {
		document.getElementById("loader").style.display = "none";
		document.getElementById("no-data").style.display = "flex";
		return;
	}

	db.collection("scholarships").where("sid","==", sid).limit(1)
	.get()
	.then(function(query) {
		if(query.size == 0) {
			document.getElementById("loader").style.display = "none";
			document.getElementById("no-data").style.display = "flex";
		}

		query.forEach(function(doc) {
			setDoc(doc);
		});
	})
	.then(function() {
		document.getElementById("loader").style.display = "none";
	});
}

function setDoc(doc) {
	var deadlineDate;
	eval("deadlineDate = new Date('" + doc.data().deadline + "')");
	var deadline = deadlineDate.toLocaleString("en-us", {
        month: "long",
        year: "numeric",
        day: "numeric"
    });

	document.getElementById("scholarship-picture").setAttribute("src", doc.data().image);
	document.getElementById("scholarship-name").innerHTML = doc.data().name;
	document.getElementById("amount").innerHTML = "$" + doc.data().award.toLocaleString("en");
	document.getElementById("scholarship-summary").innerHTML = doc.data().description;
	document.getElementById("chance").innerHTML = doc.data().chance + "%";
	document.getElementById("deadline").innerHTML = deadline;

	addReqs(doc);
	addTags(doc);

	document.getElementById("details").removeAttribute("disabled");
	document.getElementById("apply").removeAttribute("disabled");
	document.getElementById("deadline").style.visibility = "visible";
}

function addReqs(doc) {
	if (doc.data().requirements.essays > 0) {
		var span = document.createElement("span");
		span.setAttribute("class", "overlay-content");
		span.innerHTML = doc.data().requirements.essays + ((doc.data().requirements.essays > 1) ? " Essays" : " Essay");

		document.getElementById("scholarship-reqs").appendChild(span);
	}

	if (doc.data().requirements.interviews > 0) {
		var span = document.createElement("span");
		span.setAttribute("class", "overlay-content");
		span.innerHTML = doc.data().requirements.interviews + ((doc.data().requirements.interviews > 1) ? " Interviews" : " Interview");

		document.getElementById("scholarship-reqs").appendChild(span);
	}

	if (doc.data().requirements.major != "none") {
		var span = document.createElement("span");
		span.setAttribute("class", "overlay-content");
		span.innerHTML = doc.data().requirements.major + " Majors";

		document.getElementById("scholarship-reqs").appendChild(span);

	}
}

function addTags(doc) {
	doc.data().tags.forEach(function(element) {
		var tag = document.createElement("div");
		tag.setAttribute("class", "tag")

		var tagHead = document.createElement("span");
		tagHead.setAttribute("class", "tag-head");

		var tagBody = document.createElement("span");
		tagBody.setAttribute("class", "tag-body");
		tagBody.innerHTML = element;

		tag.appendChild(tagHead);
		tag.appendChild(tagBody);

		document.getElementById("scholarship-tags-container").appendChild(tag);
	});
}

setTimeout(function() {
	document.getElementById("long-load").style.visibility = "visible";
}, 10000);

getData(getURLParameter("sid"));
