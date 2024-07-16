import { combineReducers } from "redux";
import authReducer from "./reducerAuth";
import userReducer from "./reducerUser";
import bookReducer from "./reducerBook";
import { podcastReducer } from "./reducerPodcast";


const rootReducer = combineReducers({
  auth: authReducer,
  books: bookReducer,
  users : userReducer,
  podcasts: podcastReducer
});

export default rootReducer;
