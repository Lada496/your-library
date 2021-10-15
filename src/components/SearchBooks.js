import { Fragment, useRef, useReducer } from "react";
import BookList from "./BookList";
import { getSearchBooks } from "../lib/api";

const initialState = {
  results: [],
  totalItems: 0,
  startIndex: 0,
  page: 1,
};
const searchReducer = (currntState, action) => {
  if (action.type === "INITIALIZE") {
    console.log(action.results);
    console.log(action.totalItems);
    return {
      results: action.results,
      totalItems: action.totalItems,
      startIndex: 0,
      page: 1,
    };
  }

  if (action.type === "PAGINATION") {
    return {
      ...currntState,
      startIndex: action.startIndex,
      page: action.page,
    };
  }
};

const SearchBooks = () => {
  const [searchState, dispatchSearch] = useReducer(searchReducer, initialState);
  const searchInputRef = useRef("");
  const searchHandler = () => {
    getSearchBooks(searchInputRef.current.value, searchState.startIndex).then(
      (results) => {
        dispatchSearch({
          type: "INITIALIZE",
          results: results.results,
          totalItems: results.totalItems,
        });
      }
    );
  };

  return (
    <Fragment>
      <input type="text" placeholder="search books" ref={searchInputRef} />
      <button type="submit" onClick={searchHandler}>
        search
      </button>
      <BookList results={searchState.results} />
    </Fragment>
  );
};
export default SearchBooks;
