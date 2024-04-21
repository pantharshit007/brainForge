import React from 'react'
import HightlightText from './HightlightText'
import know_your_progress from '../../../assets/Images/Know_your_progress.png'
import Compare_with_others from "../../../assets/Images/Compare_with_others.svg";
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.svg";
import CTAButton from './Button';

function LearningLangSection() {
    return (
        <div>
            <div className=' my-10'>
                {/* Heading */}
                <div className='text-4xl font-semibold text-center'>
                    Your swiss knife for
                    <HightlightText text={" learning any language"} />
                </div>
                {/* para */}
                <div className='text-center text-base text-richblack-600 mx-auto mt-3 font-normal leading-6 lg:w-[75%]'>
                    Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
                </div>
                {/* Images */}
                <div className="flex flex-col lg:flex-row  items-center justify-center mt-5 ">
                    <img src={know_your_progress} alt="Know_Your_Progress"
                        className='object-contain lg:-mr-32'
                    />
                    <img src={Compare_with_others} alt="Compare_with_others"
                        className='object-contain lg:mt-0 -mt-6'
                    />
                    <img src={Plan_your_lessons} alt="Plan_your_lessons"
                        className='object-contain lg:-ml-36 -mt-14'
                    />
                </div>
                {/* button */}
                <div className='w-fit mx-auto lg:mb-20 mb-8 lg:-mt-5'>
                    <CTAButton active={true} linkTo={'/signup'} >
                        <div>Learn More</div>
                    </CTAButton>
                </div>

            </div>
        </div>
    )
}

export default LearningLangSection