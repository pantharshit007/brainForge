import React, { useEffect, useState } from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs"
import { MdOutlineArrowRight } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";

import logo from '../../assets/Logo/Logo1-Full-Light.png'
import { NavbarLinks } from '../../data/navbar-links'
import { ACCOUNT_TYPE } from '../../utils/constant'
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { apiConnector } from '../../services/apiConnector'
import { categories } from '../../services/apis'
import NavbarMob from './NavbarMob'
import Backdrop from './Backdrop'
import { setIsOpen } from '../../reducer/slices/sideBarSlice'

function Navbar() {
    const { token } = useSelector(state => state.auth)
    const { user } = useSelector(state => state.profile)
    const { totalItems } = useSelector(state => state.cart)
    const { isOpen } = useSelector(state => state.sidebar)
    const dispatch = useDispatch();

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

                {/* Desktop: NavLink */}
                <nav>
                    <ul className='md:flex hidden gap-x-6 text-richblack-25 '>{

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

                                    </div>
                                ) : (
                                    // other NavBar Menu's
                                    <Link to={link?.path}>
                                        <p className={matchRoute(link?.path)
                                            ? "text-fontPurple font-bold"
                                            : "text-richblack-25 font-semibold"}
                                        >
                                            {link.title}
                                        </p>
                                    </Link>
                                )
                            }</li>
                        ))
                    }</ul>
                </nav>

                {/* Desktop: Login/SignUp/Dashboard */}
                <div className=' md:flex hidden gap-x-4 items-center'>
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

                {/* Mobile: */}
                <div className='block md:hidden'>
                    {/* Cart */}
                    <div className=' md:hidden md:mr-0 mr-16'>
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
                    </div>

                    {/* Side=Bar */}
                    <div className='relative block md:hidden '>
                        <div className={`z-[110] absolute right-3 ${user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR ? '-top-6' : '-top-3'} `}>
                            <MenuButton onClick={() => dispatch(setIsOpen(!isOpen))} />
                        </div>

                        {isOpen && (
                            <AnimatePresence>
                                <Backdrop onClick={() => dispatch(setIsOpen(false))} >
                                    <NavbarMob isOpen={isOpen} setIsOpen={setIsOpen} NavbarLinks={NavbarLinks} subLinks={subLinks} />
                                </Backdrop>
                            </AnimatePresence>

                        )}
                    </div>

                </div>


            </div>
        </div >
    )

    // HAMBURGER MENU
    function MenuButton({ ...props }) {

        const width = 34
        const height = 24
        const strokeWidth = 2
        const color = "#818cf8"
        const transition = { ease: "easeOut", duration: 0.2 }


        const variant = isOpen ? "opened" : "closed";
        const top = {
            closed: {
                rotate: 0,
                translateY: 0,
            },
            opened: {
                rotate: 45,
                translateY: 2,
            },
        };
        const center = {
            closed: {
                opacity: 1,
            },
            opened: {
                opacity: 0,
            },
        };
        const bottom = {
            closed: {
                rotate: 0,
                translateY: 0,
            },
            opened: {
                rotate: -45,
                translateY: -2,
            },
        };
        const lineProps = {
            stroke: color,
            strokeWidth: strokeWidth,
            vectorEffect: "non-scaling-stroke",
            initial: "closed",
            animate: variant,
            transition,
        };

        const unitHeight = 4;
        const unitWidth = (unitHeight * (width)) / (height);

        return (
            <motion.svg
                viewBox={`0 0 ${unitWidth} ${unitHeight}`}
                overflow="visible"
                preserveAspectRatio="none"
                width={width}
                height={height}
                {...props}
            >

                <motion.line
                    x1="0"
                    x2={unitWidth}
                    y1="0"
                    y2="0"
                    variants={top}
                    {...lineProps}
                />
                <motion.line
                    x1="0"
                    x2={unitWidth}
                    y1="2"
                    y2="2"
                    variants={center}
                    {...lineProps}
                />
                <motion.line
                    x1="0"
                    x2={unitWidth}
                    y1="4"
                    y2="4"
                    variants={bottom}
                    {...lineProps}
                />

            </motion.svg>
        )
    }
}

export default Navbar