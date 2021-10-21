import React from "react";
import { Container, makeStyles } from "@material-ui/core";
import { NavLink } from "react-router-dom";

import { IconButton, Avatar } from "@mui/material";
import { Facebook, Instagram, Twitter } from "@material-ui/icons";
import Logo from "./Logo";

const useStyles = makeStyles({
  facebook: {
    color: "#fff",
  },
  header: {
    backgroundColor: "#111",
    color: "#fff",
    padding: "0.5rem 0",
    marginBottom: "1rem",
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  links: {
    textDecoration: "none",
    color: "#fff",
    marginRight: "0.6rem",
  },
  left: {
    display: "flex",
    alignItems: "center",
  },
});

const Header = () => {
  const classes = useStyles();

  return (
    <div className={classes.header}>
      <Container maxWidth="xl">
        <nav className={classes.nav}>
          <div className="desktop">
            <IconButton
              aria-label="search"
              className="search-icon"
              color="inherit"
            >
              <Facebook className={classes.facebook} />
            </IconButton>
            <IconButton
              aria-label="search"
              className="search-icon"
              color="inherit"
            >
              <Twitter className={classes.facebook} />
            </IconButton>
            <IconButton
              aria-label="search"
              className="search-icon"
              color="inherit"
            >
              <Instagram className={classes.facebook} />
            </IconButton>
          </div>

          <Logo />

          <div className={classes.left}>
            <NavLink className={classes.links} to="/">
              Signin
            </NavLink>

            <IconButton>
              <Avatar fontSize="small" size="small" />
            </IconButton>
          </div>
        </nav>
      </Container>
    </div>
  );
};

export default Header;
