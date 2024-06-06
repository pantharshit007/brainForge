import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    openSidebar: true,
    screenSize: null,
}

const sideBarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        // setting the state of sidebar: open/close
        setOpenSidebar(state, value) {
            console.log("sidebar changed:", value.payload);
            state.openSidebar = value.payload;
        },

        // collapsing/expanding based on screen Size
        setScreenSize(state, value) {
            state.screenSize = value.payload;
        }
    }
})

export const { setOpenSidebar, setScreenSize } = sideBarSlice.actions;
export default sideBarSlice.reducer;
