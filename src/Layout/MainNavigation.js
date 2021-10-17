import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";
const MainNavigation = (props) => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>Your Library</div>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink to="/search-book" exact activeClassName={classes.active}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/my-books" activeClassName={classes.active}>
              My Books
            </NavLink>
          </li>
          <li>
            <NavLink to="/" exact activeClassName={classes.active}>
              Logout
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default MainNavigation;