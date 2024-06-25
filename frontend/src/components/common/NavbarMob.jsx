import React, { useState } from 'react'
import { motion } from "framer-motion"
import { Link, useNavigate, matchPath, useLocation } from 'react-router-dom';
import { MdDashboard, MdLogout, MdOutlineArrowRight } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { BsChevronDown } from "react-icons/bs"

import { logout } from '../../services/backendCallFunction/authAPI';
import { setIsOpen } from '../../reducer/slices/sideBarSlice'

const dropIn = {
    hidden: {
        x: "100vw",
        opacity: 0,
    },
    visible: {
        x: "0",
        opacity: 1,
        transition: {
            duration: 0.5,
            type: "spring",
            damping: 55,
            stiffness: 350,
        },
    },
    exit: {
        x: "100vw",
        opacity: 0,
    },
};

function NavbarMob({ isOpen, NavbarLinks, subLinks }) {

    const { user } = useSelector(state => state.profile);
    const { token } = useSelector(state => state.auth);
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    // check the link.path == browser url route
    const location = useLocation()
    function matchRoute(route) {
        return matchPath({ path: route }, location.pathname)
    }

    return (
        <div className='relative'>
            <motion.div
                onClick={(e) => e.stopPropagation()}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0 }}
                variants={dropIn}
                className='absolute h-screen flex flex-col text-white bg-richblack-700 shadow-sm shadow-richblack-25 z-[100] min-w-[250px] right-1 pt-20'
            >

                {/* DASHBOARD */}
                {token !== null && (
                    <Link to={'/dashboard/my-profile'} onClick={() => dispatch(setIsOpen(!isOpen))}
                        className="flex w-[88%] items-center gap-x-2 py-[10px] px-[12px] text-lg text-richblack-50  hover:text-indigo-500 justify-center bg border-b-[1px] border-richblack-500 mx-auto">
                        <MdDashboard className="text-lg" />
                        Dashboard
                    </Link>

                )}

                {/* Nav Links */}
                <ul className="flex-1 px-3 mt-4">
                    {NavbarLinks?.map((link, index) => (
                        <li key={index}>
                            {link.title === 'Catalog' ? (
                                // CATEGORIES 
                                <div
                                    onMouseOver={() => setIsDropdownVisible(true)}
                                    onMouseOut={() => setIsDropdownVisible(false)}
                                    className='hover:bg-indigo-400 hover:text-richblack-5  rounded-md text-richblack-50 font-semibold transition-colors duration-200'
                                >
                                    <div
                                        className="flex items-center gap-2 cursor-pointer px-3 py-2 my-2 "
                                    >
                                        {link.title}
                                        <BsChevronDown className={`${isDropdownVisible ? '-rotate-90' : ''} transition-transform duration-200`} />

                                    </div>

                                    {/* Categories drop down */}
                                    {isDropdownVisible &&
                                        <div className='ml-4 pb-3 font-medium'>
                                            {subLinks && subLinks.length ? (
                                                //  filter category which have courses present in them
                                                subLinks?.filter((subLink) => subLink?.courses?.length > 0)
                                                    ?.map((category, index) => (
                                                        // add link to category
                                                        <Link to={'/catalog/' + category.name
                                                            .split(' ')
                                                            .join('-')
                                                            .toLowerCase()} key={index}
                                                            className="rounded-lg bg-transparent  hover:text-richblack-700 transition-colors duration-200"
                                                            onClick={() => dispatch(setIsOpen(!isOpen))}
                                                        >
                                                            <p className='flex gap-x-2 items-center mb-1 uppercase'>
                                                                <MdOutlineArrowRight />
                                                                {category.name}
                                                            </p>
                                                        </Link>

                                                    ))
                                            ) : (
                                                <p className="text-center">No Available Categories</p>
                                            )}
                                        </div>
                                    }
                                </div>
                            ) : (
                                // OTHER NAV MENU
                                <Link to={link?.path} key={index}
                                    onClick={() => dispatch(setIsOpen(!isOpen))}
                                >
                                    <p className="flex-1 px-3 py-2 my-2 rounded-md text-richblack-50 font-semibold hover:bg-indigo-400 hover:text-richblack-5 transition-colors duration-200">
                                        {link.title}
                                    </p>
                                </Link>
                            )
                            }</li>
                    ))}
                </ul>

                {/* Login and Logout Buttons */}
                <div
                    className={`flex w-[95%] mx-auto justify-center items-center gap-x-8 py-3 mb-2 rounded-md ${token !== null && 'bg-richblack-800'}`}
                    onClick={() => dispatch(setIsOpen(!isOpen))}
                >
                    {/* IMG-Logout */}
                    {token !== null && (
                        <>
                            <Link to={'/dashboard/my-profile'}>
                                <img src={user?.image}
                                    alt={`profile-${user?.firstName}`}
                                    className='aspect-square w-[40px] rounded-full object-cover ring-1 ring-indigo-600 hover:ring-0 hover:shadow-md hover:shadow-indigo-500'
                                />
                            </Link>

                            {/* LOGOUT */}
                            <div className='text-white leading-3'>
                                <p className='font-light border-b-[1px] border-richblack-400 pb-2 capitalize'>
                                    {user?.firstName} {user?.lastName}
                                </p>

                                <div onClick={() => {
                                    dispatch(logout(navigate))
                                    dispatch(setIsOpen(false))
                                }}
                                    className="flex w-full  items-center gap-x-2 pt-[8px] text-sm text-richblack-100 hover:text-indigo-500 cursor-pointer "
                                >
                                    <MdLogout className="text-lg" />
                                    Logout
                                </div>
                            </div>
                        </>
                    )}

                    {/* Login- signup */}
                    {token === null && (
                        <div className='flex justify-evenly w-full'>
                            {/* Log In */}
                            <Link to={'/login'}>
                                <button
                                    onClick={() => dispatch(setIsOpen(!isOpen))}
                                    className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100"
                                >
                                    Log In
                                </button>
                            </Link>

                            {/* Sign Up */}
                            <Link to={'/signup'}>
                                <button
                                    onClick={() => dispatch(setIsOpen(!isOpen))}
                                    className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100"
                                >
                                    Sign Up
                                </button>
                            </Link>

                        </div>
                    )}

                </div>

            </motion.div>
        </div>
    )
}

export default NavbarMob