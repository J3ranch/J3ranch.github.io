/*Xiaojan Chen 905118702*/

//the firebase initialization is in the HTML file

var studentList = document.getElementById("student_list");

//create element & render students
function renderStudent(doc){
    let li = document.createElement("li");
    let name = document.createElement('span');
    let school = document.createElement('span');
    let major = document.createElement('span');
    let degree = document.createElement('span');
    let graduation_year = document.createElement('span');
    let class_level = document.createElement('span');
    let gpa = document.createElement('span');
    let ethnicity = document.createElement('span');
    let us_citizenship = document.createElement('span');

    let chatButton = document.createElement('button');
    


    li.setAttribute('data-id', doc.id);
    li.setAttribute('FName', doc.data().First_Name);
    li.setAttribute('LName',doc.data().Last_Name)
    name.innerHTML = "<i class='fas fa-user'></i>  " +doc.data().First_Name+" "+doc.data().Last_Name;
    school.innerHTML = "<i class='fas fa-angle-right'></i>  "+"School: " +doc.data().School;
    major.innerHTML = "<i class='fas fa-angle-right'></i>  "+"Major: " +doc.data().Major;
    degree.innerHTML = "<i class='fas fa-angle-right'></i>  "+"Degree: " +doc.data().Degree;
    graduation_year.innerHTML = "<i class='fas fa-angle-right'></i>  "+"Graduation Year: " +doc.data().Graduation_Year;
    class_level.innerHTML = "<i class='fas fa-angle-right'></i>  "+"Class Level: " +doc.data().Class_Level;
    gpa.innerHTML = "<i class='fas fa-angle-right'></i>  "+"GPA: " +doc.data().GPA;
    ethnicity.innerHTML = "<i class='fas fa-angle-right'></i>  "+"Ethnicity: " +doc.data().Ethnicity;
    us_citizenship.innerHTML = "<i class='fas fa-angle-right'></i>  "+"US Citizenship: " +doc.data().US_Citizenship;


    chatButton.innerHTML = 'Chat';

    li.appendChild(name);
    li.appendChild(school);
    li.appendChild(major);
    li.appendChild(degree);
    li.appendChild(graduation_year);
    li.appendChild(class_level);
    li.appendChild(gpa);
    li.appendChild(ethnicity);
    li.appendChild(us_citizenship);
    li.appendChild(chatButton);
    //console.log(li);

    studentList.appendChild(li);

    //open a chat window 
    chatButton.addEventListener('click', (e)=>{
        e.stopPropagation();
        var chat_student_id = e.target.parentElement.getAttribute('data-id');   //get the student id
        var chat_student_FName =  e.target.parentElement.getAttribute('FName');   //get the student First name
        var chat_student_LName =  e.target.parentElement.getAttribute('LName');   //get the student First name

        //open chat window, passing student id and name via url
        window.open ('./Chatting-forCounselor.html'+'?uID='+chat_student_id+"?uFNAME="+chat_student_FName+"?uLNAME="+chat_student_LName,'newwindow',
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

  