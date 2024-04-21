import React from 'react'

function CourseCard({ cardData, currentCard, setCurrentCard }) {
    return (
        <div className='h-[300px] w-[40%] bg-white'>
            {/* Upper section */}
            <div className='h-[80%] bg-slate-400 px-6 pt-6'>
                <div className='gap-4'>
                    <div className='text-xl text-richblack-700 font-semibold border-red-400'>{cardData.heading}</div>
                    <div className='text-x text-richblack-700 font-normal'>{cardData.description}</div>
                </div>
            </div>

            {/* Lower section */}
            <div className='flex justify-between bg-slate-200 h-[20%] text-richblue-100 font-semibold'>
                <div>
                    <p>{cardData.level}</p>
                </div>
                <div>
                    <p>{cardData.lessionNumber}</p>
                </div>

            </div>
        </div>
    )
}

export default CourseCard