import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { searchFilter } from "../../recoil/atoms";
import { TextField, Box } from "@mui/material";

export default function SearchCriteria() {
  const [searchQuery, setSearchQuery] = useRecoilState(searchFilter);
  const [inputValue, setInputValue] = useState("");

  // Update searchFilter atom when the input value changes
  const handleSearchChange = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    if (inputValue.length > 2) {
      setSearchQuery(inputValue);
    } else {
      setSearchQuery(""); // Clear search if input is less than 2 characters
    }
  }, [inputValue, setSearchQuery]);

  return (
    <Box sx={{ marginBottom: 2 }}>
      <TextField
        label="Search by title or description or owner"
        variant="outlined"
        fullWidth
        value={inputValue}
        onChange={handleSearchChange}
        placeholder="Search by title or description or owner"
        inputProps={{
          minLength: 2, // Ensures at least 2 characters before the user can search
        }}
      />
    </Box>
  );
}


