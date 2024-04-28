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
            console.log('> OTP SENT: ', JSON.stringify(response))

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success('OTP Sent!', toastPostion)
            navigate('/verify-email')

        } catch (err) {
            console.log('> OTP API Failure: ' + err?.response?.data?.message)
            toast.error(err?.response?.data?.message, toastPostion)

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
            toast.error(err?.response?.data?.message)
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
        console.log('1')

        // SETTING LOADING STATE
        const toastId = toast.loading('Loading..', toastPostion);
        dispatch(setLoading(true));

        try {
            // SENDING BACKEND CALL ON ROUTE /loading
            const response = await apiConnector('POST', LOGIN_API, { email, password });
            console.log('> Login API: ', response)

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success('Login Success!', toastPostion);

            // UPDATE JWT TOKEN IN LOCAL STORAGE VIA STORE
            dispatch(setToken(response.data.token));
            // UPDATE USER img 
            const userImg = response.data?.user?.image
                ? response.data.user.image
                : "https://api.dicebear.com/5.x/initials/svg?seed=" + response.data.user.firstName + " " + response.data.user.lastName;

            //  UPDATE USER STATE WITH USER DATA
            dispatch(setUser({ ...response.data.user, image: userImg }))

            // UPDATE TOKEN AND USER IN LOCALSTORAGE
            localStorage.setItem("token", JSON.stringify(response.data.token))
            localStorage.setItem("user", JSON.stringify(response.data.user))

            // Use sessionStorage instead of localStorage
            sessionStorage.setItem("token", JSON.stringify(response.data.token))
            sessionStorage.setItem("user", JSON.stringify(response.data.user))

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
}

// RESET PASSWORD BACKEND CALL
export function resetPassword(password, confirmPassword, token) {
    //REDUX THUMK MIDDLEWARE
}

// FORGOT PASSWORD BACKEND CALL: same as getPasswordRestToken
export function forgotPassword(email, sentEmailSent) {
    //REDUX THUMK MIDDLEWARE
}
