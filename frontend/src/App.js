import { Route, Switch, Redirect } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";

import Header from "./components/Header";
import EditPost from "./pages/EditPost";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import SinglePost from "./pages/SinglePost";
import Footer from "./components/Footer";
import {
  setAuthorizationHeader,
  setUser,
  userLogoutAction,
} from "./redux/actions/userActions";

const App = () => {
  const { user } = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.H_TOKEN) {
      setAuthorizationHeader(localStorage.H_TOKEN);
      try {
        const decodedToken = jwtDecode(localStorage.H_TOKEN);

        if (decodedToken) {
          dispatch(setUser(decodedToken));

          if (decodedToken.exp < new Date().getTime() / 1000) {
            dispatch(userLogoutAction());
          }
        }
      } catch (error) {
        dispatch(userLogoutAction());
        console.log(error);
      }
    }
  });

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/post/:postId" component={SinglePost} />
        {!user && <Route exact path="/signup" component={SignUp} />}
        {!user && <Route exact path="/signin" component={SignIn} />}
        {user && <Route exact path="/new/:postId?" component={EditPost} />}
        <Route exact path="/" component={Home} />
        <Redirect to="/" />
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
