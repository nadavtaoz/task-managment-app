const Task = require('../models/task');

/**
 * Controller to get all tasks
 */
exports.getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.fetchAll();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch tasks', error: err.message });
  }
};

/**
 * Controller to get a task by its ID
 */
exports.getTaskById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch task', error: err.message });
  }
};

/**
 * Controller to create a new task
 */
exports.createTask = async (req, res, next) => {
  const { title, description, priority, taskOwner, dueDate } = req.body;
  const task = new Task(null, title, description, priority, taskOwner, dueDate, Task.statusTypes.PENDING);
  try {
    await task.save();
    res.status(201).json(Task.format(task));
  } catch (err) {
    res.status(500).json({ message: 'Failed to create task', error: err.message });
  }
};

/**
 * Controller to update an existing task by ID
 */
exports.updateTask = async (req, res, next) => {
  const { id } = req.params;
  const { title, description, priority, taskOwner, dueDate, status } = req.body;
  try {
    const existingTask = await Task.findById(id);
    if (!existingTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const updatedTask = new Task(
      id,
      title || existingTask.title,
      description || existingTask.description,
      priority || existingTask.priority,
      taskOwner || existingTask.taskOwner,
      dueDate || existingTask.dueDate,
      status || existingTask.status
    );

    await updatedTask.save();
    res.status(200).json(Task.format(updatedTask));
  } catch (err) {
    res.status(500).json({ message: 'Failed to update task', error: err.message });
  }
};

/**
 * Controller to delete a task by ID
 */
exports.deleteTask = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Task.deleteById(id);
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete task', error: err.message });
  }
};
