import { atom } from "recoil";

export const tasksState = atom({
  key: "tasksState",
  default: [],
});

export const sortCriteriaState = atom({
  key: "sortCriteriaState",
  default: "",
});