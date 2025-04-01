import { createContext, useContext, useState, useEffect } from 'react';

const NotesContext = createContext();

export const useNotesContext = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotesContext must be used within a NotesProvider');
  }
  return context;
};

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (note) => {
    setNotes([...notes, note]);
  };

  const deleteNote = (index) => {
    const newNotes = [...notes];
    newNotes.splice(index, 1);
    setNotes(newNotes);
  };

  const updateNote = (index, updatedNote) => {
    const newNotes = [...notes];
    newNotes[index] = updatedNote;
    setNotes(newNotes);
  };

  return (
    <NotesContext.Provider value={{
      notes,
      addNote,
      deleteNote,
      updateNote
    }}>
      {children}
    </NotesContext.Provider>
  );
};
