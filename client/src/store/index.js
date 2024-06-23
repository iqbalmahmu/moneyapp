// import { createStore } from "redux";

import {
  applyMiddleware,
  compose,
  legacy_createStore as createStore,
} from "redux";

import rootReducer from "./reducer/rootReducer";

import thunk from "redux-thunk";

const middleware = [thunk];

const store = createStore(rootReducer, compose(applyMiddleware(...middleware)));

export default store;
