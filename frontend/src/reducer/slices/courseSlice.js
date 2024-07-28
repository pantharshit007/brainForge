import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    step: 1,
    course: null,
    editCourse: false,
    paymentLoading: false,
    categories: [],
}

const courseSlice = createSlice({
    name: 'Course',
    initialState: initialState,
    reducers: {
        setStep: (state, action) => {
            state.step = action.payload;
        },
        setCourse: (state, action) => {
            state.course = action.payload;
        },
        setEditCourse: (state, action) => {
            state.editCourse = action.payload;
        },
        setPaymentLoading: (state, action) => {
            state.paymentLoading = action.payload;
        },
        resetCourseState: (state) => {
            state.step = 1
            state.course = null
            state.paymentLoading = null
        },
        setCategories: (state, action) => {
            state.categories = action.payload;
        }
    }
})


export const { setStep, setCourse, setEditCourse, setPaymentLoading, resetCourseState, setCategories } = courseSlice.actions;
export default courseSlice.reducer;