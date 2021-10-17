import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import Rating from "@mui/material/Rating";
import ItemContext from "../store/item-context";
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
  const itemCtx = React.useContext(ItemContext);
  const date = new Date();
  const formatedDate = formatDate(date);
  const [rating, setRating] = React.useState(3);
  const [inputDate, setInputDate] = React.useState(new Date());
  const [comment, setComment] = React.useState("");
  const rateChangeHnadler = (event, newValue) => {
    setRating(newValue);
  };
  const dateChangeHandler = (newValue) => {
    setInputDate(newValue);
  };
  const commentChangeHandler = (event, newValue) => {
    setComment(newValue);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const mybook = {
      id: "" + inputDate.getTime() + itemCtx.item.id,
      date: inputDate,
      rating,
      title: itemCtx.item.title,
      authors: itemCtx.item.authors,
      comment,
    };
    console.log(mybook);
  };

  return (
    <React.Fragment>
      <h1 className={classes.title}>Add to My Books</h1>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.box}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              disableFuture
              openTo="year"
              views={["year", "month", "day"]}
              value={inputDate}
              onChange={dateChangeHandler}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <Rating
            name="simple-controlled"
            value={rating}
            onChange={rateChangeHnadler}
            size="large"
            className={classes.rating}
            required
          />
        </div>
        <textarea
          col="5"
          placeholder="comment"
          value={comment}
          onChange={commentChangeHandler}
        />
        <button className={classes.button} type="submit">
          <span>Add</span>
          <BookmarkAddIcon />
        </button>
      </form>
    </React.Fragment>
  );
};

export default AddMyBooks;
