import React from 'react'

// Importing React Icons
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

function CourseCard({ cardData, currentCard, setCurrentCard }) {
    return (
        <div className={`h-[300px] w-[360px] lg:w-[30%] cursor-pointer
            ${currentCard === cardData?.heading
                ? 'bg-white shadow-[12px_12px_0_0] shadow-indigo-600'
                : 'bg-richblack-800'
            }`}
            onClick={() => setCurrentCard(cardData.heading)}
        >
            {/* Upper section */}
            <div className='h-[80%] px-6 pt-6 ' >
                <div className=' flex flex-col gap-5'>
                    <div className={`text-[20px]  font-semibold 
                        ${currentCard === cardData?.heading ? "text-richblack-700" : "text-richblack-25"}`}>
                        {cardData.heading}
                    </div>
                    <div className='text-x text-richblack-300 font-normal'>{cardData.description}</div>
                </div>
            </div>

            {/* Lower section */}
            <div className={`flex justify-between mx-6 h-[20%]  font-semibold border-t-[2px] border-richblack-400 
                ${currentCard === cardData?.heading
                    ? 'text-blue-300'
                    : 'text-richblack-300'
                }
            border-dashed `}>
                <div className='flex items-center gap-2 text-[16px]'>
                    <HiUsers />
                    <p>{cardData.level}</p>
                </div>
                <div className='flex items-center gap-2 text-[16px]'>
                    <ImTree />
                    <p>{cardData.lessionNumber} lessons</p>
                </div>

            </div>
        </div>
    )
}

export default CourseCard