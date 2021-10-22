import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { TextField } from "@mui/material";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core";

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
    color: "#ffffff",
  },
  input: { backgroundColor: "#fff", border: "none", outline: "none" },
});

const SignIn = () => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const signinHandler = (e) => {
    e.preventDefault();
  };

  return (
    <ThemeProvider theme={theme}>
      {/* <Meta metaTags={metaTags} /> */}
      <Box>
        <Container component="main" className={classes.root} maxWidth="xs">
          <div>
            <Box
              sx={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              onSubmit={signinHandler}
            >
              <Avatar style={{ backgroundColor: "#f75050" }} color="primary">
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
            </Box>
            <Box component="form">
              <TextField
                label="Email"
                variant="outlined"
                placeholder="Enter Email"
                fullWidth
                value={email}
                name="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                margin="normal"
                autoComplete="email"
                autoFocus
                className={classes.input}
              />

              <TextField
                margin="normal"
                label="Password"
                variant="outlined"
                placeholder="Enter Password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
                className={classes.input}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={loading}
                onClick={signinHandler}
              >
                Sign In
              </Button>
            </Box>
          </div>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default SignIn;
