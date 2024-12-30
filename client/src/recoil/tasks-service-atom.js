import { atom } from "recoil";
import TaskService from "../services/tasks-service";

// Define the atom to store the TaskService instance
const taskServiceAtom = atom({
  key: "taskServiceAtom",
  default: new TaskService(import.meta.env.VITE_API_BASE_URL),
});

export default taskServiceAtom;
