document.getElementsByClassName("cancel-button")[0].addEventListener("click", function(e) {
	window.parent.postMessage({
		'func': 0
		}, "*");
})

document.getElementsByClassName("search-button")[0].addEventListener("click", function(e) {
	window.parent.postMessage({
		'func': 1,
		'params': createSearchObject()
		}, "*");
})

function createSearchObject() {
	var searchObj = {keywords:[]}

	if (document.getElementById("min-award").value !== "") {
		searchObj.min_award = parseInt(document.getElementById("min-award").value);
	}

	if (document.getElementById("max-essay").value !== "") {
		searchObj.max_essays = parseInt(document.getElementById("max-essay").value);
	}

	if (document.getElementById("grad-year").value !== "") {
		searchObj.grad_year = parseInt(document.getElementById("grad-year").value);
	}

	if (document.getElementById("class-year").value !== "") {
		searchObj.class_level = parseInt(document.getElementById("class-year").value);
	}

	if (document.getElementById("degree").value !== "") {
		searchObj.degree = parseInt(document.getElementById("degree").value);
	}

	if (document.getElementById("gpa-max").value !== "") {
		searchObj.max_gpa = parseInt(document.getElementById("gpa-max").value);
	}

	if (document.getElementById("citizenship").value !== undefined) {
		searchObj.citizenship = (document.getElementById("citizenship").value === "true");
	}

	if (document.getElementById("major").value !== "") {
		searchObj.major = document.getElementById("major").value;
	}

	if (document.getElementById("ethnicity").value !== "") {
		searchObj.ethnicity = document.getElementById("ethnicity").value;
	}

	return searchObj;
}