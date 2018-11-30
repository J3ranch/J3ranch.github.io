/*Xiaojan Chen 905118702*/

//the firebase initialization is in the HTML file

//process URL data
var thisURL =document.URL;
var uID = thisURL.split('?')[1].split('uID=')[1];

var User_id = uID;  //the id for current user
var ref =firestore.collection("users").doc(User_id).collection("Chat History") //the reference of Chat history collection


document.addEventListener("DOMContentLoaded", function(){
    console.log("start");
    LoadFireStore_updateChat(); //load the chat history
})


//for the send button (in Chatting)
function sendByStudent(){
    var myDate = new Date();
    var chat_input = document.getElementById("chat_input");

    if(chat_input.value === null || chat_input.value.trim() === ''){
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
