import {
  USER_LOGIN_FAILED,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILED,
} from "../constants/userConstants";

const initialState = {
  user: localStorage.getItem("NODE_USER")
    ? JSON.parse(localStorage.getItem("NODE_USER"))
    : null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        loading: true,
      };
    case USER_LOGIN_SUCCESS:
      return {
        user: action.payload,
        loadng: false,
      };
    case USER_LOGIN_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_SIGNUP_REQUEST:
      return { loading: true };
    case USER_SIGNUP_SUCCESS:
      return {
        loading: false,
        success: true,
        message: "successsfully signed up",
      };
    case USER_SIGNUP_FAILED:
      return { loading: false, error: true, message: action.payload };
    case USER_LOGOUT:
      return { loading: false };
    default:
      return state;
  }
};
