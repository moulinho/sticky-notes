window.onload = (event) =>{
  console.log(event);
    alert(`To delete a note, double click on it ${String.fromCodePoint(0x1F60A)}` );
 };


const notesContainer = document.getElementById("app");

const addNoteButton = notesContainer.querySelector(".add-note");

addNoteButton.addEventListener("click", () => addNote());

const getNotes = () => {
  return JSON.parse(localStorage.getItem("notes") || "[]");
};

const saveNotes = (notes) => {
  localStorage.setItem("notes", JSON.stringify(notes));
};

const createNoteElement = (id, content) => {
  const element = document.createElement("textarea");

  element.classList.add("note");
  element.value = content;
  element.placeholder = "Empty Note";

  element.style.backgroundColor = "hsl(" + Math.random() * 360 + ", 100%, 75%)";

  element.addEventListener("change", () => {
    updateNote(id, element.value);
  });
  element.addEventListener("dblclick", () => {
    const doDelete = confirm("Deleted are you sur ?");
    doDelete ? deleteNote(id, element) : "";
  });
  return element;
};

getNotes().forEach((note) => {
  const noteElement = createNoteElement(note.id, note.content);
  notesContainer.insertBefore(noteElement, addNoteButton);
});

const addNote = () => {
  const notes = getNotes();
  const noteObject = {
    id: Math.floor(Math.random() * 100000),
    content: "",
  };

  const noteElement = createNoteElement(noteObject.id, noteObject.content);
  notesContainer.insertBefore(noteElement, addNoteButton);

  notes.push(noteObject);
  saveNotes(notes);
};
function updateNote(id, newContent) {
  const notes = getNotes();
  const targetNote = notes.filter((note) => note.id == id)[0];

  targetNote.content = newContent;
  saveNotes(notes);
}

const deleteNote = (id, element) => {
  const notes = getNotes().filter((note) => note.id != id);

  saveNotes(notes);
  notesContainer.removeChild(element);
};
