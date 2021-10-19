import { Fragment, useContext } from "react";
import { Link, Route, useRouteMatch } from "react-router-dom";
import ItemContext from "../store/item-context";
import noImage from "../images/no-image.png";
import classes from "./BookDetail.module.css";
import AddMyBooks from "./AddMyBooks";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";

const BookDetail = () => {
  const match = useRouteMatch();
  console.log(match);
  const itemCtx = useContext(ItemContext);
  return (
    <Fragment>
      <Route path={match.url} exact>
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
        <Link className={classes.link} to={`${match.url}/add-my-books`}>
          <button className={classes.button}>
            <span>Add to My Books</span>
            <BookmarkAddIcon />
          </button>
        </Link>
      </Route>
      <Route path={`${match.url}/add-my-books`}>
        <AddMyBooks />
      </Route>
    </Fragment>
  );
};

export default BookDetail;
