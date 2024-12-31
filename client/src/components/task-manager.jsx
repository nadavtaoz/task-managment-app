import { useEffect, useState } from "react";
import { useSetRecoilState, useRecoilValue  } from "recoil";
import { Container, Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { tasksState } from "../recoil/atoms";

import taskServiceAtom from "../recoil/tasks-service-atom";
import TaskList from "./task-list";
import TaskForm from "./task-form";
import EditTaskModal from "./modals/edit-task-modal";

export default function TaskManager() {

  const setTasks = useSetRecoilState(tasksState);
  const allTasks = useRecoilValue(tasksState);
  const taskService = useRecoilValue(taskServiceAtom);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTask, setModalTask] = useState({});

  // get all tasks
  useEffect(() => {
    async function getTasks() {
      try {
        const tasks = await taskService.getTasks();
        setTasks(tasks);
      } catch (err) {
        console.error("Error fetching tasks:", err.message);
        setError(e);
      }
    }

    getTasks();
  }, []);

  // creates a new task
  const handleTaskSubmit = async (task) => {
    setIsLoading(true);
    try {
      const createdTask = await taskService.createTask(task);
      setTasks(prevTasks => [createdTask, ...prevTasks]);
    } catch (err) {
      console.error("Error creating task:", err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // save task from modal
  const handleSave = async (updatedTask) => {
    console.log("Updated Task:", updatedTask);
    setIsLoading(true);
    setIsModalOpen(false);
    try {
      // Find the original task from the task list
      const originalTask = allTasks.find(task => task.id === updatedTask.id);

      // Extract only updated fields
      const taskUpdates = {};
      for (const key in updatedTask) {
        if (updatedTask[key] !== originalTask[key]) {
          taskUpdates[key] = updatedTask[key];
        }
      }
      
      const updatedTaskResult = await taskService.updateTask(originalTask.id, taskUpdates);
      const updatedTaskIndex = allTasks.findIndex(task => task.id === updatedTaskResult.id);
      setTasks(prevTasks => {
        const updatedTasks = [...prevTasks];
        updatedTasks[updatedTaskIndex] = updatedTaskResult;
        return updatedTasks;
      });
      alert("Task updated!");
    } catch (err) {
      console.error("Error updating task:", err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
      setModalTask({});
    }
  };

  // open the edit task modal
  const openModal = id => {
    const task = allTasks.find(t => t.id === id);
    setModalTask(task);
    setIsModalOpen(true);
  };

  if(error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>;
  }


  return (
    <Container maxWidth="lg">
      <Typography variant="h2" component="h2" align="center" gutterBottom pt={2}>
        Task Manager
      </Typography>
      

      <Box sx={{ flexGrow: 1 }} className="tasks-container" pb={3}>
        <Grid container spacing={2} className="tasks-container-grid">
          <Grid size={8}>
            <TaskList openModal={openModal}/>
          </Grid>

          <Grid size={4}>
            <TaskForm onSubmit={handleTaskSubmit} isLoading={isLoading}/>
          </Grid>
        </Grid>
      </Box>

      <EditTaskModal 
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={modalTask}
        onSave={handleSave}
      />
    </Container>

  )
}