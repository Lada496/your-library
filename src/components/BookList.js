import BookItem from "./BookItem";
import classes from "./BookList.module.css";

const BookList = (props) => {
  return (
    <div className={classes.list}>
      {props.results.map((item) => (
        <BookItem item={item} key={item.id} />
      ))}
    </div>
  );
};
export default BookList;
