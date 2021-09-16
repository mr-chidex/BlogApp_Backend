import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { userSignupAction } from "../redux/actions/userActions";
import Message from "../components/Message";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerts, setAlerts] = useState(false);

  const dispatch = useDispatch();
  const { loading, message, error, success } = useSelector(
    (state) => state.userLogin
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const submitsignupHandler = async (e) => {
    e.preventDefault();
    const user = { name, email, password };
    dispatch(userSignupAction(user));
    setAlerts(true);
  };

  return (
    <main className="container-lg main">
      <div>
        <h1 className="jumbotron display-4 text-center">Welcome!!</h1>
        <div className="w-75 mx-auto">
          {alerts && success && <Message status="success">{message}</Message>}
          {alerts && error && <Message status="error">{message}</Message>}
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
            {loading ? (
              <button
                type="submit"
                onClick={submitsignupHandler}
                className="btn btn"
                disabled
              >
                Signing Up...
              </button>
            ) : (
              <button
                type="submit"
                onClick={submitsignupHandler}
                className="btn btn-primary"
              >
                Sign Up
              </button>
            )}
          </form>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
