import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../../common/IconBtn'
import CoursesTable from './CoursesTable'
import { fetchInstructorCourses } from '../../../../services/backendCallFunction/courseAPI'

function MyCourses() {
    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [courses, setCourses] = useState([])

    // fetching courses the first time page is rendered
    useEffect(() => {
        async function fetchCourses() {
            const res = await fetchInstructorCourses(token, dispatch, navigate);
            if (res) {
                setCourses(res)
            }
        }
        fetchCourses();
    }, [])

    return (
        <div>
            <div className="mb-14 mt-6 flex items-center justify-between">
                <h1 className="md:text-3xl sm:text-2xl text-xl font-medium text-richblack-5">
                    My Courses
                </h1>

                <IconBtn
                    text="Add Couse"
                    onClick={() => navigate('/dashboard/add-course')}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-richblack-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                </IconBtn>

                {/* Render courses table if courses available */}
            </div>
            {courses && <CoursesTable courses={courses} setCourses={setCourses} />}
        </div>
    )
}

export default MyCourses