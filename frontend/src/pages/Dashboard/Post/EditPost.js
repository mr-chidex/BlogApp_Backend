import { makeStyles } from "@material-ui/core";
import { Paper } from "@mui/material";
import {
  Container,
  Grid,
  Button,
  Typography,
  IconButton,
  Box,
  TextField,
  CircularProgress,
} from "@mui/material";
import React, { useState, useRef } from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { useParams, useLocation } from "react-router-dom";

import { Delete } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import axios from "axios";
import Files from "react-files";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import DashboardNav from "../dashboard";
import Meta from "../../../components/Meta";
import { setSnackbar } from "../../../redux/actions/uiActions";
import Loader from "../../../components/Loader";
import { useEffect } from "react";

const useStyles = makeStyles({
  title: {
    textAlign: "center",
    fontWeight: 300,
    marginBottom: "0.8rem",
  },
  buttonBox: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  submit: { backgroundColor: "#f8633b" },
  preview: { width: 80, height: "100", paddingLeft: 10 },
  image: {
    width: "100%",
  },
  deleteButton: { color: "red" },
});

const metaTags = {
  title: "DBlog - Add Post content",
};

const EditPost = () => {
  const classes = useStyles();
  const params = useParams();
  const location = useLocation();
  const edit = location?.search?.split("=")[1];
  const dispatch = useDispatch();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const filesRef = useRef("");
  const [content, setContent] = useState("");

  const postSchema = yup.object().shape({
    title: yup.string().required().label("Post title"),
  });

  const initialValues = {
    title: "",
  };

  useEffect(() => {
    if (params?.postId && edit) {
      setLoading(true);
      (async () => {
        try {
          const { data } = await axios.get(
            `${process.env.REACT_APP_BLOG_API}/api/posts/${params?.postId}`
          );
          setContent(data?.post?.content);
          setPost(data?.post);
          setLoading(false);
        } catch (error) {
          error.response && error.response.data.message
            ? dispatch(setSnackbar(error.response.data.message, "error"))
            : dispatch(setSnackbar(error.message, "error"));
          setLoading(false);
        }
      })();
    }
  }, [dispatch, params, edit]);

  if (params?.postId && edit) {
    initialValues.title = post?.title;
  }

  const handleContentChange = (value) => {
    setContent(value);
  };

  const onFilesChange = (files) => {
    setImage(files);
  };

  const onFilesError = (error, file) => {
    console.log("error code " + error.code + ": " + error.message);
    dispatch(setSnackbar(`${error.message}`, "warning"));
  };

  const filesRemoveOne = (file) => {
    filesRef.current.state.files = [];
    filesRef.current.removeFile(file);
  };

  const maxFileCount = 1;

  const handleSubmit = async (values, helpers) => {
    if (content.length < 12)
      return dispatch(setSnackbar(`course content too small`, "warning"));

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", content);

    if (params?.postId && edit) {
      if (image[0]) {
        formData.append("image", image[0]);
      }
      axios
        .put(
          `${process.env.REACT_APP_BLOG_API}/api/posts/${params.postId}`,
          formData
        )
        .then(() => {
          dispatch(setSnackbar(`updated successfully `, "success"));

          helpers.setSubmitting(false);
        })
        .catch((error) => {
          error.response && error.response.data.message
            ? dispatch(setSnackbar(error.response.data.message, "error"))
            : dispatch(setSnackbar(error.message));
          helpers.setSubmitting(false);
        });
      return;
    }

    if (!image[0])
      return dispatch(setSnackbar(`No blog image not added`, "warning"));

    formData.append("image", image[0]);

    try {
      await axios.post(`${process.env.REACT_APP_BLOG_API}/api/posts`, formData);
      dispatch(setSnackbar("Added successfully", "success"));
      helpers.setSubmitting(false);
      helpers.resetForm();
      filesRemoveOne();
    } catch (error) {
      error.response && error.response.data.message
        ? dispatch(setSnackbar(error.response.data.message, "error"))
        : dispatch(setSnackbar(error.message, "error"));
      helpers.setSubmitting(false);
    }
  };

  return (
    <DashboardNav>
      <Meta metaTags={metaTags} />
      {loading ? (
        <Loader />
      ) : (
        <Container maxWidth="lg">
          <h1 className={classes.title}>
            {params?.postId && edit ? "Edit Post Content" : "Add Post Content"}
          </h1>

          <Formik
            validateOnBlur
            validateOnChange
            validationSchema={postSchema}
            initialValues={initialValues}
            onSubmit={(values, helpers) => handleSubmit(values, helpers)}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              isSubmitting,
            }) => (
              <Form noValidate>
                <Paper>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Box pl={2} pr={2}>
                        <Field
                          error={errors.title && touched.title}
                          helperText={errors.title}
                          variant="outlined"
                          type="text"
                          margin="normal"
                          required
                          fullWidth
                          label="Post Title"
                          name="title"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          as={TextField}
                          value={values.title}
                        />
                      </Box>
                    </Grid>

                    <Grid item xs={12}>
                      <Box
                        mt={2}
                        mb={2}
                        sx={{
                          border: "solid 1px #152779",
                          padding: "1rem",
                          margin: "1rem",
                          color: "#152779",
                          cursor: "pointer",
                        }}
                      >
                        <Files
                          ref={filesRef}
                          className="addwincampaign-dropzone"
                          onChange={onFilesChange}
                          onError={onFilesError}
                          accepts={["image/*"]}
                          maxFiles={maxFileCount}
                          maxFileSize={800000}
                          minFileSize={1}
                          clickable
                        >
                          <Typography align="center" gutterBottom>
                            Click or Drop post image here, max({maxFileCount})
                          </Typography>
                        </Files>
                        <div>
                          {image[0]?.preview?.url && (
                            <>
                              <img
                                className={classes.preview}
                                alt={image[0].name}
                                src={image[0]?.preview?.url}
                              />
                              <IconButton
                                className={classes.deleteButton}
                                onClick={() => filesRemoveOne(image)}
                              >
                                <Delete />
                              </IconButton>
                            </>
                          )}
                        </div>
                      </Box>
                    </Grid>

                    <Grid item xs={12}>
                      <Box pl={2} pr={2} mt={2} mb={2}>
                        <Typography align="left" gutterBottom>
                          Post Content
                        </Typography>
                        <ReactQuill
                          value={content}
                          onChange={handleContentChange}
                          defaultValue={content}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
                <Box mt={4} className={classes.buttonBox}>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                    color="primary"
                    className={classes.submit}
                    size="large"
                  >
                    {isSubmitting ? (
                      <>
                        <CircularProgress size="1rem" /> &nbsp;Submitting{" "}
                      </>
                    ) : (
                      <> {params?.postId && edit ? "Update" : "Submit"}</>
                    )}
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Container>
      )}
    </DashboardNav>
  );
};

export default EditPost;
