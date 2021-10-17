import classes from "./LaunchPage.module.css";
import imageUrl from "../images/launch.png";
import { Link } from "react-router-dom";
const LaunchPage = (props) => {
  const style = {
    backgroundImage: `url(${imageUrl})`,
  };
  return (
    <div className={classes.container} style={style}>
      <h1 className={classes.heading}>Your Library</h1>
      <Link to="/search-book">
        <button onClick={props.onStart} className={classes.button}>
          start
        </button>
      </Link>
    </div>
  );
};

export default LaunchPage;
