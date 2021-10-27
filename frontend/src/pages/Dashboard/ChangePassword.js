import React from "react";
import {
  CircularProgress,
  Container,
  Paper,
  TextField,
  Box,
  Button,
  Grid,
} from "@mui/material";
import { useDispatch } from "react-redux";
import axios from "axios";
import { makeStyles } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";

import Dashboard from "./dashboard";
import Meta from "../../components/Meta";
import { setSnackbar } from "../../redux/actions/uiActions";

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
});

const metaTags = {
  title: "DBlog - Change Password",
};

const ChangePassword = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const passwordSchema = yup.object().shape({
    password: yup.string().required().label("Password"),
  });

  const initialValues = {
    password: "",
  };

  const handleSubmit = async (values, helpers) => {
    try {
      await axios.put(`${process.env.REACT_APP_BLOG_API}/api/users/password`, {
        password: values.password,
      });
      dispatch(setSnackbar("password successfully updated", "success"));
      helpers.setSubmitting(false);
      helpers.resetForm();
    } catch (error) {
      error.response && error.response.data.message
        ? dispatch(setSnackbar(error.response.data.message, "error"))
        : dispatch(setSnackbar(error.message, "error"));
      helpers.setSubmitting(false);
    }
  };

  return (
    <Dashboard>
      <Meta metaTags={metaTags} />
      <Container component="main" maxWidth="lg">
        <h1 className={classes.title}>Change Password</h1>

        <Formik
          initialValues={initialValues}
          validationSchema={passwordSchema}
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
                        error={errors.password && touched.password}
                        helperText={errors.password}
                        variant="outlined"
                        type="password"
                        margin="normal"
                        required
                        fullWidth
                        label="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        as={TextField}
                        value={values.password}
                      />
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
                      <> Update Password</>
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

export default ChangePassword;
