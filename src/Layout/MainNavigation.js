import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";
const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>Your Library</div>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink
              to="/search-book"
              className={({ isActive }) => (isActive ? classes.active : null)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-books"
              className={({ isActive }) => (isActive ? classes.active : null)}
            >
              My Books
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? classes.active : null)}
            >
              Logout
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default MainNavigation;
