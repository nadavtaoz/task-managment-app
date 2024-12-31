### Backend Walkthrough

#### Overview
This Node.js project is a task management application with a lightweight backend. It features a mock database implemented as a JSON file and a modular architecture for maintainability and scalability.

---

#### Folder Structure
```
server
|- _mockDB
     - tasks.json  // Mock database file
|- controllers     // Controllers handling application logic
|- models          // Task model definitions
|- routes          // Route handlers
|- services        // Utility services (e.g., DB interaction)
app.js             // Entry point of the application
```

---

#### Key Features
1. **Mock Database**:  
   - The backend uses a JSON file (`_mockDB/tasks.json`) as a mock database.  
   - All CRUD operations (Create, Read, Update, Delete) are performed directly on this file.
   - This setup simulates database functionality while avoiding the need for a full-fledged database.

2. **Modular Architecture**:
   - **Models**: Define the structure and behavior of tasks (with option for future entities).
   - **Controllers**: Handle application logic for different endpoints.
   - **Routes**: Define the API endpoints and map them to their respective controllers.
   - **Services**: Provide helper functions for reusable operations like database read/write.

3. **Endpoints**:
   - **GET /tasks**: Retrieve all tasks.
   - **POST /tasks**: Add a new task.
   - **PUT /tasks/:id**: Update an existing task.
   - **DELETE /tasks/:id**: Remove a task.

4. **CORS ISSUE**:
   - Server will only accept requests from localhost:3300, this is not configured right now.
---

#### How to Run the Backend
1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run the Server**:
   ```bash
   node app.js
   ```

3. **Default Port**:
   The server runs on port `3000` by default. You can test the API by accessing `http://localhost:3000` or using tools like Postman.

---

#### Development Highlights
- The mock database ensures simplicity and quick iterations.
- The architecture separates concerns, making the project easy to extend or refactor.
- All changes to the database are immediately reflected in the JSON file, simulating persistence. 

This approach is ideal for developing and testing the application before connecting it to a production-ready database system.