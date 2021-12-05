import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import noImage from "../images/no-image.png";

import { useContext } from "react";
import ItemContext from "../store/item-context";
import classes from "./BookItem.module.css";

const BookItem = (props) => {
  const itemCtx = useContext(ItemContext);
  const location = useLocation();
  const updateItemHandler = () => {
    itemCtx.updateItem(props.item);
  };
  return (
    <Fragment>
      <Link
        className={classes.box}
        to={`${location.pathname}/${props.item.id}`}
        onClick={updateItemHandler}
      >
        <img
          className={classes.image}
          src={props.item.image ? props.item.image : noImage}
          alt={props.item.title}
        ></img>
      </Link>
    </Fragment>
  );
};
export default BookItem;
