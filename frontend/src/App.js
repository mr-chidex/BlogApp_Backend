import { Route, Switch, Redirect } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";

import Header from "./components/Header";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import SinglePost from "./pages/SinglePost";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard/Index";
import {
  setAuthorizationHeader,
  setUser,
  userLogoutAction,
} from "./redux/actions/userActions";
import EditPost from "./pages/Dashboard/Post/EditPost";
import Posts from "./pages/Dashboard/Post/Posts";
import Post from "./pages/Dashboard/Post/Post";
import Subscribers from "./pages/Dashboard/Subscribers/Subscribers";

const App = () => {
  const { isAuth, user } = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.USER_TOKEN) {
      setAuthorizationHeader(localStorage.USER_TOKEN);
      try {
        const decodedToken = jwtDecode(localStorage.USER_TOKEN);

        if (decodedToken) {
          dispatch(setUser(decodedToken));

          if (decodedToken.exp < new Date().getTime() / 1000) {
            dispatch(userLogoutAction());
          }
        }
      } catch (error) {
        dispatch(userLogoutAction());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      <Switch>
        {!isAuth && <Route exact path="/signup" component={SignUp} />}
        <Route exact path="/signin" component={SignIn} />
        {isAuth && <Route exact path="/dashboard" component={Dashboard} />}
        {isAuth && <Route exact path="/dashboard/post" component={Posts} />}
        {user?.admin && (
          <Route exact path="/dashboard/subscribers" component={Subscribers} />
        )}
        {isAuth && (
          <Route exact path="/dashboard/add-post" component={EditPost} />
        )}
        {isAuth && (
          <Route
            exact
            path="/dashboard/edit-post/:postId"
            component={EditPost}
          />
        )}
        {isAuth && (
          <Route exact path="/dashboard/post/:postId" component={Post} />
        )}
        <Route exact path="/" component={Home} />
        <Route exact path="/:url/:postId" component={SinglePost} />
        <Redirect to="/" />
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
