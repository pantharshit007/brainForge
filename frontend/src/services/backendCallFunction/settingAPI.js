import { toast } from "react-hot-toast";

import { settingsEndpoint } from "../apis";
import { apiConnector } from "../apiConnector";
import { errorToastPosition, toastPosition } from "../../utils/constant";
import { setUser } from "../../reducer/slices/profileSlice";
import { logout } from "./authAPI";

const {
    UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PROFILE_API,
    CHANGE_PASSWORD_API,
    DELETE_PROFILE_API
} = settingsEndpoint;

// UPDATE DISPLAY PICTURE BACKEND CALL
export function updateDisplayPicture(token, formData) {
    return async (dispatch) => {
        // SETTING LOADING STATE
        const toastId = toast.loading("Updating..");
        // UPDATING HEADER FOR TOKEN VERIFICATION
        const header = {
            "Content-Type": "multipart/form-data",
            Authorization: 'Bearer ' + token,
        }

        try {
            // SENDING BACKEND CALL TO /profile/updateDisplayPicture
            const response = await apiConnector("PUT", UPDATE_DISPLAY_PICTURE_API, formData, header);
            //// console.log("> Update display picture:", response);

            // IF ENCOUNTER ANY ERROR
            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Profile updated", toastPosition);

            // UPDATE THE NEW IMAGE IN THE LOCAL/SESSION STORAGE
            dispatch(setUser(response.data.data))

        } catch (err) {
            console.log("> PFP UPDATE API ERROR:", err?.response?.data?.message);
            toast.error(err?.response?.data?.message || 'Failed to Update Image', errorToastPosition);

        } finally {
            toast.dismiss(toastId)
        }
    }
}

// UPDATE PROFILE INFO BACKEND CALL
export function updateProfileInformation(token, formData, setLoading) {
    return async (dispatch) => {

        // SETTING LOADING STATE
        const toastId = toast.loading("Updating..");
        setLoading(true);
        const headers = { Authorization: "Bearer " + token };

        try {
            // SENDING BACKEND CALL TO /profile/updateProfile
            const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, headers)
            // console.log('> Update profile:', response);

            // IF ENCOUNTER ERROR
            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            // UPDATE NEW USER DATA IN LOCAL/SESSION STORAGE
            dispatch(setUser(response.data.data));

            // SUCCESS NOTIFICATION
            toast.success("Profile Info Updated!", toastPosition);

        } catch (err) {
            console.log('> Failed to update Profile:', err?.response?.data?.message);
            toast.error(err?.response?.data?.message || 'Failed to update Profile', errorToastPosition);

        } finally {
            setLoading(false);
            toast.dismiss(toastId);
        }
    }
}

// CHANGE PASSWORD BACKEND CALL
export function changePassword(token, formData, setLoading) {
    return async (dispatch) => {
        const toastId = toast.loading('updating...');
        setLoading(true)
        const headers = { Authorization: 'Bearer ' + token };

        try {
            // CALLING THE BACKEND URL: /auth/changepassword
            const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData, headers);
            // console.log('> Change Password:', response);

            // IF ENCOUNTER AN ERROR
            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            // SUCCESS TOAST
            toast.success("Password Updated!", toastPosition);

        } catch (err) {
            console.log('> CHANGE PASSWORD API Error:', err?.response?.data?.message);
            toast.error(err?.response?.data?.message || 'Failed to change password', errorToastPosition);

        } finally {
            setLoading(false);
            toast.dismiss(toastId);
        }

    }
}

// DELETE ACCOUNT BACKEND CALL
export function deleteAccount(token, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading('Deleting...');
        const headers = { Autherization: 'Bearer ' + token };

        try {
            // calling the backend URL: /profile/deleteProfile
            const response = await apiConnector('DELETE', DELETE_PROFILE_API, null, headers)
            console.log("Delete profile: ", response)

            // ENCOUNTER AN ERROR
            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success('Accound Deleted!', toastPosition);
            dispatch(logout(navigate))

        } catch (err) {
            console.log('> DELETE ACCOUNT API FAILURE: ', err?.response?.data?.message)
            toast.error(err?.response?.data?.message || 'Failed to delete account', errorToastPosition);

        } finally {
            toast.dismiss(toastId)
        }
    }
}


