import React from 'react'
import RatingStars from '../../common/RatingStars'

function RatingCard({ item }) {

    return (
        <div
            className=" max-w-[400px] max-md:w-[300px] h-[200px] max-h-[250px] max-md:h-[170px] rounded-xl border border-b-0 flex-shrink-0 border-slate-700 px-8 pt-4 md:w-[450px] bg-richblack-800 overflow-hidden"
        >
            <div className="h-[85%] flex flex-col justify-between">
                <div className='mx-auto'>
                    <RatingStars Review_Count={item?.rating} />
                </div>

                <div className="relative h-[50%] pt-2 text-sm text-gray-100 font-normal italic capitalize overflow-y-hidden">
                    “ {item.review.slice(0, 100)}... ”
                </div>

                <div className="h-[30%] flex gap-x-4 items-center">
                    <img
                        src={item?.user?.image}
                        alt="user-image"
                        className='h-9 w-9 aspect-square object-cover rounded-full ring-2 ring-fontPurple'
                    />

                    <span className="flex flex-col gap-x-1">
                        <p className="text-sm text-gray-400 font-normal">
                            {item?.course?.courseName}
                        </p>
                        <p className="text-sm text-gray-400 font-normal capitalize">
                            {item?.user.firstName} {item?.user.lastName}
                        </p>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default RatingCard