import React from "react";
import Layout from "../Layout/Layout.jsx";

function WithLayout(Child) {
  return function WithLayout(props) {
    return (
      <Layout>
        <Child {...props} />
      </Layout>
    );
  };
}

export default WithLayout;
