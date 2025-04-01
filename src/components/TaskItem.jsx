import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faPencil,
  faTrash,
  faCalendarAlt,
  faFlag
} from '@fortawesome/free-solid-svg-icons';
import { useTaskContext } from '../context/TaskContext';
import { format } from 'date-fns';

const TaskItem = ({ task }) => {
  const { toggleTask, deleteTask, updateTask } = useTaskContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedTask(task);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (editedTask.title.trim()) {
      await updateTask(task.id, editedTask);
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTask(task.id);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#ef4444';
      case 'medium':
        return '#f59e0b';
      case 'low':
        return '#22c55e';
      default:
        return '#6b7280';
    }
  };

  if (isEditing) {
    return (
      <div className="task-item editing">
        <form onSubmit={handleUpdate} className="edit-form">
          <div className="form-row">
            <input
              type="text"
              value={editedTask.title}
              onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
              className="form-input"
              placeholder="Task title"
              required
            />
            <select
              value={editedTask.category}
              onChange={(e) => setEditedTask({ ...editedTask, category: e.target.value })}
              className="form-select"
              required
            >
              <option value="homework">Homework</option>
              <option value="projects">Projects</option>
              <option value="exams">Exams</option>
              <option value="personal">Personal</option>
            </select>
          </div>
          <div className="form-row">
            <input
              type="text"
              value={editedTask.description}
              onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
              className="form-input"
              placeholder="Description (optional)"
            />
          </div>
          <div className="form-row">
            <input
              type="datetime-local"
              value={editedTask.due_date}
              onChange={(e) => setEditedTask({ ...editedTask, due_date: e.target.value })}
              className="form-input"
            />
            <select
              value={editedTask.priority}
              onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}
              className="form-select"
              required
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>
          <div className="form-actions">
            <button type="submit" className="save-btn" disabled={!editedTask.title.trim()}>
              Save
            </button>
            <button type="button" className="cancel-btn" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <button
          className="complete-btn task-btn"
          onClick={() => toggleTask(task.id)}
          title={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {task.completed && <FontAwesomeIcon icon={faCheck} />}
        </button>
        <div className="task-details">
          <span className="task-title">{task.title}</span>
          {task.description && (
            <span className="task-description">{task.description}</span>
          )}
          <div className="task-meta">
            <span className="task-category">
              {task.category}
            </span>
            {task.due_date && (
              <span className="task-due-date">
                <FontAwesomeIcon icon={faCalendarAlt} />
                {format(new Date(task.due_date), 'MMM d, yyyy HH:mm')}
              </span>
            )}
            <span
              className="task-priority"
              style={{ color: getPriorityColor(task.priority) }}
            >
              <FontAwesomeIcon icon={faFlag} />
              {task.priority}
            </span>
          </div>
        </div>
      </div>
      <div className="task-actions">
        <button className="edit-btn task-btn" onClick={handleEdit} title="Edit task">
          <FontAwesomeIcon icon={faPencil} />
        </button>
        <button className="delete-btn task-btn" onClick={handleDelete} title="Delete task">
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
