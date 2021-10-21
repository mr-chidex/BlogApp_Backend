import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  link: {
    color: "#fff",
    textDecoration: "none",
  },
  title: {
    color: "yellow",
  },
  sub: { color: "red" },
});

const Logo = () => {
  const classes = useStyles();

  return (
    <Link to="/" className={classes.link}>
      <h1 className={classes.title}>
        CH<span className={classes.sub}>INE</span>WS
      </h1>
    </Link>
  );
};

export default Logo;
