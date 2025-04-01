import { createContext, useContext, useState, useEffect } from 'react';
import { taskApi } from '../services/api';

const TaskContext = createContext();

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    completed: '',
    priority: '',
  });

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        search: filters.search,
        ...(filters.category && { category: filters.category }),
        ...(filters.completed !== '' && { completed: filters.completed }),
        ...(filters.priority && { priority: filters.priority }),
      };
      
      const data = await taskApi.getTasks(params);
      setTasks(data.results);
      setTotalPages(Math.ceil(data.count / 10));
      setError(null);
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [currentPage, filters]);

  const addTask = async (task) => {
    try {
      const newTask = await taskApi.createTask(task);
      setTasks(prev => [newTask, ...prev]);
    } catch (err) {
      setError('Failed to add task');
      console.error('Error adding task:', err);
    }
  };

  const updateTask = async (id, updatedTask) => {
    try {
      const updated = await taskApi.updateTask(id, updatedTask);
      setTasks(prev => prev.map(task => task.id === id ? updated : task));
    } catch (err) {
      setError('Failed to update task');
      console.error('Error updating task:', err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await taskApi.deleteTask(id);
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (err) {
      setError('Failed to delete task');
      console.error('Error deleting task:', err);
    }
  };

  const toggleTask = async (id) => {
    try {
      const task = tasks.find(t => t.id === id);
      const updated = await taskApi.toggleTaskComplete(id, !task.completed);
      setTasks(prev => prev.map(t => t.id === id ? updated : t));
    } catch (err) {
      setError('Failed to toggle task');
      console.error('Error toggling task:', err);
    }
  };

  const value = {
    tasks,
    loading,
    error,
    currentPage,
    totalPages,
    filters,
    setCurrentPage,
    setFilters,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export default TaskContext;
