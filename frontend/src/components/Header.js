import React from "react";
import { Container, makeStyles } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { IconButton, Avatar } from "@mui/material";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

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
  search: {
    padding: "12px",
  },
});

const Header = () => {
  const classes = useStyles();
  const location = useLocation();

  const { isAuth, user } = useSelector((state) => state.userData);

  if (location?.pathname?.split("/")[1] === "dashboard") return null;

  return (
    <div className={classes.header}>
      <Container maxWidth="xl">
        <nav className={classes.nav}>
          <div>
            <IconButton
              aria-label="search"
              className={classes.search}
              color="inherit"
            >
              <Facebook className={classes.facebook} />
            </IconButton>
            <IconButton
              aria-label="search"
              className={classes.search}
              color="inherit"
            >
              <Twitter className={classes.facebook} />
            </IconButton>
            <IconButton
              aria-label="search"
              className={classes.search}
              color="inherit"
            >
              <Instagram className={classes.facebook} />
            </IconButton>
          </div>

          <Logo />

          <div className={classes.left}>
            {!isAuth && (
              <NavLink className={classes.links} to="/signup">
                signup
              </NavLink>
            )}

            {!isAuth && (
              <NavLink className={classes.links} to="/signin">
                signin
              </NavLink>
            )}

            {isAuth && <DropDown display={<Avatar title={user?.name} />} />}
          </div>
        </nav>
      </Container>
    </div>
  );
};

export default Header;
