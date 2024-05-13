import { createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk'; // Incorrect import
import { combineReducers } from 'redux';
import { userReducer } from '../reducer/reducerUser'; // Adjust the path as needed

const rootReducer = combineReducers({
  user: userReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // For Redux DevTools

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
