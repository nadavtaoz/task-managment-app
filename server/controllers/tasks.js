const Task = require('../models/task');

/**
 * Controller to get all tasks
 */
exports.getAllTasks = (req, res, next) => {
  Task.fetchAll(tasks => {
    res.status(200).json(tasks);
  });
};

/**
 * Controller to get a task by its ID
 */
exports.getTaskById = (req, res, next) => {
  const { id } = req.params;
  Task.findById(id, task => {
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  });
};

/**
 * Controller to create a new task
 */
exports.createTask = (req, res, next) => {
  const { title, description, status, taskOwner, dueDate } = req.body;
  const task = new Task(null, title, description, status, taskOwner, dueDate);
  task.save(err => {
    if (err) {
      res.status(500).json({ message: 'Failed to create task' });
    } else {
      res.status(201).json(task);
    }
  });
};

/**
 * Controller to update an existing task by ID
 */
exports.updateTask = (req, res, next) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  Task.findById(id, existingTask => {
    if (!existingTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const updatedTask = new Task(id, title || existingTask.title, description || existingTask.description, status || existingTask.status);
    updatedTask.save(err => {
      if (err) {
        res.status(500).json({ message: 'Failed to update task' });
      } else {
        res.status(200).json(updatedTask);
      }
    });
  });
};

/**
 * Controller to delete a task by ID
 */
exports.deleteTask = (req, res, next) => {
  const { id } = req.params;
  Task.deleteById(id, err => {
    if (err) {
      res.status(500).json({ message: 'Failed to delete task' });
    } else {
      res.status(200).json({ message: 'Task deleted successfully' });
    }
  });
};


