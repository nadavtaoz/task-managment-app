
import React, { useState, useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { tasksState, sortCriteriaState, filterCriteriaState, searchFilter } from "../recoil/atoms";
import { Pagination, Paper, ListItem, ListItemText, List, Box, Typography } from "@mui/material";

import SortCriteria from "./filters/sort-criteria";
import { sortTasks } from "../utils/sorting";
import { filterTasks } from "../utils/filtering";
import FilterCriteria from "./filters/filter-criteria";
import SearchCriteria from "./filters/search-criteria";
import TaskItem from "./task-item";

const TaskList = React.memo(({ openModal }) => {
  
  const tasks = useRecoilValue(tasksState);
  const sortCriteria = useRecoilValue(sortCriteriaState);
  const filterCriteria = useRecoilValue(filterCriteriaState);
  const searchQuery = useRecoilValue(searchFilter);

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the index of the first and last task on the current page
  const indexOfLastTask = currentPage * itemsPerPage;
  const indexOfFirstTask = indexOfLastTask - itemsPerPage;

  const prevFilterCriteriaRef = useRef();
  const prevSearchQueryRef = useRef();

  // Reset currentPage to 1 if filterCriteria or searchQuery changes
  useEffect(() => {
    if (
      (prevFilterCriteriaRef.current && prevFilterCriteriaRef.current.value !== filterCriteria.value) ||
      (prevSearchQueryRef.current !== searchQuery)
    ) {
      setCurrentPage(1); // Reset page if the value of the filter or search query has changed
    }
    prevFilterCriteriaRef.current = filterCriteria; // Update the reference for the next render
    prevSearchQueryRef.current = searchQuery; // Update the search query reference
  }, [filterCriteria, searchQuery]);

  // Filter tasks by search query, then apply filter and sort criteria
  const filteredBySearch = tasks.filter(task => {
    const searchString = (task.title + " " + task.description + " " + task.taskOwner).toLowerCase();
    return searchString.includes(searchQuery.toLowerCase());
  });

  const filteredTasks = filterTasks(filteredBySearch, filterCriteria);
  const sortedTasks = sortTasks(filteredTasks, sortCriteria);

  // Slice the tasks array to only include the tasks for the current page
  const currentTasks = sortedTasks.slice(indexOfFirstTask, indexOfLastTask);

  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Handle click on a list item
  const handleItemClick = id => {
    openModal(id);
  }

  return (
    <div className="tasks-list-container">
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Box>
          <SearchCriteria />
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <SortCriteria />
          <FilterCriteria />
        </Box>
        <List>
          {currentTasks.length === 0 && <li>Loading...</li>}
          {currentTasks.length > 0 && currentTasks.map((task, index) => (
            <ListItem
              key={task.id}
              onClick={() => handleItemClick(task.id)}
              sx={{
                "&:hover": {
                  backgroundColor: "#f4f4f4",
                  cursor: "pointer",
                },
                columnGap: 2
              }}
            >
              <TaskItem task={task} />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Pagination
        count={Math.ceil(sortedTasks.length / itemsPerPage)}  // Total number of pages
        page={currentPage}                                    // Current page
        onChange={handlePageChange}                           // Update page on change
        color="primary"
        sx={{ marginTop: 2, marginBottom: 2, display: 'flex', justifyContent: 'center' }}
      />
    </div>
  )
});

export default TaskList;