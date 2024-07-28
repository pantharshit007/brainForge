import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';

import { getInstructorData } from '../../../../services/backendCallFunction/profileAPI'
import { fetchInstructorCourses } from '../../../../services/backendCallFunction/courseAPI';
import DashboardChart from './DashboardChart';
import IconBtn from '../../../common/IconBtn';

function InstructorDash() {

    const { token } = useSelector(state => state.auth)
    const { user } = useSelector(state => state.profile)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [instructorData, setInstructorData] = useState(null)
    const [courseData, setCourseData] = useState([])
    const [currentChart, setCurrentChart] = useState('revenue');
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        async function getData() {
            setLoading(true)

            const res = await getInstructorData(token, dispatch, navigate);
            const courseData = await fetchInstructorCourses(token, dispatch, navigate);

            if (res?.length) setInstructorData(res);
            if (courseData) setCourseData(courseData);
            setLoading(false);
        }
        getData();
    }, [])

    const totalStudentEnrolled = instructorData?.reduce((acc, course) => acc + (course.studentsEnrolled || 0), 0)
    const revenueGenerated = instructorData?.reduce((acc, course) => acc + (course.revenueGenerated || 0), 0)


    // if data is not loaded right now!
    if (loading) {
        return (<>
            <div className='space-y-2'>
                <h1 className='text-2xl font-bold text-richblack-5'>Hi {user?.firstName} 👋</h1>
                <p className='font-medium text-richblack-200'>Let's start something new</p>
            </div>
            <div className='grid min-h-[calc(100vh-10rem)] place-items-center'>
                <div className="spinner"></div>
            </div>
        </>)
    }

    return (
        <div>
            {/* INTRO SECTION */}
            <div className='space-y-2'>
                <h1 className='text-2xl font-bold text-richblack-5'>Hi {user?.firstName} 👋</h1>
                <p className='font-medium text-richblack-200'>Let's start something new</p>
            </div>

            {/* UPPER SECTION */}
            <div className='my-4 flex flex-col-reverse gap-2 md:flex-row md:flex md:h-[450px] md:space-x-4'>

                {/* VISULAIZER */}
                <div className='flex flex-col flex-1 rounded-md bg-richblack-800 p-6'>
                    <div className='flex items-center justify-between'>
                        <p className='text-lg font-bold text-richblack-5'>Visualize</p>
                        <div className='flex items-center space-x-4'>
                            <IconBtn
                                text={'Revenue'}
                                onClick={() => setCurrentChart('revenue')}
                                outline={currentChart !== 'revenue'}
                            />
                            <IconBtn
                                text={'Students'}
                                onClick={() => setCurrentChart('students')}
                                outline={currentChart !== 'students'}
                            />
                        </div>
                    </div>

                    {/* CHART */}
                    {(courseData?.length > 0 && totalStudentEnrolled > 0)
                        ? <DashboardChart instructorData={instructorData} currentChart={currentChart} />
                        : (<div className="flex-1 flex justify-center items-center h-full rounded-md bg-richblack-800">
                            <p className="mt-4 text-xl font-medium text-richblack-50">
                                Not Enough Data To Visualize
                            </p>
                        </div>)
                    }
                </div>

                {/* STATS */}
                <div className='flex min-w-[250px] flex-col rounded-md bg-richblack-800 p-6'>
                    <p className='text-lg font-bold text-richblack-5 pt-2'>Statistics</p>
                    <div className='mt-4 space-y-4'>
                        <div className='border-2 border-richblack-600 px-4 py-2 rounded-lg bg-richblack-900/20 shadow-md shadow-indigo-600'>
                            <p className='text-lg text-richblack-200'>Total Courses</p>
                            <p className='text-3xl font-semibold text-richblack-50'>{courseData?.length}</p>
                        </div>
                        <div className='border-2 border-richblack-600 px-4 py-2 rounded-lg bg-richblack-900/20 shadow-md shadow-indigo-600'>
                            <p className='text-lg text-richblack-200'>Total Students</p>
                            <p className='text-3xl font-semibold text-richblack-50'>{totalStudentEnrolled}</p>
                        </div>
                        <div className='border-2 border-richblack-600 px-4 py-2 rounded-lg bg-richblack-900/20 shadow-md shadow-indigo-600'>
                            <p className='text-lg text-richblack-200'>Total Earnings</p>
                            <p className='text-3xl font-semibold text-green-400'>₹ {revenueGenerated?.toLocaleString()}</p>
                            <p className='text-[10.5px] text-green-500'>+20.1% from last month</p>

                        </div>
                    </div>
                </div>

            </div>

            {/* LOWER SECTION */}
            <div className='rounded-md bg-richblack-800 p-6'>
                <div className='flex items-center justify-between'>
                    <p className='text-lg font-bold text-richblack-5'>Your Courses</p>
                    <button
                        onClick={() => { navigate('/dashboard/my-courses') }}
                        className='text-sm font-semibold text-indigo-500'
                    >
                        View all
                    </button>
                </div>

                {courseData?.length > 0
                    // If Instructor has already created some courses
                    ? <div className='my-4 flex space-x-6'>
                        {courseData?.slice(0, 3)?.map(course => {
                            return (
                                <div key={course._id} className='w-1/3'>
                                    {/* IMG */}
                                    <img
                                        src={course?.thumbnail}
                                        alt="course"
                                        className='aspect-video md:h-[201px] w-full rounded-md object-cover' />

                                    {/* INFO */}
                                    <div className='mt-3 w-full'>
                                        <p className='text-sm font-medium text-richblack-50'>{course?.courseName}</p>
                                        <div className='mt-1  md:space-x-2 md:flex md:items-center text-indigo-400'>
                                            <p className='text-xs md:text-sm font-medium font-mono'>
                                                {course?.studentEnrolled?.length} Students
                                            </p>
                                            <p className='hidden md:block text-xs font-medium text-richblack-300'>|</p>
                                            <p className='text-xs md:text-sm font-medium font-mono'>₹ {course?.price}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    // No courses are created yet
                    : <div className="mt-20 max-md:w-full rounded-md bg-richblack-800 p-6 py-20 bgImage">
                        <p className="text-center text-2xl font-semibold text-richblack-5">
                            You have not created any courses yet 🙅‍♀️
                        </p>
                        <Link to="/dashboard/add-course">
                            <p className="mt-1 text-center text-lg font-bold italic text-indigo-400 underline">
                                Create a course ✒️
                            </p>
                        </Link>
                    </div>
                }
            </div>
        </div>
    )
}

export default InstructorDash