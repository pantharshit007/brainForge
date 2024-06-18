import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    step: 1,    //! TODO: Change
    course: null,
    //! TEMP:
    // course: {
    //     "_id": "661f927969db8a9d9b21e519",
    //     "courseName": "Python Master Class",
    //     "courseDescription": "Master Python by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!",
    //     "instructor": "661f5f28e18f761d75459215",
    //     "whatYouWillLearn": "Random",
    //     "courseContent": [
    //         {
    //             "_id": "6669916871967015f530cf69",
    //             "sectionName": "Introduction-1",
    //             "subSection": [
    //                 {
    //                     "_id": "666b438522e90ddb33bfdb65",
    //                     "title": "Lec-1",
    //                     "timeDuration": "43.258776",
    //                     "description": "Lec desc-1",
    //                     "videoUrl": "https://res.cloudinary.com/dxi1cu0ot/video/upload/v1718307553/xjl9dgze2fqgcppn76vp.mp4",
    //                     "__v": 0
    //                 }
    //             ],
    //             "__v": 0
    //         },
    //         {
    //             "_id": "666b434722e90ddb33bfdb60",
    //             "sectionName": "Introduction-2",
    //             "subSection": [
    //                 {
    //                     "_id": "666b4a85976aa4f7a2eae51b",
    //                     "title": "Lec-1",
    //                     "timeDuration": "53.545215",
    //                     "description": "lec desc -1",
    //                     "videoUrl": "https://res.cloudinary.com/dxi1cu0ot/video/upload/v1718307460/fpayxzgh81ad4hahlov6.mp4",
    //                     "__v": 0
    //                 }
    //             ],
    //             "__v": 0
    //         },
    //         {
    //             "_id": "666b4b11976aa4f7a2eae52f",
    //             "sectionName": "Introduction-3",
    //             "subSection": [
    //                 {
    //                     "_id": "666b4b9e976aa4f7a2eae535",
    //                     "title": "Lec-1",
    //                     "timeDuration": "29.512562",
    //                     "description": "Lec Description - 1",
    //                     "videoUrl": "https://res.cloudinary.com/dxi1cu0ot/video/upload/v1718307741/fm56lhzpvqpyzmlkbm2c.mp4",
    //                     "__v": 0
    //                 }
    //             ],
    //             "__v": 0
    //         },
    //         {
    //             "_id": "666b4bc4976aa4f7a2eae53a",
    //             "sectionName": "Siuu",
    //             "subSection": [
    //                 {
    //                     "_id": "666b4c08976aa4f7a2eae540",
    //                     "title": "The Goat",
    //                     "timeDuration": "25.471667",
    //                     "description": "Siuuuu..",
    //                     "videoUrl": "https://res.cloudinary.com/dxi1cu0ot/video/upload/v1718307847/ocy6xmzirgpwhzvvcpls.mp4",
    //                     "__v": 0
    //                 },
    //                 {
    //                     "_id": "666f3d2a669582f1e952e135",
    //                     "title": "The Goat",
    //                     "timeDuration": "23.962993",
    //                     "description": "Kobe Briant",
    //                     "videoUrl": "https://res.cloudinary.com/dxi1cu0ot/video/upload/v1718566185/mnuzitcnvxmc3y2zn9xl.mp4",
    //                     "__v": 0
    //                 }
    //             ],
    //             "__v": 0
    //         }
    //     ],
    //     "ratingAndReviews": [],
    //     "price": 499,
    //     "thumbnail": "https://res.cloudinary.com/di0av3xly/image/upload/v1713345145/ImageFolder/kh2hmmrfhp4ghk8jdrrj.jpg",
    //     "tag": [
    //         "1",
    //         "2",
    //         "3",
    //         "4"
    //     ],
    //     "category": "661f6661ef67297ca764b461",
    //     "studentEnrolled": [],
    //     "instructions": [
    //         "a",
    //         "b",
    //         "c",
    //         "d"
    //     ],
    //     "status": "Draft",
    //     "__v": 0,
    //     "createdAt": "2021-06-06T10:50:00.000Z",
    //     "updatedAt": "2021-06-06T10:50:00.000Z"
    // },
    editCourse: false,
    paymentLoading: false,
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
        }
    }
})


export const { setStep, setCourse, setEditCourse, setPaymentLoading, resetCourseState } = courseSlice.actions;
export default courseSlice.reducer;