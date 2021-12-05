import { Fragment, useContext } from "react";
import MyBookItem from "../components/MyBookItem";
import SortMyBooks from "../components/SortMyBooks";
import MyBooksContext from "../store/my-books-context";
import classes from "./MyBooks.module.css";
import WithLayout from "../hoc/WithLayout";

const sortByTitle = (myBooks) => {
  myBooks.sort((a, b) => {
    const titleA = a.title.toUpperCase();
    const titleB = b.title.toUpperCase();
    if (titleA < titleB) {
      return -1;
    }
    if (titleB < titleA) {
      return 1;
    }
    return 0;
  });
  return myBooks;
};

const sortByDate = (myBooks) => {
  console.log(new Date(myBooks[0].date));
  myBooks.sort((a, b) => new Date(b.date) - new Date(a.date));
  return myBooks;
};

const sortByRating = (myBooks) => {
  myBooks.sort((a, b) => b.rating - a.rating);
  return myBooks;
};

const MyBooks = () => {
  const myBooksCtx = useContext(MyBooksContext);

  const content = myBooksCtx.myBooks.map((item) => (
    <MyBookItem key={item.id} item={item} />
  ));

  const sortByTitleHandler = () => {
    const currentMyBooks = [...myBooksCtx.myBooks];
    const newMyBooks = sortByTitle(currentMyBooks);
    myBooksCtx.sortMyBooks(newMyBooks);
  };
  const sortByDateHandler = () => {
    const currentMyBooks = [...myBooksCtx.myBooks];
    const newMyBooks = sortByDate(currentMyBooks);
    myBooksCtx.sortMyBooks(newMyBooks);
  };
  const sortByRatingHandler = () => {
    const currentMyBooks = [...myBooksCtx.myBooks];
    const newMyBooks = sortByRating(currentMyBooks);
    myBooksCtx.sortMyBooks(newMyBooks);
  };
  const defaultHandler = () => {
    myBooksCtx.defaultMyBooks();
  };

  return (
    <Fragment>
      <SortMyBooks
        onTitle={sortByTitleHandler}
        onDate={sortByDateHandler}
        onRating={sortByRatingHandler}
        onDefault={defaultHandler}
      />
      <div className={classes.box}>
        {myBooksCtx.myBooks.length !== 0 && content}
        {myBooksCtx.myBooks.length === 0 && (
          <p>No books here yet. Let's add your book!</p>
        )}
      </div>
    </Fragment>
  );
};
export default WithLayout(MyBooks);
