import { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const TaskForm = () => {
  const { addTask } = useTaskContext();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'homework',
    due_date: '',
    priority: 'medium'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.title.trim()) {
      await addTask({
        ...formData,
        completed: false
      });
      setFormData({
        title: '',
        description: '',
        category: 'homework',
        due_date: '',
        priority: 'medium'
      });
    }
  };

  return (
    <div className="task-form">
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Task title"
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description (optional)"
              className="form-input"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="homework">Homework</option>
              <option value="projects">Projects</option>
              <option value="exams">Exams</option>
              <option value="personal">Personal</option>
            </select>
          </div>
          <div className="form-group">
            <input
              type="datetime-local"
              name="due_date"
              value={formData.due_date}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>
        </div>
        <button type="submit" className="submit-btn" disabled={!formData.title.trim()}>
          <FontAwesomeIcon icon={faPlus} /> Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
