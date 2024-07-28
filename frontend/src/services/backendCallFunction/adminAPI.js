import toast from "react-hot-toast";
import { adminEndpoint } from "../apis";
import { apiConnector } from "../apiConnector";
import { errorToastPosition, toastPosition } from "../../utils/constant";


const { CREATE_CATEGORY_API, DISABLE_CATEGORY_API, ADMIN_DASHBOARD_API } = adminEndpoint

// CATEGORY CREATION
export async function createCategory(token, data) {
    let res = [];
    const toastId = toast.loading('Loading...');
    const headers = { Authorization: 'Bearer ' + token };

    try {
        // RESPONSE FROM BACKEND : /createCategory
        const response = await apiConnector('PUT', CREATE_CATEGORY_API, data, headers);
        console.log('> Create Category Response: ' + response);

        // IF ENCOUNTER AN ERROR 
        if (!response?.data?.success) {
            throw new Error(response?.data?.message);
        }

        toast.success('Category created!', toastPosition)
        res = response?.data?.newCategories;
        return res;

    } catch (err) {
        console.log('> CATEGORY CREATION API ERROR: ', err?.response?.data?.message)
        toast.error(err?.response?.data?.message || 'Failed to create Category', errorToastPosition);

    } finally {
        toast.dismiss(toastId)
    }
}

// DISABLE CATEGORY
export async function disableCategory(token, data) {
    let res = [];
    const toastId = toast.loading('Loading...');
    const headers = { Authorization: 'Bearer ' + token };

    try {
        // RESPONSE FROM BACKEND : /disableCategory
        const response = await apiConnector('PUT', DISABLE_CATEGORY_API, data, headers);
        // console.log('> Disable Category Response: ', response);

        // IF ENCOUNTER AN ERROR 
        if (!response?.data?.success) {
            throw new Error(response?.data?.message);
        }

        toast.success('Category Status Updated!', toastPosition)
        res = response?.data?.updatedList;
        return res;

    } catch (err) {
        console.log('> CATEGORY DISABLE API ERROR: ', err?.response?.data?.message)
        toast.error(err?.response?.data?.message || 'Failed to disable category', errorToastPosition);

    } finally {
        toast.dismiss(toastId);
    }
}

// ADMIN DASHBOARD: user Data
export async function adminDashboard(token) {
    let res = [];
    const toastId = toast.loading('Loading...');
    const headers = { Authorization: 'Bearer ' + token };

    try {
        // RESPONSE FROM BACKEND : /adminDashboard
        const response = await apiConnector('GET', ADMIN_DASHBOARD_API, null, headers);
        // console.log('> Admin Dashboard Response: ', response);

        // IF ENCOUNTER AN ERROR 
        if (!response?.data?.success) {
            throw new Error(response?.data?.message);
        }

        res = response?.data?.userData;
        return res;

    } catch (err) {
        console.log('> ADMIN DASHBOARD API ERROR: ', err?.response?.data?.message)
        toast.error(err?.response?.data?.message || 'Failed to fetch user data', errorToastPosition);

    } finally {
        toast.dismiss(toastId);
    }
}