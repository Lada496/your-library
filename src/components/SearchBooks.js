import { Fragment, useRef, useReducer, useEffect, useState } from "react";
import { Route, useRouteMatch } from "react-router-dom";
import useHttp from "../hooks/use-http";
import BookList from "./BookList";
import LoadingSpinner from "../UI/LoadingSpinner";
import SearchIcon from "@mui/icons-material/Search";
import BookDetail from "./BookDetail";

import { getSearchBooks } from "../lib/api";
import classes from "./SearchBooks.module.css";

const initialState = {
  results: [],
  totalItems: 0,
  startIndex: 0,
  page: 1,
};
const searchReducer = (currntState, action) => {
  if (action.type === "INITIALIZE") {
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
  const match = useRouteMatch();
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
    searchInputRef.current.value = "";
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
      <Route path={match.path} exact>
        <div className={classes.search}>
          <input type="text" placeholder="search books" ref={searchInputRef} />
          <button type="submit" onClick={searchHandler}>
            <SearchIcon sx={{ fontSize: 35 }} />
          </button>
        </div>
        {status === "loading" && !init && <LoadingSpinner />}
        {status === "completed" && !error && (
          <BookList results={searchState.results} />
        )}
      </Route>
      <Route path={`${match.path}/:bookId`}>
        <BookDetail />
      </Route>
    </Fragment>
  );
};
export default SearchBooks;
