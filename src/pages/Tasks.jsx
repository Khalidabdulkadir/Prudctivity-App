import { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/Tasks.css';
import { 
  faSpinner, 
  faSearch,
  faBook,
  faProjectDiagram,
  faGraduationCap,
  faUser,
  faList,
  faChevronLeft,
  faChevronRight,
  faPlus
} from '@fortawesome/free-solid-svg-icons';

const Tasks = () => {
  const {
    tasks,
    loading,
    error,
    currentPage,
    totalPages,
    filters,
    setCurrentPage,
    setFilters,
  } = useTaskContext();

  const [selectedCategory, setSelectedCategory] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setFilters({ ...filters, category });
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setFilters({ ...filters, search: e.target.value });
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const categoryIcons = {
    '': faList,
    'homework': faBook,
    'projects': faProjectDiagram,
    'exams': faGraduationCap,
    'personal': faUser
  };

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="tasks-container">
      <div className="tasks-header">
        <h1>
          <FontAwesomeIcon icon={faList} className="header-icon" />
          My Tasks
        </h1>
        <button 
          className="add-task-btn"
          onClick={() => setShowModal(true)}
        >
          <FontAwesomeIcon icon={faPlus} className="btn-icon" />
          New Task
        </button>
      </div>
      
      <div className="task-controls">
        <div className="search-container">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={filters.search}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
        
        <div className="category-filters">
          {['', 'homework', 'projects', 'exams', 'personal'].map((category) => (
            <button
              key={category || 'all'}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category)}
            >
              <FontAwesomeIcon 
                icon={categoryIcons[category]} 
                className="category-icon" 
              />
              {category || 'All'}
            </button>
          ))}
        </div>
      </div>

      <div className="tasks-list">
        {loading ? (
          <div className="loading-state">
            <FontAwesomeIcon icon={faSpinner} spin className="spinner-icon" />
            <p>Loading your tasks...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="empty-state">
            <p>No tasks found</p>
            <button 
              className="add-task-btn secondary"
              onClick={() => setShowModal(true)}
            >
              <FontAwesomeIcon icon={faPlus} className="btn-icon" />
              Create your first task
            </button>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="page-btn"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="page-icon" />
          </button>
          <span className="page-info">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="page-btn"
          >
            <FontAwesomeIcon icon={faChevronRight} className="page-icon" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Tasks;