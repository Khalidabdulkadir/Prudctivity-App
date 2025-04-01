import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../styles/Feynman.css';

const FeynmanTopic = ({ topic, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTopic, setEditedTopic] = useState(topic);

  const handleSave = () => {
    onEdit(editedTopic);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTopic(topic);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="feynman-topic editing">
        <div className="topic-content">
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              value={editedTopic.title}
              onChange={(e) => setEditedTopic({ ...editedTopic, title: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Concept:</label>
            <textarea
              value={editedTopic.concept}
              onChange={(e) => setEditedTopic({ ...editedTopic, concept: e.target.value })}
              rows="3"
            />
          </div>
          <div className="form-group">
            <label>Simple Explanation:</label>
            <textarea
              value={editedTopic.explanation}
              onChange={(e) => setEditedTopic({ ...editedTopic, explanation: e.target.value })}
              rows="3"
            />
          </div>
          <div className="form-group">
            <label>Examples:</label>
            <textarea
              value={editedTopic.examples}
              onChange={(e) => setEditedTopic({ ...editedTopic, examples: e.target.value })}
              rows="3"
            />
          </div>
          <div className="form-group">
            <label>Review & Gaps:</label>
            <textarea
              value={editedTopic.review}
              onChange={(e) => setEditedTopic({ ...editedTopic, review: e.target.value })}
              rows="3"
            />
          </div>
        </div>
        <div className="topic-actions">
          <button className="save-btn" onClick={handleSave}>
            <FontAwesomeIcon icon={faSave} /> Save
          </button>
          <button className="cancel-btn" onClick={handleCancel}>
            <FontAwesomeIcon icon={faTimes} /> Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="feynman-topic">
      <div className="topic-content">
        <h3>{topic.title}</h3>
        <div className="topic-section">
          <h4>Concept:</h4>
          <p>{topic.concept}</p>
        </div>
        <div className="topic-section">
          <h4>Simple Explanation:</h4>
          <p>{topic.explanation}</p>
        </div>
        <div className="topic-section">
          <h4>Examples:</h4>
          <p>{topic.examples}</p>
        </div>
        <div className="topic-section">
          <h4>Review & Gaps:</h4>
          <p>{topic.review}</p>
        </div>
      </div>
      <div className="topic-actions">
        <button className="edit-btn" onClick={() => setIsEditing(true)}>
          <FontAwesomeIcon icon={faEdit} /> Edit
        </button>
        <button className="delete-btn" onClick={onDelete}>
          <FontAwesomeIcon icon={faTrash} /> Delete
        </button>
      </div>
    </div>
  );
};

export default FeynmanTopic;
