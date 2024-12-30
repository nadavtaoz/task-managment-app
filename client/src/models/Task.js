
export default class Task {
  constructor(id, title, description, status, taskOwner, dueDate) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.taskOwner = taskOwner;
    this.dueDate = dueDate;
  }
}