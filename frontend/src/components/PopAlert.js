import React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useSelector, useDispatch } from "react-redux";

import { hideSnackBar } from "../redux/actions/uiActions";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function PopAlert() {
  const dispatch = useDispatch();

  const UI = useSelector((state) => state.UI);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(hideSnackBar());
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={UI.snackBarOpen}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={UI?.snackBarType}
          sx={{ width: "100%" }}
        >
          {UI?.snackBarMessage}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
