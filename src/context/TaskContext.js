import React, { createContext, useState, useEffect,useContext } from 'react';
import axios from 'axios';

import { AuthContext } from './AuthContext';

export const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [filterPriority, setFilterPriority] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('');

  // const { allUser } = useContext(AuthContext);
  // console.log("dsf",allUser);
  



  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=20');
        // console.log(response.data[0]);
        //data structure  object
        // {"completed": false, "id": 1, "title": "delectus aut autem", "userId": 1}
        const formattedTasks = response.data.map((item) => ({
          id: item.id,
          title: item.title,
          description: 'some tasdadsakdaskd',
          dueDate: new Date().toISOString().split('T')[0],
          priority: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
          status: item.completed ? 'Done' : 'To-Do',
          assignedUserId: item.userId
        }));
        // console.log(formattedTasks);
        // console.log(formattedTasks[0]);
        // {"assignedUserId": 1, "description": "some tasdadsakdaskd", "dueDate": "2025-03-28", "id": 1, "priority": "Low", "status": "To-Do", "title": "delectus aut autem"}
        setTasks(formattedTasks);
      } catch (error) {
        console.warn('Error fetching tasks:', error);
      }
    };
    
    fetchTasks();
  }, []);

  const createTask = (newTask) => {
    // console.log("newTask",newTask);
    // return;
    setTasks((prev) => [...prev, { id: Date.now(), ...newTask }]);
  };

  const updateTask = (updatedTask) => {
    setTasks((prev) => prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
  };

  const deleteTask = (taskId) => {
    // console.log("taskId",taskId);
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const getFilteredTasks = () => {
    let filteredTasks = [...tasks];

    if (searchQuery) {
      filteredTasks = filteredTasks.filter(
        (task) =>
          task.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterPriority) {
      filteredTasks = filteredTasks.filter((task) => task.priority === filterPriority);
    }

    if (filterStatus) {
      filteredTasks = filteredTasks.filter((task) => task.status === filterStatus);
    }

    switch (sortField) {
      case 'dueDate':
        filteredTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        break;
      case 'priority':
        const priorityOrder = { Low: 1, Medium: 2, High: 3 };
        filteredTasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
        break;
      case 'status':
        const statusOrder = { 'To-Do': 1, 'In Progress': 2, Done: 3 };
        filteredTasks.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
        break;
      default:
        break;
    }
    console.log("fill",filteredTasks);
    
    return filteredTasks;
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        updateTask,
        deleteTask,
        filterPriority,
        setFilterPriority,
        filterStatus,
        setFilterStatus,
        searchQuery,
        setSearchQuery,
        sortField,
        setSortField,
        getFilteredTasks
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;