import { Fragment, useEffect, useContext, useState } from "react";
import MyBookItem from "../components/MyBookItem";
import MyBooksContext from "../store/my-books-context";
import classes from "./MyBooks.module.css";

const MyBooks = () => {
  const [init, setInit] = useState(true);
  const myBooksCtx = useContext(MyBooksContext);

  useEffect(() => {
    if (init) {
      setInit(false);
      const storedMyBooks = localStorage.getItem("myBooks");
      if (storedMyBooks) {
        const myBooks = JSON.parse(storedMyBooks);
        console.log(myBooks);
        for (const myBook of myBooks) {
          console.log(myBook);
          myBooksCtx.updateMyBooks(myBook);
        }
        // myBooksCtx.updateMyBooks(myBooks);
      }
    }
  }, [init]);
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
