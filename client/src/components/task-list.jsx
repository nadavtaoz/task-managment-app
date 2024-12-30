import { useState } from "react";
import { useRecoilValue } from "recoil";
import { tasksState } from "../recoil/atoms";
import { Pagination, Paper, ListItem, ListItemText, List } from "@mui/material";

export default function TaskList({openModal}) {

	const tasks = useRecoilValue(tasksState);
	const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

	// Calculate the index of the first and last task on the current page
	const indexOfLastTask = currentPage * itemsPerPage;
	const indexOfFirstTask = indexOfLastTask - itemsPerPage;

	// Slice the tasks array to only include the tasks for the current page
	const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

	// Handle page change
	const handlePageChange = (event, value) => {
		setCurrentPage(value);
	};

	// Handle click on a list item
	const handleItemClick = id => {
		openModal(id);
	}

	return (
    <div className="tasks-list-container">
      <Paper elevation={3} sx={{ padding: 2 }}>
				<List>
						{currentTasks.map((task, index) => (
							<ListItem
								 key={task.id}
								 onClick={() => handleItemClick(task)}
								 sx={{
									'&:hover': {
										backgroundColor: '#f4f4f4', // Light gray background on hover
										cursor: 'pointer', // Pointer cursor to indicate interactivity
									},
								}}
							>
								<ListItemText primary={task.title} />
							</ListItem>
						))}
					</List>
      </Paper>

      <Pagination
        count={Math.ceil(tasks.length / itemsPerPage)} // Total number of pages
        page={currentPage} // Current page
        onChange={handlePageChange} // Update page on change
        color="primary"
        sx={{ marginTop: 2, display: 'flex', justifyContent: 'center' }}
      />
    </div>
	)
}	