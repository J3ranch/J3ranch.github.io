// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
});

firebase.auth().onAuthStateChanged(function(user) {
    if (user) 
    {
        console.log("Logged in");
        document.getElementById("searchbar").value = user.email;
    }
    else
    {
        console.log("Not logged in");
        window.location='./index.html';
    }
});

function logout() {

    console.log("Logout")

    firebase.auth().signOut();
}

// Get the modal
var modal = document.getElementById('scholarship-modal');
var frame = document.getElementById("scholarship-iframe");

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        closeOverlay();
    }
}

function applyButtons() {
    document.querySelector("#search-container form").addEventListener("submit", function(e) {
        e.preventDefault();
        document.getElementById("submit-search").click();   
    });

    document.getElementById("submit-search").addEventListener("click", function(e) {
        clearResults();
        search(getSearchTerms());
    });

    document.getElementById("submit-search").addEventListener("keydown", function(e) {
        if (e.keyCode === 13) {
            e.target.click();
        }
    });

    document.getElementById("reset-search").addEventListener("click", function(e) {
        document.getElementById("no-results").style.display = "none";
        document.getElementById("searchbar").value = ""
        search({keywords: [""], empty_search: true});
    });

    document.getElementById("reset-search").addEventListener("keydown", function(e) {
        if (e.keyCode === 13) {
            e.target.click();
        }
    });
}

function getAllScholarships() {
    clearResults();

    db.collection("scholarships").orderBy("name")
    .get().then(function(query) {
        query.forEach(function(doc) {
            addScholarship(doc);
        })
    })
    .then(function() {
        document.getElementById("loader").style.display = "none";
    });
}

function addScholarship(doc) {
    var scholarship = document.createElement("div"); 
    scholarship.setAttribute("class", "scholarship"); scholarship.setAttribute("sid", doc.data().sid); scholarship.setAttribute("tabIndex", "0");
    var imageContainer = document.createElement("div"); imageContainer.setAttribute("class", "scholarship-img");
    var image = document.createElement("img"); image.setAttribute("src", doc.data().image);
    var overview = document.createElement("div"); overview.setAttribute("class", "scholarship-overview");
    var name = document.createElement("h3"); name.innerHTML = doc.data().name;
    var award = document.createElement("p"); award.innerHTML = "$" + doc.data().award.toLocaleString("en"); award.setAttribute("class", "award");
    var oneLine = document.createElement("p"); oneLine.innerHTML = doc.data().one_line;
    var tags = document.createElement("p"); tags.innerHTML = doc.data().tags.join(", "); tags.setAttribute("class", "tags");

    overview.appendChild(name);
    overview.appendChild(award);
    overview.appendChild(oneLine);
    overview.appendChild(tags);

    imageContainer.appendChild(image);

    scholarship.appendChild(imageContainer);
    scholarship.appendChild(overview);

    scholarship.addEventListener("click", function(e) {
        modal.style.display = "flex";
        frame.setAttribute("src", "./scholarship_overlay.html?sid=" + e.target.closest(".scholarship").getAttribute("sid"));
    });

    scholarship.addEventListener("keyup", function(e) {
        // Cancel the default action, if needed
        e.preventDefault();
        // Number 13 is the "Enter" key on the keyboard
        if (e.keyCode === 13) {
            // Trigger the button element with a click
            e.target.click();
        }
    });

    document.getElementById("results-table").appendChild(scholarship);
}

function onMessage(event) {
    // Check sender origin to be trusted
    //if (event.origin !== "http://example.com") return;

    var data = event.data;

    if (typeof(window[data.func]) == "function") {
        window[data.func].call();
    }
}

// Function to be called from iframe
function closeOverlay() {
    modal.style.display = "none";
    frame.setAttribute("src", "")
}

function getSearchTerms() {
    var searchbar = document.getElementById("searchbar");
    var search;

    if (searchbar.value[0] === "{" && searchbar.value[searchbar.value.length - 1] === "}" && validateSearch(searchbar.value)) {
        eval("search = " + searchbar.value);
        console.log(search);
        return search;
    } else {
        search = (searchbar.value.indexOf('"') != -1) ? searchbar.value.match(/"[^"]*"|\b[^"\s]*|/g) : searchbar.value.split(/[\s,]/);
        search = search.filter(Boolean);
        search.forEach(function(e, i) {if (/"[^"]*"/.test(e)) {search[i] = e.substring(1, e.length - 1);} });

        console.log(search);
        return {keywords: search};
    }
}

function validateSearch(searchbar) {
    var obj = {};
    
    try {
        eval("obj = " + searchbar);
    } catch (error) {
        return false;
    }

    return (obj.hasOwnProperty("keywords")) && Array.isArray(obj.keywords);
}

function search(search) {
    var keywords = search.keywords;
    var results = [];

    // default optional params
    var minAward = search.hasOwnProperty("min_award") ? search.min_award : 0;
    var maxEssays = search.hasOwnProperty("max_essays") ? search.max_essays : 999;

    document.getElementById("long-load").style.visibility = "hidden";
    document.getElementById("loader").style.display = "flex";

    setTimeout(function() {
        document.getElementById("long-load").style.visibility = "visible";
    }, 10000);

    db.collection("scholarships")
    .orderBy("award", "desc")
    .get().then(function(query) {
        query.forEach(function(doc) {
            // Optional Param Filter
            if (doc.data().award < minAward) return;
            if (doc.data().requirements.essays > maxEssays) return;

            // Keyword search
            keywords.forEach(function(term) {
                if (search.hasOwnProperty("empty_search") && search.empty_search) {
                    if (!results.includes(doc))
                        results.push(doc); return;
                }
                else if (doc.data().name.toLowerCase().includes(term.toLowerCase())) {
                    if (!results.includes(doc))
                        results.push(doc); return;
                }
                else if (doc.data().description.toLowerCase().includes(term.toLowerCase())) {
                    if (!results.includes(doc))
                        results.push(doc); return;
                }
                else if (doc.data().award.toString().toLowerCase().includes(term.toLowerCase())) {
                    if (!results.includes(doc))
                        results.push(doc); return;
                }
                else if (doc.data().tags.find(function(e) {return e.toLowerCase().includes(term.toLowerCase());}) !== undefined) {
                    if (!results.includes(doc))
                        results.push(doc); return;
                }
            });
        });
    })
    .then(function() {
        showSearch(results);
    });
}

function showSearch(results) {
     if (document.getElementById("searchbar").value !== "" && results.length > 0) {
        results.forEach(function(doc) {
            addScholarship(doc);
        });
    } else if (document.getElementById("searchbar").value !== "" && results.length == 0) {
        document.getElementById("no-results").style.display = "flex";
    } else {
        getAllScholarships();
    } 
    
    document.getElementById("loader").style.display = "none";     
}

function clearResults() {
    document.getElementById("no-results").style.display = "none";
    var oldResults = document.getElementsByClassName("scholarship");
    while(oldResults[0])
        oldResults[0].parentNode.removeChild(oldResults[0]);
}

var serverTimeout = setTimeout(function() {
    document.getElementById("long-load").style.visibility = "visible";
}, 10000);


// run on start
if (window.addEventListener) {
    window.addEventListener("message", onMessage, false);        
} 
else if (window.attachEvent) {
    window.attachEvent("onmessage", onMessage, false);
}

applyButtons();
getAllScholarships();