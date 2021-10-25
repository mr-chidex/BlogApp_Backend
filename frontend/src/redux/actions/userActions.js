import axios from "axios";

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

import { SET_SNACKBAR } from "../constants/uiConstants";

export const userSignupAction = (user, helpers) => async (dispatch) => {
  try {
    dispatch({ type: USER_SIGNUP_REQUEST });

    const { data } = await axios({
      url: `${process.env.REACT_APP_BLOG_API}/api/users/signup`,
      method: "POST",
      data: user,
    });

    dispatch({
      type: USER_SIGNUP_SUCCESS,
      payload: data,
    });

    dispatch({
      type: SET_SNACKBAR,
      payload: {
        snackBarMessage: "Sign up successful",
        snackBarType: "success",
      },
    });

    helpers.setSubmitting(false);
    helpers.resetForm();
  } catch (error) {
    dispatch({
      type: USER_SIGNUP_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    dispatch({
      type: SET_SNACKBAR,
      payload: {
        snackBarMessage:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        snackBarType: "error",
      },
    });

    helpers.setSubmitting(false);
  }
};

export const userLoginAction =
  (values, helpers) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_LOGIN_REQUEST });

      const { data } = await axios({
        url: `${process.env.REACT_APP_BLOG_API}/api/users/signin`,
        method: "POST",
        data: values,
      });

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });

      setAuthorizationHeader(data.token);
      localStorage.setItem("USER_TOKEN", data.token);
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });

      dispatch({
        type: SET_SNACKBAR,
        payload: {
          snackBarMessage:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
          snackBarType: "error",
        },
      });

      helpers.setSubmitting(false);
    }
  };

export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

export const userLogoutAction = () => async (dispatch) => {
  localStorage.removeItem("USER_TOKEN");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: USER_LOGOUT });
};

export const setAuthorizationHeader = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};
