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

import { defaultTask, taskPriorities } from "../constants";

export default function TaskForm({onSubmit, isLoading}) {

	const [task, setTask] = useState(defaultTask);

	const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

	const handleSubmit = (e) => {
    e.preventDefault();

		onSubmit(task)
			.then(()=> {
				setTask(defaultTask);
			});
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
					<InputLabel sx={{background: '#fff'}}>Priority</InputLabel>
					<Select
						name="priority"
						value={task.priority}
						onChange={handleChange}
						required
					>
						{Object.values(taskPriorities).map(priority => <MenuItem key={priority} value={priority}>{priority}</MenuItem>)}
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

				<Button variant="contained" type="submit" color="primary" disabled={isLoading}>
					Create Task
				</Button>
			</Box>
		</div>
	)
}