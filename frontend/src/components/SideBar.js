import React, { useState } from "react";
import { Link } from "react-router-dom";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { Button, IconButton, TextField } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import axios from "axios";
import { makeStyles } from "@material-ui/core";

import { setSnackbar } from "../redux/actions/uiActions";

const useStyles = makeStyles({
  btn: { backgroundColor: "#eee" },
});

const SideBar = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();

  const subscribeHandler = async () => {
    try {
      setLoading(true);
      await axios.post(`${process.env.REACT_APP_BLOG_API}/api/news-letter`, {
        email,
      });
      dispatch(setSnackbar("successfully subscribed", "success"));
      setLoading(false);
    } catch (error) {
      error.response && error.response.data.message
        ? dispatch(setSnackbar(error.response.data.message, "error"))
        : dispatch(setSnackbar(error.message, "error"));
      setLoading(false);
    }
  };

  return (
    <div className="side-bar">
      <div className="search-bar">
        <div className="form-control">
          <input type="text" placeholder="Search anything" />
          <IconButton
            aria-label="search"
            className="search-icon"
            color="inherit"
          >
            <Search />
          </IconButton>
        </div>
      </div>

      <h1>Spotlight</h1>
      {[...Array(4)].map((_, index) => (
        <Link key={index} to="/">
          <p>
            <ArrowRightIcon className="arrow" />
            dolor sit amet consectetur adipisicing elit. Quaerat modi quibusdam,
            ipsum voluptas, repellat incidunt quae ex delectus error similique
            blanditiis nequ
          </p>
        </Link>
      ))}

      <div className="news-letter">
        <h2>News Letter</h2>

        <div className="form">
          <TextField
            fullWidth
            variant="outlined"
            type="email"
            margin="normal"
            label="Email"
            name="email"
            className="news-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            className={loading ? classes.btn : "btn"}
            disabled={loading}
            onClick={subscribeHandler}
          >
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
