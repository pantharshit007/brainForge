import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { VscSignOut } from "react-icons/vsc"

import { sidebarLinks } from '../../../data/dashboard-links'
import { logout } from '../../../services/backendCallFunction/authAPI'
import SidebarLink from './SidebarLink';
import ConfirmationModal from '../../common/ConfirmationModal'
import Backdrop from '../../common/Backdrop'

function Sidebar() {
    const { user, loading: profileLoading } = useSelector(state => state.profile);
    const { loading: authLoading } = useSelector(state => state.auth);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // store the Modal data
    const [confirmationModal, setConfirmationModal] = useState(null);

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
        <>
            {/* DESKTOP SIDEBAR */}
            <div className="md:flex hidden flex-col h-[calc(100vh-3.5rem)] min-w-[220px] border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10">
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
            </div>

            {/* IF MODAL IS OPEN THEN BACKDROP WILL BE PLACED AND OVER BACKDROP CONFIRMATIONMODAL IS PLACED */}
            {confirmationModal &&
                <Backdrop onClick={confirmationModal.btn2handler}>
                    <ConfirmationModal modalData={confirmationModal} />
                </Backdrop>
            }

            {/* MOBILE SIDEBAR */}
            <div className='flex md:hidden fixed bottom-0 justify-between items-center -pl-4 py-1 bg-richblack-900 z-50 w-full'>
                <div className='flex flex-row gap-1 w-full justify-between'>
                    {
                        sidebarLinks.map((link) => {
                            if (link.type && user?.accountType !== link.type) return null;
                            return (
                                <SidebarLink key={link.id} link={link} iconName={link.icon} />
                            )
                        })}
                    <SidebarLink
                        link={{ name: "Settings", path: "/dashboard/settings" }}
                        iconName="VscSettingsGear"
                    />
                </div>
            </div>
        </>
    )
}

export default Sidebar