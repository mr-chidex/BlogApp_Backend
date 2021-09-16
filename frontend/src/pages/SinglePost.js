import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Message from "../components/Message";
import { getPostAction } from "../redux/actions/postActions";

const SinglePost = () => {
  const [alerts, setAlerts] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();

  const { loading, post, error, message } = useSelector(
    (state) => state.blogPost
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getPostAction(params.postId));
    setAlerts(true);
  }, [params, dispatch]);

  return (
    <div className="text-center " style={{ marginTop: "6rem" }}>
      {alerts && error && <Message status="error">{message}</Message>}
      {loading ? (
        <div className="defaultImage"></div>
      ) : (
        <main className="container-lg main mt-5">
          <h1 className="my-3"> {post?.title}</h1>
          <div className="w-75 mx-auto">
            <img
              src={post?.image?.url}
              alt={post?.title}
              className="my-2 img-fluid"
            />
          </div>
          <p>{post?.content}</p>
        </main>
      )}
    </div>
  );
};

export default SinglePost;
