import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Container,
  Grid,
} from "@mui/material";

import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import NotesIcon from "@material-ui/icons/Notes";

import axios from "axios";
import { useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

import { setSnackbar } from "../redux/actions/uiActions";
import PaginationTab from "../components/PaginationTab";
import MediaCard from "../components/MediaCard";
import SideBar from "../components/SideBar";

const useStyles = makeStyles({
  media: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});

const Home = () => {
  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [countPerPage, setCountPerPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();
  const defaultPosts = 5;
  const limit = 20;
  const classes = useStyles();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BLOG_API}/api/posts?page=${page}&limit=${limit}`
        );
        console.log(data?.result?.data);
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

  const mainFeaturedPost = {
    title:
      "Naira crashes to record N557/$1 at black market as demand pressure worsens",
    description:
      "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
    image: "https://source.unsplash.com/random",
    imageText: "main image description",
    linkText: "Continue reading…",
    category: "business",
    url: "/naira-crashes-to-record",
  };

  const newsData = [
    {
      title:
        "Naira crashes to record 1/$1 at black market as demand pressure worsens",
      description: `Cras mattis consectetur purus sit amet fermentum.
        Cras justo odio, dapibus ac facilisis in, egestas
        eget quam. Mor`,
      image: "https://picsum.photos/250/300",
      author: "Harry",
      date: "Dec 23, 2021",
      category: "market",
      url: "Naira-crashes-to-record",
      id: 1,
    },
    {
      title:
        "BTC crashes to record N557/$1 at black market as demand pressure worsens",
      description: `Cras mattis consectetur purus sit amet fermentum.
        Cras justo odio, dapibus ac facilisis in, egestas
        eget quam. Mor`,
      image: "https://picsum.photos/150/200",
      author: "Harry",
      date: "Dec 23, 2021",
      category: "business",
      url: "Naira-crashes-to-record",
      id: 2,
    },
    {
      title:
        "Naira crashes to record 1/$1 at black market as demand pressure worsens",
      description: `Cras mattis consectetur purus sit amet fermentum.
        Cras justo odio, dapibus ac facilisis in, egestas
        eget quam. Mor`,
      image: "https://picsum.photos/250/350",
      author: "Harry",
      date: "Dec 23, 2021",
      category: "economy",
      url: "Naira-crashes-to-record",
      id: 3,
    },
    {
      title:
        "BTC crashes to record N557/$1 at black market as demand pressure worsens",
      description: `Cras mattis consectetur purus sit amet fermentum.
        Cras justo odio, dapibus ac facilisis in, egestas
        eget quam. Mor`,
      image: "https://picsum.photos/180/320",
      author: "Harry",
      date: "Dec 23, 2021",
      category: "economy",
      url: "Naira-crashes-to-record",
      id: 4,
    },
    {
      title:
        "BTC crashes to record N557/$1 at black market as demand pressure worsens",
      description: `Cras mattis consectetur purus sit amet fermentum.
        Cras justo odio, dapibus ac facilisis in, egestas
        eget quam. Mor`,
      image: "https://picsum.photos/160/370",
      author: "Harry",
      date: "Dec 23, 2021",
      category: "business",
      url: "Naira-crashes-to-record",
      id: 5,
    },
    {
      title:
        "BTC crashes to record N557/$1 at black market as demand pressure worsens",
      description: `Cras mattis consectetur purus sit amet fermentum.
        Cras justo odio, dapibus ac facilisis in, egestas
        eget quam. Mor`,
      image: "https://picsum.photos/120/340",
      author: "Harry",
      date: "Dec 23, 2021",
      category: "business",
      url: "Naira-crashes-to-record",
      id: 6,
    },
    {
      title:
        "BTC crashes to record N557/$1 at black market as demand pressure worsens",
      description: `Cras mattis consectetur purus sit amet fermentum.
        Cras justo odio, dapibus ac facilisis in, egestas
        eget quam. Mor`,
      image: "https://picsum.photos/180/370",
      author: "Harry",
      date: "Dec 23, 2021",
      category: "business",
      url: "Naira-crashes-to-record",
      id: 7,
    },
  ];

  return (
    <main className="home">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Box
              sx={{
                backgroundColor: "grey.800",
                color: "#fff",
                height: "400px",
                width: "100%",
                mb: 4,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundImage: `url(${mainFeaturedPost?.image})`,
              }}
              className="featured-news"
            >
              <div className="featured-content">
                <div className="featured-news-content">
                  <h1>{mainFeaturedPost.title}</h1>
                  <div className="featured-news-content__timer">
                    <span className="name">By: Mr-Chidex</span>{" "}
                    <EventAvailableIcon className="icon" fontSize="small" />{" "}
                    <span>Dec 23, 2021</span>
                  </div>
                  <p>{mainFeaturedPost.description.substr(0, 200)}...</p>
                  <Link to={`/2323384y384`}>{mainFeaturedPost.linkText}</Link>
                </div>
              </div>
            </Box>

            {posts?.length > 0 ? (
              <div className="latest-news">
                <div className="latest-news-header">
                  <NotesIcon className="icon" fontSize="large" />
                  <h1>Recent Posts</h1>
                </div>

                {posts?.map((post) => (
                  <Card
                    key={post?.id}
                    className="latest-news-card"
                    onClick={() => history.push(`/${post?._id}`)}
                  >
                    <CardActionArea>
                      <div className="latest-news-content">
                        <div className="info">
                          <h3>{post.title}</h3>
                          <div className="featured-news-content__timer">
                            <span className="name">
                              By: {post?.author?.name}
                            </span>{" "}
                            <EventAvailableIcon
                              className="icon"
                              fontSize="small"
                            />{" "}
                            <span>
                              {new Date(post.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <p>{post?.content?.substring(0, 400)}...</p>
                        </div>

                        <div className="image-container">
                          <CardMedia
                            className={classes.media}
                            image={post?.image?.url}
                            title="Live from space album cover"
                            component="img"
                          />
                        </div>
                      </div>
                    </CardActionArea>
                  </Card>
                ))}

                <PaginationTab
                  totalPage={totalPage}
                  countPerPage={countPerPage}
                  page={page}
                />
              </div>
            ) : null}

            {/***weekly top */}
            <div className="latest-news spotlight-news">
              <div className="latest-news-header">
                <NotesIcon className="icon" fontSize="large" />
                <h1>weekly top</h1>
              </div>

              <div className="spotlight-news__content">
                {newsData?.map((post, index) => (
                  <MediaCard key={index} post={post} />
                ))}
              </div>

              <PaginationTab />
            </div>
          </Grid>

          {/**Side Bar */}
          <Grid item md={4} xs={12}>
            <SideBar />
          </Grid>
        </Grid>
      </Container>
    </main>
  );
};

export default Home;
