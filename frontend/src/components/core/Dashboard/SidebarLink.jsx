import React from 'react'
import { useDispatch } from 'react-redux'
import { matchPath, NavLink, useLocation } from 'react-router-dom'
import * as Icons from "react-icons/vsc"

import { resetCourseState, setEditCourse } from '../../../reducer/slices/courseSlice'

function SidebarLink({ link, iconName }) {
    const Icon = Icons[iconName]
    const location = useLocation()
    const dispatch = useDispatch();

    // compare the path and highlight the current path element
    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    }

    return (
        <NavLink
            to={link.path}
            onClick={() => dispatch(resetCourseState())}
            className={`relative sm:px-8 px-4 py-2 text-sm font-medium transition-all duration-200 whitespace-nowrap
            ${matchRoute(link.path) ? 'bg-indigo-800/40 text-richblack-25' : 'bg-opacity-0 text-richblack-300'}`}
        >
            {/* HIGHLIGHT BAR */}
            <span
                className={`absolute md:left-0 -translate-x-[20%] md:top-0 bottom-0 h-[0.2rem] md:h-[70%] my-auto w-[70%] mx-auto md:w-[0.3rem] bg-indigo-700 
                ${matchRoute(link.path) ? "opacity-100" : "opacity-0"}`}
            ></span>

            {/* ICON and NAME */}
            <div
                className='flex item-center gap-x-2 flex-col md:flex-row'
                onClick={() => dispatch(setEditCourse(false))}
            >
                <Icon className="md:text-lg text-3xl" />
                <span className="hidden md:block">{link.name}</span>
            </div>

        </NavLink>
    )
}

export default SidebarLink