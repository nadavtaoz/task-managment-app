import { useRecoilState } from "recoil";
import { filterCriteriaState } from "../../recoil/atoms";
import { FormControl, InputLabel, Select, MenuItem, TextField, Box } from "@mui/material";

export default function FilterCriteria() {
  const [filterCriteria, setFilterCriteria] = useRecoilState(filterCriteriaState);

  const handleFieldChange = (event) => {
    setFilterCriteria((prev) => ({
      ...prev,
      field: event.target.value,
      value: "", // Reset value when field changes
    }));
  };

  const handleValueChange = (event) => {
    const value = event.target ? event.target.value : event;
    setFilterCriteria((prev) => ({
      ...prev,
      value,
    }));
  };

  const renderValueField = () => {
    switch (filterCriteria.field) {
      case "priority":
        return (
          <FormControl sx={{ marginBottom: 2, minWidth: 120, maxWidth: "50%", flex: 1 }}>
            <InputLabel>Priority</InputLabel>
            <Select
              value={filterCriteria.value}
              onChange={handleValueChange}
              label="Priority"
            >
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
          </FormControl>
        );

      case "status":
        return (
          <FormControl sx={{ marginBottom: 2, minWidth: 120, maxWidth: "50%", flex: 1 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={filterCriteria.value}
              onChange={handleValueChange}
              label="Status"
            >
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
            </Select>
          </FormControl>
        );

      case "dueDate":
        return (
          <TextField
            label="Due Date"
            name="dueDate"
            type="date"
            value={filterCriteria.value}
            onChange={handleValueChange}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
      <FormControl sx={{ marginBottom: 2, minWidth: "50%", flex:1, maxWidth: "50%" }}>
        <InputLabel>Filter By</InputLabel>
        <Select
          value={filterCriteria.field || ""}
          onChange={handleFieldChange}
          label="Filter By"
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="priority">Priority</MenuItem>
          <MenuItem value="status">Status</MenuItem>
          <MenuItem value="dueDate">Due Date</MenuItem>
        </Select>
      </FormControl>
      {renderValueField()}
    </Box>
  );
}
