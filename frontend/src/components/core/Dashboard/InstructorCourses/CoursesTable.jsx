import React, { useState } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaCheck } from "react-icons/fa"
import { FiEdit2 } from "react-icons/fi"
import { HiClock } from "react-icons/hi"
import { RiDeleteBin6Line } from "react-icons/ri"

import { formattedDateTime } from '../../../../utils/dateFormatter';
import { COURSE_STATUS } from '../../../../utils/constant';
import Backdrop from '../../../common/Backdrop';
import ConfirmationModal from '../../../common/ConfirmationModal';
import { deleteCourse, fetchInstructorCourses } from '../../../../services/backendCallFunction/courseAPI';


function CoursesTable({ courses, setCourses }) {
    const { token } = useSelector(state => state.auth)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false)
    const [confirmModal, setConfirmModal] = useState(null)
    const DESC_LENGTH = 30;

    // delete handler
    async function handleCourseDelete(courseId) {
        setLoading(true);
        await deleteCourse(token, { courseId: courseId })
        const res = await fetchInstructorCourses(token, dispatch, navigate)
        if (res) {
            setCourses(res)
        }

        setConfirmModal(false)
        setLoading(false)
    }


    // loader..
    if (loading) {
        return (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <div className="spinner"></div>
            </div>
        )
    }

    // if no courses are created yet
    if (courses?.length === 0) {
        return (
            <Table>
                <Tbody>
                    <Tr>
                        <Td className="py-10 text-center text-2xl font-medium text-richblack-100 mx-auto">
                            No courses found
                        </Td>
                    </Tr>
                </Tbody>
            </Table>
        )
    }

    return (
        <>
            <Table className="rounded-xl border border-richblack-800 mb-16">
                <Thead>
                    <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2 text-richblack-100">
                        <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
                            Courses
                        </Th>
                        <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                            Prices
                        </Th>
                        <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                            Actions
                        </Th>
                    </Tr>
                </Thead>

                {/* CHECK IF COURSE STATE HAS ANY COURSES IN IT? */}
                <Tbody>
                    {courses.map(course => (
                        <Tr
                            key={course?._id}
                            className="flex gap-x-10 border-b border-richblack-400 px-6 py-8 gap-4">

                            {/* 1st COLUMN */}
                            <Td colSpan={1} className="flex flex-1 md:flex-row flex-col gap-x-4 p-3">
                                {/* IMAGE - THUMBNAIL */}
                                <img
                                    src={course?.thumbnail}
                                    alt={course?.courseName}
                                    className="md:h-[148px] md:w-[220px] w-full h-full aspect-video rounded-lg object-cover"
                                />

                                {/* DETAIL INFO - COURSE */}
                                <div className="flex flex-col gap-1 justify-between">
                                    <p className="text-lg font-semibold text-richblack-5 mt-3">
                                        {course.courseName}
                                    </p>

                                    <p className="text-xs text-richblack-300">
                                        {course?.courseDescription.split(" ")?.length >
                                            DESC_LENGTH
                                            ? course.courseDescription
                                                .split(" ")
                                                .slice(0, DESC_LENGTH)
                                                .join(" ") + "..."
                                            : course.courseDescription}
                                    </p>

                                    <p className="text-[11px] text-richblack-5 flex flex-col">
                                        <span className='text-richblack-50 text-[10.5px] mb-1'>
                                            Created: {formattedDateTime(course?.createdAt || course?.updatedAt) || 'June 5, 2024 | 8:14 PM'}
                                        </span>
                                        Updated: {formattedDateTime(course?.updatedAt) || 'June 5, 2024 | 8:14 PM'}
                                    </p>

                                    {/* COURSE STATUS */}
                                    <>
                                        {course.status === COURSE_STATUS.DRAFT ? (
                                            <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                                                <HiClock size={14} />
                                                Drafted
                                            </p>
                                        ) : (
                                            <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-indigo-600 px-2 py-[2px] text-[12px] font-medium text-richblack-5">
                                                <span className="flex h-3 w-3 items-center justify-center rounded-full bg-richblack-5 text-indigo-600">
                                                    <FaCheck size={8} />
                                                </span>
                                                Published
                                            </p>
                                        )}
                                    </>
                                </div>
                            </Td>

                            {/* COURSE PRICE */}
                            <Td className="text-sm font-medium text-richblack-100 mb-5">
                                ₹{course.price}
                            </Td>

                            {/* ACTION BUTTONS */}
                            <Td className="text-sm font-medium text-richblack-100">
                                {/* EDIT BUTTON */}
                                <button
                                    disabled={loading}
                                    onClick={() => navigate('/dashboard/edit-course/' + course._id)}
                                    title="Edit"
                                    className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300 mr- mb-"
                                >
                                    <FiEdit2 size={20} />
                                </button>

                                {/* DELETE BUTTON */}
                                <button
                                    disabled={loading}
                                    onClick={() => {
                                        setConfirmModal({
                                            text1: "Do you want to delete this course?",
                                            text2: "All the data related to this course will be deleted",
                                            btnText1: !loading ? "Delete" : "Loading...  ",
                                            btnText2: "Cancel",
                                            btn1handler: !loading && (() => handleCourseDelete(course._id)),
                                            btn2handler: !loading && (() => setConfirmModal(null))
                                        })
                                    }}
                                    title="Delete"
                                    className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                                >
                                    <RiDeleteBin6Line size={20} />
                                </button>

                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>

            {confirmModal &&
                <Backdrop onClick={() => setConfirmModal(null)}>
                    <ConfirmationModal modalData={confirmModal} />
                </Backdrop>
            }

        </>
    )
}

export default CoursesTable