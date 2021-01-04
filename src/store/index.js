import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import user from "./user";
import projects from "./projects";

const reducer = combineReducers({
  user,
  projects,
});

const store = configureStore({
  reducer,
});

export default store;
