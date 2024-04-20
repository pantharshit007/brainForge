import React from 'react'
import { TimeLine } from '../../../utils/utility'
import timelineImage from '../../../assets/Images/TimelineImage.png'

function TimeLineSection() {
    const timeLine = TimeLine

    return (
        <div>
            <div className='flex flex-col lg:flex-row gap-20 mb-20 items-center' >

                {/* skills Box */}
                <div className='w-[45%] flex lg:flex-col gap-5 '>{
                    timeLine.map((element, index) => {
                        return (
                            <div className="flex flex-row gap-6" key={index}>
                                {/* image */}
                                <div className='w-[50px] h-[50px] bg-white place-items-center'>
                                    <img src={element.Logo} alt="Logo-Img" />
                                </div>

                                {/* Skill Detail */}
                                <div >
                                    <h2 className='font-semibold text-[18px]'>
                                        {element.Heading}
                                    </h2>
                                    <p className='text-base'>{element.Description}</p>
                                </div>
                            </div>
                        )
                    })
                }</div>

                {/* Image Box */}
                <div className='relative w-fit h-fit shadow-indigo-600 shadow-[0px_0px_30px_0px]'>
                    <img src={timelineImage} alt="TimeLine-Image"
                        className="shadow-white shadow-[20px_20px_0px_0px] object-cover h-[400px] lg:h-fit"
                    />

                    <div className="absolute lg:left-[50%] lg:bottom-0 lg:translate-x-[-50%] lg:translate-y-[50%] bg-caribbeangreen-700 flex lg:flex-row flex-col text-white uppercase py-5 gap-4 lg:gap-0 lg:py-10 ">

                        {/* left-Box */}
                        <div className='flex flex-row items-center gap-5 lg:border-r border-caribbeangreen-300 px-7 lg:px-14'>
                            <p className="text-3xl font-bold w-[75px]">10</p>
                            <p className='text-caribbeangreen-200 text-sm w-[75px]'>YEARS EXPERIENCES</p>
                        </div>

                        {/* right-Box */}
                        <div className='flex flex-row items-center gap-5 lg:px-14 px-7'>
                            <p className="text-3xl font-bold w-[75px]">250</p>
                            <p className='text-caribbeangreen-200 text-sm w-[75px]'>TYPES OF COURSES</p>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default TimeLineSection