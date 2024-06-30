import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import IconBtn from '../components/common/IconBtn'
import { buyCourse } from '../services/backendCallFunction/paymentAPI';
import { addToCart } from '../reducer/slices/cartSlice';
import { fetchCourseDetails } from '../services/backendCallFunction/courseAPI';
import getAvgRating from '../utils/avgRating';

function CourseDetail() {

    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { paymentLoading } = useSelector((state) => state.course);

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { courseId } = useParams();

    const [courseDetails, setCourseDetails] = useState(null);

    async function handleBuyCourse() {
        const res = await buyCourse(token, [courseId], user, navigate, dispatch, paymentLoading)
        console.log(res);
    }

    function handleAddToCart() {
        dispatch(addToCart(courseDetails))
    }

    // fetching course details
    useEffect(() => {
        async function getCourseDetails() {
            const res = await fetchCourseDetails({ courseId });
            console.log('Get course details:', res.courseDetails);
            setCourseDetails(res.courseDetails);
        }
        getCourseDetails()
    }, [courseId])

    useEffect(() => {
        if (courseDetails?.ratingAndReviews?.length > 0) {
            const count = getAvgRating(courseDetails?.ratingAndReviews)
            console.log("getCourseDetails -> count", parseInt(count));
        }
    }, [courseDetails?.ratingAndReviews])

    if (paymentLoading) {
        // console.log("payment loading")
        return (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <div className="spinner"></div>
            </div>
        )
    }

    return (

        <div className='m-14'>
            <IconBtn onClick={handleBuyCourse} text="Buy Now" />
            <IconBtn onClick={handleAddToCart} text="Add to cart" />
        </div>
    )
}

export default CourseDetail