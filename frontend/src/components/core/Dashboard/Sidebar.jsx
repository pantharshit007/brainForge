import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { VscSignOut } from "react-icons/vsc"
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { motion, useAnimationControls } from 'framer-motion';

import { sidebarLinks } from '../../../data/dashboard-links'
import { logout } from '../../../services/backendCallFunction/authAPI'
import SidebarLink from './SidebarLink';
import ConfirmationModal from '../../common/ConfirmationModal'
import Backdrop from '../../common/Backdrop'
import { setOpenSidebar, setScreenSize } from '../../../reducer/slices/sideBarSlice'
import { ACCOUNT_TYPE } from '../../../utils/constant';


// sliding side bar motion CSS 
const containerVariants = {
    close: {
        display: 'none',
        width: '0px',
        opacity: 0,
        transition: {
            type: 'Spring',
            damping: 15,
            duration: 0.5
        }
    },
    open: {
        display: 'flex',
        width: '220px',
        opacity: 1,
        transition: {
            type: 'Spring',
            damping: 15,
            duration: 0.5
        }
    }
}

function Sidebar() {
    const { user, loading: profileLoading } = useSelector(state => state.profile);
    const { loading: authLoading } = useSelector(state => state.auth);
    const { openSidebar, screenSize, isOpen } = useSelector(state => state.sidebar);

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const containerControls = useAnimationControls();

    // store the Modal data
    const [confirmationModal, setConfirmationModal] = useState(null);

    // setting the new size of window in state screenSize
    useEffect(() => {
        // Set initial screen size
        dispatch(setScreenSize(window.innerWidth));

        // Handle window resize with debounce
        function handleWindowSize() {
            dispatch(setScreenSize(window.innerWidth));
        }

        // rate limiting the resize function to 1 req/s
        const debounceHandler = debounce(handleWindowSize, 400);

        window.addEventListener("resize", debounceHandler);
        return () => window.removeEventListener("resize", debounceHandler);
    }, [])

    //expanding/collapsing the sidebar
    useEffect(() => {
        // sm < screenSize < md
        if (screenSize < 955 && openSidebar === true) {
            dispatch(setOpenSidebar(false));
        }
    }, [screenSize])

    // Animating side Bar
    useEffect(() => {
        if (openSidebar) {
            containerControls.start('open');
        } else {
            containerControls.start('close');
        }
    }, [openSidebar])


    //debouncer function
    function debounce(func, delay) {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        }
    }

    // Loading screen
    if (authLoading) {
        return (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <div className="spinner"></div>
            </div>
        )
    }
    //TODO: need to change this with what we see in YT loading...
    // if (profileLoading) {
    //     return (
    //         <div className="bg-slate-400 text-black top-0 absolute">
    //             wait!!!
    //         </div>
    //     )
    // }

    return (
        <div className="relative">
            {/* MENU TOGGLE BUTTON */}
            <div className='hidden md:flex text-richblack-25 absolute left-3 top-1 cursor-pointer hover:bg-indigo-800/40 hover:text-richblack-50 p-1 rounded-md transition-all duration-200'
                onClick={() => dispatch(setOpenSidebar(!openSidebar))}
            >
                <TbLayoutSidebarLeftCollapse size={33} />
            </div>

            {/* DESKTOP SIDEBAR */}
            <motion.div
                variants={containerVariants}
                initial="close"
                animate={containerControls}
                className={`md:flex hidden flex-col h-[calc(100vh-3.5rem)] bg-richblack-800 border-r-[1px] border-r-richblack-700 py-16`}>

                {/* MyProfile - Enrollment - Cart */}
                <div className="flex flex-col">
                    {
                        sidebarLinks.map((link, i) => {
                            if (link.type && user?.accountType !== link.type) return null;
                            return (
                                <SidebarLink key={link.id} link={link} iconName={link.icon} />
                            )
                        })
                    }
                </div>

                {/* SETTING AND LOGOUT */}
                <div className="mx-auto my-6 h-[1px] w-10/12 bg-richblack-700" />
                <div className='flex flex-col'>
                    <SidebarLink
                        link={{ name: "Settings", path: "/dashboard/settings" }}
                        iconName="VscSettingsGear"
                    />

                    <button
                        className="px-8 py-2 text-sm font-medium text-richblack-300"
                        onClick={() => setConfirmationModal({
                            text1: "Are you sure?",
                            text2: "You will be logged out of your account.",
                            btnText1: "Logout",
                            btnText2: "Cancel",
                            btn1handler: () => dispatch(logout(navigate)),
                            btn2handler: () => setConfirmationModal(null)
                        })}
                    >
                        <div className="flex items-center gap-x-2">
                            <VscSignOut className="text-lg" />
                            <span>Logout</span>
                        </div>
                    </button>
                </div>
            </motion.div>

            {/* IF MODAL IS OPEN THEN BACKDROP WILL BE PLACED AND OVER BACKDROP CONFIRMATIONMODAL IS PLACED */}
            {confirmationModal &&
                <Backdrop onClick={confirmationModal.btn2handler}>
                    <ConfirmationModal modalData={confirmationModal} />
                </Backdrop>
            }

            {/* MOBILE SIDEBAR: when sidebar is open hide it */}
            {!isOpen && (
                <div className='flex md:hidden fixed bottom-0 justify-between items-center px-2 py-1 bg-richblack-900 z-50 w-full'>
                    <div className='flex flex-row md:gap-1 w-full justify-between'>
                        {
                            sidebarLinks.map((link) => {
                                if (link.type && user?.accountType !== link.type) return null;

                                return (
                                    <SidebarLink key={link.id} link={link} iconName={link.icon} />
                                )
                            })
                        }
                        <SidebarLink
                            link={{ name: "Settings", path: "/dashboard/settings" }}
                            iconName="VscSettingsGear"
                        />
                    </div>
                </div>
            )}

        </div>
    )
}

export default Sidebar