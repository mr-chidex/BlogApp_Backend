import React, { useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { TextField, CircularProgress } from "@mui/material";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";

import Meta from "../components/Meta";

const metaTags = {
  title: "DBlog - Sign up form",
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#f75050",
    },
    secondary: {
      main: "#f75050",
    },
  },
});

const useStyles = makeStyles({
  root: {
    display: "grid",
    placeItems: "center",
    height: "100vh",
    color: "#000",
  },
  container: { padding: "1rem", backgroundColor: "#fff" },
  submit: {
    display: "block",
    width: "100%",
  },
});

const signupSchema = yup.object().shape({
  email: yup.string().email().required().label("Email Address"),
  password: yup.string().min(4).required().label("Password"),
  name: yup.string().required().min(2).label("Full Name"),
});

const SignUp = () => {
  const classes = useStyles();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const signupHandler = (values, helpers) => {
    console.log(values);
    helpers.setSubmitting(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Meta metaTags={metaTags} />
      <Box>
        <Container component="main" className={classes.root} maxWidth="xs">
          <div className={classes.container}>
            <Box
              sx={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar style={{ backgroundColor: "#f75050" }} color="primary">
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign Up
              </Typography>
            </Box>

            <Formik
              validateOnBlur
              validateOnChange
              validationSchema={signupSchema}
              initialValues={initialValues}
              onSubmit={(values, helpers) => signupHandler(values, helpers)}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                isSubmitting,
              }) => (
                <Box component="main">
                  <Form noValidate>
                    <Field
                      error={errors.name && touched.name}
                      helperText={errors.name}
                      variant="outlined"
                      type="text"
                      margin="normal"
                      required
                      fullWidth
                      label="Full Name"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      as={TextField}
                      value={values.name}
                    />

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

                    <Field
                      error={errors.password && touched.password}
                      helperText={errors.password}
                      variant="outlined"
                      type="password"
                      margin="normal"
                      required
                      fullWidth
                      label="Password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      as={TextField}
                      value={values.password}
                    />
                    <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="Remember me"
                    />

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
                        <> Submit</>
                      )}
                    </Button>
                  </Form>
                </Box>
              )}
            </Formik>
          </div>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default SignUp;
