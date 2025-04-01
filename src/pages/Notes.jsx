import { useState } from 'react';
import { NotesProvider, useNotesContext } from '../context/NotesContext';
import NoteEditor from '../components/NoteEditor';
import NoteList from '../components/NoteList';
import '../styles/Notes.css';

const NotesContent = () => {
  const { notes, addNote, deleteNote, updateNote } = useNotesContext();
  const [editingNote, setEditingNote] = useState(null);

  const handleSave = (note) => {
    if (editingNote !== null) {
      updateNote(editingNote, note);
      setEditingNote(null);
    } else {
      addNote(note);
    }
  };

  const handleEdit = (index) => {
    setEditingNote(index);
  };

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      deleteNote(index);
      if (editingNote === index) {
        setEditingNote(null);
      }
    }
  };

  return (
    <div className="notes-layout">
      <div className="notes-main">
        <h2>Notes</h2>
        <NoteList
          notes={notes}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
      <div className="notes-sidebar">
        <h3>{editingNote !== null ? 'Edit Note' : 'Add Note'}</h3>
        <NoteEditor
          note={editingNote !== null ? notes[editingNote] : null}
          onSave={handleSave}
        />
      </div>
    </div>
  );
};

const NotesPage = () => {
  return (
    <NotesProvider>
      <div className="notes-container">
        <NotesContent />
      </div>
    </NotesProvider>
  );
};

export default NotesPage;
