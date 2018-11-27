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

var studentList = document.getElementById("student_list");
var chat_student_id ="";
var chat_student_name="";

//create element & render students
function renderStudent(doc){
    let li = document.createElement("li");
    let name = document.createElement('span');
    let school = document.createElement('span');
    let major = document.createElement('span');
    let degree = document.createElement('span');
    let graduation_year = document.createElement('span');
    let year = document.createElement('span');
    let chatButton = document.createElement('button');

    li.setAttribute('data-id', doc.id);
    li.setAttribute('name', doc.data().First_Name+" "+doc.data().Last_Name);
    name.innerHTML = "<i class='fas fa-user'></i>  " +doc.data().First_Name+" "+doc.data().Last_Name;
    school.innerHTML = "<i class='fas fa-angle-right'></i>  "+"School: " +doc.data().School;
    major.innerHTML = "<i class='fas fa-angle-right'></i>  "+"Major: " +doc.data().Major;
    degree.innerHTML = "<i class='fas fa-angle-right'></i>  "+"Degree: " +doc.data().Degree;
    graduation_year.innerHTML = "<i class='fas fa-angle-right'></i>  "+"Graduation Year: " +doc.data().Graduation_Year;
    year.innerHTML = "<i class='fas fa-angle-right'></i>  "+"Year: " +doc.data().Year;
    chatButton.innerHTML = 'Chat';

    li.appendChild(name);
    li.appendChild(school);
    li.appendChild(major);
    li.appendChild(degree);
    li.appendChild(graduation_year);
    li.appendChild(year);
    li.appendChild(chatButton);
    //console.log(li);

    studentList.appendChild(li);

    //open a chat window 
    chatButton.addEventListener('click', (e)=>{
        e.stopPropagation();
        chat_student_id = e.target.parentElement.getAttribute('data-id');
        console.log(chat_student_id);
        chat_student_name =  e.target.parentElement.getAttribute('name');
        console.log(chat_student_name);
        
        window.open ('./Chatting-forCounselor.html','newwindow',
        'height=470,width=380,top=0,left=0,toolbar=no,menubar=no, scrollbars=no, resizable=no,location=no, status=no')
    })
}

// real-time listener
firestore.collection('users').orderBy('Last_Name').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        //console.log(change.type);
        //console.log(change.doc.data());
        if(change.type == 'added'){
            renderStudent(change.doc);
        }
    });
});

  