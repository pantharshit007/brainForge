import { combineReducers } from "@reduxjs/toolkit"

// Importing Reducers from Slices
import authReducer from "./slices/authSlice";
import profileReducer from "./slices/profileSlice";
import cartReduce from "./slices/cartSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    cart: cartReduce
})

export default rootReducer;