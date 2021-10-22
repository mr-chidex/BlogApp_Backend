import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Pagination } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "1rem",
    display: "flex",
    justifyContent: "flex-end",
    color: "#fff",

    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function PaginationTab() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Pagination
        sx={{ color: "white" }}
        count={3}
        size="small"
        shape="circular"
        color="primary"
      />
    </div>
  );
}
