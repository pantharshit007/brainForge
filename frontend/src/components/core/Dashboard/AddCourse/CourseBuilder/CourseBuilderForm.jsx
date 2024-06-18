import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoAddCircleOutline } from "react-icons/io5"
import { MdNavigateNext } from "react-icons/md"
import { useDispatch, useSelector } from 'react-redux';

import IconBtn from '../../../../common/IconBtn';
import NestedSections from './NestedSections';
import { setCourse, setEditCourse, setStep } from '../../../../../reducer/slices/courseSlice';
import toast from 'react-hot-toast';
import { errorToastPosition } from '../../../../../utils/constant';
import { createSection, updateSection } from '../../../../../services/backendCallFunction/courseAPI';

function CourseBuilderForm() {

    const { course } = useSelector((state) => state.course)
    const { token } = useSelector((state) => state.auth)
    const dispatch = useDispatch();


    const [loading, setLoading] = useState(false)
    const [editSection, setEditSection] = useState(false)   // stores: sectionId/null

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    // submit handler: [create/edit]
    async function onSubmit(data) {
        setLoading(true);
        let res = null;

        let formData = {
            courseId: course._id,
            sectionName: data.sectionName,
        };

        // if we are editing existing Course section
        if (editSection) {
            formData.sectionId = editSection
            res = await updateSection(token, formData)

        } else {
            // if we are creating new course section
            res = await createSection(token, formData)
        }

        // update store with new results
        if (res) {
            dispatch(setCourse(res));
            setEditSection(null)
            setValue('sectionName', '')
        }

        setLoading(false);
    }

    // cancel Edit button
    function cancelEdit() {
        setEditSection(null);
        setValue("sectionName", "");
    }

    // toggle section Name changing
    function handleEditSectionName(sectionId, sectionName) {
        if (editSection === sectionId) {
            cancelEdit();
            return;
        }

        // set section Id and new section Name
        setEditSection(sectionId);
        setValue("sectionName", sectionName);
    }

    //! Step Back button: Not working
    const goBack = () => {
        dispatch(setStep(1))
        dispatch(setEditCourse(true));
    }

    // GO to next step
    const gotToNextStep = () => {
        // No section found
        if (course.courseContent.length === 0) {
            toast.error('Atleast One Section Required!', errorToastPosition);
            return;
        }

        // No sub-section found
        if (course.courseContent.some(section => section?.subSection?.length === 0)) {
            toast.error('Each section requires atleast one lecture!', errorToastPosition);
            return;
        }

        dispatch(setStep(3));
    }

    return (
        <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
            <p className="text-2xl font-semibold text-richblack-5">
                Course Builder
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                {/* INPUT SECTION */}
                <div className="flex flex-col space-y-2">
                    <label className="text-sm text-richblack-5" htmlFor="sectionName">
                        Section Name<sup className="text-pink-200">*</sup>
                    </label>
                    <input
                        id="sectionName"
                        placeholder="Add a section to build your course"
                        name="sectionName"
                        className="form-style w-full"
                        {...register("sectionName", { required: true })}
                    />
                    {errors.sectionName && (
                        <p className="ml-2 text-xs tracking-wide text-pink-200">This field is required</p>
                    )}
                </div>

                {/* CREATE BUTTON */}
                <div className="flex items-end gap-x-4">
                    <IconBtn
                        type="submit"
                        disabled={loading}
                        text={editSection ? "Edit Section Name" : "Create Section"}
                    >
                        <IoAddCircleOutline size={20} className="text-richblack-25 " />
                    </IconBtn>

                    {editSection && (
                        <button
                            type="submit"
                            onClick={cancelEdit}
                            className="text-sm text-richblack-300 underline"
                        >
                            Cancel Edit
                        </button>
                    )}
                </div>

            </form>

            {/* CREATE NEW SUB-SECTION */}
            {course?.courseContent?.length > 0 && (
                <NestedSections handleEditSectionName={handleEditSectionName} />
            )}

            {/* NEXT AND BACK BUTTONS */}
            <div className="flex justify-end gap-x-3">
                {/* BACK */}
                <button
                    onClick={goBack}
                    className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
                >
                    Back
                </button>

                {/* NEXT */}
                <IconBtn
                    text="Next"
                    disabled={loading}
                    onClick={gotToNextStep}
                >
                    <MdNavigateNext />
                </IconBtn>

            </div>
        </div>
    )
}

export default CourseBuilderForm