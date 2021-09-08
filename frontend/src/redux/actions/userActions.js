import {
  USER_LOGIN_FAILED,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from "../constants/userConstants";
import axios from "axios";

export const userLoginAction = ({ email, password }) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const { data } = await axios({
      url: process.env.REACT_APP_USER_SIGNIN,
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
