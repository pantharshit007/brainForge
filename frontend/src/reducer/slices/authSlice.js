import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    // loading token from local Storage if available else null
    token: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null,
    // loading state 
    loading: false,
    //sign-up data
    signupData: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // set the token value received from BE via value
        setToken(state, value) {
            state.token = value.payload;
        },
        // new User Sign-up Info
        setSignupData(state, value) {
            state.signupData = value.payload;
        },
        setLoading(state, value) {
            state.loading = value.payload;
        }
    }
})

export const { setToken, setSignupData, setLoading } = authSlice.actions;
export default authSlice.reducer;