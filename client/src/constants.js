

export const defaultTask = {
  title: "",
  description: "",
  priority: "",
  taskOwner: "",
  dueDate: "",
  status: ""
};

export const taskPriorities = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  CRITICAL: "Critical"
};

export const priorityColors = {
  [taskPriorities.LOW]: "green",
  [taskPriorities.MEDIUM]: "blue",
  [taskPriorities.HIGH]: "red",
  [taskPriorities.CRITICAL]: "purple",
};

export const taskStatusTypes = {
  PENDING: "Pending",
  IN_PROGRESS: "In Progress",
  COMPELTED: "Completed",
  TO_DO: "To Do"
};