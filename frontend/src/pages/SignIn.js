import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { userLoginAction } from "../redux/actions/userActions";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const { user, error: errorLogin } = useSelector((state) => state.userLogin);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const submitSigninHandler = async (e) => {
    e.preventDefault();
    dispatch(userLoginAction({ email, password }));
    setError(true);
  };

  const removeMessage = () => {
    setError(false);
  };

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
          {errorLogin && error && (
            <Message status="error" click={removeMessage}>
              {errorLogin}
            </Message>
          )}
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
            <button
              type="submit"
              onClick={submitSigninHandler}
              className="btn btn-primary"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
