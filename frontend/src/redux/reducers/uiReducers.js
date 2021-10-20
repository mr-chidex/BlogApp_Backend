import {
  SET_SNACKBAR,
  HIDE_SNACKBAR,
  TOGGLE_DARK_MODE,
} from "../constants/uiConstants";

const initialState = {
  snackBarOpen: false,
  darkMode: false,
  snackBarMessage: "",
  snackBarType: "",
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SNACKBAR:
      const { snackBarMessage, snackBarType } = action.payload;
      return {
        ...state,
        snackBarOpen: true,
        snackBarMessage: snackBarMessage,
        snackBarType: snackBarType,
      };

    case HIDE_SNACKBAR:
      return {
        ...state,
        snackBarOpen: false,
      };
    case TOGGLE_DARK_MODE:
      return {
        ...state,
        darkMode: !state.darkMode,
      };

    default:
      return state;
  }
};
