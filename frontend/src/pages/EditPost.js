import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import Message from "../components/Message";
import { generateBase64FromImage } from "../utils/image";
import {
  addPostAction,
  editPostAction,
  getPostAction,
} from "../redux/actions/postActions";

const EditPost = ({ location, match, history }) => {
  const [alerts, setAlerts] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [edit, setEdit] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const dispatch = useDispatch();
  const params = useParams();

  const { posts, loading, post, error, message, success } = useSelector(
    (state) => state.blogPost
  );
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const editSearch = location.search ? location.search.split("=")[1] : "";

  useEffect(() => {
    if (editSearch === "true") {
      dispatch(getPostAction(params.postId));
      setAlerts(true);
      // const fetchSinglePost = async (postId) => {
      //   try {
      //     const { data } = await axios.get(
      //       `${process.env.REACT_APP_BLOG_API}/api/posts/${match.params.postId}`
      //     );
      //     setEdit(true);
      //     setTitle(data.post.title);
      //     setContent(data.post.content);
      //     setEdit(true);
      //   } catch (error) {
      //     // setMessage(error.response.data.message);
      //     // setError(true);
      //   }
      // };

      // fetchSinglePost();
    }
  }, [params, editSearch, dispatch]);

  const image = useRef("");

  const addNewPostHandler = async (e) => {
    e.preventDefault();

    dispatch(addPostAction({ title, image, content }));
    setAlerts(true);
  };

  const editPost = async (e) => {
    e.preventDefault();
    if (!edit) {
      return;
    }
    const post = { title, image, content };
    dispatch(editPostAction(post, params.postId));
    setAlerts(true);
  };

  const imageChangeHandler = async () => {
    const imagepreview = await generateBase64FromImage(image.current.files[0]);
    setImagePreview(imagepreview);
  };

  return (
    <main className="container-lg main">
      <div>
        <h1 className="jumbotron display-4 text-center">
          {edit ? "Edit Blog Post" : "Add New Blog Post"}
        </h1>

        <div className="w-75 mx-auto">
          {alerts && success && <Message status="success">{message}</Message>}
          {alerts && error && <Message status="error">{message}</Message>}

          <div className="modal-body">
            <form>
              <div className="form-group">
                <label htmlFor="title">TITLE:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter title"
                  id="title"
                  required
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="image">IMAGE:</label>
                <input
                  type="file"
                  className="form-control"
                  placeholder="Enter Image"
                  id="image"
                  name="image"
                  ref={image}
                  onChange={imageChangeHandler}
                />
              </div>
              <div className=" form-group w-25">
                <img src={imagePreview} className="img-fluid w-50" alt="" />
              </div>
              <div className="form-group">
                <label htmlFor="content">CONTENT:</label>
                <textarea
                  rows="5"
                  cols="10"
                  type="text"
                  required
                  value={content}
                  className="form-control"
                  placeholder="Enter Content"
                  id="content"
                  name="content"
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              {edit ? (
                <button
                  type="submit"
                  onClick={editPost}
                  className="btn btn-primary"
                >
                  Update Post
                </button>
              ) : (
                <button
                  type="submit"
                  onClick={addNewPostHandler}
                  className="btn btn-primary"
                >
                  Submit
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EditPost;
