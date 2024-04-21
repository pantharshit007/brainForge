import React from 'react'
import { TimeLine } from '../../../data/utility'
import timelineImage from '../../../assets/Images/TimelineImage.png'

function TimeLineSection() {
    const timeLine = TimeLine

    return (
        <div>
            <div className='flex flex-col lg:flex-row gap-20 mb-20 items-center' >

                {/* skills Box */}
                <div className='lg:w-[45%] flex flex-col lg:gap-3'>{
                    timeLine.map((element, index) => {
                        return (
                            <div className="flex flex-col lg:gap-3" key={index}>

                                <div className="flex lg:flex-row gap-6" >
                                    {/* image */}
                                    <div className='w-[52px] h-[52px] bg-white place-items-center rounded-full flex justify-center items-center shadow-[#00000012] shadow-[0_0_62px_0]'>
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

                                {/* dottes line in bettween widgets */}
                                <div className={`h-14 border-dotted border-r border-richblack-200 bg-richblack-400/0 w-[26px] 
                                        ${(timeLine.length - 1) != index ? 'block' : 'hidden'}`} >
                                </div>
                            </div>

                        )
                    })
                }</div>

                {/* Image Box */}
                <div className='relative w-fit h-fit shadow-indigo-600 shadow-[0px_0px_30px_0px]'>

                    <div className="absolute lg:left-[50%] lg:bottom-0 lg:translate-x-[-50%] lg:translate-y-[50%]  bg-caribbeangreen-700 flex lg:flex-row flex-col text-white uppercase py-5 gap-4 lg:gap-0 lg:py-10 ">

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
                    <div></div>
                    <img src={timelineImage} alt="TimeLine-Image"
                        className="shadow-white shadow-[20px_20px_0px_0px] object-cover h-[400px] lg:h-fit"
                    />
                </div>
            </div>
        </div>
    )
}

export default TimeLineSection