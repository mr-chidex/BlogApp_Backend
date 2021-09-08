import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Message from "../components/Message";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const submitsignupHandler = async (e) => {
    e.preventDefault();
    try {
      await axios({
        url: ProcessingInstruction.env.REACT_APP_USER_SIGNUP,
        method: "POST",
        data: { name, email, password },
      });
      setSuccess(true);
      setMessage("succesfully signed up");
    } catch (error) {
      setError(true);
      setMessage(error.response.data.message);
    }
  };

  const removeMessage = () => {
    setError(false);
    setSuccess(false);
  };

  return (
    <main className="container-lg main">
      <div>
        <h1 className="jumbotron display-4 text-center">Welcome!!</h1>
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
          <form>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Name"
                id="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter Email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter Password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <p>
              Already have an account? <Link to="/signin">Signin</Link>
            </p>
            <button
              type="submit"
              onClick={submitsignupHandler}
              className="btn btn-primary"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
