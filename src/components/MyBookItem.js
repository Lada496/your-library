import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Rating from "@mui/material/Rating";
import DeleteIcon from "@mui/icons-material/Delete";
import noImage from "../images/no-image.png";
import classes from "./MyBookItem.module.css";
import MyBooksContext from "../store/my-books-context";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const MyBookItem = (props) => {
  const [expanded, setExpanded] = React.useState(false);
  const myBooksCtx = React.useContext(MyBooksContext);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const deleteMyBookHandler = () => {
    if (window.confirm("Do you want to delete this book?")) {
      const currentMyBooks = myBooksCtx.myBooks;
      const newMyBooks = currentMyBooks.filter(
        (myBook) => myBook.id !== props.item.id
      );
      myBooksCtx.deleteMyBook(newMyBooks);
    }
  };

  return (
    <Card sx={{ width: 300, margin: "0 auto auto auto" }}>
      <CardHeader
        title={props.item.title}
        subheader={props.item.date.substring(0, 10)}
        sx={{ minHeight: 100, alignItems: "start" }}
      />
      <CardMedia
        // className={classes.image}
        component="img"
        height="300"
        sx={{ width: 200, margin: "auto" }}
        // width="150"
        image={props.item.image ? props.item.image : noImage}
        alt={props.item.title}
      />
      <CardContent
        sx={{
          minHeight: 50,
          textAlign: "start",
        }}
      >
        {props.item.authors ? (
          <Typography variant="body2" color="text.secondary">
            {props.item.authors.join(", ")}
          </Typography>
        ) : (
          <Typography variant="body2" color="text.secondary">
            anonymous
          </Typography>
        )}
      </CardContent>
      <CardActions disableSpacing>
        <Rating
          name="read-only"
          value={props.item.rating ? props.item.rating : 0}
          readOnly
        />
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Comment:</Typography>
          <Typography paragraph>
            {props.item.comment ? props.item.comment : "no comment"}
          </Typography>
          <CardActions>
            <button onClick={deleteMyBookHandler} className={classes.button}>
              <span>Delete</span>
              <DeleteIcon fontSize="small" />
            </button>
          </CardActions>
        </CardContent>
      </Collapse>
    </Card>
  );
};
export default MyBookItem;
