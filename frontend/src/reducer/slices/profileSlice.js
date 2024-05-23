import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    // TODO: find ulternative to instead of storing user data in local storage.
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    loading: false,
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        // set the user value received from BE via value and update storge also
        setUser(state, value) {
            state.user = value.payload;
            localStorage.setItem("user", JSON.stringify(value.payload))
            sessionStorage.setItem("user", JSON.stringify(value.payload))
        },
        setLoading(state, value) {
            state.loading = value.payload;
        }

    }
})

export const { setUser, setLoading } = profileSlice.actions
export default profileSlice.reducer;