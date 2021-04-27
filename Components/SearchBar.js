import React, {useState} from "react";
import FormControl from "@material-ui/core/FormControl"
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';



const SearchBar = (props) => {
  const [input, setInput] = useState("All")


    function handleChange(e) {
      setInput(e.target.value)
      props.search(e.target.value)
    }

  return (
    <FormControl>
        <InputLabel id="demo-simple-select-label">Filter by</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={input}
          onChange={(e) => handleChange(e)}
        >
          <MenuItem value={"Completed"}>Completed</MenuItem>
          <MenuItem value={"Pending"}>Pending</MenuItem>
          <MenuItem value={"All"}>Show All</MenuItem>
        </Select>
        </FormControl>
  );
};

export default SearchBar;
