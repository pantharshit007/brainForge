import React, { useEffect, useState } from 'react'
import { HiArrowNarrowUp } from "react-icons/hi"

function BackToTop() {

    const [showArrow, setShowArrow] = useState(false)

    const handleArrow = () => {
        if (window.scrollY > 1000) {
            setShowArrow(true)
        } else setShowArrow(false)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleArrow);
        return () => {
            window.removeEventListener('scroll', handleArrow);
        }
    }, [showArrow])
    return (
        <>
            {/* BACK TO TOP */}
            <button onClick={() => window.scrollTo(0, 0)}
                className={`bg-indigo-500 hover:bg-indigo-600 hover:scale-110 p-3 text-lg text-richblack-5 rounded-2xl fixed right-3 z-10 duration-500 ease-in-out ${showArrow ? 'bottom-6' : '-bottom-24'}`} >
                <HiArrowNarrowUp />
            </button>
        </>
    )
}

export default BackToTop