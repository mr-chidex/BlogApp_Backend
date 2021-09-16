import {
  USER_LOGIN_FAILED,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILED,
} from "../constants/userConstants";
import axios from "axios";

export const userSignupAction = (user) => async (dispatch, getState) => {
  try {
    const { name, email, password } = user;
    dispatch({ type: USER_SIGNUP_REQUEST });

    const { data } = await axios({
      url: `${process.env.REACT_APP_BLOG_API}/api/users/signup`,
      method: "POST",
      data: { email, password, name },
    });

    dispatch({
      type: USER_SIGNUP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_SIGNUP_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userLoginAction =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: USER_LOGIN_REQUEST });

      const { data } = await axios({
        url: `${process.env.REACT_APP_BLOG_API}/api/users/signin`,
        method: "POST",
        data: { email, password },
      });

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem(
        "NODE_USER",
        JSON.stringify(getState().userLogin.user)
      );
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const userLogoutAction = () => async (dispatch, getState) => {
  localStorage.removeItem("NODE_USER");
  dispatch({ type: USER_LOGOUT });
};
