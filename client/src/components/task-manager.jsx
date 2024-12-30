import { useEffect } from "react";
import { useSetRecoilState, useRecoilValue  } from "recoil";
import { Container, Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { tasksState } from "../recoil/atoms";

import taskServiceAtom from "../recoil/task-service-atom";
import TaskList from "./task-list";
import TaskForm from "./task-form";

export default function TaskManager() {

  const setTasks = useSetRecoilState(tasksState);
  const taskService = useRecoilValue(taskServiceAtom);

  useEffect(() => {
    async function getTasks() {
      try {
        const tasks = await taskService.getTasks();
        setTasks(tasks);
      } catch (e) {
        alert(e);
        setTasks([]);
      }
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