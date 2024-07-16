import {
    FETCH_BOOKS_SUCCESS, FETCH_BOOKS_FAIL,
    ADD_BOOK_SUCCESS, ADD_BOOK_FAIL,
    UPDATE_BOOK_SUCCESS, UPDATE_BOOK_FAIL,
    DELETE_BOOK_SUCCESS, DELETE_BOOK_FAIL
  } from '../constants/constantBook';
  import { https } from '@/services/configURL'; // Assuming you have a service setup for axios
  
  export const fetchBooks = () => async (dispatch) => {
    try {
      const response = await https.get("/books"); // Ensure your API endpoint is correct
      console.log("Books fetched successfully:", response.data);
      dispatch({ type: FETCH_BOOKS_SUCCESS, payload: response.data.data });
    } catch (error) {
      console.error("Error fetching books:", error.response ? error.response.data : error);
      dispatch({ type: FETCH_BOOKS_FAIL, payload: error.response ? error.response.data.message : error.message });
    }
  };
  
  // Add a new book
// Inside your actionBook.js or similar file
export const addBook = (bookData) => async (dispatch) => {
    try {
      const response = await https.post("/books", bookData); // Adjust URL as necessary
      console.log("Response on add:", response.data);
      dispatch({
        type: ADD_BOOK_SUCCESS, // Ensure you have corresponding reducer cases
        payload: response.data
      });
      dispatch(fetchBooks()); // Refetch books to update the list immediately
    } catch (error) {
      console.error("Add book failed:", error.response || error);
      dispatch({
        type: ADD_BOOK_FAIL, // Ensure you have corresponding reducer cases
        payload: error.response ? error.response.data.message : error.message
      });
    }
  };
  
  
  // Update a book
  export const updateBook = (id, book) => async dispatch => {
    try {
      const { data } = await https.put(`/books/${id}`, book);
      dispatch({ type: UPDATE_BOOK_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: UPDATE_BOOK_FAIL, payload: error.response?.data?.message || error.message });
    }
  };
  
  // Delete a book
  export const deleteBook = (id) => async dispatch => {
    try {
      await https.delete(`/books/${id}`);
      dispatch({ type: DELETE_BOOK_SUCCESS, payload: id });
    } catch (error) {
      dispatch({ type: DELETE_BOOK_FAIL, payload: error.response?.data?.message || error.message });
    }
  };
  