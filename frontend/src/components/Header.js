import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";
import { userLogoutAction } from "../redux/actions/userActions";

const Header = () => {
  const { user } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(userLogoutAction());
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top navigation">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <HomeIcon /> Blog
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            {!user && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/signin">
                  Signin
                </NavLink>
              </li>
            )}
            {!user && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/signup">
                  Signup
                </NavLink>
              </li>
            )}
            {user && user.name && (
              <li className="">
                <button className="user">
                  <AccountCircleIcon titleAccess={user.name} />
                </button>
              </li>
            )}
            {user && (
              <li className="nav-item">
                <button className="logout" onClick={logoutHandler}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
