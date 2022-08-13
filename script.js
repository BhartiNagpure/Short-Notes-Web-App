


// write to show our content after reloading

shownotes(); 
let addBtn = document.getElementById("addBtn");


// add button logic
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    if (addTxt.value.trim() != 0) {
        let notes = localStorage.getItem("notes");
        if (notes == null) {
            notesObj = [];
        }
        else {
            notesObj = JSON.parse(notes);
        }

        let myObj = {
            title : heading.value,
            text : addTxt.value

        }
        notesObj.push(myObj);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        addTxt.value = " ";
        heading.value=" ";
    }
    shownotes();
})


//function to show element from localStrorage
function shownotes() {
    let notes = localStorage.getItem("notes");
    let addTxt = document.getElementById("addTxt");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let txt= " ";
    notesObj.forEach(function(element, index){
        txt += ` 
        <div class="notecard my-2 mx-2 card" style="width: 18rem;">
            <div class="card-body">
               <h5 class="card-title"> ${element.title} </h5>
               <p class="card-text">${element.text}</p>
              <img  onclick="editNote(${index})" style ="width:1.5rem; height:1.5rem;" src="img/edit.png "/>
               <img id="${index}" onclick="deleteNote(this.id)" style="width:1.5rem; height:1.5rem " src="img/delete png.jpg"/>
            </div>
        </div>`;

    });
    let cardTitle = document.getElementsByClassName("card-title");
     cardTitle.innerHTML =txt;
    let noteElement = document.getElementById("notes");
    
    if (notesObj.length != 0) {
        noteElement.innerHTML = txt;
    }
    else {
        noteElement.innerHTML = `Nothing to show you , "Please add a note using above Add Note button"`;
    }
}
 
//function to delete a note
function deleteNote(index) {
    let saveBtn = document.getElementById("saveBtn");
    let addBtn = document.getElementById("addBtn");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    
        }
    saveBtn.style.display = "none";
   addBtn.style.display ="inline";
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = " ";
    shownotes();
}

//Edit notes logic
function editNote(index) {
    let saveindex = document.getElementById("saveindex");
    let saveBtn = document.getElementById("saveBtn");
    let notes = localStorage.getItem("notes");
    saveindex.value = index;
    let notesObj = JSON.parse(notes);
    addTxt.value = notesObj[index];
    addBtn.style.display = " none";
    saveBtn.style.display = "inline";
}

//save note logic
let saveBtn = document.getElementById("saveBtn");
saveBtn.addEventListener("click", function () {
    let notes = localStorage.getItem("notes");
    let notesObj = JSON.parse(notes);
    let saveindex = document.getElementById("saveindex").value;
    notesObj[saveindex] = addTxt.value;
    saveBtn.style.display = "none";
    addBtn.style.display = " inline";
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    shownotes();

})

//Delete all logic
function deleteallNote(index) {
    let saveBtn = document.getElementById("saveBtn");
    let addBtn = document.getElementById("addBtn");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
      notesObj = [];
        }
    saveBtn.style.display = "none";
   addBtn.style.display ="inline";
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = " ";
    shownotes();
}

//search input logic 
let search = document.getElementById("search");

search.addEventListener("input", function (e) {

    let inputValue = e.target.value;
    let notecard = document.getElementsByClassName("notecard");
    Array.from(notecard).forEach(function (element) {
        let cardtext =element.getElementsByTagName("h5")[0].innerText;
        if (cardtext.toLowerCase().includes(inputValue.toLowerCase())) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
            })
});

