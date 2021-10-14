import { Fragment, useRef } from "react";
import BookList from "./BookList";
import { getSearchBooks } from "../lib/api";
const SearchBooks = () => {
  const searchInputRef = useRef("");
  const searchHandler = () => {
    getSearchBooks();
  };

  return (
    <Fragment>
      <input type="text" placeholder="search books" ref={searchInputRef} />
      <button type="submit" onClick={searchHandler}>
        search
      </button>
      <BookList />
    </Fragment>
  );
};
export default SearchBooks;
