import { Typography, ListItemText, Box } from "@mui/material";
import { priorityColors } from "../constants";

export default function TaskItem({ task }) {
  return (
    <>
      <ListItemText sx={{maxWidth: "70%", minWidth: "70%"}}
        primary={
          <Typography variant="h6" component="div">
            {task.title}
          </Typography>
        }
      />
      <Box sx={{maxWidth: "30%", flex:1 }}>
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
      </Box>
    </>
  )
}