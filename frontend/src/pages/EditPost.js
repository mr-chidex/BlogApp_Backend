import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Message from "../components/Message";
import { generateBase64FromImage } from "../utils/image";

const EditPost = ({ location, match, history }) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [edit, setEdit] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const editSearch = location.search ? location.search.split("=")[1] : "";

  useEffect(() => {
    if (editSearch === "true") {
      const fetchSinglePost = async (postId) => {
        try {
          const { data } = await axios.get(
            `${process.env.REACT_APP_POST_API}/${match.params.postId}`
          );
          setEdit(true);
          setTitle(data.post.title);
          setContent(data.post.content);
          setEdit(true);
        } catch (error) {
          setMessage(error.response.data.message);
          setError(true);
        }
      };

      fetchSinglePost();
    }
  }, [match, editSearch]);

  const image = useRef("");

  const addNewPostHandler = async (e) => {
    e.preventDefault();
    const formaData = new FormData();
    formaData.append("title", title);
    formaData.append("content", content);
    if (!image.current.files) {
      setError(true);
      setMessage("please upload an image");
      return;
    }

    formaData.append("image", image.current.files[0]);

    try {
      await axios({
        url: `${process.env.REACT_APP_POST_API}`,
        method: "POST",
        data: formaData,
        headers: {
          Authorization:
            localStorage.getItem("NODE_USER") &&
            JSON.parse(localStorage.getItem("NODE_USER")).token
              ? JSON.parse(localStorage.getItem("NODE_USER")).token
              : "",
        },
      });

      setMessage("Post added successfully");
      setSuccess(true);
      setTitle("");
      setContent("");
    } catch (error) {
      setMessage(error.response ? error.response.data.message : error.message);
      setError(true);
    }
  };

  const editPost = async (e) => {
    e.preventDefault();
    if (!edit) {
      return;
    }
    const formaData = new FormData();
    formaData.append("title", title);
    formaData.append("content", content);
    if (image.current.files) {
      formaData.append("image", image.current.files[0]);
    }

    try {
      await axios({
        url: `${process.env.REACT_APP_POST_API}/${match.params.postId}`,
        method: "PUT",
        data: formaData,
        headers: {
          Authorization:
            localStorage.getItem("NODE_USER") &&
            JSON.parse(localStorage.getItem("NODE_USER")).token
              ? JSON.parse(localStorage.getItem("NODE_USER")).token
              : "",
        },
      });
      setMessage("Post updated successfully");
      setSuccess(true);
    } catch (error) {
      setMessage(error.response.data.message);
      setError(true);
    }
  };

  const imageChangeHandler = async () => {
    const imagepreview = await generateBase64FromImage(image.current.files[0]);
    setImagePreview(imagepreview);
  };

  const removeMessage = () => {
    setError(false);
    setSuccess(false);
  };

  return (
    <main className="container-lg main">
      <div>
        <h1 className="jumbotron display-4 text-center">
          {edit ? "Edit Blog Post" : "Add New Blog Post"}
        </h1>

        <div className="w-75 mx-auto">
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
