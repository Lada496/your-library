import noImage from "../images/no-image.png";
import classes from "./BookItem.module.css";

const BookItem = (props) => {
  return (
    <img
      className={classes.image}
      src={props.item.image ? props.item.image : noImage}
      alt={props.item.title}
    ></img>
  );
};
export default BookItem;
