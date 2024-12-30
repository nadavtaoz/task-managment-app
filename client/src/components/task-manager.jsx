import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { Container, Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { tasksState } from "../recoil/atoms";
import TaskList from "./task-list";
import TaskForm from "./task-form";

export default function TaskManager() {

  const setTasks = useSetRecoilState(tasksState);

  useEffect(() => {
    async function getTasks() {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/tasks`);

      // TODO:
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const tasks = await response.json();
      setTasks(tasks);
    }

    getTasks();

  }, []);

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
            <TaskForm />
          </Grid>
        </Grid>
      </Box>
    </Container>

  )
}