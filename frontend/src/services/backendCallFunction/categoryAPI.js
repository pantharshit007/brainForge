import toast from 'react-hot-toast'

import { apiConnector } from "../apiConnector";
import { categories } from '../apis'
import { errorToastPosition } from '../../utils/constant';
import { loginTimeOut } from './globalAPI';

const { PROTECTED_CATEGORIES_API, CATEGORIES_API, CATALOG_DATA } = categories;

// FETCHING COURSE CATEGORY BACKEND CALL
export async function fetchCourseCategories() {
    let res = [];

    try {
        // RESPONSE FROM BACKEND FUNCTION
        const response = await apiConnector('GET', CATEGORIES_API);
        // console.log('> Category: ', response);

        // IF ENCOUNTER AN ERROR 
        if (!response?.data?.success) {
            throw new Error("Could Not Fetch Course Categories");
        }

        return res = response?.data?.AllCategorys;

    } catch (err) {
        console.log('> FETCH COURSE CATEGORRY API Error: ' + err?.response?.data?.message);
        toast.error(err?.response?.data?.message || 'CATEGORY FETCH ERROR', errorToastPosition);
    }
}

// FETCHING COURSE CATEGORY BACKEND CALL: PROTECTED
export async function fetchCourseCategorie(dispatch, navigate) {
    let res = [];

    try {
        // RESPONSE FROM BACKEND FUNCTION
        const response = await apiConnector('GET', PROTECTED_CATEGORIES_API);
        // console.log('> Category: ', response);

        // IF ENCOUNTER AN ERROR 
        if (!response?.data?.success) {
            throw new Error("Could Not Fetch Course Categories");
        }

        return res = response?.data?.AllCategorys;

    } catch (err) {
        console.log('> FETCH COURSE CATEGORRY API Error: ' + err?.response?.data?.message);
        toast.error(err?.response?.data?.message || 'CATEGORY FETCH ERROR', errorToastPosition);

        // IF TOKEN EXPIRES
        if (err?.response?.status === 408) {
            dispatch(loginTimeOut(err?.response?.data?.message, navigate))
        }
    }
}

// GET CATALOG/CATEGORY PAGE DATA
export async function getCategoriesPageData(categoryId) {
    let res = [];
    const toastId = toast.loading('Loading...');
    const data = { categoryId: categoryId };

    try {
        // CALLING BACKEND URL: /getCategoryPageDetails
        const response = await apiConnector("POST", CATALOG_DATA, data);
        // console.log("> CATALOG PAGE DETAILS: ", response)

        // IF ENCOUNTER ERROR 
        if (!response?.data?.success) {
            throw new Error(response?.data?.message);
        }

        return res = response?.data;

    } catch (err) {
        console.log('> FETCH CATELOG COURSE API Error: ' + err?.response?.data?.message);
        toast.error(err?.response?.data?.message || 'CATELOG COURSE FETCH ERROR', errorToastPosition);

    } finally {
        toast.dismiss(toastId)
    }
}