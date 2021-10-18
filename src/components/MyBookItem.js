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
import noImage from "../images/no-image.png";
import classes from "./MyBookItem.module.css";

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
  console.log(props);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ width: 280 }}>
      <CardHeader
        title={props.item.title}
        subheader={props.item.date.substring(0, 10)}
      />
      <CardMedia
        className={classes.image}
        component="img"
        height="300"
        // width="200"
        image={props.item.image ? props.item.image : noImage}
        alt={props.item.title}
      />
      <CardContent>
        {props.item.authors ? (
          props.item.authors.map((author) => {
            <Typography variant="body2" color="text.secondary">
              {author}
            </Typography>;
          })
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
        </CardContent>
      </Collapse>
    </Card>
  );
};
export default MyBookItem;
