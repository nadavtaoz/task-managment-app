
const fs = require('fs');
const path = require('path');

const dbFilePath = path.join(__dirname, '../_mockDB/tasks.json');

// Helper function to read tasks from the file
const getTasksFromFile = cb => {
  fs.readFile(dbFilePath, 'utf8', (err, data) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(data));
    }
  });
};

// Helper function to write tasks to the file
const saveTasksToFile = (tasks, cb) => {
  fs.writeFile(dbFilePath, JSON.stringify(tasks, null, 2), err => {
      if (cb) cb(err);
  });
};

module.exports = class Task {
  constructor(id, title, description, status, taskOwner, dueDate) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.taskOwner = taskOwner;
    this.dueDate = dueDate;
  }

  save(cb) {
    getTasksFromFile(tasks => {
      if (this.id) {
        // Update existing task
        const existingTaskIndex = tasks.findIndex(task => task.id === this.id);
        tasks[existingTaskIndex] = this;
      } else {
        // Create new task
        this.id = (tasks.length ? tasks[tasks.length - 1].id + 1 : 1).toString();
        tasks.push(this);
      }
      saveTasksToFile(tasks, cb);
    });
  }

  // Get all tasks (formatted)
  static fetchAll(cb) {
    getTasksFromFile(tasks => {
      cb(tasks.map(task => Task.format(task)));
    });
  }

  // Get a task by id
  static findById(id, cb) {
    getTasksFromFile(tasks => {
      const task = tasks.find(t => t.id === id);
      cb(task);
    });
  }

  // Delete a task by id
  static deleteById(id, cb) {
    getTasksFromFile(tasks => {
      const updatedTasks = tasks.filter(t => t.id !== id);
      saveTasksToFile(updatedTasks, cb);
    });
  }

  // format task row data to Task instance
  static format({ id, title, description, status, taskOwner, dueDate }) {
    return new Task(id, title, description, status, taskOwner, dueDate);
  }
};

