import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { RxCross2 } from "react-icons/rx"

import { errorToastPosition } from '../../../../../utils/constant';
import { createSubSection, updateSubSection } from '../../../../../services/backendCallFunction/courseAPI';
import UploadVideo from './UploadVideo';
import IconBtn from '../../../../common/IconBtn';


const dropIn = {
    hidden: {
        y: "-100vh",
        opacity: 0,
    },
    visible: {
        y: "0",
        opacity: 1,
        transition: {
            duration: 0.2,
            type: "spring",
            damping: 55,
            stiffness: 500,
        },
    },
    exit: {
        y: "100vh",
        opacity: 0,
    },
};

function SubSectionModal({
    modalData,
    setModalData,
    add = false,
    view = false,
    edit = false,
}) {

    const { token } = useSelector((state) => state.auth);
    const { course } = useSelector((state) => state.course);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm();

    // fetch the stored data to display in Modal on first render of Modal
    useEffect(() => {
        if (view || edit) {
            setValue("lectureTitle", modalData.title)
            setValue("lectureDesc", modalData.description)
            setValue("lectureVideo", modalData.videoUrl)
        }
    }, [view, edit]);

    // If something is Edited: update it in the form
    const isFormUpdated = () => {
        const currentValue = getValues();

        if (currentValue.lectureTitle !== modalData.title ||
            currentValue.lectureDesc !== modalData.description ||
            currentValue.lectureVideo !== modalData.videoUrl
        ) {
            return true;
        } else return false;
    }

    async function handleEditSubsection() {
        const currentValue = getValues();
        const formData = new FormData();

        formData.append('courseName', course.courseName);
        formData.append('sectionId', modalData.sectionId);
        formData.append('subSectionId', modalData._id)

        // check for new changes
        if (currentValue.lectureTitle !== modalData.title) {
            formData.append("title", currentValue.lectureTitle)
        }
        if (currentValue.lectureDesc !== modalData.description) {
            formData.append("description", currentValue.lectureDesc)
        }
        if (currentValue.lectureVideo !== modalData.videoUrl) {
            formData.append("video", currentValue.lectureVideo)
        }

        setLoading(true);

        const res = await updateSubSection(token, formData);

        if (res) {
            // update courseContent with new section Id's
            const updatedCourseContent = course.courseContent.map(section =>
                section._id === modalData ? res : course.courseContent
            )
            // update only courseContent which holds section data
            const updatedCourse = { ...course, courseContent: updatedCourseContent }
            dispatch(updatedCourse);
        }

        setModalData(null)
        setLoading(false)
    }

    // submit button
    async function onSubmit(data) {
        // view condition
        if (view) return;

        // edit condition
        if (edit) {

            if (!isFormUpdated()) {
                toast.error('No Changes Made.', errorToastPosition);
            } else {
                handleEditSubsection();
            }
            return;
        }

        // add condition
        const formData = new FormData();

        formData.append('courseId', course._id)
        formData.append('sectionId', modalData)  //modalData include sectionId: (setAddSubSection)
        formData.append("title", data.lectureTitle)
        formData.append("description", data.lectureDesc)
        formData.append("video", data.lectureVideo)

        setLoading(true);

        // backend API call
        const res = await createSubSection(token, formData);
        if (res) {
            // update courseContent with new section Id's
            const updatedCourseContent = course.courseContent.map(section =>
                section._id === modalData ? res : course.courseContent
            )
            // update only courseContent which holds section data
            const updatedCourse = { ...course, courseContent: updatedCourseContent }
            dispatch(updatedCourse);
        }

        setModalData(null)
        setLoading(false)
    }

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
            variants={dropIn}
            className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-opacity-10 "
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800"
            >
                {/* MODAL HEADER AND CROSS BUTTON */}
                <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
                    <p className="text-xl font-semibold text-richblack-5">
                        {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
                    </p>

                    <button
                        onClick={() => !loading && setModalData(null)}
                    >
                        <RxCross2 className="text-2xl text-richblack-5" />
                    </button>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 px-8 mx-auto py-10">

                    {/* UPLOAD COMPONENT */}
                    <>
                        <UploadVideo
                            name="lectureVideo"
                            label="lectureVideo"
                            register={register}
                            setValue={setValue}
                            errors={errors}
                            viewData={view ? modalData.videoUrl : null}
                            editData={edit ? modalData.videoUrl : null}
                        />
                    </>

                    {/* TITLE */}
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="lectureTitle" className="text-sm text-richblack-5">
                            Lecture Title {!view && <sup className="text-pink-200"> *</sup>}
                        </label>

                        <input
                            disabled={view || loading}
                            id="lectureTitle"
                            placeholder='Enter Lecture Title'
                            className='form-style w-full'
                            {...register('lectureTitle', { required: true })}
                        />

                        {errors.lectureTitle && (
                            <span className="ml-2 text-xs tracking-wide text-pink-200">
                                Lecture title is required
                            </span>
                        )}
                    </div>

                    {/* DESCRIPTION */}
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="lectureDesc" className="text-sm text-richblack-5">
                            Lecture Description{" "} {!view && <sup className="text-pink-200">*</sup>}
                        </label>

                        <textarea
                            disabled={view || loading}
                            id="lectureDesc"
                            placeholder="Enter Lecture description"
                            className="form-style resize-x-none min-h-[130px] w-full"
                            {...register("lectureDesc", { required: true })}
                        />

                        {errors.lectureDesc && (
                            <span className="ml-2 text-xs tracking-wide text-pink-200">
                                Lecture Description is required
                            </span>
                        )}
                    </div>

                    {/* SUBMITION BUTTONS */}
                    {!view && (
                        <div className='flex justify-end'>
                            <IconBtn
                                type='submit'
                                disabled={loading}
                                text={loading ? 'Saving...' : edit ? 'Save Changes' : 'Save'}
                            />
                        </div>
                    )}

                </form>
            </div>

        </motion.div>
    )
}

export default SubSectionModal