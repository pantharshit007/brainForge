import toast from "react-hot-toast";
import { profileEndPoints } from "../apis";
import { apiConnector } from "../apiConnector";
import { setUser } from "../../reducer/slices/profileSlice";
import { logout } from "./authAPI";
import { errorToastPosition } from "../../utils/constant";
import { loginTimeOut } from "./globalAPI";

const {
    GET_USER_DETAILS_API,
    GET_USER_ENROLLED_COURSES_API,
    GET_INSTRUCTOR_DATA_API
} = profileEndPoints

// FETCHING USER DETAILS BACKEND API
export function getUserDetails(token, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading('loading...')
        const headers = { Authorization: 'Bearer ' + token }

        try {
            const response = await apiConnector('GET', GET_USER_DETAILS_API, null, headers)
            console.log('> GetUserDetails: ' + response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success('User Data Fetched')
            // SET NEW USER DATA IN LOCAL/SESSION STORAGE
            dispatch(setUser(response.data.data))

        } catch (err) {
            dispatch(logout(navigate))
            console.log("> GET USER API FAILURE:", err?.response?.data?.message)
            toast.error(err?.response?.data?.message || 'Failed to Fetch user Data', errorToastPosition)

        } finally {
            toast.dismiss(toastId)
        }
    }
}

// FETCH USER ENROLLED COURSE BACKEND API
export async function getUserEnrolledCourses(token, dispatch, navigate) {
    const toastId = toast.loading('loading...');
    const headers = { Authorization: 'Bearer ' + token };
    let result = []

    try {
        // CALLING ENROLLED COURSES BACKEND URL: /profile/getEnrolledCourses
        const response = await apiConnector('GET', GET_USER_ENROLLED_COURSES_API, null, headers);
        // console.log('> ENROLLED COURSES API: ', response);

        // IF ENCOUNTER ANY ERROR
        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        result = response?.data?.data;
        return result;

    } catch (err) {
        console.log('> GET ENROLLED COURSES API FAILURE: ', err?.response?.data?.message);
        toast.error(err?.response?.data?.message || 'Failed to Fetch Enrolled Courses', errorToastPosition)

        if (err?.response?.status === 408) {
            dispatch(loginTimeOut(err?.response?.data?.message, navigate))
        }

    } finally {
        toast.dismiss(toastId);
    }
}

// FETCH INSTRUCTOR DASHBOARD DATA BACKEND API
export async function getInstructorData(token, dispatch, navigate) {
    const toastId = toast.loading('loading...');
    const headers = { Authorization: 'Bearer ' + token };
    let result = []

    try {
        // CALLING BACKEND URL: /profile/instructorDashboard
        const response = await apiConnector('GET', GET_INSTRUCTOR_DATA_API, null, headers);
        console.log('> INSTRUCTOR DATA API: ', response);

        // ENCOUNTERED AN ERROR
        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        result = response?.data?.courses;
        return result;

    } catch (err) {
        console.log('> INSTRUCTOR DATA API FAILURE: ', err?.response?.data?.message);
        toast.error(err?.response?.data?.message || 'Failed to fetch Instructor Data', errorToastPosition)

        // IF TOKEN EXPIRES
        if (err?.response?.status === 408) {
            dispatch(loginTimeOut(err?.response?.data?.message, navigate))
        }

    } finally {
        toast.dismiss(toastId);
    }

}