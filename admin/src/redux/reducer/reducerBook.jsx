import {
    FETCH_BOOKS_SUCCESS, FETCH_BOOKS_FAIL,
    ADD_BOOK_SUCCESS, ADD_BOOK_FAIL,
    UPDATE_BOOK_SUCCESS, UPDATE_BOOK_FAIL,
    DELETE_BOOK_SUCCESS, DELETE_BOOK_FAIL
  } from '../constants/constantBook';
  
  const initialState = {
    books: [],
    error: null
  };
  
  const bookReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_BOOKS_SUCCESS:
        return {
          ...state,
          books: action.payload,
          error: null
        };
      case FETCH_BOOKS_FAIL:
        return {
          ...state,
          error: action.payload
        };
      case ADD_BOOK_SUCCESS:
        return {
          ...state,
          books: [...state.books, action.payload],
          error: null
        };
      case ADD_BOOK_FAIL:
        return {
          ...state,
          error: action.payload
        };
      case UPDATE_BOOK_SUCCESS:
        return {
          ...state,
          books: state.books.map(book =>
            book._id === action.payload._id ? action.payload : book
          ),
          error: null
        };
      case UPDATE_BOOK_FAIL:
        return {
          ...state,
          error: action.payload
        };
      case DELETE_BOOK_SUCCESS:
        return {
          ...state,
          books: state.books.filter(book => book._id !== action.payload),
          error: null
        };
      case DELETE_BOOK_FAIL:
        return {
          ...state,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default bookReducer;
  