import { logout } from "./authAPI";

// Logout user once token is expired or login times out.
export function loginTimeOut(errMessage, navigate) {
    return async (dispatch) => {

        if (errMessage === "Re-Login: jwt expired") {
            dispatch(logout(navigate))
        }
    }


}