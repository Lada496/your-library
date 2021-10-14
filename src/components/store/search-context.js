import { createContext } from "react";
const SearchContext = createContext({
  query: "",
  results: [],
  totalItems: 0,
  startIndex: 0,
  page: 1,
});
