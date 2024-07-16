import { https } from '../../services/configURL';
import {
  FETCH_USERS_SUCCESS, FETCH_USERS_FAIL,
  ADD_USER_SUCCESS, ADD_USER_FAIL,
  UPDATE_USER_SUCCESS, UPDATE_USER_FAIL,
  DELETE_USER_SUCCESS, DELETE_USER_FAIL,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL
} from '../constants/constantUser';

// Helper function to get token config
// Helper function to get token configuration
const getTokenConfig = () => {
  const token = localStorage.getItem('x-auth-token');
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  if (token) {
    config.headers['x-auth-token'] = token;  // Use x-auth-token header for the token
  }
  return config;
};


// Action to fetch users with proper error handling and data extraction
export const fetchUsers = () => async dispatch => {
  try {
    const config = getTokenConfig();
    const response = await https.get("/users", config);
    dispatch({ type: FETCH_USERS_SUCCESS, payload: response.data.data }); // Access the array correctly
  } catch (error) {
    let errorDetail = error.response?.data?.message || error.message;
    dispatch({ type: FETCH_USERS_FAIL, payload: errorDetail });
  }
};

// Add a new user
export const addUser = (newUser) => async dispatch => {
  try {
    const response = await https.post("/users", newUser, getTokenConfig());
    dispatch({ type: ADD_USER_SUCCESS, payload: response.data });
    return response.data;  // Consider returning data for further confirmation in component
  } catch (error) {
    const errorPayload = error.response?.data || error.message;
    dispatch({ type: ADD_USER_FAIL, payload: errorPayload });
    console.error("Error adding user:", errorPayload);
    return Promise.reject(errorPayload);  // To handle errors in the component
  }
};

// Update a user
export const updateUser = (userId, updatedUser) => async dispatch => {
  try {
    const response = await https.put(`/users/${userId}`, updatedUser, getTokenConfig());
    dispatch({ type: UPDATE_USER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: UPDATE_USER_FAIL, payload: error.message || 'Failed to update user' });
  }
};

// Delete a user
export const deleteUser = (userId) => async dispatch => {
  try {
    await https.delete(`/users/${userId}`, getTokenConfig());
    dispatch({ type: DELETE_USER_SUCCESS, payload: userId });
  } catch (error) {
    dispatch({ type: DELETE_USER_FAIL, payload: error.message || 'Failed to delete user' });
  }
};

// Reset password action
export const resetPassword = (userId, newPassword) => async (dispatch) => {
  try {
    const body = JSON.stringify({ newPassword });
    const response = await https.put(`/users/${userId}/reset-password`, body, getTokenConfig());
    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: response.data });
    return response.data;
  } catch (error) {
    const errorPayload = error.response?.data || error.message;
    dispatch({ type: RESET_PASSWORD_FAIL, payload: errorPayload });
    console.error("Error resetting password:", errorPayload);
    return Promise.reject(errorPayload);
  }
};

export const changePassword = (oldPassword, newPassword) => async dispatch => {
  try {
    const body = JSON.stringify({ oldPassword, newPassword });
    const response = await https.put('/users/change-password', body, getTokenConfig());
    dispatch({ type: CHANGE_PASSWORD_SUCCESS, payload: response.data });
    return response.data;
  } catch (error) {
    const errorPayload = error.response?.data || error.message;
    dispatch({ type: CHANGE_PASSWORD_FAIL, payload: errorPayload });
    console.error('Error changing password:', errorPayload);
    return Promise.reject(errorPayload);
  }
};