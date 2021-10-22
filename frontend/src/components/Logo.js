import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  link: {
    color: "#fff",
    textDecoration: "none",
  },
  title: {
    color: "#f8633b",
  },
  sub: { color: "#ffff" },
});

const Logo = () => {
  const classes = useStyles();

  return (
    <Link to="/" className={classes.link}>
      <h1 className={classes.title}>
        DB<span className={classes.sub}>log</span>
      </h1>
    </Link>
  );
};

export default Logo;
