const express     = require('express');
const bodyParser  = require('body-parser');
const tasksRoutes = require('./routes/tasks');
const cors        = require('cors');
const app         = express();


const corsOptions = {
  origin: 'http://localhost:3300',
  methods: 'GET,POST,DELETE,PUT ',
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Use CORS middleware with specified options
app.use(cors(corsOptions));

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Routes for tasks
app.use('/tasks', tasksRoutes);

// Error handling for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});