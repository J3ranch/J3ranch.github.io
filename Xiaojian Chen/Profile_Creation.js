/*Xiaojan Chen 905118702*/
$( document ).ready(function(){

    $( "#create_Year").autocomplete({
        source: ["Freshman","Sophomore","Junior","Senior"],
        autoFocus: true,
        select: function( event, ui ) {
          //event.preventDefault();
          document.getElementById("create_Year").value = ui.item.value    //sent the autocomplete value to "pr2__answer"
        }
    });
    
});