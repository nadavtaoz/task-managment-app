// src/components/SortCriteria.jsx

import { useRecoilState } from "recoil";
import { sortCriteriaState } from "../recoil/atoms";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function SortCriteria() {
  const [sortCriteria, setSortCriteria] = useRecoilState(sortCriteriaState);

  const handleSortChange = (event) => {
    setSortCriteria(event.target.value);
  };

  return (
    <FormControl sx={{ marginBottom: 2, minWidth: 120 }}>
      <InputLabel>Sort By</InputLabel>
      <Select value={sortCriteria} onChange={handleSortChange} label="Sort By">
        <MenuItem value="">None</MenuItem>
        <MenuItem value="priority">Priority</MenuItem>
        <MenuItem value="status">Status</MenuItem>
        <MenuItem value="dueDate">Due Date</MenuItem>
      </Select>
    </FormControl>
  );
}
