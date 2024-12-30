
class TaskService {
  constructor(baseURL) {
    this.baseURL = baseURL; // Base URL for the API
  }

  /**
   * Retrieve the list of tasks.
   * @returns {Promise<Array>} - List of tasks.
   */
  async getTasks() {
    const response = await fetch(`${this.baseURL}/tasks`);
    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }
    return response.json();
  }

  /**
   * Retrieve a specific task by ID.
   * @param {string} id - Task ID.
   * @returns {Promise<Object>} - Task details.
   */
  async getTaskById(id) {
    const response = await fetch(`${this.baseURL}/tasks/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch task with ID ${id}`);
    }
    return response.json();
  }

  /**
   * Create a new task.
   * @param {Object} task - Task object to create.
   * @returns {Promise<Object>} - The created task.
   */
  async createTask(task) {
    const response = await fetch(`${this.baseURL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error("Failed to create task");
    }
    return response.json();
  }

  /**
   * Update an existing task by ID.
   * @param {string} id - Task ID.
   * @param {Object} updates - Task updates.
   * @returns {Promise<Object>} - The updated task.
   */
  async updateTask(id, updates) {
    const response = await fetch(`${this.baseURL}/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      throw new Error(`Failed to update task with ID ${id}`);
    }
    return response.json();
  }

  /**
   * Delete a task by ID.
   * @param {string} id - Task ID.
   * @returns {Promise<void>}
   */
  async deleteTask(id) {
    const response = await fetch(`${this.baseURL}/tasks/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Failed to delete task with ID ${id}`);
    }
  }
}

export default TaskService;
