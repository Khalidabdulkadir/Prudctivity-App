import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useEventContext } from '../context/EventContext';
import '../styles/EventForm.css';

const EventForm = () => {
  const [title, setTitle] = useState('');
  const [dateTime, setDateTime] = useState('');
  const { addEvent } = useEventContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    const event = {
      title,
      dateTime,
      id: Date.now()
    };
    addEvent(event);
    setTitle('');
    setDateTime('');
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <h3>Add Event</h3>
      <div className="form-group">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Event title"
          required
        />
      </div>
      <div className="form-group">
        <input
          type="datetime-local"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          required
        />
      </div>
      <button type="submit">
        <FontAwesomeIcon icon={faPlus} />
        Add Event
      </button>
    </form>
  );
};

export default EventForm;
