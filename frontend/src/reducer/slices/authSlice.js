import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    // loading token from local Storage if available else null
    token: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // set the token value received from BE via value
        setToken(state, value) {
            state.token = value.payload;
        },
    }
})

export const { setToken } = authSlice.actions;
export default authSlice.reducer;