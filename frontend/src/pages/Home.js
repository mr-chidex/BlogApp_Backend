import React, { useEffect, useState } from "react";
// import openSocket from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";

import { getPostsAction, deletePostAction } from "../redux/actions/postActions";
import Message from "../components/Message";

const Home = ({ history }) => {
  const [page, setPage] = useState(1);
  const [alerts, setAlerts] = useState(false);
  const [posts, setPosts] = useState([]);

  const defaultPosts = 5;
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.userLogin);
  const {
    posts: apiPosts,
    loading,
    totalPost,
    error,
    message,
  } = useSelector((state) => state.blogPost);

  const lastPage = totalPost && Math.ceil(totalPost / 5);

  useEffect(() => {
    if (apiPosts) {
      setPosts(apiPosts);
    }
  }, [apiPosts]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  useEffect(() => {
    dispatch(getPostsAction(page));
    setAlerts(true);
  }, [page, dispatch]);

  const deletePost = async (postId) => {
    setPosts((prev) => prev.filter((post) => post._id !== postId));
    dispatch(deletePostAction(postId));
    setAlerts(true);
  };

  const paginationHandler = (index) => {
    setPage(index + 1);
  };

  return (
    <>
      <div className="hero-container mb-3">
        <div className="hero"></div>
        <div className="text-center my-3 header-hero">
          <h1>Get the best news in a split second &#128513;.</h1>
          <h3>A Home away from home</h3>
        </div>
      </div>

      <main className="container-lg main">
        {user?.name && (
          <button
            onClick={() => history.push("/new")}
            className="btn btn-success d-inline-block me-auto mb-4"
          >
            NEW POST
          </button>
        )}

        {loading && (
          <div className="default">
            {[...Array(defaultPosts)].map((post, index) => (
              <div className="defaultPost" key={index}></div>
            ))}
          </div>
        )}

        {alerts && error && <Message status="error">{message}</Message>}

        {posts?.length > 0
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
                      src={post.image?.url}
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
                  {user?.name && (
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
          : !loading && <h1>No available posts</h1>}

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
