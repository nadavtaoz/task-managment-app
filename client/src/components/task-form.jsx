import { useState } from "react";

import {
  Box,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
} from "@mui/material";

export default function TaskForm() {

	const [task, setTask] = useState({
    title: "",
    description: "",
    status: "",
    taskOwner: "",
    dueDate: "",
  });

	const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

	const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Task created:", task);
    // Add logic to save the task
  };

	// Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

	return (
		<div>
			<Box
				component="form"
				onSubmit={handleSubmit}
				sx={{
					maxWidth: 500,
					margin: "0 auto",
					display: "flex",
					flexDirection: "column",
					gap: 2,
				}}
			>
				<Typography variant="h3" component="h3" align="center" gutterBottom>
					Add new Task
				</Typography>

				<TextField
					label="Title"
					name="title"
					value={task.title}
					onChange={handleChange}
					required
					fullWidth
				/>

				<TextField
					label="Description"
					name="description"
					value={task.description}
					onChange={handleChange}
					multiline
					rows={4}
					fullWidth
				/>

				<FormControl fullWidth>
					<InputLabel sx={{background: '#fff'}}>Status</InputLabel>
					<Select
						name="status"
						value={task.status}
						onChange={handleChange}
						required
					>
						<MenuItem value="Pending">Pending</MenuItem>
						<MenuItem value="In Progress">In Progress</MenuItem>
						<MenuItem value="Completed">Completed</MenuItem>
					</Select>
				</FormControl>

				<TextField
					label="Task Owner"
					name="taskOwner"
					required
					value={task.taskOwner}
					onChange={handleChange}
					fullWidth
				/>

				<TextField
					label="Due Date"
					name="dueDate"
					type="date"
					required
					value={task.dueDate}
					onChange={handleChange}
					InputLabelProps={{
						shrink: true,
					}}
					fullWidth
					inputProps={{
						min: today, // Prevent selection of past dates
					}}
				/>

				<Button variant="contained" type="submit" color="primary">
					Create Task
				</Button>
			</Box>
		</div>
	)
}