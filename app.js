const addForm = document.querySelector('.add');
const list = document.querySelector('.notes');
const search = document.querySelector('.search input');
const cookie = '<li class="list-group-item d-flex justify-content-between align-items-center"> <span>Hi there user. <br>It seems like its your first time here. Before we start, by using this app, you agree on colecting cookies</span> <i class="far fa-trash-alt delete"></i> </li>'
let notes = {};

// Add note
const generateTemplate = (notes, id) => {

    const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${notes}</span>
        <i id="${id}" class="far fa-trash-alt delete"></i>
    </li>
    `;

    list.innerHTML += html;

};

// Check for keys and values
const key = (data) => {
    let keys = Object.keys(notes);
    let preId;
    let id;
    if(keys == NaN || keys.length == 0) {
        preId = 1;
    } else {
        id = keys[keys.length -1];
        preId = parseInt(id) + 1;
    }
    notes[preId] = data;
    generateTemplate(data, preId);
    localStorage.setItem('notes', JSON.stringify(notes));
    notesLeft();
}

// Check for submit on "Add new notes"
addForm.addEventListener('submit', e => {

    e.preventDefault();
    let data = addForm.add.value.trim();
    data = data.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    
    if(data.length){
        key(data)
        addForm.reset();
    }
});

// Delete notes
list.addEventListener('click', e => {
    let keys = Object.keys(notes);

    if(e.target.classList.contains('delete')){
        e.target.parentElement.classList.toggle('deleteItem');
        setTimeout(() => {e.target.parentElement.remove()}, 1000);
        delete notes[e.target.id]
        localStorage.setItem('notes', JSON.stringify(notes));
        setTimeout(() => {notesLeft()}, 1000);
    }
});

// Check if there are any notes left
const notesLeft = () => {
    if(list.childElementCount == 0){
        list.innerHTML = "<h4 class='NoNotes text-dark text-center'>You have 0 notes</h4>";
    } else if(list.childElementCount > 1 && list.contains(document.querySelector('.NoNotes'))) {
        list.removeChild(list.childNodes[0]);
    }
}

// Filter notes
const filternotes = (data) => {
    
    Array.from(list.children)
    .filter((notes) => !notes.textContent.toLowerCase().includes(data))
    .forEach((notes) => notes.classList.add('filtered'));

    Array.from(list.children)
    .filter((notes) => notes.textContent.toLowerCase().includes(data))
    .forEach((notes) => notes.classList.remove('filtered'));
};

// Search keyup
search.addEventListener('keyup', () => {
    const data = search.value.trim().toLowerCase();
    filternotes(data);
});

// Initial setup
const init = () => {
    if(localStorage.getItem("cookies") !== "agreed"){
        list.innerHTML += cookie;
        localStorage.setItem('cookies', "agreed");
    }
    
    if(localStorage.getItem('notes') === null || localStorage.getItem('notes').length == 2){
        console.log("No notes");
        notesLeft();
    } else {
        localData = localStorage.getItem('notes');
        notes = JSON.parse(localData);
        let keys = Object.keys(notes);
        let id = keys[keys.length -1];

        keys.forEach(key => {
            generateTemplate(notes[key], key);
        })
        
    };
};

window.onload = init()