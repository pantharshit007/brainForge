import React from 'react'
import { Link } from 'react-router-dom'

import Not_found from '../assets/Images/Not_found.png'

function Error() {
    return (
        <div className="relative flex justify-center items-center text-3xl text-red-500 h-[calc(100vh-3.5rem)]">
            <p className='pb-7'>Error - 404 Not Found</p>

            <div className='absolute left-[55%] bottom-0'>
                <div className='relative pl-8'>
                    <img
                        src={Not_found}
                        alt="Not_found"
                        loading='lazy'
                        className='saturate-100 contrast-100 '
                    />
                    <div className='absolute translate-y-[150%] md:top-16 sm:top-5 -top-8 left-0 text-indigo-500'>
                        <Link to={'/'}>
                            <button className="font-edu-sa text-2xl">
                                return
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Error