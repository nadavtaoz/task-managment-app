import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Button, Typography, FormControl, Select, InputLabel, MenuItem   } from "@mui/material";

import { defaultTask, taskPriorities, taskStatusTypes } from "../../constants";
import '../../styles/edit-task-modal.css';

function EditTaskModal({ open, task, onSave, onDelete, onClose }) {

  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData({
      id: task?.id || "",
      title: task?.title || "",
      description: task?.description || "",
      priority: task?.priority || "",
      taskOwner: task?.taskOwner || "",
      dueDate: task?.dueDate || "",
      status: task?.status || ""
    });
  }, [task]);

  // Update the task object state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle save click
  const handleSave = () => {
    onSave(formData);
  };

  // Handle delete click
  const handleDelete = () => {
    onDelete(task.id);
  }

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  return (
    <Modal open={open}
      onClose={onClose}
      aria-labelledby="edit-task-modal"
      aria-describedby="edit-task-modal-description">

      <Box className="modal-content">
        <Typography variant="h6" mb={2}>
          Edit Task
        </Typography>
        <form>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={3}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel sx={{ background: '#fff' }}>Priority</InputLabel>
            <Select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              required
            >
              {Object.values(taskPriorities).map(priority => <MenuItem key={priority} value={priority}>{priority}</MenuItem>)}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel sx={{ background: '#fff' }}>Status</InputLabel>
            <Select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              {Object.values(taskStatusTypes).map(status => <MenuItem key={status} value={status}>{status}</MenuItem>)}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Task Owner"
            name="taskOwner"
            value={formData.taskOwner}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Due Date"
            name="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              min: today,
            }}
          />
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button onClick={onClose} color="secondary" variant="outlined" title="Cancel">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="error" variant="outlined" title="Delete">
              Delete
            </Button>
            <Button onClick={handleSave} color="primary" variant="contained" title="Save">
              Save
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}

export default EditTaskModal;