const express = require('express');
const tasksController = require('../controllers/tasks');

const router = express.Router();

/**
 * Route to get all tasks
 */
router.get('/', tasksController.getAllTasks);

/**
 * Route to get a task by its ID
 */
router.get('/:id', tasksController.getTaskById);

/**
 * Route to create a new task
 */
router.post('/', tasksController.createTask);

/**
 * Route to update an existing task by ID
 */
router.put('/:id', tasksController.updateTask);

/**
 * Route to delete a task by ID
 */
router.delete('/:id', tasksController.deleteTask);

module.exports = router;
