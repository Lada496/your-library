import { Fragment, useContext } from "react";
import { Routes, Link, Route, useLocation } from "react-router-dom";
import RootContext from "../store/root-context";
import noImage from "../images/no-image.png";
import classes from "./BookDetail.module.css";
import AddMyBooks from "./AddMyBooks";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";

const BookDetail = () => {
  const location = useLocation();
  return (
    <Routes>
      <Route
        path=""
        element={<BookDetailComponent path={location.pathname} />}
      />

      <Route path="add-my-books" element={<AddMyBooks />} />
    </Routes>
  );
};

export default BookDetail;

const BookDetailComponent = ({ path }) => {
  const rootCtx = useContext(RootContext);
  const itemCtx = rootCtx.item;
  return (
    <Fragment>
      <div className={classes.detail}>
        <div>
          <h1>Title: {itemCtx.item.title}</h1>
          <h2>Author(s): </h2>
          {itemCtx.item.authors ? (
            <p>{itemCtx.item.authors.join(", ")}</p>
          ) : (
            <p>anonymos</p>
          )}
          <h2>description</h2>
          {itemCtx.item.description ? (
            <p>{itemCtx.item.description}</p>
          ) : (
            <p>no description</p>
          )}
        </div>
        <img
          src={itemCtx.item.image ? itemCtx.item.image : noImage}
          alt={itemCtx.item.title}
        />
      </div>
      <Link className={classes.link} to={`${path}/add-my-books`}>
        <button className={classes.button}>
          <span>Add to My Books</span>
          <BookmarkAddIcon />
        </button>
      </Link>
    </Fragment>
  );
};
