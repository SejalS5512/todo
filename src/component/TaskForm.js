// TaskForm.js
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';

const TaskForm = ({ addTask }) => {
  const [task, setTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    addTask(task);
    setTask('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" alignItems="center" mb={2}>
        <TextField
          label="Create some task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          style={{ marginRight: '10px' }}  
        />
        <Button type="submit" variant="contained" color="primary" startIcon={<AddIcon />} style={{backgroundColor: '#FFCE33'}} >
          Add Task
        </Button>
      </Box>
    </form>
  );
};

export default TaskForm;