import noImage from "../images/no-image.png";

const BookItem = (props) => {
  return (
    <div>
      <h1>{props.item.title}</h1>
      <img
        src={props.item.image ? props.item.image : noImage}
        alt={props.item.title}
      ></img>
      {props.item.authors &&
        props.item.authors.map((author) => <p key={author}>{author}</p>)}
    </div>
  );
};
export default BookItem;
