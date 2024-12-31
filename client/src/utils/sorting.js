
import { taskPriorities, taskStatusTypes } from "../constants";

// Sorting function
export const sortTasks = ([...ts], sortCriteria) => {
  if(!ts || !ts.length) {
    return [];
  }
  if (sortCriteria === "priority") {
    const priorityOrder = Object.values(taskPriorities);
    return ts.sort((a, b) => priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority));
  }
  if (sortCriteria === "status") {
    const statusOrder = Object.values(taskStatusTypes);
    return ts.sort((a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status));
  }
  if (sortCriteria === "dueDate") {
    return ts.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  }
  return ts; // No sorting
};
