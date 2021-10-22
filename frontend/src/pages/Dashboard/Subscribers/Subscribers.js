import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import { Delete } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import axios from "axios";
import { makeStyles } from "@material-ui/core";

import Dashboard from "../dashboard";
import Meta from "../../../components/Meta";
import { setSnackbar } from "../../../redux/actions/uiActions";
import Loader from "../../../components/Loader";

const metaTags = {
  title: "DBlog -News Letter Subscribers",
};

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
  content: {
    backgroundColor: "#fff",
    boxShadow: "1px 1px 1px 2px #eee",
  },
  submit: { backgroundColor: "#152779" },
  paper: {
    paddingL: "1rem  0",
  },
});

const Subscribers = () => {
  const classes = useStyles();
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const limit = 50;
  const [countPerPage, setCountPerPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BLOG_API}/subscribers?limit=${limit}&offset=${page}`
        );

        setSubscribers(data?.result?.data);
        setTotalPage(data?.result?.totalCount);
        setCountPerPage(data?.result?.countPerPage);
        setLoading(false);
      } catch (error) {
        error.response && error.response.data.message
          ? dispatch(setSnackbar(error.response.data.message, "error"))
          : dispatch(setSnackbar(error.message, "error"));
        setLoading(false);
      }
    })();
  }, [dispatch, page]);

  const handlePageChange = (_, page) => {
    setPage(page);
  };

  const deleteHandler = async (subId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BLOG_API}/subscribers/${subId}`
      );
      dispatch(setSnackbar("deleted successfully", "success"));
      setSubscribers((prev) => prev.filter((cat) => cat._id !== subId));
      setTotalPage((prevPage) => prevPage - 1);
    } catch (error) {
      error.response && error.response.data.message
        ? dispatch(setSnackbar(error.response.data.message, "error"))
        : dispatch(setSnackbar(error.message, "error"));
    }
  };

  return (
    <Dashboard>
      <Meta metaTags={metaTags} />
      {loading ? (
        <Loader />
      ) : (
        <Container maxWidth="md">
          <h1 className={classes.title}>News Letter Subscribers</h1>

          {subscribers?.length < 1 ? (
            <Box m={5}>
              <Typography variant="h5" align="center">
                Sorry, there are currently no news letter subscribers
              </Typography>
            </Box>
          ) : (
            <Paper elevation={1} className={classes.paper}>
              <TableContainer>
                <Table size="medium">
                  <TableHead>
                    <TableRow>
                      <TableCell>S/N</TableCell>
                      <TableCell align="left">Email</TableCell>
                      <TableCell align="left">Subscribed Date</TableCell>
                      <TableCell align="right">Action</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {subscribers?.map((subscriber, index) => (
                      <TableRow key={subscriber?._id}>
                        <TableCell>{index + 1}</TableCell>{" "}
                        <TableCell align="left">{subscriber?.email}</TableCell>
                        <TableCell align="left">
                          {new Date(subscriber?.createdAt).toDateString()}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            onClick={() => deleteHandler(subscriber?._id)}
                          >
                            <Delete color="secondary" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[]}
                page={page}
                rowsPerPage={countPerPage}
                count={totalPage}
                component="div"
                onPageChange={handlePageChange}
              />
            </Paper>
          )}
        </Container>
      )}
    </Dashboard>
  );
};

export default Subscribers;
