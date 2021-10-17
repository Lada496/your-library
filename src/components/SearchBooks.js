import { Fragment, useRef, useReducer, useEffect, useState } from "react";
import { Route, useRouteMatch } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@mui/material/Pagination";
import useHttp from "../hooks/use-http";
import BookList from "./BookList";
import LoadingSpinner from "../UI/LoadingSpinner";
import ErrorMessage from "../UI/ErrorMessage";
import BookDetail from "./BookDetail";

import { getSearchBooks, getPaginationBooks } from "../lib/api";
import classes from "./SearchBooks.module.css";

const initialState = {
  results: [],
  query: "",
  totalItems: 0,
  startIndex: 0,
  page: 1,
};
const searchReducer = (currntState, action) => {
  // if (action.type === "INITIALIZE") {
  //   return {
  //     results: action.results,
  //     totalItems: action.totalItems,
  //     query: action.query,
  //     startIndex: 0,
  //     page: 1,
  //   };
  // }

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

  // const {
  //   seadRequest: sendPaginationRequest,
  //   paginationStaus,
  //   data: loadedPaginationData,
  //   paginationError,
  // } = useHttp(getPaginationBooks, true);

  const searchHandler = () => {
    setInit(false);
    sendGetRequest(searchInputRef.current.value);
    // setQuery(searchInputRef.current.value);
    dispatchSearch({
      type: "QUERY",
      query: searchInputRef.current.value,
    });
    searchInputRef.current.value = "";
  };

  const pageChangeHandler = (event, newValue) => {
    setPage(newValue);
  };

  // useEffect(() => {
  //   if (loadedBooksData) {
  //     console.log("initial run");
  //     dispatchSearch({
  //       type: "INITIALIZE",
  //       query,
  //       results: loadedBooksData.results,
  //       totalItems: loadedBooksData.totalItems,
  //     });
  //   }
  // }, [loadedBooksData, query]);

  useEffect(() => {
    if (!init) {
      console.log("pagination run");
      dispatchSearch({
        type: "PAGINATION",
        page: page,
        startIndex: (page - 1) * 20 - 1,
      });
    }
  }, [page, init]);

  // const paginationChangeHandler = () => {
  //   if (searchState.query && searchState.startIndex) {
  //     sendPaginationRequest(searchState.query, searchState.startIndex);
  //   }
  // };

  // useEffect(() => {
  //   console.log("loadedBooksData");
  //   console.log(loadedBooksData);
  // }, [loadedBooksData]);

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
      setPage(1);
    }
  }, [loadedBooksData, init]);

  // useEffect(() => {
  //   setPage(searchState.page);
  // }, [searchState.page]);
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
          <BookList results={searchState.results} />
        )}
        {!init && (
          <div className={classes.pagination}>
            <Pagination
              count={Math.ceil(searchState.totalItems / 20)}
              page={page}
              onChange={pageChangeHandler}
              // onClick={paginationChangeHandler}
            />
          </div>
        )}
      </Route>
      <Route path={`${match.path}/:bookId`}>
        <BookDetail />
      </Route>
    </Fragment>
  );
};
export default SearchBooks;
