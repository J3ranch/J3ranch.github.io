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

try {
    firebase.initializeApp(config);
} catch (error) {

}

  var firestore = firebase.firestore();
  const settings = {/* your settings... */ timestampsInSnapshots: true};
  firestore.settings(settings);


var User_id = "dwDMx5wNYPxmZeqNVslY";  //the id for current user
var ref =firestore.collection("users").doc(User_id).collection("Chat History") //the reference of Chat history collection


document.addEventListener("DOMContentLoaded", function(){
    console.log("start");
    LoadFireStore_updateChat(); //load the chat history
})

//For open chat window
function openChat() { 
    window.open ('./Xiaojian%20Chen/Chatting.html','newwindow',
    'height=470,width=380,top=0,left=0,toolbar=no,menubar=no, scrollbars=no, resizable=no,location=no, status=no')  
}

//for the send button (in Chatting)
function sendByStudent(){
    var myDate = new Date();
    var chat_input = document.getElementById("chat_input");

    if(chat_input.value==""){
        //if user text is empty
        alert("The text could not be empty!")
    }else{
        //save the content to firestore
        writeFirestore_chatHistory("Student",chat_input.value,myDate.toLocaleString())
    }
    //clean the textarea
    chat_input.value = null;
    chat_input.select();
}

//for the clear History button
function clearHistory (){
    var c=confirm("Please confirm that you want to clear the chat history!")
    if (c == true){
        ClearFireStore_clearHistory();
    }
}

//insert the content into chat window
function insContent(senderClass, chatInput){
    var chatbody = document.getElementById("chatbody");
    var content = document.getElementById("chat_content");
    var str = "<div class = "+senderClass+"><span>"+chatInput+"</span></div>";
    content.innerHTML = content.innerHTML + str;
    chatbody.scrollTop = chatbody.scrollHeight;     //scroll down to the latest content automatically
}

//save the content to firestore
function writeFirestore_chatHistory(sender,content,time){
    ref.doc().set({
        Sender: sender,
        Content: content,
        Time: time
    })
    //console.log("New content: \""+content+"\" is sent at "+ time);
    //console.log("New content:\""+content+"\"; Sent by:"+sender+"; Time:"+time);
}
 
//real-time load firestore
function LoadFireStore_updateChat(){
    ref.orderBy("Time").onSnapshot(snapshot =>{
        let changes = snapshot.docChanges();
        changes.forEach(change =>{
            var Chatdata  = change.doc.data()

            console.log(change.type)
            console.log(Chatdata)

            if(change.type =="added"){
                //insert the content to chatbox if it is added
                insContent(Chatdata.Sender, Chatdata.Content)
            
            }else if (change.type =="removed"){
                //clear the chatbox
                document.getElementById("chat_content").innerHTML =null;
            }
        })
    })
}

//clear the chat history (Firestore )
function ClearFireStore_clearHistory(){
    ref.get().then(function(Snapshot){
        Snapshot.forEach(function(doc){
            ref.doc(doc.id).delete();
        });
    })
    console.log("Firesotre Chat Histroy is clear!");
}
