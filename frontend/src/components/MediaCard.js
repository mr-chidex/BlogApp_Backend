import React from "react";
import {
  CardActionArea,
  CardContent,
  CardMedia,
  makeStyles,
  Card,
  Typography,
} from "@material-ui/core";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: { marginTop: "1rem" },
  header: { fontSize: " 0.9rem" },
  timer: {
    display: "flex",
    alignItems: "center",
    color: "#bbb;",
  },
  media: {
    position: "relative",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});

const MediaCard = ({ post }) => {
  const classes = useStyles();
  const router = useHistory();

  return (
    <Card
      className={classes.root}
      sx={{ maxWidth: 345 }}
      onClick={() => router.push(`/${post?.url}`)}
    >
      <CardActionArea>
        <CardMedia
          className={classes.media}
          component="img"
          height="180"
          image={post?.image}
          alt="green iguana"
        />
        <CardContent>
          <Typography className={classes.header} gutterBottom variant="h6">
            {post?.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <div className={classes.timer}>
              <EventAvailableIcon className="icon" fontSize="small" />
              <span>{post?.date}</span>
            </div>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MediaCard;
