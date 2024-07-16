import {
    FETCH_PODCASTS_REQUEST,
    FETCH_PODCASTS_SUCCESS,
    FETCH_PODCASTS_FAIL,
    ADD_PODCAST_SUCCESS,
    ADD_PODCAST_FAIL,
    UPDATE_PODCAST_SUCCESS,
    UPDATE_PODCAST_FAIL,
    DELETE_PODCAST_SUCCESS,
    DELETE_PODCAST_FAIL
  } from '../constants/constantPodcast';
  
  const initialState = {
    loading: false,
    podcasts: [],
    error: ''
  };
  
  export const podcastReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_PODCASTS_REQUEST:
        return { ...state, loading: true };
      case FETCH_PODCASTS_SUCCESS:
        return { ...state, loading: false, podcasts: action.payload };
      case FETCH_PODCASTS_FAIL:
        return { ...state, loading: false, error: action.payload };
      case ADD_PODCAST_SUCCESS:
        return { ...state, podcasts: [...state.podcasts, action.payload] };
      case ADD_PODCAST_FAIL:
        return { ...state, error: action.payload };
      case UPDATE_PODCAST_SUCCESS:
        return {
          ...state,
          podcasts: state.podcasts.map(podcast => podcast._id === action.payload._id ? action.payload : podcast)
        };
      case UPDATE_PODCAST_FAIL:
        return { ...state, error: action.payload };
      case DELETE_PODCAST_SUCCESS:
        return {
          ...state,
          podcasts: state.podcasts.filter(podcast => podcast._id !== action.payload)
        };
      case DELETE_PODCAST_FAIL:
        return { ...state, error: action.payload };
      default:
        return state;
    }
  };
  