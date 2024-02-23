// EditTaskDialog.js
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const EditTaskDialog = ({ open, onClose, onSave, initialText }) => {
  const [editedText, setEditedText] = useState(initialText);

  const handleChange = (event) => {
    setEditedText(event.target.value);
  };

  const handleSave = (event) => {
    event.preventDefault();
    onSave(editedText);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSave}>
          <TextField
            autoFocus
            margin="dense"
            label="Task"
            fullWidth
            value={editedText}
            onChange={handleChange}
          />
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" color="primary">
              Save
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskDialog;
