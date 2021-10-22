import React, { useState, useEffect } from "react";
import {
  Container,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { MoreHoriz } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { Box } from "@material-ui/core";
import { useDispatch } from "react-redux";
import axios from "axios";
import { makeStyles } from "@material-ui/core";

import DashboardNav from "../dashboard";
import Meta from "../../../components/Meta";
import { setSnackbar } from "../../../redux/actions/uiActions";
import Loader from "../../../components/Loader";

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

const DropDown = ({ postId, setTotalPage, setPosts }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    setAnchorEl(null);
    try {
      await axios.delete(
        `${process.env.REACT_APP_BLOG_API}/api/posts/${postId}`
      );
      dispatch(setSnackbar("deleted successfully", "success"));
      setPosts((prev) => prev.filter((cat) => cat._id !== postId));
      setTotalPage((prevPage) => prevPage - 1);
    } catch (error) {
      error.response && error.response.data.message
        ? dispatch(setSnackbar(error.response.data.message, "error"))
        : dispatch(setSnackbar(error.message, "error"));
    }
  };

  return (
    <div>
      <IconButton
        size="small"
        variant="contained"
        color="primary"
        onClick={handleClick}
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <MoreHoriz />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => history.push(`/dashboard/post/${postId}`)}>
          View
        </MenuItem>
        <MenuItem
          onClick={() =>
            history.push(`/dashboard/edit-post/${postId}?edit=true`)
          }
        >
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </div>
  );
};

const metaTags = {
  title: "DBlog - All Post content",
};

const Posts = () => {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
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
          `${process.env.REACT_APP_BLOG_API}/api/posts?limit=${limit}&page=${page}`
        );

        setPosts(data?.result?.data);
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

  return (
    <DashboardNav>
      <Meta metaTags={metaTags} />

      {loading ? (
        <Loader />
      ) : (
        <Container maxWidth="lg">
          <h1 className={classes.title}>Your Post Content</h1>

          {posts?.length < 1 ? (
            <Box m={5}>
              <Typography variant="h5" align="center">
                Sorry, there are currently no blog content
              </Typography>
            </Box>
          ) : (
            <Paper elevation={1} className={classes.paper}>
              <TableContainer>
                <Table size="medium">
                  <TableHead>
                    <TableRow>
                      <TableCell>S/N</TableCell>
                      <TableCell align="center">Title</TableCell>
                      <TableCell align="right">Author</TableCell>
                      <TableCell align="right">Created Date</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {posts?.map((post, index) => (
                      <TableRow key={post?._id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell align="center">
                          {post?.title?.length > 30
                            ? post?.title?.substring(0, 30) + "..."
                            : post?.title}
                        </TableCell>
                        <TableCell align="right">
                          {post?.author?.name}
                        </TableCell>

                        <TableCell align="right">
                          {new Date(post?.createdAt).toDateString()}
                        </TableCell>
                        <TableCell align="right">
                          <DropDown
                            postId={post?._id}
                            dispatch={dispatch}
                            setPosts={setPosts}
                            setTotalPage={setTotalPage}
                          />
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
    </DashboardNav>
  );
};

export default Posts;
