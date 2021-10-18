import { Fragment, useEffect, useContext, useState } from "react";
import MyBookItem from "../components/MyBookItem";
import MyBooksContext from "../store/my-books-context";
import classes from "./MyBooks.module.css";

const MyBooks = () => {
  const myBooksCtx = useContext(MyBooksContext);
  console.log(myBooksCtx.myBooks);

  const content = myBooksCtx.myBooks.map((item) => (
    <MyBookItem key={item.id} item={item} />
  ));
  return (
    <div className={classes.box}>
      {myBooksCtx.myBooks.length !== 0 && content}
      {myBooksCtx.myBooks.length === 0 && (
        <p>No books here yet. Let's add your book!</p>
      )}
    </div>
  );
};
export default MyBooks;
