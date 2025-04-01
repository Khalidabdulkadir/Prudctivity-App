import { useState } from 'react';
import { FeynmanProvider, useFeynmanContext } from '../context/FeynmanContext';
import FeynmanForm from '../components/FeynmanForm';
import FeynmanTopic from '../components/FeynmanTopic';
import '../styles/Feynman.css';

const FeynmanContent = () => {
  const { topics, addTopic, deleteTopic, updateTopic } = useFeynmanContext();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTopics = topics.filter(topic =>
    topic.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this topic?')) {
      deleteTopic(index);
    }
  };

  return (
    <div className="feynman-layout">
      <div className="feynman-main">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="topics-list">
          {filteredTopics.length === 0 ? (
            <p className="no-topics">No topics yet. Start by adding a new topic!</p>
          ) : (
            filteredTopics.map((topic, index) => (
              <FeynmanTopic
                key={topic.id}
                topic={topic}
                onEdit={(updatedTopic) => updateTopic(index, updatedTopic)}
                onDelete={() => handleDelete(index)}
              />
            ))
          )}
        </div>
      </div>
      <div className="feynman-sidebar">
        <FeynmanForm onSubmit={addTopic} />
        <div className="info-card">
          <h3>The Feynman Technique</h3>
          <p>
            Named after physicist Richard Feynman, this learning technique helps you
            understand concepts better by explaining them in simple terms. Follow these steps:
          </p>
          <ol>
            <li>Choose a concept to learn</li>
            <li>Explain it to a child (use simple language)</li>
            <li>Identify gaps in your explanation</li>
            <li>Review and simplify further</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

const FeynmanPage = () => {
  return (
    <FeynmanProvider>
      <div className="feynman-container">
        <h2>Feynman Technique</h2>
        <FeynmanContent />
      </div>
    </FeynmanProvider>
  );
};

export default FeynmanPage;
