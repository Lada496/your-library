import * as React from "react";
import { useNavigate } from "react-router";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import Rating from "@mui/material/Rating";
import RootContext from "../store/root-context";
import classes from "./AddMyBooks.module.css";

const formatDate = (date) => {
  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

const AddMyBooks = () => {
  const navigate = useNavigate();
  const rootCtx = React.useContext(RootContext);
  const itemCtx = rootCtx.item;
  const myBooksCtx = rootCtx.myBooks;
  const [rating, setRating] = React.useState(3);
  const [inputDate, setInputDate] = React.useState(new Date());
  const [comment, setComment] = React.useState("");
  const rateChangeHnadler = (event, newValue) => {
    setRating(newValue);
  };
  const dateChangeHandler = (newValue) => {
    setInputDate(newValue);
  };
  const commentChangeHandler = (event) => {
    setComment(event.target.value);
  };
  const isBookInMyBooks = myBooksCtx.myBooks.some(
    (myBook) => myBook.id.slice(13) === itemCtx.item.id
  );

  const submitHandler = (event) => {
    event.preventDefault();
    if (isBookInMyBooks) {
      alert("This book has already been in your list!");
    } else {
      const formattedDate = formatDate(inputDate);
      const mybook = {
        id: "" + inputDate.getTime() + itemCtx.item.id,
        date: formattedDate,
        rating,
        title: itemCtx.item.title,
        authors: itemCtx.item.authors,
        image: itemCtx.item.image,
        comment,
      };

      myBooksCtx.updateMyBooks(mybook);
      navigate("/my-books");
    }
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
