import {
  SET_SNACKBAR,
  HIDE_SNACKBAR,
  TOGGLE_DARK_MODE,
} from "../constants/uiConstants";

export const setSnackbar =
  (snackBarMessage, snackBarType) => async (dispatch) => {
    dispatch({
      type: SET_SNACKBAR,
      payload: {
        snackBarMessage,
        snackBarType,
      },
    });
  };

export const hideSnackBar = () => async (dispatch) => {
  dispatch({
    type: HIDE_SNACKBAR,
  });
};

export const toggleDarkMode = () => async (dispatch) => {
  dispatch({
    type: TOGGLE_DARK_MODE,
  });
};
