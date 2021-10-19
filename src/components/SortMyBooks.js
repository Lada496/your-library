import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const SortMyBooks = (props) => {
  const [sortWay, setSortWay] = React.useState("");

  const handleChange = (event) => {
    setSortWay(event.target.value);
    switch (event.target.value) {
      case 1:
        props.onTitle();
        break;
      case 2:
        props.onDate();
        break;
      case 3:
        props.onRating();
        break;
      default:
        props.onDefault();
    }
  };
  return (
    <FormControl
      variant="standard"
      sx={{ m: 1, minWidth: 120, marginLeft: "100px" }}
    >
      <InputLabel id="sort-by-label">Sort by</InputLabel>
      <Select
        labelId="sort-by-label"
        id="sort-by"
        value={sortWay}
        onChange={handleChange}
        label="Sort by"
      >
        <MenuItem value={0}>
          <em>Default</em>
        </MenuItem>
        <MenuItem value={1}>Title</MenuItem>
        <MenuItem value={2}>Date</MenuItem>
        <MenuItem value={3}>Rating</MenuItem>
      </Select>
    </FormControl>
  );
};
export default SortMyBooks;
