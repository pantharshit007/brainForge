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
    ADD_RATING_API,
    LECTURE_COMPLETION_API,
    CREATE_CATEGORY_API,
    ADD_COURSE_TO_CATEGORY_API,
} = courseEndpoint;

//CREATE COURSE BACKEND CALL
export async function createCourse(token, data) {
    let res = [];
    const toastId = toast.loading('Loading...');
    const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: 'Bearer ' + token
    };

    try {
        // CALLING /createCourse BACKEND URL
        const response = await apiConnector('POST', CREATE_COURSE_API, data, headers)
        // console.log('> CREATE COURSE API', response)

        // IF ENCOUNTER ERROR
        if (!response?.data?.success) {
            throw new Error('Failed to create Course')
        }

        toast.success('Course Created!', toastPosition)
        return res = response?.data?.data;

    } catch (err) {
        console.log('> COURSE CREATION API ERROR: ', err?.response?.data?.message)
        toast.error(err?.response?.data?.message || 'Failed to create Course', errorToastPosition);

    } finally {
        toast.dismiss(toastId);
    }
}

// GET ALL COURSES BACKEND CALL 

// FETCH COURSE DETAIL BACKEND CALL
export async function fetchCourseDetails(data) {
    let result = null;
    const toastId = toast.loading('Loading...');

    try {
        // GET RESPONSE BE: '/getCourseDetails'
        const response = await apiConnector('POST', COURSE_DETAILS_API, data);
        // console.log('> COURSE DETAILS API: ', response);

        // IF ENCOUNTER AN ERROR
        if (!response?.data?.success) {
            throw new Error(response.data.message);
        }

        // COURSE DETAIL RETURN: courseDetails
        result = response?.data?.data;
        return result;

    } catch (err) {
        console.log('> FETCH COURSE API FAILURE:', err?.response?.data?.message);
        toast.error(err?.response?.data?.message || 'Failed to Fetch Course Details', errorToastPosition);

    } finally {
        toast.dismiss(toastId);
    }
}

// GET FULL COURSE DETAIL BACKEND CALL
export async function fetchFullCourseDetail(token, data, dispatch, navigate) {
    let result = null;
    const toastId = toast.loading('Loading...');
    const headers = { Authorization: 'Bearer ' + token };

    try {
        // GET RESPONSE BE: '/getFullCourseDetails'
        const response = await apiConnector('POST', GET_FULL_COURSE_DETAILS_AUTHENTICATED, data, headers);
        // console.log('> FULL COURSE DETAILS API: ', response);

        // IF ENCOUNTER AN ERROR
        if (!response?.data?.success) {
            throw new Error(response.data.message);
        }

        // FULL COURSE DETAIL RETURN: courseDetails,totalDuration,completedVideos
        result = response?.data?.data;
        return result;

    } catch (err) {
        console.log('> FETCH FULL COURSE API FAILURE:', err?.response?.data?.message);
        toast.error(err?.response?.data?.message || 'Failed to Fetch Full Course Details', errorToastPosition);

        // IF TOKEN EXPIRES
        if (err?.response?.status === 408) {
            dispatch(loginTimeOut(err?.response?.data?.message, navigate))
        }

    } finally {
        toast.dismiss(toastId);
    }
}

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
    const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: 'Bearer ' + token
    };

    try {
        // GETTING BACK RESPONSE FORM BE
        const response = await apiConnector('PUT', UPDATE_COURSE_API, data, headers);
        // console.log('Course Update:', response);

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

// CREATE SECTION BACKEND CALL
export async function createSection(token, data) {
    let res = null;
    const toastId = toast.loading('Creating...');
    const headers = { Authorization: 'Bearer ' + token };

    try {
        // CALLING THE /addSection URL
        const response = await apiConnector("POST", CREATE_SECTION_API, data, headers);
        // console.log('CREATE SECTION API: ', response);

        // IF ENCOUNTER ERROR
        if (!response?.data?.success) {
            throw new Error("Failed to create section");
        }

        toast.success('Section Created!', toastPosition);
        return res = response?.data?.updatedCourse;

    } catch (err) {
        console.log('> CREATE SECTION API ERROR: ', err?.response?.data?.message);
        toast.error(err?.response?.data?.message || 'Failed in Section Creation', errorToastPosition);

    } finally {
        toast.dismiss(toastId);
    }
}

// UPDATE SECTION BACKEND CALL
export async function updateSection(token, data) {
    let res = null;
    const toastId = toast.loading('Updating...');
    const headers = { Authorization: 'Bearer ' + token };

    try {
        // CALLING THE /updateSection URL
        const response = await apiConnector("PUT", UPDATE_SECTION_API, data, headers);
        // console.log('UPDATE SECTION API: ', response);

        // IF ENCOUNTER ERROR
        if (!response?.data?.success) {
            throw new Error("Failed to update section");
        }

        toast.success('Section Updated!', toastPosition);
        return res = response?.data?.updatedCourse;

    } catch (err) {
        console.log('> UPDATE SECTION API ERROR: ', err?.response?.data?.message);
        toast.error(err?.response?.data?.message || 'Failed in Section Updation', errorToastPosition);

    } finally {
        toast.dismiss(toastId);
    }
}

// DELETE SECTION BACKEND CALL
export async function deleteSection(token, data) {
    let res = null;
    const toastId = toast.loading('Updating...');
    const headers = { Authorization: 'Bearer ' + token };

    try {
        // CALLING THE /deleteSection URL
        const response = await apiConnector("DELETE", DELETE_SECTION_API, data, headers);
        // console.log('DELETE SECTION API: ', response);

        // IF ENCOUNTER ERROR
        if (!response?.data?.success) {
            throw new Error("Failed to delete section");
        }

        toast.success('Section Deleted!', toastPosition);
        return res = response?.data?.updatedCourse;

    } catch (err) {
        console.log('> DELETE SECTION API ERROR: ', err?.response?.data?.message);
        toast.error(err?.response?.data?.message || 'Failed in Section Deletion', errorToastPosition);

    } finally {
        toast.dismiss(toastId);
    }
}

// CREATE SUB-SECTION BACKEND CALL
export async function createSubSection(token, data) {
    let res = null;
    const toastId = toast.loading('Creating...');
    const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: 'Bearer ' + token
    };

    try {
        // CALLING THE /addSubSection URL
        const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, headers);
        // console.log('CREATE SUB-SECTION API: ', response);

        // IF ENCOUNTER ERROR
        if (!response?.data?.success) {
            throw new Error("Failed to create sub-section");
        }

        toast.success('Sub-Section Created!', toastPosition);
        return res = response?.data?.updatedSection;

    } catch (err) {
        console.log('> CREATE SUB-SECTION API ERROR: ', err?.response?.data?.message);
        toast.error(err?.response?.data?.message || 'Failed in Sub-Section Creation', errorToastPosition);

    } finally {
        toast.dismiss(toastId);
    }
}

