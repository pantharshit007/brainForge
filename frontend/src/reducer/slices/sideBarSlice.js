import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    openSidebar: true,
    screenSize: null,
    isOpen: false, // side-bar Navbar
}

const sideBarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        // setting the state of sidebar: open/close
        setOpenSidebar(state, value) {
            state.openSidebar = value.payload;
        },

        // collapsing/expanding based on screen Size
        setScreenSize(state, value) {
            state.screenSize = value.payload;
        },

        // open/closing side bar based on interaction
        setIsOpen(state, value) {
            state.isOpen = value.payload;
        }
    }
})

export const { setOpenSidebar, setScreenSize, setIsOpen } = sideBarSlice.actions;
export default sideBarSlice.reducer;
