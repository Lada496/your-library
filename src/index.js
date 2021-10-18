import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ItemContextProvider } from "./store/item-context";
import { MyBooksContextProvider } from "./store/my-books-context";
import "./index.css";

ReactDOM.render(
  <MyBooksContextProvider>
    <ItemContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ItemContextProvider>
  </MyBooksContextProvider>,
  document.getElementById("root")
);
