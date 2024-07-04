import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { BsGlobe } from 'react-icons/bs';
import { FaShareSquare } from 'react-icons/fa';

import IconBtn from '../components/common/IconBtn'
import { buyCourse } from '../services/backendCallFunction/paymentAPI';
import { addToCart } from '../reducer/slices/cartSlice';
import { fetchCourseDetails } from '../services/backendCallFunction/courseAPI';
import getAvgRating from '../utils/avgRating';
import { setLoading } from '../reducer/slices/profileSlice';
import Backdrop from '../components/common/Backdrop';
import ConfirmationModal from '../components/common/ConfirmationModal';
import RatingStars from '../components/common/RatingStars';
import { formattedDate } from '../utils/dateFormatter';
import CourseDetailCard from '../components/core/Course/CourseDetailCard';
import CourseAccordian from '../components/core/Course/CourseAccordian';
import ReviewSection from '../components/core/Course/ReviewSection';
import Footer from '../components/common/Footer';
import { ACCOUNT_TYPE, toastPosition } from '../utils/constant';
import toast from 'react-hot-toast';

function CourseDetail() {

    const { token } = useSelector((state) => state.auth);
    const { user, loading } = useSelector((state) => state.profile);
    const { paymentLoading } = useSelector((state) => state.course);
    const { cart } = useSelector((state) => state.cart)

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { courseId } = useParams();

    const [courseData, setCourseData] = useState(null);
    const [avgReviewCount, setAvgReviewCount] = useState(0);
    const [totalLectures, setTotalLectures] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const [isActive, setIsActive] = useState(new Set());
    const [availableInCart, setAvailableInCart] = useState(null)

    const {
        courseName,
        courseDescription,
        whatYouWillLearn,
        courseContent,
        ratingAndReviews,
        instructor,
        studentEnrolled: studentsEnrolled,
        createdAt,
        updatedAt,
        thumbnail
    } = courseData || {};

    // buy course
    async function handleBuyCourse() {
        if (!token) {
            setConfirmationModal({
                text1: "You are not logged in!",
                text2: "Please login to Purchase Course.",
                btnText1: "Login",
                btnText2: "Cancel",
                btn1handler: () => navigate("/login"),
                btn2handler: () => setConfirmationModal(null),
            });
            return;
        }

        await buyCourse(token, [courseId], user, navigate, dispatch, paymentLoading);
    }

    // add to cart
    function handleAddToCart() {
        if (token) {
            dispatch(addToCart(courseData))
            return
        }

        setConfirmationModal({
            text1: "You are not logged in!",
            text2: "Please login to Purchase Course.",
            btnText1: "Login",
            btnText2: "Cancel",
            btn1handler: () => navigate("/login"),
            btn2handler: () => setConfirmationModal(null),
        })
    }

    // Expand/Collapse Accordian
    const handleAccordion = useCallback((id) => {
        setIsActive(prev => {
            // Create a new Set from prevIsActive
            const newIsActive = new Set(prev);
            // Toggle the id in the new Set
            if (newIsActive.has(id)) {
                newIsActive.delete(id);
            } else {
                newIsActive.add(id);
            }
            return newIsActive;
        })
    }, [])

    useEffect(() => {
        const isAlreadyInCart = cart?.find(item => item._id === courseId)
        setAvailableInCart(isAlreadyInCart)
    }, [cart])

    function handleCopy() {
        navigator.clipboard.writeText(window.location.href)
        toast.success('URL Copied to clipboard!', toastPosition)
    }

    // fetching course details
    useEffect(() => {
        async function getCourseDetails() {
            setLoading(true);

            const res = await fetchCourseDetails({ courseId });
            console.log('Get course details:', res?.courseDetails);

            setCourseData(res?.courseDetails);
            setTotalDuration(res?.totalDuration);
            dispatch(setLoading(false));
        }
        getCourseDetails()
    }, [courseId, dispatch])

    // is course available in cart
    useEffect(() => {
        if (!courseData) return;

        // Calculate average rating
        const count = getAvgRating(courseData?.ratingAndReviews || []);
        setAvgReviewCount(count);

        // Calculate total number of lectures
        let lectures = courseData?.courseContent
            .reduce((total, section) => total + (section.subSection?.length || 0), 0);

        setTotalLectures(lectures);

        // Update enrollment status
        const alreadyEnrolled = courseData?.studentEnrolled.includes(user?._id);
        if (alreadyEnrolled) setIsEnrolled(true);

    }, [courseData, user?._id]);

    // loader 
    if (paymentLoading || loading || !courseData) {
        return (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <div className="spinner"></div>
            </div>
        )
    }

    return (
        <div className='relative w-11/12 mx-auto bg-richblack-900'>
            <div className='mx-auto box-content px-4 lg:w-[1260px] xl:relative'>
                <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
                    {/* MOBILE VIEW */}
                    <div className="relative block max-h-[30rem] lg:hidden">
                        <img
                            src={thumbnail}
                            alt={'courseImg =' + courseName}
                            className='shadow-sm shadow-indigo-600 rounded-sm'
                        />
                    </div>

                    <div className='z-1 my-2 flex flex-col justify-center gap-4 py-3 text-lg text-richblack-5'>

                        {/* COURSE NAME */}
                        <p className='text-4xl font-bold text-richblack-5 sm:text-[42px]'>
                            {courseName}
                        </p>

                        {/* COURSE DESCRIPTION */}
                        <p className='text-richblack-200'>
                            {courseDescription}
                        </p>

                        {/* RATING AND REVIEW */}
                        <div className='flex gap-x-3 items-center'>
                            <span className='text-yellow-50'>{ratingAndReviews?.length}{' '}</span>
                            <RatingStars Review_Count={avgReviewCount} />
                            <span className=' md:block hidden md:text-xl text-richblack-5 font-mono'>
                                {' | '}{studentsEnrolled?.length || 0}  Student(s) Enrolled
                            </span>
                        </div>

                        {/* CREATOR INFO */}
                        <div>
                            <p>Created By {instructor?.firstName}  {instructor?.lastName}</p>
                        </div>

                        {/* COURSE INFO */}
                        <div className='flex flex-wrap gap-5 text-lg items-center'>
                            <AiOutlineInfoCircle className='text-2xl text-richblack-5' />
                            <p className='text-richblack-50 '>
                                Created at&nbsp;
                                {formattedDate(createdAt)}
                                <span className='md:block hidden text-sm font-mono'>(updated: {formattedDate(updatedAt)})</span>
                            </p>
                            <p className='flex items-center gap-2 text-richblack-50'>
                                <BsGlobe className='text-lg text-richblack-50' />
                                English
                            </p>
                        </div>

                        {/* PRICE: Mobile View */}
                        <div className='flex w-full flex-col gap-4 py-4 lg:hidden'>
                            {ACCOUNT_TYPE.STUDENT === user.accountType
                                ? <>
                                    {isEnrolled
                                        ? <IconBtn text='Go to Course' onClick={() => navigate('/dashboard/enrolled-courses')} customClasses='justify-center' />
                                        : <IconBtn text='Buy Now' onClick={handleBuyCourse} customClasses='justify-center' />
                                    }
                                    {!isEnrolled
                                        ? (availableInCart
                                            ? <IconBtn text='Go to Cart' onClick={() => navigate('/dashboard/cart')} outline={true} customClasses='justify-center' />
                                            : <IconBtn text='Add to Cart' onClick={handleAddToCart} outline={true} customClasses='justify-center' />
                                        )

                                        : <IconBtn text='Already Enrolled' disabled={true} customClasses='cursor-not-allowed opacity-70 justify-center' outline={true} />

                                    }
                                </>
                                : <>
                                    <div className='p-2 rounded-sm outline-1 outline-dashed cursor-not-allowed outline-red-600 '>
                                        Only Student's are allowed to buy courses.
                                    </div>
                                </>
                            }

                            {/* SHARE BUTTON */}
                            <div className="text-center">
                                <button
                                    onClick={handleCopy}
                                    className='mx-auto flex items-center gap-2 text-indigo-600'
                                >
                                    <FaShareSquare className='text-xl text-indigo-600' />
                                    <span>Share</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* COURSE CARD */}
                    <div className='right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute lg:block '>
                        <CourseDetailCard
                            course={courseData}
                            handleBuyCourse={handleBuyCourse}
                            handleAddToCart={handleAddToCart}
                            isEnrolled={isEnrolled}
                        />
                    </div>
                </div>
            </div>

            {/* LOWER SECTION */}
            <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]">
                <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px] ">
                    {/* WHAT YOU WILL LEARN */}
                    <div className='my-8 border border-richblack-600 p-8 rounded-sm'>
                        <p className='text-3xl font-semibold'>
                            What you'll learn
                        </p>

                        <div className='mt-5 font-mono'>
                            {whatYouWillLearn}
                        </div>
                    </div>

                    {/* COURSE CONTENT */}
                    <div className="max-w-[830px] ">
                        {/* HEADING */}
                        <div className="max-w-[830px] ">
                            <p className="text-[28px] font-semibold">Course Content</p>

                            <div className="flex flex-wrap justify-between gap-2 pt-3">
                                <div className='md:flex gap-2 hidden'>
                                    Section(s):
                                    <span className='font-mono text-indigo-500'>{courseContent.length}</span>┆
                                    Lecture(s):
                                    <span className='font-mono text-indigo-500'>{totalLectures}</span>┆
                                    Total Length:
                                    <span className='font-mono text-indigo-500'>{totalDuration}</span>
                                </div>

                                {/* Mobile */}
                                <div className='md:hidden gap-1 flex-col flex'>

                                    <span className='font-mono'>
                                        Section(s): {courseContent.length}
                                    </span>
                                    <span className='font-mono'>
                                        Lecture(s): {totalLectures}
                                    </span>
                                    <span className='font-mono'>
                                        Total Length: {totalDuration}
                                    </span>
                                </div>

                                <div className='pt-[60px] h-full md:p-0'>
                                    <button
                                        onClick={() => setIsActive(new Set())}
                                        className='text-indigo-500'
                                    >
                                        Collapse All
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* COURSE DETAIL ACCORDIAN */}
                        <div className='py-4'>
                            {courseContent.map(section => (
                                <CourseAccordian
                                    key={section._id}
                                    section={section}
                                    isActive={isActive}
                                    handleAccordion={handleAccordion}
                                />
                            ))}
                        </div>
                    </div>

                    {/* ABOUT AUTHOR */}
                    <div className="mb-4 py-4">
                        <p className="text-[28px] font-semibold">Author</p>

                        <div className="flex items-center gap-4 py-4 pl-2">
                            <img
                                alt={"Author-" + instructor?.firstName}
                                src={instructor?.image
                                    ? instructor.image
                                    : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
                                }
                                className="h-14 w-14 rounded-full object-cover outline outline-indigo-600"
                            />

                            <p className='capitalize text-lg font-medium'>
                                {instructor?.firstName} {instructor?.lastName} { }
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* REVIEW SECTION */}
            <div className='mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]'>
                <ReviewSection
                    ratingAndReviews={ratingAndReviews}
                    avgReviewCount={avgReviewCount}
                    studentsEnrolled={studentsEnrolled}
                />
            </div>

            {/* FOOTER */}
            <Footer />

            {/* MODAL */}
            {confirmationModal &&
                <Backdrop onClick={() => setConfirmationModal(null)}>
                    <ConfirmationModal modalData={confirmationModal} />
                </Backdrop>
            }
        </div>
    )
}

export default CourseDetail