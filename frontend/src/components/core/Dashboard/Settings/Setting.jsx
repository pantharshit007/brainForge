import React from 'react'
import ChangeProfilePic from './ChangeProfilePic'
import EditProfile from './EditProfile'
import UpdatePassword from './UpdatePassword'
import DeleteAccount from './DeleteAccount'

function Setting() {
    return (
        <>
            <h1 className="mb-14 text-3xl font-medium text-richblack-5">
                Edit Profile
            </h1>

            {/* CHANGE PROFILE PICTURE */}
            <ChangeProfilePic />

            {/* EDIT PROFILE */}
            <EditProfile />

            {/* Change Password */}
            <UpdatePassword />

            {/* Delete Account */}
            <DeleteAccount />
        </>
    )
}

export default Setting