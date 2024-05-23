import React from 'react'
import { useSelector } from 'react-redux'

import { sidebarLinks } from '../../../data/dashboard-links'
import { logout } from '../../../services/backendCalls/authAPI'
import SidebarLink from './SidebarLink';

function Sidebar() {
    const { user, loading: profileLoading } = useSelector(state => state.profile);
    const { loading: authLoading } = useSelector(state => state.auth);

    if (authLoading || profileLoading) {
        return (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <div className="spinner"></div>
            </div>
        )
    }

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
                </div>

            </div>

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