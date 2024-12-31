import { Typography } from "@mui/material";
import { priorityColors } from "../constants";

export default function TaskItem({task}) {
  return (
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
  )
}