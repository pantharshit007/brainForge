import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineCaretDown } from "react-icons/ai"
import { MdDashboard, MdLogout } from "react-icons/md";

import { logout } from '../../../services/backendCallFunction/authAPI';
import useOnClickOutside from '../../../hooks/useOnClickOutside';

function ProfileDropDown() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.profile);
    const [open, setOpen] = useState(false)
    const dropdownRef = useRef(null)

    // Monitor click outside the component
    useOnClickOutside(dropdownRef, () => setOpen(false));

    if (!user) return null

    return (
        <>
            <button className="relative" onClick={() => setOpen(true)}>
                <div className="flex items-center gap-x-1">
                    <img src={user?.image}
                        alt={`profile-${user?.firstName}`}
                        className='aspect-square w-[30px] rounded-full object-cover ring-1 ring-indigo-600'
                    />
                    <AiOutlineCaretDown className={`text-sm text-richblack-100 transition-transform duration-200 ${open ? '-rotate-180' : 'rotate-0'}`} />
                </div>

                {/* DROP DOWN MENU */}
                {open &&
                    <div onClick={(e) => e.stopPropagation()} ref={dropdownRef}
                        className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800">
                        {/* DASHBOARD */}
                        <Link to={'/dashboard/my-profile'} onClick={() => setOpen(false)}
                            className="flex w-full items-center gap-x-2 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-indigo-400">
                            <MdDashboard className="text-lg" />
                            Dashboard
                        </Link>

                        {/* LOGOUT */}
                        <div onClick={() => {
                            dispatch(logout(navigate))
                            setOpen(false)
                        }}
                            className="flex w-full items-center gap-x-2 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-indigo-400"
                        >
                            <MdLogout className="text-lg" />
                            Logout
                        </div>
                    </div>

                }

            </button>
        </>
    )
}

export default ProfileDropDown