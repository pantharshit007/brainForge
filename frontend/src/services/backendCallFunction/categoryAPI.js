import toast from 'react-hot-toast'

import { apiConnector } from "../apiConnector";
import { categories } from '../apis'
import { errorToastPosition } from '../../utils/constant';
import { loginTimeOut } from './globalAPI';

const { CATEGORIES_API } = categories;

// FETCHING COURSE CATEGORY BACKEND CALL
export async function fetchCourseCategories(dispatch, navigate) {
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

        // IF TOKEN EXPIRES
        if (err?.response?.status === 408) {
            dispatch(loginTimeOut(err?.response?.data?.message, navigate))
        }
    }
}