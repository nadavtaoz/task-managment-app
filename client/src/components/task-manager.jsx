import { useEffect, useState } from "react";
import { useSetRecoilState, useRecoilValue  } from "recoil";
import { Container, Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { tasksState } from "../recoil/atoms";

import taskServiceAtom from "../recoil/tasks-service-atom";
import TaskList from "./task-list";
import TaskForm from "./task-form";

export default function TaskManager() {

  const setTasks = useSetRecoilState(tasksState);
  const taskService = useRecoilValue(taskServiceAtom);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
      setTasks(prevTasks => [task, ...prevTasks]);
    } catch (err) {
      console.error("Error creating task:", err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
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
            <TaskList />
          </Grid>

          <Grid size={4}>
            <TaskForm onSubmit={handleTaskSubmit} isLoading={isLoading}/>
          </Grid>
        </Grid>
      </Box>
    </Container>

  )
}