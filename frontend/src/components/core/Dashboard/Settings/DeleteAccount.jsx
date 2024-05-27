import React, { useState, useEffect } from 'react'
import { FiTrash2 } from "react-icons/fi"
import Backdrop from '../../../common/Backdrop'
import ConfirmationModal from '../../../common/ConfirmationModal'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { deleteAccount } from '../../../../services/backendCallFunction/settingAPI'

function DeleteAccount() {
    const navigate = useNavigate()
    const { token } = useSelector(state => state.auth);
    const [isClicked, setIsClicked] = useState(false)

    const modalData = {
        text1: "Are you sure?",
        text2: "This is your last chance think again?",
        btnText1: "Delete",
        btnText2: "Cancel",
        btn1handler: handleDeleteAccount,
        btn2handler: () => setIsClicked(false)
    }

    async function handleDeleteAccount() {
        setIsClicked(false);
        deleteAccount(token, navigate);
    }

    return (
        <>
            <div className="my-10 flex flex-row gap-x-5 rounded-md border-[1px] border-pink-700 bg-pink-900 p-8 md:px-12 px-9 ">
                {/* LOGO */}
                <div className='w-16 md:w-15'>
                    <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700">
                        <FiTrash2 className="text-3xl text-pink-200" />
                    </div>
                </div>

                {/* CONTENT */}
                <div className="flex flex-col space-y-2">
                    <h1 className="text-lg font-semibold text-richblack-5">Delete Account</h1>

                    <div className="md:w-3/5 w-full text-pink-25">
                        <p>Would you like to delete account? </p>
                        <p>This account may contain Paid Courses. Deleting your account is permanent and will remove all the contain associated with it.
                        </p>
                    </div>

                    <button
                        type="button"
                        className='w-fit italic text-pink-300 cursor-pointer disabled:text-gray-500 disabled:cursor-not-allowed'
                        onClick={() => setIsClicked(true)}
                        disabled={isClicked}
                    >
                        I want to delete my account.
                    </button>
                </div>
            </div >

            {/* SHOW CONFIRMATION MODAL IF USER CLICKED ON DELETE ACCOUNT BUTTON */}
            {isClicked &&
                <Backdrop onClick={modalData.btn2handler}>
                    <ConfirmationModal modalData={modalData} />
                </Backdrop>
            }
        </>
    )
}

export default DeleteAccount
