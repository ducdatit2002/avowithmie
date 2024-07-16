import ReactDOM from "react-dom/client";
import "./index.css";
import thunk from "redux-thunk";
import App from "./App";
import { applyMiddleware, compose, createStore } from "redux";
import rootReducer from "../src/redux/reducer/index"; // Ensure the path is correct
import { Provider } from "react-redux";

// Set up Redux DevTools extension and middleware
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
