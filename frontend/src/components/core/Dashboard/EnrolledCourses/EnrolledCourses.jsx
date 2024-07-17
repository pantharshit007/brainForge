import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUserEnrolledCourses } from '../../../../services/backendCallFunction/profileAPI'
import EnrolledCourseTable from './EnrolledCourseTable'
import Tab from '../../../common/Tab'
import { COURSE_COMPLETION_STATUS } from '../../../../utils/constant'

function EnrolledCourses() {
    const token = useSelector(state => state.auth.token)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [enrolledCourses, setEnrolledCourses] = useState(null)
    const [filter, setFilter] = useState(COURSE_COMPLETION_STATUS.ALL)

    // calling backend function
    async function getFunction() {
        const res = await getUserEnrolledCourses(token, dispatch, navigate)
        setEnrolledCourses(res)
    }

    useEffect(() => {
        getFunction()
    }, [])

    // Filter function
    const filterCourses = (courses, filter) => {
        if (filter === COURSE_COMPLETION_STATUS.ALL) {
            return courses;
        }
        return courses.filter(course => course.courseStatus === filter);
    };

    // Apply filter to enrolledCourses
    const filteredCourses = enrolledCourses ? filterCourses(enrolledCourses, filter) : [];

    const tabData = [
        {
            id: 1,
            tabName: "All",
            type: COURSE_COMPLETION_STATUS.ALL,
        },
        {
            id: 2,
            tabName: "Pending",
            type: COURSE_COMPLETION_STATUS.PENDING,
        },
        {
            id: 3,
            tabName: "Completed",
            type: COURSE_COMPLETION_STATUS.COMPLETED,
        },
    ]

    return (
        <>
            <div className='transition-all duration-200'>
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
                        : (
                            <div className="my-8 text-richblack-5">
                                {/* TAB SECTION TO FILTER COURSE BASED ON PROGRESS */}
                                <Tab tabData={tabData} field={filter} setField={setFilter} />

                                {/* COURSE CARDS */}
                                <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:px-0 sm:px-20 px-10 gap-x-4 gap-y-7 '>
                                    {
                                        filteredCourses.map((course, index) => {
                                            return (
                                                <EnrolledCourseTable
                                                    key={index}
                                                    course={course}
                                                    courseId={course._id}
                                                    sectionId={course.courseContent?.[0]?._id}
                                                    subSectionId={course.courseContent?.[0]?.subSection?.[0]}
                                                />
                                            )
                                        })
                                    }
                                </div>

                            </div>
                        )
                    )

                }
            </div>
        </>
    )
}

export default EnrolledCourses