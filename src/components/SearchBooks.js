import { Fragment, useRef, useReducer, useEffect, useState } from "react";
import { Route, useRouteMatch } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@mui/material/Pagination";
import useHttp from "../hooks/use-http";
import BookList from "./BookList";
import LoadingSpinner from "../UI/LoadingSpinner";
import ErrorMessage from "../UI/ErrorMessage";
import BookDetail from "./BookDetail";

import { getSearchBooks } from "../lib/api";
import classes from "./SearchBooks.module.css";

const initialState = {
  results: [],
  query: "",
  totalItems: 0,
  startIndex: 0,
  page: 1,
};
const searchReducer = (currntState, action) => {
  if (action.type === "PAGINATION") {
    return {
      ...currntState,
      startIndex: action.startIndex,
      page: action.page,
    };
  }
  if (action.type === "UPDATE") {
    return {
      ...currntState,
      results: action.results,
      totalItems: action.totalItems,
    };
  }

  if (action.type === "QUERY") {
    return {
      ...currntState,
      query: action.query,
      startIndex: 0,
      page: 1,
    };
  }

  if (action.type === "PAGE") {
    console.log(action.page);
    return {
      ...currntState,
      page: action.page,
      startIndex: (action.page - 1) * 20 - 1,
    };
  }
};

const SearchBooks = () => {
  const match = useRouteMatch();
  // const [query, setQuery] = useState("");
  const [init, setInit] = useState(true);
  const [page, setPage] = useState(1);
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
    dispatchSearch({
      type: "QUERY",
      query: searchInputRef.current.value,
    });
    setPage(1);
    searchInputRef.current.value = "";
  };

  const pageChangeHandler = (event, newValue) => {
    dispatchSearch({ type: "PAGE", page: newValue });
  };

  // useEffect(() => {
  //   if (!init) {
  //     console.log("pagination run");
  //     dispatchSearch({
  //       type: "PAGINATION",
  //       page: page,
  //       startIndex: (page - 1) * 20 - 1,
  //     });
  //   }
  // }, [page, init]);

  useEffect(() => {
    if (searchState.query && !init) {
      console.log("pagination request run");
      sendGetRequest(searchState.query, searchState.startIndex);
    }
  }, [searchState.query, searchState.startIndex, sendGetRequest, init]);

  useEffect(() => {
    if (loadedBooksData && !init) {
      console.log("pagination update run");
      dispatchSearch({
        type: "UPDATE",
        results: loadedBooksData.results,
        totalItems: loadedBooksData.totalItems,
      });
    }
  }, [loadedBooksData, init]);

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
        {status === "completed" && error && <ErrorMessage />}
        {status === "completed" && !error && (
          <Fragment>
            <BookList results={searchState.results} />
            <div className={classes.pagination}>
              <Pagination
                count={Math.ceil(searchState.totalItems / 20)}
                page={searchState.page}
                onChange={pageChangeHandler}
                // onClick={paginationChangeHandler}
              />
            </div>
          </Fragment>
        )}
      </Route>
      <Route path={`${match.path}/:bookId`}>
        <BookDetail />
      </Route>
    </Fragment>
  );
};
export default SearchBooks;
