import * as React from "react";
import TextField from "@mui/material/TextField";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import Rating from "@mui/material/Rating";

import classes from "./AddMyBooks.module.css";
const formatDate = (date) => {
  const month = "" + (date.getMonth() + 1),
    day = "" + date.getDate(),
    year = date.getFullYear();
  if (month.length < 2) {
    month = "0" + month;
  }
  if (day.length < 2) {
    day = "0" + day;
  }
  return [year, month, day].join("-");
};
const AddMyBooks = () => {
  const [rating, setRating] = React.useState(3);
  const date = new Date();
  const formatedDate = formatDate(date);

  return (
    <React.Fragment>
      <h1 className={classes.title}>Add to My Books</h1>
      <form className={classes.form}>
        <div className={classes.box}>
          <TextField
            id="date"
            type="date"
            defaultValue={formatedDate}
            sx={{ width: 220 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Rating
            name="simple-controlled"
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
            size="large"
            className={classes.rating}
            required
          />
        </div>
        <textarea col="5" placeholder="comment" />
        <button className={classes.button} type="submit">
          <span>Add</span>
          <BookmarkAddIcon />
        </button>
      </form>
    </React.Fragment>
  );
};

export default AddMyBooks;
