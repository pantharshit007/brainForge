import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import { MdNavigateNext } from "react-icons/md"
import toast from 'react-hot-toast';

import { fetchCourseCategories } from '../../../../../services/backendCallFunction/categoryAPI'
import TagsInput from './TagsInput';
import Upload from './Upload';
import Instruction from './Instruction';
import { setCourse, setEditCourse, setStep } from '../../../../../reducer/slices/courseSlice';
import IconBtn from '../../../../common/IconBtn';
import { createCourse, updateCourse } from '../../../../../services/backendCallFunction/courseAPI';
import { COURSE_STATUS, errorToastPosition } from '../../../../../utils/constant';

function CourseInformationForm() {

    // importing functions for form from react hook form
    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors },
    } = useForm()

    const token = useSelector(state => state.auth.token);
    const { course, editCourse } = useSelector(state => state.course);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false);
    const [courseCategories, setCourseCategories] = useState([]);

    useEffect(() => {
        async function getCategories() {
            setLoading(true);
            const categories = await fetchCourseCategories(dispatch, navigate)
            if (categories.length > 0) {
                setCourseCategories(categories);
            }
            setLoading(false);
        }

        // resume from wherever we left last time for: Draft and Update courses
        if (editCourse) {
            setValue('courseTitle', course.courseName);
            setValue('courseDescription', course.courseDescription);
            setValue('coursePrice', course.price);
            setValue("courseTags", course.tag);
            setValue("courseBenefits", course.whatYouWillLearn);
            setValue("courseCategory", course.category);
            setValue("courseInstructions", course.instructions);
            setValue("courseImage", course.thumbnail);
        }

        getCategories();
    }, []);

    // function for when form is updated to determine if there is any changes or not?
    const isFormUpdated = () => {
        const currentValues = getValues();

        if (currentValues.courseTitle !== course.courseName ||
            currentValues.courseDescription !== course.courseDescription ||
            currentValues.coursePrice !== course.price ||
            currentValues.courseTags.toString() !== course.tag.toString() ||
            currentValues.courseBenefits !== course.whatYouWillLearn ||
            currentValues.courseCategory._id !== course.category._id ||
            currentValues.courseInstructions.toString() !== course.instructions.toString() ||
            currentValues.courseImage !== course.thumbnail)
            return true;
        else
            return false;
    }

    // function for form submission and moving to next steps
    async function onSubmit(data) {

        // check if we are editing course:
        if (editCourse) {
            if (isFormUpdated()) {
                const currentValues = getValues();
                const formData = new FormData();

                formData.append('CourseId', course._id);

                if (currentValues.courseTitle !== course.courseName) {
                    formData.append("courseName", data.courseTitle);
                }

                if (currentValues.courseDescription !== course.courseDescription) {
                    formData.append("courseDescription", data.courseDescription);
                }

                if (currentValues.coursePrice !== course.price) {
                    formData.append("price", data.coursePrice);
                }

                if (currentValues.courseBenefits !== course.whatYouWillLearn) {
                    formData.append("whatYouWillLearn", data.courseBenefits);
                }

                if (currentValues.courseCategory._id !== course.category._id) {
                    formData.append("category", data.courseCategory);
                }

                if (currentValues.courseInstructions.toString() !== course.instructions.toString()) {
                    formData.append("instructions", JSON.stringify(data.courseInstructions));
                }

                setLoading(true);
                const result = await updateCourse(token, formData);
                setLoading(false);

                if (result) {
                    dispatch(setEditCourse(false));
                    dispatch(setStep(2));
                    dispatch(setCourse(result));
                }

            } else {
                toast.error("Found no Changes!", errorToastPosition)
            }

            return;
        }

        // create new course
        const formData = new FormData();
        formData.append("courseName", data.courseTitle);
        formData.append("courseDescription", data.courseDescription);
        formData.append("price", data.coursePrice);
        formData.append("whatYouWillLearn", data.courseBenefits);
        formData.append("category", data.courseCategory);
        formData.append("instructions", JSON.stringify(data.courseInstructions));
        formData.append("status", COURSE_STATUS.DRAFT);
        formData.append("tag", JSON.stringify(data.courseTags));
        formData.append("thumbnailImage", data.courseImage);

        setLoading(true);
        const result = await createCourse(token, formData);

        if (result) {
            dispatch(setStep(2))
            dispatch(setCourse(result));
        }
        setLoading(false);
    }


    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6'
        >

            {/* COURSE TITLE */}
            <div className="flex flex-col space-y-2">
                <label className="text-sm text-richblack-5" htmlFor="courseTitle">
                    Course Title <sup className="text-pink-200">*</sup>
                </label>

                <input
                    id="courseTitle"
                    placeholder="Course Title"
                    {...register("courseTitle", { required: true })}
                    className="form-style w-full"
                />

                {errors.courseTitle && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                        Course title is required
                    </span>
                )}
            </div>

            {/* COURSE DESCRIPTION */}
            <div className="flex flex-col space-y-2">
                <label className='text-sm text-richblack-5' htmlFor="courseDescription">
                    Course Description<sup className='text-pink-200'>*</sup>
                </label>

                <textarea
                    name="courseDescription"
                    id="courseDescription"
                    placeholder='Enter Course Description'
                    {...register("courseDescription", { required: true })}
                    className='form-style resize-x-none min-h-[130px] w-full'
                />

                {errors.courseDescription && (<span className='ml-2 text-xs tracking-wide text-pink-200'>
                    Course Description is required**
                </span>)
                }
            </div>

            {/* COURSE PRICE */}
            <div className='relative flex flex-col space-y-2'>
                <label className='text-sm text-richblack-5' htmlFor='coursePrice'>
                    Course Price<sup className='text-pink-200'>*</sup>
                </label>

                <input
                    type='number'
                    id='coursePrice'
                    placeholder='Enter Course Price'
                    {...register("coursePrice", {
                        required: true,
                        valueAsNumber: true
                    })}
                    className='form-style w-full !pl-12'
                />
                <HiOutlineCurrencyRupee size={30} className='absolute top-7 left-2 text-indigo-400' />

                {errors.coursePrice && (
                    <span className='ml-2 text-xs tracking-wide text-pink-200'>Course Price is Required**</span>
                )
                }
            </div>

            {/* COURSE CATEGORY */}
            <div className='flex flex-col space-y-2'>
                <label htmlFor="courseCategory" className='text-sm text-richblack-5'>
                    Course Category <sup className='text-pink-200'>*</sup>
                </label>

                <select
                    disabled={editCourse}
                    id="courseCategory"
                    className='form-style w-full'
                    defaultValue=''
                    {...register('courseCategory', { required: true })}
                >

                    <option value="" disabled>Choose a Category</option>

                    {!loading && courseCategories.map((category, index) => (
                        <option key={index} value={category?._id}>
                            {category?.name}
                        </option>
                    ))}
                </select>

                {errors.courseCategory && (
                    <span className='ml-2 text-xs tracking-wide text-pink-200'>
                        Course Category is Required
                    </span>
                )}
            </div>

            {/* TAGS- input */}
            <>
                <TagsInput
                    label="Tags"
                    name="courseTags"
                    placeholder="Press 'Enter' or ',' to add a tag"
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    getValues={getValues}
                />
            </>

            {/* UPLOAD THUMBNAIL */}
            <>
                <Upload
                    name={"courseImage"}
                    label={"CourseImage"}
                    register={register}
                    errors={errors}
                    setValue={setValue}
                />
            </>

            {/* BENEFIT OF COURSE */}
            <div>
                <label className='text-sm text-richblack-5' htmlFor='courseBenefits'>
                    Benefits of the course<sup className='text-pink-200'>*</sup>
                </label>

                <textarea
                    id='courseBenefits'
                    placeholder='Enter Benefits of the course'
                    {...register("courseBenefits", { required: true })}
                    className='form-style resize-x-none min-h-[130px] w-full'
                />
                {errors.courseBenefits && (
                    <span className='ml-2 text-xs tracking-wide text-pink-200'>
                        Benefits of the course are required**
                    </span>
                )}
            </div>

            {/* INSTRUCTION/REQUIREMENTS */}
            <>
                <Instruction
                    name="courseInstructions"
                    label="Requirements/Instructions"
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    getValues={getValues}
                />
            </>

            {/* BUTTONS */}
            <div>
                {editCourse && (
                    <button
                        onClick={() => dispatch(setStep(2))}
                        className=' text-[10px] md:text-sm p-2 px-1 font-semibold rounded-md flex items-center gap-x-2 bg-richblack-300'
                    >
                        Continue without saving
                    </button>
                )}

                <IconBtn
                    type={"submit"}
                    text={!editCourse ? 'Next' : 'Save Changes'}
                    disabled={loading}
                >
                    <MdNavigateNext />
                </IconBtn>
            </div>

        </form>
    )
}

export default CourseInformationForm