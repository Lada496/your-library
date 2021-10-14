import classes from "./LaunchPage.module.css";
import imageUrl from "../images/launch.png";
const LaunchPage = (props) => {
  const style = {
    backgroundImage: `url(${imageUrl})`,
  };
  return (
    <div className={classes.container} style={style}>
      <h1 className={classes.heading}>Your Library</h1>
      <button onClick={props.onStart} className={classes.button}>
        start
      </button>
    </div>
  );
};

export default LaunchPage;
