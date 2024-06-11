import { combineReducers } from "@reduxjs/toolkit"

// Importing Reducers from Slices
import authReducer from "./slices/authSlice";
import profileReducer from "./slices/profileSlice";
import cartReducer from "./slices/cartSlice";
import sideBarReducer from "./slices/sideBarSlice"
import courseReducer from "./slices/courseSlice";
import viewCourseReducer from "./slices/viewCourseSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    cart: cartReducer,
    sidebar: sideBarReducer,
    course: courseReducer,
    viewCourse: viewCourseReducer,
})

export default rootReducer;