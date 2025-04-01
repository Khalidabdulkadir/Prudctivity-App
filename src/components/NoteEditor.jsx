import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faPlus } from '@fortawesome/free-solid-svg-icons';
import '../styles/NoteEditor.css';

const NoteEditor = ({ note = null, onSave }) => {
  const [title, setTitle] = useState(note ? note.title : '');
  const [content, setContent] = useState(note ? note.content : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newNote = {
      title,
      content,
      lastModified: new Date().toISOString(),
      id: note ? note.id : Date.now()
    };
    onSave(newNote);
    if (!note) {
      setTitle('');
      setContent('');
    }
  };

  return (
    <form className="note-editor" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Note title"
        required
        className="note-title"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start typing your note..."
        required
        className="note-content"
      />
      <button type="submit" className="save-btn">
        <FontAwesomeIcon icon={note ? faSave : faPlus} />
        {note ? 'Save Changes' : 'Add Note'}
      </button>
    </form>
  );
};

export default NoteEditor;
