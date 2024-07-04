import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaShareSquare } from 'react-icons/fa';
import toast from 'react-hot-toast'

import IconBtn from '../../common/IconBtn'
import { ACCOUNT_TYPE, toastPosition } from '../../../utils/constant'

function CourseDetailCard({ course, handleBuyCourse, handleAddToCart, isEnrolled }) {
    const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)
    const { cart } = useSelector((state) => state.cart)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {
        _id: courseId,
        courseName: courseName,
        thumbnail: ThumbnailImage,
        price: coursePrice,
        instructions,
    } = course

    const [availableInCart, setAvailableInCart] = useState(null)

    useEffect(() => {
        const isAlreadyInCart = cart?.find(item => item._id === courseId)
        setAvailableInCart(isAlreadyInCart)
    }, [cart])

    function handleCopy() {
        navigator.clipboard.writeText(window.location.href)
        toast.success('URL Copied to clipboard!', toastPosition)
    }

    return (
        <div className='flex flex-col gap-4 rounded-md bg-richblack-800 p-4 text-richblack-5'>
            {/* IMAGE */}
            <img
                src={ThumbnailImage}
                alt={'courseImg =' + courseName}
                className='max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-md object-cover md:max-w-full'
            />

            {/* SECTION */}
            <div className='px-4'>
                {/* PRICE */}
                <div className='space-x-3 pb-4 text-3xl font-semibold'>
                    <span>₹ {coursePrice}</span>
                </div>

                {/* BUTTON */}
                <div className='flex flex-col gap-4 '>
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
                </div>

                {/* MONEY BACK */}
                <div className='pb-3 pt-6 text-center text-sm text-richblack-25'>
                    <p>30-Day Money-Back Guarantee</p>
                </div>

                {/* COURSE BENEFITS */}
                <div >
                    <p className='my-2 text-xl font-semibold '>Prerequisite/ Requirement :</p>

                    <div className='flex flex-col gap-1 text-sm text-caribbeangreen-100'>
                        {instructions.map((item, i) => (
                            <div key={i} className='flex gap-2 items-center'>
                                <span>⇒</span>
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* SHARE BUTTON */}
                <div className="text-center">
                    <button
                        onClick={handleCopy}
                        className='mx-auto flex items-center gap-2 py-6 text-indigo-600'
                    >
                        <FaShareSquare className='text-xl text-indigo-600' />
                        <span>Share</span>
                    </button>
                </div>

            </div>
        </div>
    )
}

export default CourseDetailCard