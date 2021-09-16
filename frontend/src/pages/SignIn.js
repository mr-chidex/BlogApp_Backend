import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Message from "../components/Message";
import { userLoginAction } from "../redux/actions/userActions";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerts, setAlerts] = useState(false);
  const history = useHistory();

  const dispatch = useDispatch();
  const { user, message, error, loading } = useSelector(
    (state) => state.userLogin
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const submitSigninHandler = async (e) => {
    e.preventDefault();
    dispatch(userLoginAction({ email, password }));
    setAlerts(true);
  };

  useEffect(() => {
    if (user?._id) {
      history.push("/join");
    }
  }, [history, user]);

  return (
    <main className="container-lg main">
      <div>
        <h1 className="jumbotron display-4 text-center">Welcome Back</h1>
        <div className="w-75 mx-auto">
          <div className="alert alert-info text-dark" role="alert">
            test-email: <strong>test@email.com </strong>, test-pass:{" "}
            <strong>1234</strong>
          </div>
          {user && <Message status="success">signed in successfully</Message>}
          {alerts && error && <Message status="error">{message}</Message>}
          <form>
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
              Don't have an accout? <Link to="signup">Signup</Link>{" "}
            </p>
            {loading ? (
              <button
                type="submit"
                onClick={submitSigninHandler}
                className="btn btn-primary"
                disabled
              >
                Signing In...
              </button>
            ) : (
              <button
                type="submit"
                onClick={submitSigninHandler}
                className="btn btn-primary"
              >
                Sign In
              </button>
            )}
          </form>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
