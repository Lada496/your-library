import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { RootContextProvider } from "./store/root-context";
import "./index.css";

ReactDOM.render(
  <RootContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </RootContextProvider>,
  document.getElementById("root")
);
