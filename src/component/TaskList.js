// TaskList.js
import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import EditTaskDialog from './EditTaskDialog';
import EditIcon from '@mui/icons-material/Edit';

const TaskList = ({ tasks, setTasks, toggleTaskCompletion, deleteTask, addTasks }) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedTask, setEditedTask] = useState(null);

  const handleEditTask = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setEditedTask(taskToEdit);
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditedTask(null);
    setEditDialogOpen(false);
  };

  const handleSaveEditedTask = (editedText) => {
    if (editedTask) {
      const updatedTasks = tasks.map((task) =>
        task.id === editedTask.id ? { ...task, text: editedText } : task
      );
      setTasks(updatedTasks);
      handleCloseEditDialog();
    }
  };

  return (
    <List>
      {tasks.map((task) => (
        <ListItem key={task.id}>
          <Checkbox
            checked={task.completed}
            onChange={() => toggleTaskCompletion(task.id)}
          />
          {editedTask && editedTask.id === task.id ? (
            <TextField
              variant="outlined"
              value={editedTask.text}
              onChange={(e) => setEditedTask({ ...editedTask, text: e.target.value })}
            />
          ) : (
            <TextField
              variant="outlined"
              value={task.text}
              InputProps={{ readOnly: true }}
            />
          )}
          {editedTask && editedTask.id === task.id ? (
            <IconButton onClick={() => handleSaveEditedTask(editedTask.text)}>
              Save
            </IconButton>
          ) : (
            <IconButton onClick={() => handleEditTask(task.id)}>
              <EditIcon style={{ color: '#4CAF50' }} />
            </IconButton>
          )}
          <IconButton onClick={() => deleteTask(task.id)}>
            <DeleteIcon style={{ color: '#FF5722' }} />
          </IconButton>
        </ListItem>
      ))}
      <EditTaskDialog
        open={editDialogOpen}
        onClose={handleCloseEditDialog}
        onSave={handleSaveEditedTask}
        initialText={editedTask ? editedTask.text : ''}
      />
    </List>
  );
};

export default TaskList;
