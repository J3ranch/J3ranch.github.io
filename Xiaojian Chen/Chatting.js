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

var User_id = "wDnseS1njZWeo0i8kL3a";  //the id for current user


$(document).ready(function(){
    LoadFireStore_updateChat( User_id);
})


function openChat() { 
    window.open ('./Xiaojian%20Chen/Chatting.html','newwindow',
    'height=470,width=380,top=0,left=0,toolbar=no,menubar=no, scrollbars=no, resizable=no,location=no, status=no')  
}

//for the send button (in Chatting)
function sendByStudent(){
    var myDate = new Date();
    var chat_input = document.getElementById("chat_input");

    if(chat_input.value==""){
        // the alert for empty send
        alert("The text could not be empty!")
    }else{
        insContent('Student_talk',chat_input.value);
        writeFirestore_chatHistory( User_id,"Student",chat_input.value,myDate.toLocaleString())
    }
    chat_input.value = null;
    chat_input.select();
}

//for the clear History button(in Chatting)
function clearHistory(){
    ClearFireStore_clearHistory(User_id)
}


function insContent(senderClass, chatInput){
    var chatbody = document.getElementById("chatbody");
    var content = document.getElementById("chat_content");
    var str = "<div class = "+senderClass+"><span>"+chatInput+"</span></div>";
    content.innerHTML = content.innerHTML + str;
    chatbody.scrollTop = chatbody.scrollHeight;
}


function writeFirestore_chatHistory(id,sender,content,time){
    var ref =firestore.collection("users").doc(id).collection("Chat History").doc()
    ref.set({
        Sender: sender,
        Content: content,
        Time: time
    })
    console.log("New content: \""+content+"\" is sent at "+ time);
    console.log("New content:\""+content+"\"; Sent by:"+sender+"; Time:"+time);
}
 

function LoadFireStore_updateChat(id){
    var ref =firestore.collection("users").doc(id).collection("Chat History");
    ref.onSnapshot(function(doc){
        if (doc && doc.exists){
            console.log("load completed!");

        }else{
            console.log("No chat history!");
        }

    })

}

function ClearFireStore_clearHistory(id){
    var ref = firestore.collection("users").doc(id).collection("Chat History");
    ref.get().then(function(Snapshot){
        Snapshot.forEach(function(doc){
            var cid = doc.id;
            ref.doc(cid).delete();
        });
    })
    console.log("Chat Histroy is clear!");
   
}
