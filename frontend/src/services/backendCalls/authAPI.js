import { toast } from "react-hot-toast";

import { endpoints } from "../apis";
import { toastPostion } from "../../utils/constant";
import { setLoading, setToken } from "../../reducer/slices/authSlice";
import { apiConnector } from "../apiConnector";
import { setUser } from "../../reducer/slices/profileSlice";
import { resetCart } from "../../reducer/slices/cartSlice";

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
} = endpoints;

// SEND OTP BACKEND CALL
export function sendOtp(email, navigate) {
    //REDUX THUMK MIDDLEWARE
    return async (dispatch) => {

        // SETTING LOADING STATE
        const toastId = toast.loading('Loading..', toastPostion);
        dispatch(setLoading(true));

        try {
            // MAKE BACKEDN CALL ON ROUTE SENDOTP_API
            const response = await apiConnector('POST', SENDOTP_API, { email })
            // console.log('> OTP SENT: ', JSON.stringify(response))

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success('OTP Sent!', toastPostion)
            navigate('/verify-email')

        } catch (err) {
            console.log('> OTP API Failure: ' + err?.response?.data?.message)
            toast.error(err?.response?.data?.message || 'Sending OTP Failed', toastPostion)

        } finally {
            dispatch(setLoading(false));
            toast.dismiss(toastId);
        }
    }
}

// SIGN UP BACKEND CALL
export function signUp(
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate) {
    //REDUX THUMK MIDDLEWARE
    return async (dispatch) => {

        // SETTING LOADING STATE
        const toastId = toast.loading("loading..", toastPostion)
        dispatch(setLoading(true));

        try {

            const response = await apiConnector("POST", SIGNUP_API, {
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp,
            })
            console.log("SIGN UP: ", response)

            // CHECK IF AN ERROR OCCURED
            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success('Signup success!', toastPostion)
            navigate('/login')    // navigate to login page

        } catch (err) {
            console.log('> Signup API Failure: ', err?.response?.data?.message)
            toast.error(err?.response?.data?.message || 'Signup Failed')
            navigate('/signup')

        } finally {
            dispatch(setLoading(false));
            toast.dismiss(toastId);
        }
    }
}

// LOGIN BACKEND CALL
export function login(email, password, navigate) {
    //REDUX THUMK MIDDLEWARE
    return async (dispatch) => {

        // SETTING LOADING STATE
        const toastId = toast.loading('Loading..', toastPostion);
        dispatch(setLoading(true));

        try {
            // SENDING BACKEND CALL ON ROUTE /loading
            const response = await apiConnector('POST', LOGIN_API, { email, password });
            // console.log('> Login API: ', response)

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success('Login Success!', toastPostion);

            // UPDATE JWT TOKEN IN LOCAL STORAGE VIA STORE
            dispatch(setToken(response.data.token));

            //  UPDATE USER STATE WITH USER DATA
            dispatch(setUser({ ...response.data.user, image: userImg }))

            // UPDATE TOKEN AND USER IN LOCALSTORAGE : Now directly getting updated in Slices
            // localStorage.setItem("token", JSON.stringify(response.data.token))
            // localStorage.setItem("user", JSON.stringify(response.data.user))

            // Use sessionStorage instead of localStorage
            // sessionStorage.setItem("token", JSON.stringify(response.data.token))
            // sessionStorage.setItem("user", JSON.stringify(response.data.user))

            navigate('/dashboard/my-profile');

        } catch (err) {
            console.log('> LOGIN API ERROR: ' + err?.response?.data?.message);
            toast.error(err?.response?.data?.message, toastPostion)

        } finally {
            dispatch(setLoading(false));
            toast.dismiss(toastId);
        }
    }
}

// LOGOUT BACKEND CALL
export function logout(navigate) {
    //REDUX THUMK MIDDLEWARE
    return (dispatch) => {
        dispatch(setToken(null))
        dispatch(setUser(null))
        dispatch(resetCart())

        // UPDATE LOCAL STORAGE
        localStorage.removeItem('token')
        localStorage.removeItem('user')

        toast.success('Logout Success!', toastPostion)
        navigate('/')
    }
}

// PASSWORD RESET TOKEN BACKEND CALL
export function getPasswordResetToken(email, setEmailSent) {
    //REDUX THUMK MIDDLEWARE
    return async (dispatch) => {

        // SETTING LOADING STATE
        const toastId = toast.loading('Loading..', toastPostion);
        dispatch(setLoading(true));

        try {
            // SENDING BACKEND CALL ON ROUTE /reset-password-token
            const response = await apiConnector('POST', RESETPASSTOKEN_API, { email })
            console.log("Reset pass token:", response);

            if (!response.data.success) {
                throw new Error(response?.data?.message);
            }

            toast.success('Email Sent. Check Inbox!', toastPostion)
            setEmailSent(true);

        } catch (err) {
            console.log("> RESET PASSWORN TOKEN API FAILURE: " + err?.response?.data?.message)
            toast.error(err?.response?.data?.message || 'Failed to send Reset Email', toastPostion)

        } finally {
            toast.dismiss(toastId)
            dispatch(setLoading(false));
        }
    }
}

// RESET PASSWORD BACKEND CALL
export function resetPassword(password, confirmPassword, token, setResetComplete) {
    //REDUX THUMK MIDDLEWARE
    return async (dispatch) => {

        // SETTING LOADING STATE
        const toastId = toast.loading('Loading..', toastPostion);
        dispatch(setLoading(true));

        try {
            const response = await apiConnector('POST', RESETPASSWORD_API, { password, confirmPassword, token });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            setResetComplete(true); //TO UPDATE UPDATE-PASSWORD PAGE UI
            toast.success('Password Updated!')

        } catch (err) {
            console.log('> RESET PASSWORD API ERROR: ' + err?.response?.data?.message);
            toast.error(err?.response?.data?.message, toastPostion)

        } finally {
            toast.dismiss(toastId)
            dispatch(setLoading(false))
        }
    }
}

// FORGOT PASSWORD BACKEND CALL: same as getPasswordRestToken
export function forgotPassword(email, setEmailSent) {
    //REDUX THUMK MIDDLEWARE
    return async (dispatch) => {

        // SETTING LOADING STATE
        const toastId = toast.loading('Loading..', toastPostion);
        dispatch(setLoading(true));

        try {
            // SENDING BACKEND CALL ON ROUTE /reset-password-token
            const response = await apiConnector('POST', RESETPASSTOKEN_API, { email })
            console.log("Forgot pass token:", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success('Email Sended!', toastPostion)
            setEmailSent(true);

        } catch (err) {
            console.log("Forgot password token Failure: " + err?.response?.data?.message)
            toast.error(err?.response?.data?.message || 'Failed to send Reset Email', toastPostion)

        } finally {
            toast.dismiss(toastId)
            dispatch(setLoading(false));
        }
    }
}
