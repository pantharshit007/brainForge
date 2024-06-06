import toast from "react-hot-toast";

import { apiConnector } from "../apiConnector";
import { courseEndpoint } from "../apis";
import { errorToastPosition, toastPosition } from "../../utils/constant";
import { loginTimeOut } from "./globalAPI";

const {
    COURSE_DETAILS_API,
    GET_ALL_COURSE_API,
    CREATE_COURSE_API,
    UPDATE_COURSE_API,
    CREATE_SECTION_API,
    CREATE_SUBSECTION_API,
    UPDATE_SECTION_API,
    UPDATE_SUBSECTION_API,
    DELETE_SECTION_API,
    DELETE_SUBSECTION_API,
    GET_ALL_INSTRUCTOR_COURSES_API,
    DELETE_COURSE_API,
    GET_FULL_COURSE_DETAILS_AUTHENTICATED,
    CREATE_RATING_API,
    LECTURE_COMPLETION_API,
    ADD_COURSE_TO_CATEGORY_API,
    SEARCH_COURSES_API,
} = courseEndpoint;

//CREATE COURSE BACKEND CALL

// GET ALL COURSES BACKEN CALL 

// FETCH COURSE DETAIL BACKEND CALL

// GET FULL COURSE DETAIL BACKEND CALL

// GET INSTRUCTOR SPECIFIC COURSES BACKEND CALL
export async function fetchInstructorCourses(token, dispatch, navigate) {

    let result = [];
    const toastId = toast.loading('Loading...');
    const headers = { Authorization: 'Bearer ' + token };

    try {
        // GET RESPONSE FROM BE
        const response = await apiConnector('GET', GET_ALL_INSTRUCTOR_COURSES_API, null, headers);
        // console.log('> Instructor Courses:', response);

        // IF ENCOUNTER AN ERROR
        if (!response?.data?.success) {
            throw new Error("Instructor Course Fetch Failed!")
        }

        // ADD COURSES TO RESULT
        result = response?.data?.data;
        return result;

    } catch (err) {
        console.log('> INSTRUCTOR COURSE API FAILURE:', err?.response?.data?.message);
        toast.error(err?.response?.data?.message || 'Failed to Fetch Course', errorToastPosition);

        // IF TOKEN EXPIRES
        if (err?.response?.status === 408) {
            dispatch(loginTimeOut(err?.response?.data?.message, navigate))
        }

    } finally {
        toast.dismiss(toastId);
    }

}

// UPDATE COURSE BACKEND CALL
export async function updateCourse(token, data) {

    let result = []
    const toastId = toast.loading('Updating...');
    const headers = { Authorization: 'Bearer ' + token };

    try {
        // GETTING BACK RESPONSE FORM BE
        const response = await apiConnector('PUT', UPDATE_COURSE_API, data, headers);
        console.log('> Course Update:', response);

        // IF ENCOUNTER AN ERROR FORM BE
        if (!response?.data?.success) {
            throw new Error('Failed to update course')
        }

        toast.success('Course Updated!', toastPosition);
        return result = response?.data?.data

    } catch (err) {
        console.log('> COURSE UPDATE API FAILURE:', err?.response?.data?.message);
        toast.error(err?.response?.data?.message || 'Failed to update course', errorToastPosition);

    } finally {
        toast.dismiss(toastId);
    }

}

// DELETE COURSE BACKEND CALL
export async function deleteCourse(token, data) {
    const toastId = toast.loading('Deleting...');
    const headers = { Authorization: 'Bearer ' + token };

    try {
        // RESPONSE FROM BACKEND
        const response = await apiConnector('DELETE', DELETE_COURSE_API, data, headers);
        // console.log('> Course Deleted: ' + response);

        // IF ENCOUNTER AN ERROR FORM BE
        if (!response?.data?.success) {
            throw new Error('Failde to delete course')
        }

        toast.success('Course Deleted!');

    } catch (err) {
        console.log('> COURSE DELETION API FAILURE: ' + err?.response?.data?.message);
        toast.error(err?.response?.data?.message || 'Failed to delete course', errorToastPosition);

    } finally {
        toast.dismiss(toastId);
    }
} 
