const BASE_URL = import.meta.env.VITE_BASE_URL;

//-------------------------- OTHER WAY --------------------------\\
// let BASE_URL;
// if (import.meta.env.MODE === "development") {
//     BASE_URL = "http://localhost:4000/api/v1";
// } else {
//     BASE_URL = import.meta.env.VITE_BASE_URL;
// }
//-------------------------- OTHER WAY --------------------------\\

// AUTH ENDPOINTS
export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}

// PROFILE ENDPOINTS
export const profileEndPoints = {
    GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
    GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
    GET_INSTRUCTOR_DATA_API: BASE_URL + "/profile/instructorDashboard",
}

// CATEGORIES API
export const categories = {
    CATEGORIES_API: BASE_URL + '/course/getAllCatogories'
}

// CONTACT-US API
export const contactusEndpoint = {
    CONTACT_US_API: BASE_URL + "/contact/contactUs",
}

// SETTINGS API
export const settingsEndpoint = {
    UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
    UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
    CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
    DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
}