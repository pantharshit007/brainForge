import React, { useEffect, useState } from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs"

import logo from '../../assets/Logo/Logo1-Full-Light.png'
import { NavbarLinks } from '../../data/navbar-links'
import { ACCOUNT_TYPE } from '../../utils/constant'
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { apiConnector } from '../../services/apiConnector'
import { categories } from '../../services/apis'

const subLinks = [
    {
        title: "python",
        link: "/catalog/python"
    },
    {
        title: "web dev",
        link: "/catalog/web—development"
    }
]

function Navbar() {
    const { token } = useSelector(state => state.auth)
    const { user } = useSelector(state => state.profile)
    const { totalItems } = useSelector(state => state.cart)

    // const [subLinks, setSubLinks] = useState([])

    async function fetchCategory() {
        try {
            const res = await apiConnector("GET", categories.CATEGORIES_API)
            setSubLinks(res.data.data)
            console.log("Categories: " + res)

        } catch (err) {
            console.log("Failed to load Categories: " + err.message)
        }
    }

    useEffect(() => {
        // fetchCategory();
    }, [])


    // check the link.path == browser url route
    const location = useLocation()
    function matchRoute(route) {
        return matchPath({ path: route }, location.pathname)
    }

    return (
        <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 '>
            <div className='w-11/12 max-w-maxContent flex items-center justify-between'>
                {/* Image */}
                <Link to={'/'}>
                    <img src={logo} alt="logo" height="32px" width="160px" loading='lazy' />
                </Link>

                {/* NavLink */}
                <nav>
                    <ul className='flex gap-x-6 text-richblack-25 '>{
                        NavbarLinks.map((link, index) => (
                            <li key={index}>{
                                link.title === "Catalog" ? (
                                    // If user catalog
                                    <div className='relative flex items-center gap-2 group cursor-pointer '>
                                        {link.title}
                                        <BsChevronDown />
                                        {/* Hover Box */}
                                        <div className='invisible absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[50%] flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px] '>
                                            <div className="absolute left-[57%] -top-1 h-6 w-6 rotate-45 rounded bg-richblack-5">
                                                {
                                                    subLinks.length ? (

                                                    ): (

                                                        )
                                            }
                                            </div>
                                        </div>



                                    </div>
                                ) : (
                                    <Link to={link?.path}>
                                        <p className={matchRoute(link?.path) ? "text-fontPurple font-bold" : "text-richblack-25 font-semibold"}>
                                            {link.title}</p>
                                    </Link>
                                )
                            }</li>
                        ))
                    }</ul>
                </nav>

                {/* Login/SignUp/Dashboard */}
                <div className=' flex gap-x-4 items-center'>
                    {/* Cart */}
                    {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                        <Link to={'/dashboard/cart'} className="relative">
                            <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
                            {
                                totalItems > 0 && (
                                    <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                                        {totalItems}
                                    </span>
                                )
                            }
                        </Link>
                    )}

                    {/* User DropDown Menu */}
                    {token !== null && <ProfileDropDown />}

                    {/* Log In */}
                    {token === null && (
                        <Link to={'/login'}>
                            <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                                Log In
                            </button>
                        </Link>
                    )}

                    {/* Sign Up */}
                    {token === null && (
                        <Link to={'/signup'}>
                            <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                                Sign Up
                            </button>
                        </Link>
                    )}

                </div>

            </div>
        </div >
    )
}

export default Navbar