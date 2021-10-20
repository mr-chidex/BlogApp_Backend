import {
  USER_LOGIN_FAILED,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILED,
  SET_USER,
} from "../constants/userConstants";

const initialState = {
  isAuth: false,
  user: {},
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_LOGIN_SUCCESS:
      return {
        isAuth: true,
        message: "succes",
        loading: false,
      };
    case SET_USER:
      return {
        isAuth: true,
        user: action.payload,
        loading: false,
      };
    case USER_LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        message: action.payload,
        error: true,
      };
    case USER_LOGOUT:
      return { user: {}, loading: false, isAuth: false };
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

    default:
      return state;
  }
};
