const addForm = document.querySelector('.add');
const list = document.querySelector('.notes');
const search = document.querySelector('.search input');
let notes = [];
const cookie = '<li class="list-group-item d-flex justify-content-between align-items-center"> <span>Hi there user. <br>It seems like its your first time here. Before we start, by using this app, you agree on colecting cookies</span> <i class="far fa-trash-alt delete"></i> </li>'

// Add stuff
const generateTemplate = notes => {

    const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${notes}</span>
        <i id="${notes}" class="far fa-trash-alt delete"></i>
    </li>
    `;

    list.innerHTML += html;

};

// Check for submit on "Add new notes"
addForm.addEventListener('submit', e => {

    e.preventDefault();
    const data = addForm.add.value.trim();
    
    if(data.length){
        generateTemplate(data);
        addForm.reset();
        notes.push(data);
        localStorage.setItem('notes', JSON.stringify(notes));
        notesLeft()
    }

});

// Delete notes
list.addEventListener('click', e => {
    if(e.target.classList.contains('delete')){
        e.target.parentElement.classList.toggle('deleteItem');
        setTimeout(() => {e.target.parentElement.remove()}, 1000);
        notes = notes.filter(note => note !== e.target.id);
        localStorage.setItem('notes', JSON.stringify(notes));
        setTimeout(() => {notesLeft()}, 1000);
    }
});

// Check if there are any notes left
const notesLeft = () => {
    if(list.childElementCount == 0){
        list.innerHTML = "<h4 class='text-dark text-center'>You have 0 notes</h4>";
    } else {
        list.removeChild(list.childNodes[0]);
    }
}

// Filter notes
const filternotes = (term) => {
    
    Array.from(list.children)
    .filter((notes) => !notes.textContent.toLowerCase().includes(term))
    .forEach((notes) => notes.classList.add('filtered'));

    Array.from(list.children)
    .filter((notes) => notes.textContent.toLowerCase().includes(term))
    .forEach((notes) => notes.classList.remove('filtered'));
};

// Search keyup
search.addEventListener('keyup', () => {
    const term = search.value.trim().toLowerCase();
    filternotes(term);
});

if(localStorage.getItem("cookies") !== "agreed"){
    list.innerHTML += cookie;
    localStorage.setItem('cookies', "agreed");
}

if(localStorage.getItem('notes').length == 2){
    console.log("No notes");
    notesLeft();
} else {
    localData = localStorage.getItem('notes');
    notes = JSON.parse(localData);
    notes.forEach(note => {
        generateTemplate(note);
    })
}