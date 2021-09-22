import { Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/Header";
import EditPost from "./pages/EditPost";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import SinglePost from "./pages/SinglePost";
import { useSelector, useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";

import { userLogoutAction } from "./redux/actions/userActions";
import Footer from "./components/Footer";

const App = () => {
  const { user } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  const USER_TOKEN = JSON.parse(localStorage.NODE_USER)?.token?.split(" ")[1];

  if (USER_TOKEN) {
    try {
      const decodedToken = jwtDecode(USER_TOKEN);

      if (decodedToken.exp < new Date().getTime() / 1000) {
        dispatch(userLogoutAction());
      }
    } catch (error) {
      dispatch(userLogoutAction());
    }
  }

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
