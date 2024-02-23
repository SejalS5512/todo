// App.js
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TaskForm from './component/TaskForm';
import TaskList from './component/TaskList';

const pageStyles = {
  backgroundColor: '#D0A2DA',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const boxStyles = {
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  padding: '30px',
  maxWidth: '500px',
  margin: 'auto',
  marginTop: '50px',
};

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    // Load tasks from mock file (localStorage) on mount
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  const saveTasksToMockFile = (updatedTasks) => {
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const addTask = (newTask) => {
    const updatedTasks = [...tasks, { id: Date.now(), text: newTask, completed: false }];
    setTasks(updatedTasks);
    saveTasksToMockFile(updatedTasks);
  };

  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveTasksToMockFile(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    saveTasksToMockFile(updatedTasks);
  };

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div style={pageStyles}>
      <Box style={boxStyles}>
        <Typography variant="h4" align="center" mb={3}>
          My To-Do List App
        </Typography>
        <TaskForm addTask={addTask} />
        <Tabs value={tabValue} onChange={handleChangeTab} aria-label="task count tabs">
          <Tab label="All Tasks" />
          <Tab label="Completed Tasks" />
          <Tab label="Incomplete Tasks" />
        </Tabs>
        <div>
          {tabValue === 0 && (
            <Typography variant="h6" style={{ marginTop: '20px' }}>
              Total Tasks: {tasks.length}
            </Typography>
          )}
          {tabValue === 1 && (
            <Typography variant="h6" style={{ marginTop: '20px' }}>
              Completed Tasks: {tasks.filter((task) => task.completed).length}
            </Typography>
          )}
          {tabValue === 2 && (
            <Typography variant="h6" style={{ marginTop: '20px' }}>
              Incomplete Tasks: {tasks.filter((task) => !task.completed).length}
            </Typography>
          )}
        </div>

        <TaskList
          tasks={
            tabValue === 0
              ? tasks
              : tabValue === 1
              ? tasks.filter((task) => task.completed)
              : tasks.filter((task) => !task.completed)
          }
          setTasks={setTasks}
          toggleTaskCompletion={toggleTaskCompletion}
          deleteTask={deleteTask}
        />
      </Box>
    </div>
  );
};

export default App;
