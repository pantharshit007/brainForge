import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import RenderSteps from '../AddCourse/RenderSteps';
import { fetchFullCourseDetail } from '../../../../services/backendCallFunction/courseAPI';
import { setCourse, setEditCourse, setStep } from '../../../../reducer/slices/courseSlice';

function EditCourse() {

    const { course } = useSelector(state => state.course)
    const { token } = useSelector(state => state.auth)

    const { courseId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // fill the existing Data in form field
    const populateCourse = async () => {
        setLoading(true);

        const res = await fetchFullCourseDetail(token, { courseId: courseId }, dispatch, navigate)
        if (res) {
            dispatch(setEditCourse(true))
            dispatch(setCourse(res.courseDetails))
            dispatch(setStep(1))
        }
        setLoading(false)
    }

    useEffect(() => {
        populateCourse()
    }, [])

    // show loader
    if (loading) {
        return (
            <div className="grid flex-1 place-items-center">
                <div className="spinner"></div>
            </div>
        )
    }

    return (
        <div>
            <h1 className="mb-14 text-3xl font-medium text-richblack-5">
                Edit Course
            </h1>

            <div className="mx-auto max-w-[600px]">
                {course
                    ? (<RenderSteps />)
                    : (<p className="mt-14 text-center text-3xl font-semibold text-richblack-100">
                        No Course Found
                    </p>)
                }
            </div>
        </div>
    )
}

export default EditCourse