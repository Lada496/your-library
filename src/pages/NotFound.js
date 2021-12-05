import React from "react";
import { Link } from "react-router-dom";
import classes from "./NotFound.module.css";
import WithLayout from "../hoc/WithLayout";

function NotFound() {
  return (
    <div className={classes["not-found"]}>
      <h1>404</h1>
      <h2>Page Not Found </h2>
      <p>
        Back to <Link to="/search-book">Home</Link>
      </p>
    </div>
  );
}

export default WithLayout(NotFound);
