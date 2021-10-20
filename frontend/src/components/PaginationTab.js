import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "1rem",
    display: "flex",
    justifyContent: "flex-end",

    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function PaginationTab() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Pagination count={3} size="small" shape="rounded" />
    </div>
  );
}
