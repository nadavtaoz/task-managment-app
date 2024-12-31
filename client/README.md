# Task Manager Frontend - React.js Project

## Table of Contents

1. [Overview](#overview)
2. [Folder Structure](#folder-structure)
3. [Frontend Architecture](#frontend-architecture)
4. [Key Features](#key-features)
5. [Setup and Installation](#setup-and-installation)
6. [Development](#development)
7. [Configuration](#configuration)
8. [Technologies Used](#technologies-used)
9. [Conclusion](#conclusion)

---

## Overview

This project is a frontend application for a **Task Manager** created with **React.js**, utilizing **Vite.js** for fast and efficient development. The application allows users to manage tasks, add new ones, edit and delete tasks, and interact with tasks through filtering, sorting, and searching.

### Key Features:
- Task creation and management
- Task editing and deletion through modals
- Filtering tasks by various criteria
- Sorting tasks
- Search functionality for tasks
- Responsive UI using Material-UI (MUI)

---

## Folder Structure

Here is a breakdown of the project's folder structure:

```
client
│
├── public                     # Static assets (e.g., index.html, images)
│
└── src                        # Source code for the application
    ├── assets                 # Images, fonts, and other static assets
    ├── components             # React components
    │   ├── filters            # Components related to filters (sorting, search, etc.)
    │   └── modals             # Modal components
    ├── recoil                 # Recoil state management (atoms, selectors)
    ├── services               # API and service functions to interact with the backend
    ├── styles                 # CSS for the UI
    ├── utils                  # Utility functions for the application
```

---

## Frontend Architecture

### State Management with Recoil

This project uses **Recoil** for state management. Recoil atoms and selectors are used for managing global state such as tasks, filter criteria, sort criteria, and search filters.

- **Atoms**: The main units of state in Recoil. For example, `tasksState` holds the list of all tasks, and `filterCriteriaState` contains the current filter applied.
- **Selectors**: Derived state is calculated through selectors. For example, filtering or sorting tasks based on specific criteria.

### Component Structure

Components are organized into functional units:
- **Filters**: Components that handle filtering, sorting, and searching tasks.
- **Modals**: Components for editing or deleting tasks within modals.
- **Task List**: Displays a list of tasks, with pagination and task management actions.

### Services

The **services** folder contains functions that interact with the backend API to fetch, create, update, and delete tasks. These services are used within the components to perform CRUD operations on tasks.

---

## Key Features

1. **Task Management**: 
   - Create, edit, and delete tasks using the task form and modals.
   
2. **Search**: 
   - A search bar allows the user to filter tasks by title and description.

3. **Sorting**: 
   - Users can sort tasks based on priority, due date, etc.

4. **Filtering**: 
   - Tasks can be filtered by criteria such as status, priority, and due date.

5. **Responsive Design**: 
   - The application uses **Material-UI** for a responsive and modern UI.

---

## Setup and Installation

To get started with the project, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/nadavtaoz/task-managment-app.git
   cd task-managment-app/client
   ```

2. **Install dependencies**:
   This project uses **npm** for package management. Install the required dependencies by running:
   ```bash
   npm install
   ```

3. **Environment Configuration**:
   Create a `.env` file based on the `.env.example` file. Make sure to add your environment-specific variables, such as API URLs, before starting the application.
   Example:
   ```env
   REACT_APP_API_URL=http://localhost:3000
   ```
   * it's recommned to use this url - http://localhost:3000 because the node server has cors verified for this address only. For more informetion look for the ../server folder. 

---

## Development

### Running the Development Server

To start the development server, run:
```bash
npm run dev
```
This will launch the app in development mode and open it in your browser at `http://localhost:3000`.

### Building for Production

To build the project for production, run:
```bash
npm run build
```
This will bundle the application into static files that can be served by any static file server.

---

## Technologies Used

- **React.js**: The core JavaScript library for building the user interface.
- **Vite.js**: A fast build tool that significantly improves development speed.
- **Recoil**: A state management library for React, used to manage the global state of the application.
- **Material-UI (MUI)**: A popular React UI framework for building responsive and accessible user interfaces.

---

## Small note from the developer - 
I never used "recoil" or MUI components before. hope this will be considered in your evaluation.



