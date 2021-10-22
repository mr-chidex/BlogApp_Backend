import React from "react";
import { Container, makeStyles } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { IconButton, Avatar } from "@mui/material";
import { Facebook, Instagram, Twitter } from "@material-ui/icons";
import { useLocation } from "react-router-dom";
import Logo from "./Logo";
import DropDown from "./DropDown";

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
  const location = useLocation();

  if (location?.pathname?.split("/")[1] === "dashboard") return null;

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
            <NavLink className={classes.links} to="/signup">
              signup
            </NavLink>

            <NavLink className={classes.links} to="/signin">
              signin
            </NavLink>

            <DropDown display={<Avatar />} />
          </div>
        </nav>
      </Container>
    </div>
  );
};

export default Header;
