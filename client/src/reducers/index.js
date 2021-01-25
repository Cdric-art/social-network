import { combineReducers } from "redux";
import userReducer from "./user.reducer.js";
import usersReducer from "./users.reducer.js";

export default combineReducers({
    userReducer,
    usersReducer
})