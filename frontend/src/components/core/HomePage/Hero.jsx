import React from 'react'
import { Link } from 'react-router-dom'
import Tilt from 'react-parallax-tilt';
import { FaArrowRight } from 'react-icons/fa'

import curve from '../../../assets/Images/curve.png'
import vim_image3 from '../../../assets/Images/vim_image3.png'
import HightlightText from './HightlightText';
import CTAButton from './Button';


function Hero() {


    return (
        <>
            {/* Upgrade to Instructor */}
            <Link to='/signup'>
                <div className=' group mx-auto mt-16 p-1 rounded-full font-bold text-richblack-200 bg-richblack-800 transition-all duration-200 hover:scale-95 w-fit drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] hover:drop-shadow-none  '>
                    <div className=' flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900 '>
                        <p>Become an Instructor </p>
                        <FaArrowRight />
                    </div>
                </div>
            </Link>

            <div className="relative z-10 max-w-[62rem] mx-auto text-center  ">
                <h1 className="heading mb-6">
                    Explore the Possibilities of&nbsp;Programming&nbsp; with {` `}
                    <span className="inline-block relative">
                        <HightlightText text={'BrainForge'} />{" "}
                        <img
                            src={curve}
                            className="absolute top-full left-0 w-full xl:-mt-2"
                            width={624}
                            height={28}
                            alt="Curve"
                        />
                    </span>
                </h1>

                <p className="body-1 max-w-3xl mx-auto mb-6 text-n-2 lg:mb-8 text-richblack-100 font-inter">
                    With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources from instructors.
                </p>
            </div>

            {/* Click to Action Buttons */}
            <div className='flex flex-row gap-7 mb-7 md:mb-20'>
                <CTAButton active={true} linkTo={'/signup'}>
                    Learn More
                </CTAButton>
                <CTAButton active={false} linkTo={'/login'}>
                    Book a Demo
                </CTAButton>
            </div>

            {/* DISPLAY IMAGE */}
            <Tilt transitionSpeed={2500} scale={1.04} tiltMaxAngleX={8} tiltMaxAngleY={10}>
                <div className="relative max-w-[23rem] mx-auto md:max-w-5xl xl:mb-24">
                    <div className="relative z-10 p-0.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                        <div className="relative z-10 h-4 mx-6 bg-[#1B1B2E]/70 shadow-xl rounded-t-[1.25rem] lg:h-6 lg:mx-20" />
                        <div className="relative bg-[#0d0c12] rounded-[1rem]">
                            <div className="aspect-[33/40] rounded-[0.9rem] overflow-hidden md:aspect-[688/490] lg:aspect-[1024/490] py-32 max-md:py-28">
                                <img
                                    src={vim_image3}
                                    alt="VIM"
                                    className="w-full scale-[1.7] md:scale-[1.05] object-contain lg:-translate-y-[23%]"
                                    width={1024}
                                    height={490}
                                    loading='lazy'
                                />
                            </div>
                        </div>
                        <div className="relative z-10 h-4 mx-6 bg-[#1B1B2E]/70 shadow-xl rounded-b-[1.25rem] lg:h-6 lg:mx-20" />
                    </div>
                </div>
            </Tilt>
        </>

    )
}

export default Hero