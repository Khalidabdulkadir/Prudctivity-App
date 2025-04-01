import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import '../styles/Feynman.css';

const FeynmanForm = ({ onSubmit }) => {
  const [topic, setTopic] = useState({
    title: '',
    concept: '',
    explanation: '',
    examples: '',
    review: '',
    lastModified: new Date().toISOString()
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...topic, id: Date.now() });
    setTopic({
      title: '',
      concept: '',
      explanation: '',
      examples: '',
      review: '',
      lastModified: new Date().toISOString()
    });
  };

  return (
    <form className="feynman-form" onSubmit={handleSubmit}>
      <h3>Add New Topic</h3>
      <div className="form-group">
        <label>Title:</label>
        <input
          type="text"
          value={topic.title}
          onChange={(e) => setTopic({ ...topic, title: e.target.value })}
          placeholder="Enter topic title"
          required
        />
      </div>
      <div className="form-group">
        <label>Concept:</label>
        <textarea
          value={topic.concept}
          onChange={(e) => setTopic({ ...topic, concept: e.target.value })}
          placeholder="What are you trying to understand?"
          rows="3"
          required
        />
      </div>
      <div className="form-group">
        <label>Simple Explanation:</label>
        <textarea
          value={topic.explanation}
          onChange={(e) => setTopic({ ...topic, explanation: e.target.value })}
          placeholder="Explain it as if teaching a child"
          rows="3"
          required
        />
      </div>
      <div className="form-group">
        <label>Examples:</label>
        <textarea
          value={topic.examples}
          onChange={(e) => setTopic({ ...topic, examples: e.target.value })}
          placeholder="Provide concrete examples"
          rows="3"
          required
        />
      </div>
      <div className="form-group">
        <label>Review & Gaps:</label>
        <textarea
          value={topic.review}
          onChange={(e) => setTopic({ ...topic, review: e.target.value })}
          placeholder="Identify areas for improvement"
          rows="3"
          required
        />
      </div>
      <button type="submit" className="submit-btn">
        <FontAwesomeIcon icon={faPlus} /> Add Topic
      </button>
    </form>
  );
};

export default FeynmanForm;
