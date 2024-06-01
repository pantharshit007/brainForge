import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUserEnrolledCourses } from '../../../../services/backendCallFunction/profileAPI'
import EnrolledCourseTable from './EnrolledCourseTable'

function EnrolledCourses() {
    const token = useSelector(state => state.auth.token)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [enrolledCourses, setEnrolledCourses] = useState(null)

    // calling backend function
    async function getFunction() {
        const res = await getUserEnrolledCourses(token, dispatch, navigate)
        setEnrolledCourses(res)
    }

    useEffect(() => {
        getFunction()
    }, [])

    return (
        <>
            <div>
                <h1 className="text-3xl text-richblack-50">
                    Enrolled Courses
                </h1>

                {/* CHECK IF ANY COURSES AVAILABLE */}
                {!enrolledCourses
                    ? (<div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                        <div className="spinner"></div>
                    </div>)

                    // ONCE LOADED CHECK IF THERE IS ANY COURSE AVAILABLE?
                    : (!enrolledCourses.length
                        // NO ENROLLED COURSES
                        ? <p className="grid h-[15vh] text-xl w-full place-content-center text-richblack-5">
                            You haven't enrolled in any courses yet.
                        </p>

                        // ENROLLED COURSES
                        :
                        (
                            <div className="my-8 text-richblack-5">
                                {/* Headings */}
                                <div className="flex rounded-t-lg bg-richblack-700 ">
                                    <p className="w-[45%] px-5 py-3">Course Name</p>
                                    <p className="w-1/4 px-2 py-3"></p> {/* Duration */}
                                    <p className="flex-1 px-2 py-3">Progress</p>
                                </div>

                                {/* COURSE CARDS */}
                                {
                                    enrolledCourses.map((course, index) => {
                                        // console.log(course);
                                        return (
                                            <EnrolledCourseTable course={course} index={index} key={index} />
                                        )
                                    })
                                }

                            </div>
                        )
                    )

                }
            </div>
        </>
    )
}

export default EnrolledCourses