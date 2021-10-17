import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ItemContextProvider } from "./store/item-context";
import "./index.css";

ReactDOM.render(
  <ItemContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ItemContextProvider>,
  document.getElementById("root")
);
