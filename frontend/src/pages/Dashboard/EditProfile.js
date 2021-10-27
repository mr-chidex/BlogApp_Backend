import React, { useState, useRef } from "react";
import {
  CircularProgress,
  Container,
  Paper,
  TextField,
  Box,
  Button,
  Grid,
  Typography,
  IconButton,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import Files from "react-files";
import { Delete } from "@material-ui/icons";

import Dashboard from "./dashboard";
import Meta from "../../components/Meta";
import { setSnackbar } from "../../redux/actions/uiActions";

import { updateProfileAction } from "../../redux/actions/userActions";

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
  paper: {
    padding: "1rem ",
  },
  preview: { width: 80, height: "100", paddingLeft: 10 },
});

const metaTags = {
  title: "DBlog - Edit profile",
};

const EditProfile = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [image, setImage] = useState("");
  const filesRef = useRef("");

  const profileSchema = yup.object().shape({
    name: yup.string().required().label("Name"),
    email: yup.string().required().label("Email"),
  });

  const initialValues = {
    name: "",
    email: "",
  };

  const handleSubmit = async (values, helpers) => {
    await dispatch(updateProfileAction(values, image, helpers));

    filesRemoveOne();
  };

  const onFilesChange = (files) => {
    setImage(files);
  };

  const onFilesError = (error, file) => {
    dispatch(setSnackbar(`${error.message}`, "warning"));
  };

  const filesRemoveOne = (file) => {
    filesRef.current.state.files = [];
    filesRef.current.removeFile(file);
  };

  const maxFileCount = 1;

  return (
    <Dashboard>
      <Meta metaTags={metaTags} />
      <Container component="main" maxWidth="lg">
        <h1 className={classes.title}>Edit Profile</h1>

        <Formik
          initialValues={initialValues}
          validationSchema={profileSchema}
          validateOnBlur
          validateOnChange
          onSubmit={(values, helpers) => {
            handleSubmit(values, helpers);
          }}
        >
          {({
            errors,
            touched,
            handleChange,
            handleBlur,
            values,
            isSubmitting,
          }) => (
            <Form noValidate>
              <Paper className={classes.paper}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Box pl={2} pr={2}>
                      <Field
                        error={errors.name && touched.name}
                        helperText={errors.name}
                        variant="outlined"
                        type="text"
                        margin="normal"
                        required
                        fullWidth
                        label="Name"
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        as={TextField}
                        value={values.name}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box pl={2} pr={2}>
                      <Field
                        error={errors.email && touched.email}
                        helperText={errors.email}
                        variant="outlined"
                        type="email"
                        margin="normal"
                        required
                        fullWidth
                        label="Email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        as={TextField}
                        value={values.email}
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
                          Click or Drop profile image here, max({maxFileCount})
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
                </Grid>

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
                        <CircularProgress size="1rem" /> &nbsp;Updating...{" "}
                      </>
                    ) : (
                      <> Update Profile</>
                    )}
                  </Button>
                </Box>
              </Paper>
            </Form>
          )}
        </Formik>
      </Container>
    </Dashboard>
  );
};

export default EditProfile;
