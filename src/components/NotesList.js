import { useEffect, useState } from "react";
import './notelist.css';
function NotesList() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [archivedNotes, setArchivedNotes] = useState(() => {
    const savedArchived = localStorage.getItem("archivedNotes");
    return savedArchived ? JSON.parse(savedArchived) : [];
  });
  
const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    const handleNotesUpdated = () => {
      const savedNotes = localStorage.getItem("notes");
      setNotes(savedNotes ? JSON.parse(savedNotes) : []);
    };
    window.addEventListener("notesUpdated", handleNotesUpdated);
    return () => window.removeEventListener("notesUpdated", handleNotesUpdated);
  }, []);

  const handleEdit = (index) => {
    const container = document.getElementsByClassName("notes-container")[index];
    const h3 = container.querySelector("h3");
    const input = container.querySelector("input");
    const textareaDiv = container.querySelector(".textarea");
    const contentDiv = document.getElementsByClassName('note-content')[index];

    contentDiv.classList.add('hide');
    h3.classList.add("hidden");
    input.classList.remove("hidden");
    textareaDiv.classList.remove("hidden");
  };
  const handleSave = (index) => {
    const container = document.getElementsByClassName("notes-container")[index];
    const h3 = container.querySelector("h3");
    const input = container.querySelector("input");
    const textarea = container.querySelector("textarea");
    const textareaDiv = container.querySelector(".textarea");
    const contentDiv = document.getElementsByClassName('note-content')[index];

    contentDiv.classList.remove('hide');
    const updatedNotes = [...notes];
    updatedNotes[index].title = input.value;
    updatedNotes[index].content = textarea.value;


    input.classList.add("hidden");
    textareaDiv.classList.add("hidden");
    h3.classList.remove("hidden");
  };
  const deleteItem = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };
  const archivedeleteItem = (index) => {
    const updatedHidden = [...archivedNotes];
    updatedHidden.splice(index, 1);
    setArchivedNotes(updatedHidden);
    if (updatedHidden.length === 0) {
      document.getElementById('archive-notes-list-button').style.display = "none";
      document.getElementById('notesOverlay').style.display = "none";
    }
    localStorage.setItem("archivedNotes", JSON.stringify(updatedHidden));
  };
  function openClose(index, btn) {
    const content = document.getElementById(index);
    content.classList.toggle('hidden');
    btn.innerHTML = content.classList.contains('hidden') ? "📖Open" : "📕Close";
  }
  const togglePin = (id) => {
    const updatedNotes = notes
      .sort((a, b) => b.id - a.id)
      .map(note => note.id === id ? { ...note, pinned: !note.pinned } : note);
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };
  const filteredNotes = [
    ...notes.filter(note => note.pinned),
    ...notes.filter(note => !note.pinned)
  ].filter(note => {
    const term = searchTerm.toLowerCase();
    return (
      note.title.toLowerCase().includes(term) ||
      note.content.toLowerCase().includes(term) ||
      (note.tags && note.tags.toLowerCase().includes(term))
    );
  });
  function resetReminder(index) {
    const noteToreset = notes[index];
    if (!noteToreset) return;

    const overlay = document.querySelector('.reset-reminder-overlay');
    overlay.style.display = "flex";

    const noteresettitle = document.getElementById('reminderNoteTitle');
    noteresettitle.textContent = noteToreset.title;

    const resetremindersave = document.getElementById('saveReminderBtn');
    resetremindersave.onclick = () => {
      const reminderInput = document.getElementById('newReminderTime');
      const newTime = reminderInput.value;
      if (!newTime) return;
      const updatedNotes = [...notes];
      updatedNotes[index] = {
        ...updatedNotes[index],
        reminder: newTime
      };
      setNotes(updatedNotes);
      overlay.style.display = "none";
    };
  }
  const archiveNote = (index) => {
    const updatedNotes = [...notes];
    const [noteToHide] = updatedNotes.splice(index, 1);
    const updatedArchivedNotes = [...archivedNotes, noteToHide];
    setArchivedNotes(updatedArchivedNotes);
    if (updatedArchivedNotes.length > 0) { document.getElementById('archive-notes-list-button').style.display = "flex"; }
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    localStorage.setItem("archivedNotes", JSON.stringify(updatedArchivedNotes));
  };
  const unarchiveNote = (index) => {
    const updatedHidden = [...archivedNotes];
    const [noteToRestore] = updatedHidden.splice(index, 1);
    setArchivedNotes(updatedHidden);
    if (updatedHidden.length === 0) {
      document.getElementById('archive-notes-list-button').style.display = "none";
      document.getElementById('notesOverlay').style.display = "none";
    }
    const updatedNotes = [...notes, noteToRestore];
    setNotes(updatedNotes);
    localStorage.setItem("archivedNotes", JSON.stringify(updatedHidden));
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };
  function ArchivedNotesList() {
    const archiveNotesoverlay = document.getElementById('notesOverlay');
    archiveNotesoverlay.style.display = 'flex';
  }
  function closeoverlay(id) {
    const overlay = document.getElementById(id);
    if (overlay) overlay.style.display = "none";
  }

  const reminder = () => {
  const now = new Date().toLocaleString("en-US");
  const updatedNotes = notes.map(note => {
    if (new Date(note.reminder).toLocaleString("en-US") === now) {
      const toshown = document.querySelectorAll('.reminder-shown');
      toshown.forEach(element=>{
        if (element.id === String(note.id)){
         element.textContent = '✅Reminder shown';
         element.style.backgroundColor = 'rgb(126, 219, 126)';
        }
      });
    }
    return note;
  });
  if (JSON.stringify(updatedNotes) !== JSON.stringify(notes)) {
    setNotes(updatedNotes);
  }
};
useEffect(() => {
  const interval = setInterval(reminder, 1000);
  return () => clearInterval(interval);
}, ); 

  return (
    <>
      <div id="archive-notes-list-button"><button onClick={() => { ArchivedNotesList(); }}>Archived Notes</button></div>
      <div className="search-template">
        <input
          type="text"
          id='search-input'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder=""
        />
        <label htmlFor="search-input">🔍Search notes</label>
      </div>
      <div className="notes-list">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note, index) => (
            <div
              key={note.id}
              className="notes-container"
              style={{ backgroundColor: note.color }}
              data-id={note.id}
            >
              <div className="reminder-shown" id={`${note.id}`}>⏰{new Date(note.reminder).toLocaleString("en-US")}</div>
              <h3>{note.title}</h3>
              <input
                type="text"
                defaultValue={note.title}
                className="hidden notes-edit-input"
              />

              <div className="notes-tag">
                <span>{note.tags}</span>
              </div>
              <div className="reminder-datetime">
                <p> 📅 {note.reminder
                  ? new Date(note.reminder).toLocaleString("en-US")
                  : "No reminder"}</p>
              </div>

              <div className="buttons">
                <button onClick={(e) => openClose(index, e.target)}>📖Open</button>
                <button onClick={() => handleEdit(index)}>✏️Edit</button>
                <button onClick={() => togglePin(note.id)}>
                  {note.pinned ? '📌Unpin' : '📌Pin'}
                </button>
                <button onClick={() => archiveNote(index)}>📦Archive</button>
                <button onClick={() => deleteItem(index)}>🗑️Delete</button>
                <button onClick={() => resetReminder(index)}>🔁Reset Reminder</button>
              </div>

              <div className="note-content hidden" id={index}>
                <p>{note.content}</p>
              </div>

              <div className="textarea hidden">
                <textarea defaultValue={note.content} />
                <button onClick={() => handleSave(index)}>💾 Save</button>
              </div>
            </div>
          ))
        ) : (
          <p>No notes found.</p>
        )}
      </div>
      <div className="reset-reminder-overlay" id="resetreminderOverlay">
        <div className="reset-reminder-overlay-container">
          <div className="reset-reminder-heading">
            <h3>reset reminder</h3>
            <button onClick={() => { closeoverlay("resetreminderOverlay") }}>x</button>
          </div>
          <hr />
          <div className="reset-reminder-note">
            <h3 id="reminderNoteTitle"> 
              
            </h3>
          </div>
          <div className="reset-reminder-input">
            <input type="datetime-local" id="newReminderTime" />
            <button id="saveReminderBtn" >💾 Save Reminder</button>
          </div>
        </div>
      </div>
      <div className="archive-notes-overlay" id="notesOverlay">
        <div className="archive-notes-overlay-container">
          <div className="reset-reminder-heading">
            <h3>Archived Notes</h3>
            <button onClick={() => { closeoverlay("notesOverlay") }}>x</button>
          </div>
          <div className="notes-list">
            {archivedNotes.length > 0}
            {archivedNotes.map((note, index) => (
              <div
                key={note.id}
                className="notes-container"
                style={{ backgroundColor: note.color }}
                data-id={note.id}
              >
                
                <h3>{note.title}</h3>
                <div className="notes-tag">
                  <span>{note.tags}</span>
                </div>
                <div className="reminder-datetime">
                  <p> 📅 {note.reminder
                    ? new Date(note.reminder).toLocaleString("en-US")
                    : "No reminder"}</p>
                </div>
                <div className="buttons">
                  <button onClick={(e) => openClose(index, e.target)}>📖Open</button>
                  <button onClick={() => unarchiveNote(index)}>📦Unarchive</button>
                  <button onClick={() => archivedeleteItem(index)}>🗑️Delete</button>
                </div>
                <div className="note-content hidden" id={index}>
                  <p>{note.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default NotesList;