// UPDATE SUB-SECTION BACKEND CALL
export async function updateSubSection(token, data) {
    let res = null;
    const toastId = toast.loading('Updating...');
    const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: 'Bearer ' + token
    };

    try {
        // CALLING THE /updateSubSection URL
        const response = await apiConnector("PUT", UPDATE_SUBSECTION_API, data, headers);
        // console.log('UPDATE SUB-SECTION API: ', response);

        // IF ENCOUNTER ERROR
        if (!response?.data?.success) {
            throw new Error("Failed to update Sub-section");
        }

        toast.success('Sub-Section Updated!', toastPosition);
        return res = response?.data?.updatedSection;

    } catch (err) {
        console.log('> UPDATE SUB-SECTION API ERROR: ', err?.response?.data?.message);
        toast.error(err?.response?.data?.message || 'Failed in Sub-Section Updation', errorToastPosition);

    } finally {
        toast.dismiss(toastId);
    }
}

// DELETE SUB-SECTION BACKEND CALL
export async function deleteSubSection(token, data) {
    let res = null;
    const toastId = toast.loading('Updating...');
    const headers = { Authorization: 'Bearer ' + token };

    try {
        // CALLING THE /deleteSubSection URL
        const response = await apiConnector("DELETE", DELETE_SUBSECTION_API, data, headers);
        // console.log('DELETE SUB-SECTION API: ', response);

        // IF ENCOUNTER ERROR
        if (!response?.data?.success) {
            throw new Error("Failed to delete Sub-section");
        }

        toast.success('Sub-Section Deleted!', toastPosition);
        return res = response?.data?.updatedSection;

    } catch (err) {
        console.log('> DELETE SUB-SECTION API ERROR: ', err?.response?.data?.message);
        toast.error(err?.response?.data?.message || 'Failed in Sub-Section Deletion', errorToastPosition);

    } finally {
        toast.dismiss(toastId);
    }
}

// MARK COURSE LECTURE AS COMPLETED BACKEND CALL
export async function markLectureAsComplete(token, data) {
    let result = null;
    const toastId = toast.loading('Updating...');
    const headers = { Authorization: 'Bearer ' + token };

    try {
        // BACKEND URL: /updateCourseProgress
        const response = await apiConnector("PUT", LECTURE_COMPLETION_API, data, headers);
        // console.log('> MARK LECTURE: ', response)

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        toast.success('Lecture Completed!', toastPosition)
        result = true;

    } catch (err) {
        console.log('> MARK LECTURE API ERROR: ', err?.response?.data?.message);
        toast.error(err?.response?.data?.message || 'Failed in updating lecture status', errorToastPosition);
    } finally {
        toast.dismiss(toastId);
        return result;
    }
}

// ADD NEW REVIEW AND RATING BACKEND CALL
export async function addReviewAndRating(token, data) {
    const toastId = toast.loading('Adding you Review...');
    const headers = { Authorization: 'Bearer ' + token };

    try {
        // BACKEND URL: /updateCourseProgress
        const response = await apiConnector("POST", ADD_RATING_API, data, headers);
        // console.log('> CREATE RATING: ', response)

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        toast.success('Rating & Review Added!', toastPosition);
        return;

    } catch (err) {
        console.log('> ADD REVIEW API ERROR: ', err?.response?.data?.message);
        toast.error(err?.response?.data?.message || 'Failed in adding Review:', errorToastPosition);
    } finally {
        toast.dismiss(toastId);
    }
}