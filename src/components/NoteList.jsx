import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faClock } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import '../styles/NoteList.css';

const NoteList = ({ notes, onEdit, onDelete }) => {
  return (
    <div className="note-list">
      {notes.length === 0 ? (
        <p className="no-notes">No notes yet. Create your first note!</p>
      ) : (
        notes.map((note, index) => (
          <div key={note.id} className="note-item">
            <div className="note-header">
              <h3>{note.title}</h3>
              <div className="note-actions">
                <button onClick={() => onEdit(index)} className="edit-btn">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button onClick={() => onDelete(index)} className="delete-btn">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
            <p className="note-preview">{note.content}</p>
            <div className="note-meta">
              <span className="note-date">
                <FontAwesomeIcon icon={faClock} />
                {format(new Date(note.lastModified), 'MMM d, yyyy h:mm a')}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default NoteList;
