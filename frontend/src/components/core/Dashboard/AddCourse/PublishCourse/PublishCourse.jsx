import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import IconBtn from '../../../../common/IconBtn'
import { resetCourseState, setStep } from '../../../../../reducer/slices/courseSlice'
import { COURSE_STATUS, toastPosition } from '../../../../../utils/constant'
import toast from 'react-hot-toast'
import { updateCourse } from '../../../../../services/backendCallFunction/courseAPI'

function PublishCourse() {

    const { course } = useSelector(state => state.course)
    const token = useSelector(state => state.auth.token)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const { register, setValue, handleSubmit, getValues, formState: { errors } } = useForm();

    useEffect(() => {
        if (course?.status === COURSE_STATUS.PUBLISHED) {
            setValue("public", true);
        }
    }, []);

    // update the 
    async function handleCoursePublish() {

        const formData = new FormData();
        const courseStatus = getValues('public') ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;

        formData.append('courseId', course._id);
        formData.append('status', courseStatus);

        setLoading(true);

        // backend call to update course status
        const res = await updateCourse(token, formData);
        if (res) {
            gotToCourse();
            toast.success('Course Status: Published✨', toastPosition);
        }

        setLoading(false);
    }

    // submiting the new setting
    async function onSubmit() {
        const alreadyPublished = course?.status === COURSE_STATUS.PUBLISHED && getValues('public') === true;
        const alreadyDrafted = course?.status === COURSE_STATUS.DRAFT && getValues('public') === false;

        const courseStatus = getValues('public') ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;

        // check if no changes are made
        if (alreadyPublished || alreadyDrafted) {
            gotToCourse()
            toast.success('Course Status: ' + courseStatus, toastPosition)
            return
        }

        // Changes are made
        handleCoursePublish()
    }

    // back to previouse step
    const goBack = () => {
        dispatch(setStep(2))
    }

    // show all the courses
    const gotToCourse = () => {
        dispatch(resetCourseState())
        navigate('/dashboard/my-courses')
    }

    return (
        <div>
            <div className='rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6'>
                <p className="text-2xl font-semibold text-richblack-5">
                    Publish Settings ⚙️
                </p>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* CHECK BOX */}
                    <div className="my-6 mb-8">
                        <label htmlFor="public" className="inline-flex items-center text-lg">

                            <input
                                type="checkbox"
                                id="public"
                                {...register("public")}
                                className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
                            />

                            <span className="ml-2 text-richblack-400">
                                Make this course as public
                            </span>
                        </label>
                    </div>

                    {/* BUTTONS */}
                    <div className="ml-auto flex max-w-max items-center gap-x-4">
                        <button
                            disabled={loading}
                            type="button"
                            onClick={goBack}
                            className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
                        >
                            Back
                        </button>

                        <IconBtn
                            type='submit'
                            disabled={loading}
                            text='Save Changes'
                            customClasses={loading && 'cursor-not-allowed bg-richblack-500'}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PublishCourse