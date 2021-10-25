import React, { useState } from "react";
import { Link } from "react-router-dom";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { Button, IconButton, TextField } from "@material-ui/core";
import { Search } from "@material-ui/icons";

const SideBar = () => {
  const [email, setEmail] = useState("");

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
            className="btn"
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
          >
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
