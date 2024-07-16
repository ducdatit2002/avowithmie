import {
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAIL,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
} from "../constants/constantUser";

const initialState = {
  users: [],
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        error: null,
      };
    case FETCH_USERS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case ADD_USER_SUCCESS:
      return {
        ...state,
        users: [...state.users, action.payload],
        error: null,
      };
    case ADD_USER_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        ),
        error: null,
      };
    case UPDATE_USER_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload),
        error: null,
      };
    case DELETE_USER_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case RESET_PASSWORD_SUCCESS:
      // Assuming the response includes the updated user
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === action.payload.user._id ? action.payload.user : user
        ),
        error: null,
      };
    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        error: action.payload,
      };
      case CHANGE_PASSWORD_SUCCESS:
        return {
          ...state,
          successMessage: action.payload,
          error: null
        };
      case CHANGE_PASSWORD_FAIL:
        return {
          ...state,
          error: action.payload
        };
    default:
      return state;
  }
};

export default userReducer;
