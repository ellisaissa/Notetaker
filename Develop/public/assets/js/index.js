let noteName;
let noteData;
let saveButton;
let newButton;
let Notes;

if (window.location.pathname === '/notes.html') {
  noteName = document.querySelector('.note-title');
  noteData = document.querySelector('.note-textarea');
  saveButton = document.querySelector('.save-note');
  newButton = document.querySelector('.new-note');
  Notes = document.querySelectorAll('.list-container .list-group');
}

// show an element
const show = (elem) => {
  elem.style.display = 'inline';
};

// Hide an element
const hide = (elem) => {
  elem.style.display = 'none';
};

// newNote is used to keep track of the note in the noteDataarea
let ActiveNote = {};

const getNote = () =>
  fetch('/api/notes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

const saveNote = (note) => {
console.log("saved note")
  fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(note)
})};

const deleteNote = (id) =>
  fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

const renderActiveNote = () => {
  hide(saveButton);

  if (activeNote.id) {
    noteName.setAttribute('readonly', true);
    noteData.setAttribute('readonly', true);
    noteName.value = activeNote.title, 
    noteData.value = actvieNote.noteData;
  }
  else {
    noteName.value = "";
    noteText.value = "";
  }
};

const handleNoteSave = () => {
  const newNote = {
    title: noteName.value,
    note: noteData.value,
  };
  console.log("handle save")
  saveNote(newNote).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Delete the clicked note
const handleNoteDelete = (e) => {
  // prevents the click listener for the list from being called when the button inside of it is clicked
  e.stopPropagation();

  const note = e.target;
  const noteId = JSON.parse(note.parentElement.getAttribute('noteData')).id;

  if (activeNote.id === noteId) {
    activeNote = {};
  }

  deleteNote(noteId).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Sets the newNote and displays it
const handleNoteView = (e) => {
  e.preventDefault();
  newNote = JSON.parse(e.target.parentElement.getAttribute('noteData'));
  makeNote();
};

// Sets the newNote to and empty object and allows the user to enter a new note
const handleNewNoteView = (e) => {
  ActiveNote = {};
  renderActiveNote();
};

const handleRenderSaveButton = () => {
  if (!noteName.value.trim() | !noteData.value.trim()) {
    hide(saveButton);
  } else {
    show(saveButton);
  }
};

// Render the list of note titles
const renderNotes = async (notes) => {
  let jsonNotes = await notes.json();
  if (window.location.pathname === './notes.html') {
    Notes.forEach((el) => (el.innerHTML = ''));
  }

  let NotesItems = [];

  // Returns HTML element with or without a delete button
  const createLi = (noteData, deleteButton = true) => {
    const liEl = document.createElement('li');
    liEl.classList.add('list-group-item');

    const spanEl = document.createElement('span');
    spanEl.innernoteData = noteData;
    spanEl.addEventListener('click', handleNoteView);

    liEl.append(spanEl);

    if (deleteButton) {
      const DeleteButton = document.createElement('i');
      DeleteButton.classList.add(
        'fas',
        'fa-trash-alt',
        'float-right',
        'noteData-danger',
        'delete-note'
      );
      DeleteButton.addEventListener('click', handleNoteDelete);

      liEl.append(DeleteButton);
    }

    return liEl;
  };

  if (jsonNotes.length === 0) {
    NotesItems.push(createLi('No saved Notes', false));
  }

  jsonNotes.forEach((note) => {
    const li = createLi(note.title);
    li.dataset.note = JSON.stringify(note);

    NotesItems.push(li);
  });

  if (window.location.pathname === '/notes') {
    NotesItems.forEach((note) => Notes[0].append(note));
  }
};

// Gets notes from the db and renders them to the sidebar
const getAndRenderNotes = () => getNote().then(renderNotes);

if (window.location.pathname === '/notes.html') {
  saveButton.addEventListener('click', handleNoteSave);
  newButton.addEventListener('click', handleNewNoteView);
  // noteName.addEventListener('keyup', handleRenderSaveButton);
  // noteData.addEventListener('keyup', handleRenderSaveButton);
}

getAndRenderNotes();
