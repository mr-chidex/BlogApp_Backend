import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import openSocket from "socket.io-client";
import Message from "../components/Message";

const Home = ({ history }) => {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const defaultPosts = 5;

  const { user } = useSelector((state) => state.userLogin);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const fetchPosts = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_POST_API}?page=${page}`
      );
      setIsLoading(false);
      setPosts(data.posts);
      const lastPage = Math.ceil(data.totalPost / 5);
      setLastPage(lastPage);
    } catch (error) {
      setError(true);
      setMessage(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
      setIsLoading(false);
    }
  }, [page]);

  const addIO = useCallback(
    (post) => {
      setPosts((prevPost) => {
        const isExist = prevPost.find((p) => p._id === post._id);
        if (isExist) {
          return prevPost;
        }
        const updatedPosts = [...prevPost];
        if (page === 1) {
          updatedPosts.unshift(post);
          // updatedPosts.pop();
        }

        return updatedPosts;
      });
    },
    [page]
  );

  const updateIO = useCallback((post) => {
    setPosts((prevPost) => {
      const updatedPosts = [...prevPost];
      const updatedPostIndex = updatedPosts.findIndex(
        (p) => p._id === post._id
      );
      if (updatedPostIndex > -1) {
        updatedPosts[updatedPostIndex] = post;
      }

      return updatedPosts;
    });
  }, []);

  const deleteIO = useCallback(
    (post) => {
      if (posts.length < 3) {
        fetchPosts();
      }
      setPosts((prevPost) => {
        const updatedPosts = [...prevPost];
        const newPost = updatedPosts.filter((p) => p._id !== post._id);

        return newPost;
      });
    },
    [fetchPosts, posts.length]
  );

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    const socket = openSocket(process.env.REACT_APP_BASEURL);

    socket.on("posts", (data) => {
      switch (data.action) {
        case "CREATE_POST":
          addIO(data.post);
          break;
        case "UPDATE_POST":
          updateIO(data.post);
          break;
        case "DELETE_POST":
          deleteIO(data.post);
          break;
        default:
          return;
      }
    });
  }, [addIO, updateIO, deleteIO]);

  const deletePost = async (postId) => {
    try {
      setIsLoading(true);
      const { data } = await axios({
        url: `${process.env.REACT_APP_POST_API}/${postId}`,
        method: "DELETE",
        headers: {
          Authorization:
            localStorage.getItem("NODE_USER") &&
            JSON.parse(localStorage.getItem("NODE_USER")).token
              ? JSON.parse(localStorage.getItem("NODE_USER")).token
              : "",
        },
      });
      setSuccess(true);
      setMessage(data.message);
      setIsLoading(false);
    } catch (error) {
      setMessage(error.response.data.message);
      setError(true);
      setIsLoading(false);
    }
  };

  const paginationHandler = (index) => {
    setPage(index + 1);
  };

  const removeMessage = () => {
    setError(false);
    setSuccess(false);
  };
  return (
    <>
      <div className="hero-container mb-3">
        <div className="hero"></div>
        <h1 className="text-center my-3 header-hero">
          Welcome To Mr-Chidex Blog
        </h1>
      </div>

      <main className="container-lg main">
        {user && user.name && (
          <button
            onClick={() => history.push("/new")}
            className="btn btn-success d-inline-block me-auto mb-4"
          >
            NEW POST
          </button>
        )}

        {isLoading && (
          <div className="default">
            {[...Array(defaultPosts)].map((post, index) => (
              <div className="defaultPost" key={index}></div>
            ))}
          </div>
        )}

        {success && (
          <Message status="success" click={removeMessage}>
            {message}
          </Message>
        )}

        {error && (
          <Message status="error" click={removeMessage}>
            {message}
          </Message>
        )}

        {posts.length > 0
          ? posts.map((post) => (
              <div className="card my-4" key={post._id}>
                <div className="card-body">
                  <small>
                    Posted by {post.author.name} on{" "}
                    {new Date(post.createdAt).toLocaleDateString()}
                  </small>
                  <h1>{post.title}</h1>
                  <div className="w-25 image-container  ">
                    <img
                      src={process.env.REACT_APP_BASEURL + "" + post.image}
                      alt={post.title}
                      className="rounded img-fluid mx-auto d-inline-block"
                    />
                  </div>
                  <p>{post.content.substring(0, 400)}...</p>
                </div>

                <div className=" w-100 mb-3 mx-1">
                  <button
                    onClick={() => history.push(`/post/${post._id}`)}
                    className="btn btn-info btn-sm mx-1 px-3"
                  >
                    Read More...
                  </button>
                  {user && user.name && (
                    <>
                      <button
                        className="btn btn-secondary btn-sm px-3 mx-2"
                        onClick={() =>
                          history.push(`/new/${post._id}?edit=true`)
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger px-3 btn-sm mx-1"
                        onClick={() => deletePost(post._id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          : !isLoading && <h1>No available posts</h1>}

        <nav aria-label="Page navigation example">
          <ul className="pagination  justify-content-center">
            {[...Array(lastPage)].map((page, index) => (
              <button
                className="page-link btn-sm"
                key={index}
                onClick={() => paginationHandler(index)}
              >
                {index + 1}
              </button>
            ))}
          </ul>
        </nav>
      </main>
    </>
  );
};

export default Home;
