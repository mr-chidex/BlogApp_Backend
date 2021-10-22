import React, { useState, useEffect } from "react";
import { Container, Paper, Box, Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";

import Dashboard from "../dashboard";
import Meta from "../../../components/Meta";
import { setSnackbar } from "../../../redux/actions/uiActions";
import Loader from "../../../components/Loader";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  title: {
    textAlign: "center",
    fontWeight: 300,
    marginBottom: "0.8rem",
  },
  subTitle: { fontWeight: 300, textTransform: "uppercase" },
  buttonBox: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  imageContainer: {
    width: "10rem",
  },
  image: {
    width: "100%",
  },
  boxContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "0.8rem",
  },
  btnContainer: { display: "flex", justifyContent: "flex-end" },
  btn: {
    backgroundColor: "#f8633b",
    color: "#fff",
    marginRight: "1rem",
  },
  paper: { padding: "1rem" },
});

const metaTags = {
  title: "DBlog - Post content",
};

const Post = () => {
  const classes = useStyles();
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BLOG_API}/api/posts/${params?.postId}`
        );

        setPost(data?.post);
        setLoading(false);
      } catch (error) {
        error.response && error.response.data.message
          ? dispatch(setSnackbar(error.response.data.message, "error"))
          : dispatch(setSnackbar(error.message, "error"));
        setLoading(false);
      }
    })();
  }, [dispatch, params]);

  return (
    <Dashboard>
      <Meta metaTags={metaTags} />

      {loading ? (
        <Loader />
      ) : (
        <Container maxWidth="lg">
          <h1 className={classes.title}>Blog Content</h1>

          <Paper elevation={1} className={classes.paper}>
            <Box className={classes.boxContainer}>
              <h4 className={classes.subTitle}>Author: &nbsp;</h4>{" "}
              <p style={{ paddingLeft: "0.5rem" }}>{post?.author?.name}</p>
            </Box>
            <Box className={classes.boxContainer}>
              <h4 className={classes.subTitle}>Title: &nbsp;</h4>{" "}
              <p style={{ paddingLeft: "0.5rem" }}>{post?.title}</p>
            </Box>
            <Box className={classes.boxContainer}>
              <h4 className={classes.subTitle}>Created At: &nbsp;</h4>{" "}
              <p style={{ paddingLeft: "0.5rem" }}>
                {new Date(post?.createdAt).toDateString()}
              </p>
            </Box>
            <Box className={classes.boxContainer}>
              <h4 className={classes.subTitle}>Image: &nbsp;</h4>
              <Box className={classes.imageContainer}>
                <img
                  className={classes.image}
                  src={post?.image?.url}
                  alt={post?.title}
                />
              </Box>
            </Box>
            <Box>
              <h4 className={classes.subTitle}>Content: &nbsp;</h4>{" "}
              <div
                style={{ padding: "1rem 2rem" }}
                dangerouslySetInnerHTML={{ __html: post?.content }}
              ></div>
            </Box>

            <Box className={classes.btnContainer}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                className={classes.btn}
                onClick={() =>
                  history.push(
                    `/dashboard/edit-post/${params?.postId}?edit=true`
                  )
                }
              >
                Edit
              </Button>
            </Box>
          </Paper>
        </Container>
      )}
    </Dashboard>
  );
};

export default Post;
