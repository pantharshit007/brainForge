import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RiDeleteBin6Line } from "react-icons/ri"
import { removeFromCart } from '../../../../reducer/slices/cartSlice'
import RatingStars from '../../../common/RatingStars'
import getAvgRating from '../../../../utils/avgRating'

function RenderCartCourses() {
    const { cart } = useSelector(state => state.cart)
    const { paymentLoading } = useSelector((state) => state.course);
    const dispatch = useDispatch();

    function avgRating(ratingAndReviews) {
        return getAvgRating(ratingAndReviews)
    }

    if (paymentLoading) {
        // console.log("payment loading")
        return (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <div className="spinner"></div>
            </div>
        )
    }

    return (
        <div className="flex w-full flex-col mb-12">
            {cart.map((course, index) => (
                <div key={course._id}
                    className={`flex w-full  items-start justify-between gap-6 ${index !== cart.length - 1 && "border-b border-b-richblack-400 pb-6 "
                        } ${index !== 0 && "mt-6"} `}
                >
                    <div className="flex flex-1 flex-col gap-4 md:flex-row lg:flex-col xl:flex-row">
                        {/* IMAGE - NAME/CREATOR - RATING  */}
                        {/* IMAGE */}
                        <img
                            src={course.thumbnail}
                            alt={course?.courseName}
                            className="md:h-[150px] md:w-[250px] h-[100px] w-[170px] rounded-sm object-cover"
                        />

                        {/* NAME/CREATOR - RATINGS */}
                        <div className="flex flex-col space-y-1">
                            <p className="text-lg font-medium text-richblack-5">
                                {course?.courseName}
                            </p>
                            <p className="text-sm text-richblack-300">
                                {/* TODO: add instructor data in course data in BE */}
                                By {course?.instructor?.firstName + ' ' + course?.instructor?.lastName || 'Abdul Bari'}
                            </p>

                            {/* RATINGS */}
                            <div className="flex items-center gap-2">
                                <span className="text-yellow-5">{avgRating(course?.ratingAndReviews)}</span>
                                {/* STARS */}
                                {
                                    course?.ratingAndReviews?.length > 0
                                        ? < RatingStars Review_Count={avgRating(course?.ratingAndReviews)} />
                                        : <RatingStars Review_Count={0} />
                                }

                                {/* NO OF RATING & REVIEW*/}
                                <span className="text-richblack-300">
                                    ({course?.ratingAndReviews?.length} Ratings)
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* DELETE BUTTON */}
                    <div className="flex flex-col items-end space-y-2">
                        <button
                            onClick={() => dispatch(removeFromCart(course._id))}
                            className="flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-3 px-[12px] text-pink-200"
                        >
                            <RiDeleteBin6Line />
                            {/* <span>Remove</span> */}
                        </button>

                        <p className="mb-6 text-3xl font-medium text-indigo-500">
                            ₹ {course?.price}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default RenderCartCourses