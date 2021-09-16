import React, { useEffect, useState } from "react";
import axios from "axios";

const SinglePost = ({ match }) => {
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchSinglePost = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `${process.env.REACT_APP_BLOG_API}/api/posts/${match.params.postId}`
        );
        setPost(data.post);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };

    fetchSinglePost();
  }, [match]);

  return (
    <div className="text-center " style={{ marginTop: "6rem" }}>
      {isLoading ? (
        <div className="defaultImage"></div>
      ) : (
        <main className="container-lg main mt-5">
          <h1 className="my-3"> {post.title}</h1>
          <div className="w-75 mx-auto">
            <img
              src={process.env.REACT_APP_BASEURL + "" + post.image}
              alt={post.title}
              className="my-2 img-fluid"
            />
          </div>
          <p>{post.content}</p>
        </main>
      )}
    </div>
  );
};

export default SinglePost;
