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

function Navbar() {
    const { token } = useSelector(state => state.auth)
    const { user } = useSelector(state => state.profile)
    const { totalItems } = useSelector(state => state.cart)

    const [subLinks, setSubLinks] = useState([])
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    async function fetchCategory() {
        try {
            const res = await apiConnector("GET", categories.CATEGORIES_API)
            setSubLinks(res.data.AllCategorys)
            // console.log("Categories: " + JSON.stringify(res.data.AllCategorys))

        } catch (err) {
            console.log("Failed to load Categories: " + err.message)
        }
    }

    useEffect(() => {
        fetchCategory();
    }, [])


    // check the link.path == browser url route
    const location = useLocation()
    function matchRoute(route) {
        return matchPath({ path: route }, location.pathname)
    }

    return (
        <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 z-10 '>
            <div className='w-11/12 max-w-maxContent flex items-center justify-between'>
                {/* Logo */}
                <Link to={'/'}>
                    <img src={logo} alt="logo" height="32px" width="160px" loading='lazy' />
                </Link>

                {/* NavLink */}
                <nav>
                    <ul className='flex gap-x-6 text-richblack-25 '>{

                        NavbarLinks.map((link, index) => (

                            <li key={index}>{
                                link.title === "Catalog" ? (
                                    // For catalog
                                    <div className='relative flex items-center gap-2 group cursor-pointer'
                                        onMouseOver={() => setIsDropdownVisible(true)}
                                        onMouseOut={() => setIsDropdownVisible(false)}
                                    >
                                        {link.title}
                                        <BsChevronDown className={`${isDropdownVisible ? '-rotate-90' : ''} transition-transform duration-200`} />

                                        {/* Hover Box */}
                                        <div className='invisible absolute left-[50%] top-[50%] z-[1000] flex w-[150px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-3 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[250px]'
                                        >
                                            {/* white upword arrow */}
                                            <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>

                                            {subLinks && subLinks.length ? (
                                                //  filter category which have courses present in them
                                                subLinks?.filter((subLink) => subLink?.courses?.length > 0)
                                                    ?.map((category, index) => (
                                                        // add link to category
                                                        <Link to={'/category/' + category.name
                                                            .split(' ')
                                                            .join('-')
                                                            .toLowerCase()} key={index}
                                                            className="rounded-lg bg-transparent py-2 pl-4 hover:bg-richblack-50"
                                                        >
                                                            <p>{category.name}</p>
                                                        </Link>

                                                    ))
                                            ) : (
                                                <p className="text-center">No Available Categories</p>
                                            )}
                                        </div>

                                    </div>
                                ) : (
                                    // other NavBar Menu's
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
                                    <span className="absolute bottom-3 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-indigo-600 text-center text-xs font-extrabold text-richblack-25">
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