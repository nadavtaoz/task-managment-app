import { useState } from "react";
import { useRecoilValue } from "recoil";
import { tasksState } from "../recoil/atoms";
import { Pagination, Paper, ListItem, ListItemText, List, Box, Typography } from "@mui/material";

import { priorityColors } from "../constants";

export default function TaskList({ openModal }) {

  const tasks = useRecoilValue(tasksState);
  const itemsPerPage = 5;
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
              onClick={() => handleItemClick(task.id)}
              sx={{
                "&:hover": {
                  backgroundColor: "#f4f4f4", // Light gray background on hover
                  cursor: "pointer", // Pointer cursor to indicate interactivity
                },
              }}
            >
              <ListItemText
                primary={
                  <Typography variant="h6" component="div">
                    {task.title}
                  </Typography>
                }
              />

              <div>
                <Typography variant="body2" component="div" color="text.secondary">
                  Owner: {task.taskOwner}
                </Typography>
                <Typography
                  variant="body2"
                  component="div"
                  sx={{
                    color: priorityColors[task.priority] || "gray",
                  }}
                >
                  Priority: {task.priority}
                </Typography>
                <Typography variant="body2" component="div" color="text.secondary">
                  Status: {task.status}
                </Typography>
                <Typography variant="body2" component="div" color="text.secondary">
                  Due Date: {new Date(task.dueDate).toLocaleDateString()}
                </Typography>
              </div>
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