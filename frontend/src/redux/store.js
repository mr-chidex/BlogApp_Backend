import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { userReducer } from "../redux/reducers/userReducers";
import { postReducer } from "../redux/reducers/postReducers";

const initialState = {};
const middlewares = [thunk];

const reducers = combineReducers({
  userLogin: userReducer,
  blogPost: postReducer,
});

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
