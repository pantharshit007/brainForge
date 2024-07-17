import React from 'react'
import RatingStars from '../../common/RatingStars'

function ReviewSection({ ratingAndReviews, avgReviewCount, studentsEnrolled }) {

    return (
        <div className='mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[990px]'>
            <div className='my-8 border border-richblack-600 p-3 md:p-8 rounded-sm'>
                <p className='text-3xl font-semibold'>
                    Reviews
                </p>

                <div className='mt-5'>
                    <div className='flex items-center gap-2'>
                        <span className='text-4xl font-semibold text-indigo-500'>{avgReviewCount} </span>
                        <span className='text-2xl'>/ 5</span>
                        <span className='text-richblack-50 font-mono'>({ratingAndReviews?.length} ratings)</span>
                        <span className='text-richblack-50'>|</span>
                        <span className='text-richblack-50 font-mono'> {studentsEnrolled?.length} students</span>
                    </div>
                </div>

                {/* INFO */}
                <div className='mt-7'>
                    {ratingAndReviews.length !== 0

                        ? ratingAndReviews.map(reviews => (
                            <div
                                key={reviews?._id}
                                className='flex flex-col md:items-baseline gap-3 py-4 border-b-[1px] border-b-richblack-600 last:border-none'>
                                <div className='flex items-center gap-x-3'>
                                    <img
                                        src={reviews?.user?.image}
                                        alt={"user-" + reviews?.user?.firstName}
                                        className="h-10 w-10 rounded-full object-cover"
                                    />

                                    <p className="capitalize text-lg">
                                        {reviews?.user?.firstName} {reviews?.user?.lastName}
                                    </p>
                                </div>

                                <RatingStars Review_Count={reviews?.rating} />

                                <p className='font-medium'>
                                    {reviews?.review}
                                </p>
                            </div>
                        ))

                        : <p className='font-semibold text-lg'>No Reviews Yet!</p>
                    }

                </div>
            </div>
        </div>
    )
}

export default ReviewSection