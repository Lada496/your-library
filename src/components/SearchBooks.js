import { Fragment, useRef, useReducer, useEffect, useState } from "react";
import useHttp from "../hooks/use-http";
import BookList from "./BookList";
import LoadingSpinner from "../UI/LoadingSpinner";

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
  const [init, setInit] = useState(true);
  const [searchState, dispatchSearch] = useReducer(searchReducer, initialState);
  const searchInputRef = useRef("");
  const {
    sendRequest: sendGetRequest,
    status,
    data: loadedBooksData,
    error,
  } = useHttp(getSearchBooks, true);
  const searchHandler = () => {
    setInit(false);
    sendGetRequest(searchInputRef.current.value);
  };

  useEffect(() => {
    if (loadedBooksData) {
      dispatchSearch({
        type: "INITIALIZE",
        results: loadedBooksData.results,
        totalItems: loadedBooksData.totalItems,
      });
    }
  }, [loadedBooksData]);
  return (
    <Fragment>
      <input type="text" placeholder="search books" ref={searchInputRef} />
      <button type="submit" onClick={searchHandler}>
        search
      </button>
      {status === "loading" && !init && <LoadingSpinner />}
      {status === "completed" && !error && (
        <BookList results={searchState.results} />
      )}
    </Fragment>
  );
};
export default SearchBooks;
