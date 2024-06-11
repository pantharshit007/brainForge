import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    courseSectionData: [],
    courseEntireData: [],
    completedLectures: [],
    totalNoOfLectures: 0,
}

const viewCourseSlice = createSlice({
    name: 'viewCource',
    initialState,
    reducers: {
        setCourseSectionData: (state, action) => {
            state.courseSectionData = action.payload;
        },
        setCourseEntireData: (state, action) => {
            state.courseEntireData = action.payload;
        },
        setCompletedLeactures: (state, action) => {
            state.completedLectures = action.payload;
        },
        setTotalNoOfLectures: (state, action) => {
            state.totalNoOfLectures = action.payload;
        },
        // new completed lectures
        updatedCompletedLectures: (state, action) => {
            state.completedLectures = [...state.completedLectures, action.payload];
        }
    }
})

export const {
    setCourseSectionData,
    setCourseEntireData,
    setCompletedLeactures,
    setTotalNoOfLectures,
    updatedCompletedLectures
} = viewCourseSlice.actions;

export default viewCourseSlice.reducer;