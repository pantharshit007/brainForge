import React from 'react'
import { Link } from 'react-router-dom'

function Button({ children, active, linkTo }) {
    return (
        <div>
            <Link to={linkTo}>
                <div className={`text-center sm:text-[16px] text-[13px] px-6 py-3 rounded-md font-bold hover:scale-95 hover:shadow-white transition-all duration-200 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
                ${active ? 'bg-indigo-500 text-neutral-50' : 'bg-richblack-800'}`}>

                    {children}
                </div>
            </Link>
        </div>
    )
}

export default Button