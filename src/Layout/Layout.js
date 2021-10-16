import { Fragment } from "react";
import MainNavigation from "./MainNavigation";

const Layout = (props) => {
  return (
    <Fragment>
      <MainNavigation onEnd={props.onEnd} />
      <main>{props.children}</main>
    </Fragment>
  );
};
export default Layout;
