import { NavLink } from "react-router-dom";
const MainNavigation = () => {
  return (
    <header>
      <div>Your Library</div>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/my-books">My Books</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default MainNavigation;
