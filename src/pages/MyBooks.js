import { Fragment, useEffect } from "react";
import MyBookItem from "../components/MyBookItem";

const MyBooks = () => {
  let myBooks = [];
  const loadedMyBooks = localStorage.getItem("myBooks");
  if (loadedMyBooks) {
    myBooks = JSON.parse(loadedMyBooks);
  }

  return (
    <Fragment>
      {myBooks.length !== 0 &&
        myBooks.map((item) => <MyBookItem item={item} />)}
      {myBooks.length === 0 && <p>No books here yet. Let's add your book!</p>}
    </Fragment>
  );
};
export default MyBooks;
