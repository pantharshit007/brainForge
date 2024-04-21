import React from 'react'
import Instructor from '../../../assets/Images/Instructor.png'
import HightlightText from './HightlightText'
import CTAButton from './Button'
import { FaArrowRight } from 'react-icons/fa'

function InstructorSection() {
    return (
        <div className='mt-16'>
            <div className='flex flex-col lg:flex-row gap-20 items-center'>
                {/* Instructor Image */}
                <div className='lg:w-[50%] '>
                    <img src={Instructor} alt="Instructor"
                        className="shadow-white shadow-[-20px_-20px_0_0]" />
                </div>
                {/* Description */}
                <div className='lg:w-[50%] flex flex-col gap-10 '>
                    <div className='text-4xl font-semibold llg:w-[50%]'>
                        Become an
                        <HightlightText text={" Instructor"} />
                    </div>
                    <p className='font-medium text-[16px] lg:w-[80%] text-richblack-300'>
                        Instructors from around the world teach millions of students on EdTech. We provide the tools and skills to teach what you love.
                    </p>

                    <div className='w-fit'>
                        <CTAButton active={true} linkTo={'/signup'}>
                            <div className='flex items-center gap-2 '>
                                Start Teaching Today
                                <FaArrowRight />
                            </div>
                        </CTAButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InstructorSection