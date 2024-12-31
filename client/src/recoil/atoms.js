import { atom } from "recoil";

export const tasksState = atom({
  key: "tasksState",
  default: [],
});

export const sortCriteriaState = atom({
  key: "sortCriteriaState",
  default: "",
});

export const filterCriteriaState = atom({
  key: "filterCriteriaState",
  default: {
    field: "",
    value: ""
  }
});

export const searchFilter = atom({
  key: "searchFilter",
  default: ""
});
