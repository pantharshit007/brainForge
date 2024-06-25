import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Tilt from 'react-parallax-tilt';

import RatingStars from '../../common/RatingStars'
import getAvgRating from '../../../utils/avgRating';

function CourseCard({ course, Height, slider = false }) {

    const [avgReviewCount, setAvgReviewCount] = useState(0)

    useEffect(() => {
        const count = getAvgRating(course.ratingAndReviews)
        setAvgReviewCount(count)
    }, [course])

    return (
        <Tilt transitionSpeed={2500} tiltMaxAngleX={6} tiltMaxAngleY={6} scale={.96}>
            <Link to={'/course/' + course._id}>
                <div
                    className='bg-richblack-900 max-w-maxContentTab rounded-md p-2 hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]'
                >
                    {/* IMAGE */}
                    <div className={`max-w-max ${!slider && 'mx-auto'}`}>
                        <img
                            src={course.thumbnail}
                            alt={'Thumbnail-' + course.courseName}
                            className={`${Height} rounded-md object-cover `}
                        />

                    </div>

                    <div className='flex flex-col gap-2 px-1 py-3'>
                        <p className='text-m md:text-xl text-richblack-5'>
                            {course.courseName}
                        </p>

                        <p className='text-sm md:text-[1rem] italic text-richblack-50'>
                            By{' '}
                            <span className=''>
                                {course?.instructor.firstName}{' '}
                                {course?.instructor.lastName}
                            </span>
                        </p>

                        {/* RATING */}
                        <div className="flex gap-x-3">
                            <span className='text-yellow-50'>
                                {avgReviewCount.toFixed(1) || 0.0}
                            </span>

                            <RatingStars Review_Count={avgReviewCount} />

                            <span className=' md:block hidden md:text-x italic text-richblack-5'>
                                No. of Ratings: {course?.ratingAndReviews?.length}
                            </span>
                        </div>

                        <p className='text-sm md:text-xl text-richblack-5'>
                            Rs. {course?.price}
                        </p>
                    </div>
                </div>
            </Link>
        </Tilt>
    )
}

export default CourseCard