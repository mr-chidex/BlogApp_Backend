import { combineReducers } from "redux";

import { userReducer } from "./userReducers";
import { uiReducer } from "./uiReducers";
import { postReducer } from "./postReducers";

const allReducers = combineReducers({
  userData: userReducer,
  UI: uiReducer,
  blogPost: postReducer,
});

export default allReducers;
