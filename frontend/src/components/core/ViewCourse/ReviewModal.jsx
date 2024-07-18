import React, { useEffect } from 'react'
import { motion } from "framer-motion"
import { RxCross2 } from 'react-icons/rx'
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Rating } from 'react-simple-star-rating'
import IconBtn from '../../common/IconBtn';
import { addReviewAndRating } from '../../../services/backendCallFunction/courseAPI';
import { useParams } from 'react-router-dom';

const dropIn = {
    hidden: {
        y: "-100vh",
        opacity: 0,
    },
    visible: {
        y: "0",
        opacity: 1,
        transition: {
            duration: 0.5,
            type: "spring",
            damping: 55,
            stiffness: 500,
        },
    },
    exit: {
        y: "+100vh",
        opacity: 0,
    },
};

const fillColorArray = [
    "#f14545",
    "#f15945",
    "#f19745",
    "#f19745",
    "#f1a545",
    "#f1a545",
    "#f1b345",
    "#f1b345",
    "#f1d045",
    "#f1d045"
];

function ReviewModal({ setReviewModal }) {
    const { user } = useSelector(state => state.profile);
    const { token } = useSelector(state => state.auth);
    const { courseId } = useParams();

    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm();

    useEffect(() => {
        setValue("userRating", "");
        setValue("userReview", "");
    }, [])

    const handleRating = (rate) => {
        setValue("userRating", rate);
    }

    // rating and review submition
    async function onSubmit(data) {
        const formData = {
            courseId: courseId,
            rating: data.userRating,
            review: data.userReview
        }
        await addReviewAndRating(token, formData);

        setReviewModal(false);
    }

    return (
        <motion.div
            className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-opacity-10 "
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
            variants={dropIn}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className='flex flex-col w-11/12 max-w-[700px] rounded-md border border-richblack-400 bg-richblack-800'
            >

                {/* ADD REVIEW */}
                <div className='flex items-center justify-between rounded-t-lg bg-richblack-700 p-5'>
                    <p className='text-xl font-semibold text-richblack-5'>Add Review</p>
                    <button>
                        <RxCross2
                            onClick={() => { setReviewModal(false) }}
                            className=' text-xl text-richblack-25' />
                    </button>
                </div>

                {/* CONTENT BOX */}
                <div className='p-5'>
                    <div className='flex items-center justify-center gap-x-4'>
                        <img
                            src={user?.image}
                            alt="user-image"
                            className='aspect-square w-[50px] rounded-full object-cover border-2 border-indigo-600'
                        />
                        <div>
                            <p className='font-medium text-richblack-5 font-mono'>
                                {user?.firstName} {user?.lastName}
                            </p>
                            <p className='text-sm text-richblack-5'>Posting Publicly</p>
                        </div>
                    </div>

                    {/* RATING AND REVIEW */}
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className='mt-6 flex flex-col items-center'
                    >
                        <>
                            <Rating
                                onClick={handleRating}
                                allowFraction
                                transition
                                fillColorArray={fillColorArray}
                                SVGclassName={`inline-block`}
                            />
                            <input
                                value={getValues().userRating}
                                {...register("userRating", { required: true })}
                                type="hidden"
                            />
                            {errors.userRating &&
                                <span className='text-pink-200 text-[11px]'>* Please provide your rating</span>
                            }
                        </>

                        <div className='flex w-11/12 flex-col space-y-2'>
                            <label htmlFor="userReview" className='text-sm text-richblack-5'>
                                Add Your Experience <span className='text-pink-200'>*</span>
                            </label>
                            <textarea
                                type="text"
                                id="userReview"
                                placeholder='Write your experience...'
                                className='form-style resize-x-none min-h-[150px] w-full'
                                {...register('userReview', {
                                    required: {
                                        value: true,
                                        message: 'Please provide your experience '
                                    }, maxLength: {
                                        value: 100,
                                        message: "This input exceed maxLength.",
                                    },
                                })}
                            />
                            {errors.userReview &&
                                <span className='text-pink-200 text-[12px]'>* {errors.userReview?.message}</span>
                            }
                        </div>

                        <div className='mt-6 flex w-11/12 justify-end gap-x-2'>
                            <IconBtn text='Cancel' onClick={() => setReviewModal(false)} outline={true} />
                            <IconBtn text={'Submit'} type="submit" />
                        </div>
                    </form>
                </div>
            </div>

        </motion.div>
    )
}

export default ReviewModal