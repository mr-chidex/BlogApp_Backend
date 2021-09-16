import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILED,
  EDIT_POST_REQUEST,
  EDIT_POST_SUCCESS,
  EDIT_POST_FAILED,
  FETCH_POST_REQUEST,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAILED,
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILED,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILED,
} from "../constants/postConstants";

const initialState = {
  posts: [],
  loading: false,
  post: {},
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
      return {
        loading: true,
      };
    case FETCH_POSTS_SUCCESS:
      return {
        posts: action.payload,
        loadng: false,
      };
    case FETCH_POSTS_FAILED:
      return {
        loading: false,
        posts: [],
        message: action.payload,
        error: true,
      };
    case FETCH_POST_REQUEST:
      return {
        loading: true,
      };
    case FETCH_POST_SUCCESS:
      return {
        post: action.payload,
        loadng: false,
      };
    case FETCH_POST_FAILED:
      return {
        loading: false,
        post: {},
        message: action.payload,
        error: true,
      };
    case ADD_POST_REQUEST:
      return {
        loading: true,
      };
    case ADD_POST_SUCCESS:
      return {
        post: action.payload,
        loadng: false,
      };
    case ADD_POST_FAILED:
      return {
        loading: false,
        post: {},
        message: action.payload,
        error: true,
      };
    case EDIT_POST_REQUEST:
      return {
        loading: true,
      };
    case EDIT_POST_SUCCESS:
      return {
        post: action.payload,
        loadng: false,
      };
    case EDIT_POST_FAILED:
      return {
        loading: false,
        post: {},
        message: action.payload,
        error: true,
      };
    case DELETE_POST_REQUEST:
      return {
        loading: true,
      };
    case DELETE_POST_SUCCESS:
      return {
        post: action.payload,
        loadng: false,
      };
    case DELETE_POST_FAILED:
      return {
        loading: false,
        post: {},
        message: action.payload,
        error: true,
      };
    default:
      return state;
  }
};
