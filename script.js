console.log("Welcome to Magic Notes");
showNotes();

// if User Wants To Add The Notes

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click' , function(){
    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');
    let notes = localStorage.getItem('notes');
    if(notes==null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes)
    }
    let myObj ={
        title: addTitle.value,
        text:  addTxt.value
    }
    notesObj.push(myObj);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    

    showNotes();


});

// Function to Show Elements
function showNotes(){
    let notes = localStorage.getItem('notes');
    if(notes==null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
   
    let html = "";
    notesObj.forEach(function(element,index) {
        
             html += `
            <div class="noteCard my-2 mx-2 border-dark card" style="width: 18rem">
            <div class="card-body">
              <h5 class="card-title"> ${element.title}</h5>
              <p class="card-text">${element.text}</p>
              <button id="${index}" onclick = "deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
            </div>
          </div>
            `;
        
    });

    let notesElm = document.getElementById('notes');
    if(notesElm.length != 0){
        notesElm.innerHTML = html;
    }
    else{
        
        notesElm.innerHTML = `Nothing to show!... Please ADD SOME NOTES from above`;

    }



}

// Delete Function to delete note
function deleteNote(index){
    let notes = localStorage.getItem('notes');
    if(notes==null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes)
    }
    notesObj.splice(index,1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();

}



// Search Text Filter

let search = document.getElementById('searchTxt');
search.addEventListener('input' , function(){

    let inputVal = search.value.toLowerCase();

    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){

        let cardTxt= element.getElementsByTagName('p')[0].innerText;

        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
            // alert("No Items Found");

        }
    })
})

// 1.Add Title
// 2.Mark a note as important
// 3.Saparate Notes by users