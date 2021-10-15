import BookItem from "./BookItem";

const BookList = (props) => {
  return (
    <div>
      {props.results.map((item) => (
        <BookItem item={item} key={item.id} />
      ))}
    </div>
  );
};
export default BookList;
