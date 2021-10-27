import React from "react";
import { Container, Paper, Box } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";

import Dashboard from "./dashboard";
import Meta from "../../components/Meta";

const metaTags = {
  title: "DBlog - User profile",
};

const useStyles = makeStyles({
  imageContainer: {
    width: 180,
    height: 180,
    margin: "1rem auto",
    backgroundColor: "#fff",
    borderRadius: 90,
    border: "solid 1px #bbb",
    padding: "0.2rem",
    display: "grid",
    placeItems: "center",
  },
  image: {
    width: "100%",
    // height: "100%",
    borderRadius: "50%",
  },
  paper: {
    padding: "1rem",
    marginTop: "2rem",
  },
  boxContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "1rem",
  },
  title: {
    fontWeight: 400,
    fontSize: "1.1rem",
    marginRight: "0.5rem",
  },
  value: {
    fontWeight: 300,
    color: "#333333",
    fontSize: "1rem",
  },
  imageText: { color: "#111" },
});
const Profile = () => {
  const classes = useStyles();

  const { user } = useSelector((state) => state.userData);

  return (
    <Dashboard>
      <Meta metaTags={metaTags} />
      <Container component="main" maxWidth="lg">
        <Box className={classes.imageContainer}>
          {user?.image?.url ? (
            <img
              className={classes.image}
              src={user?.image?.url}
              alt="profile"
            />
          ) : (
            <div className={classes.imageText}>
              <small>No Image</small>
            </div>
          )}
        </Box>

        <Paper elevation={1} className={classes.paper}>
          <Box className={classes.boxContainer}>
            <h2 className={classes.title}>Name: </h2>
            <h3 className={classes.value}>{user?.name}</h3>
          </Box>

          <Box className={classes.boxContainer}>
            <h2 className={classes.title}>Email: </h2>
            <h3 className={classes.value}>{user?.email}</h3>
          </Box>
          <Box className={classes.boxContainer}>
            <h2 className={classes.title}>Status: </h2>
            <h3 className={classes.value}>
              {user?.admin ? "Admin" : "Not Admin"}
            </h3>
          </Box>
        </Paper>
      </Container>
    </Dashboard>
  );
};

export default Profile;
