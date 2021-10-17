import WarningIcon from "@mui/icons-material/Warning";
import classes from "./ErrorMessage.module.css";
const ErrorMessage = () => {
  return (
    <div className={classes.container}>
      <span>
        <WarningIcon />
      </span>
      <p>Oops! Somethig wrong. Try again.</p>
    </div>
  );
};
export default ErrorMessage;
