const fs = require('fs/promises');
const path = require('path');

const dbFilePath = path.join(__dirname, '../_mockDB/tasks.json');

// Helper function to read tasks from the file
const getTasksFromFile = async () => {
  try {
    const data = await fs.readFile(dbFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

// Helper function to write tasks to the file
const saveTasksToFile = async (tasks) => {
  await fs.writeFile(dbFilePath, JSON.stringify(tasks, null, 2));
};

module.exports = class Task {
  constructor(id, title, description, priority, taskOwner, dueDate, status) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.taskOwner = taskOwner;
    this.dueDate = dueDate;
    this.status = status;
  }

  static statusTypes = {
    PENDING: "Pending",
    IN_PROGRESS: "In Progress",
    COMPLETED: "Completed",
    TO_DO: "To Do"
  };

  async save() {
    const tasks = await getTasksFromFile();

    if (this.id) {
      // Update existing task
      const existingTaskIndex = tasks.findIndex(task => task.id === this.id);
      tasks[existingTaskIndex] = this;
    } else {
      // Create new task
      this.id = (tasks.length ? parseInt(tasks[tasks.length - 1].id) + 1 : 1).toString();
      const currentDate = new Date();
      this.creationTime = currentDate.toISOString();
      this.tags = [];
      tasks.push(this);
    }

    await saveTasksToFile(tasks);
  }

  // Get all tasks (formatted)
  static async fetchAll() {
    const tasks = await getTasksFromFile();
    return tasks.map(task => Task.format(task));
  }

  // Get a task by id
  static async findById(id) {
    const tasks = await getTasksFromFile();
    return tasks.find(t => t.id === id);
  }

  // Delete a task by id
  static async deleteById(id) {
    const tasks = await getTasksFromFile();
    const updatedTasks = tasks.filter(t => t.id !== id);
    await saveTasksToFile(updatedTasks);
  }

  // format task row data to Task instance
  static format(task) {
    return new Task(task.id, task.title, task.description, task.priority, task.taskOwner, task.dueDate, task.status);
  }
};
