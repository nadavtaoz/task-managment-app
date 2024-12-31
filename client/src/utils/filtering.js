
// Filter the tasks based on filterCriteria
export const filterTasks = (tasks, criteria) => {
  if (!criteria.field || !criteria.value) return tasks;

  switch (criteria.field) {
    case "priority":
      return tasks.filter((task) => task.priority === criteria.value);
    case "status":
      return tasks.filter((task) => task.status === criteria.value);
    case "dueDate":
      return tasks.filter((task) => {
        const taskDate = new Date(task.dueDate).toISOString().split("T")[0];
        return taskDate === criteria.value;
      });
    default:
      return tasks;
  }
};