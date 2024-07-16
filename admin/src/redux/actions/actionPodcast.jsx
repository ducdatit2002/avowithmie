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
  
  // Axios might be used for HTTP requests
  import { https } from '@/services/configURL';
  
  export const fetchPodcasts = () => async (dispatch) => {
    try {
      dispatch({ type: FETCH_PODCASTS_REQUEST });
      const { data } = await https.get('/podcasts');
      dispatch({ type: FETCH_PODCASTS_SUCCESS, payload: data.data });
    } catch (error) {
      dispatch({ type: FETCH_PODCASTS_FAIL, payload: error.response.data.message });
    }
  };
  
  export const addPodcast = (podcast) => async (dispatch) => {
    try {
      const { data } = await https.post('/podcasts', podcast);
      dispatch({ type: ADD_PODCAST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: ADD_PODCAST_FAIL, payload: error.response.data.message });
    }
  };
  
  export const updatePodcast = (id, podcast) => async (dispatch) => {
    try {
      const { data } = await https.put(`/podcasts/${id}`, podcast);
      dispatch({ type: UPDATE_PODCAST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: UPDATE_PODCAST_FAIL, payload: error.response.data.message });
    }
  };
  
  export const deletePodcast = (id) => async (dispatch) => {
    try {
      await https.delete(`/podcasts/${id}`);
      dispatch({ type: DELETE_PODCAST_SUCCESS, payload: id });
    } catch (error) {
      dispatch({ type: DELETE_PODCAST_FAIL, payload: error.response.data.message });
    }
  };
  