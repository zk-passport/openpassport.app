'use client';

import { Autocomplete, TextField } from "@mui/material";
import React, { useState } from "react";

// Define the interface for the SearchInput component's props
interface SearchFormProps {
  searchQuery: string; 
  onSearchQueryChange: (query: string) => void; 
}

// Function to filter results based on the search query
const filterResults = (query: string, data: any[]) => {
  return data.filter(item =>
    item.signature_algorithm.toLowerCase().includes(query.toLowerCase()) || 
    item.hash_algorithm.toLowerCase().includes(query.toLowerCase()) || 
    item.curve_exponent.toString().includes(query) ||
    item.bit_length.toString().includes(query) 
  );
};

// Define the functional component SearchInput
export const SearchInput: React.FC<SearchFormProps> = ({ searchQuery, onSearchQueryChange }) => {
  const [inputValue, setInputValue] = useState<string>(searchQuery); 

  // Handle changes in the input value of the Autocomplete
  const handleInputChange = (_event: React.SyntheticEvent, value: string) => {
    setInputValue(value); 
    onSearchQueryChange(value); 
  };
 
  return (
  <div className="flex items-center justify-center">
  <Autocomplete
    style={{ margin: "1rem", backgroundColor: "white", textAlign: "center" }}
    disablePortal
    onInputChange={handleInputChange}
    options={[]}
    sx={{ width: 300 }}
    freeSolo
    renderInput={(params) => (
      <TextField
        {...params}
        label="Search"
        sx={{
          borderRadius: '12px',
          '& .MuiOutlinedInput-root': {
            borderRadius: '50px',
            '& fieldset': {
              borderColor: 'black', 
            },
            '&:hover fieldset': {
              borderColor: 'black',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'black', 
            },
          },
        }}
        variant="outlined"
      />
    )}
    inputValue={inputValue} 
  />
</div>

  );
};