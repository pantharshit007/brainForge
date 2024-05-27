import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { BiArrowBack } from "react-icons/bi"

import { resetPassword } from '../services/backendCallFunction/authAPI';
import toast from 'react-hot-toast';
import { toastPosition } from '../utils/constant';

function UpdatePassword() {
    const { loading } = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const location = useLocation()

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [resetComplete, setResetComplete] = useState(false);  // to update UI post updation

    const [formData, setFormData] = useState({ password: '', confirmPassword: '', });
    const { password, confirmPassword } = formData;

    function handleOnChange(e) {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    }

    const token = location.pathname.split('/').at(-1);
    function handleOnSubmit(e) {
        e.preventDefault();

        if (password === confirmPassword) {
            // calling reset password backend call.
            dispatch(resetPassword(password, confirmPassword, token, setResetComplete))
        } else {
            toast.error("Password Doesn't Match", toastPosition)
        }
    }

    return (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">{
            loading ? (
                <div className="spinner"></div>
            ) : (

                <div className="max-w-[500px] p-4 lg:p-8">
                    <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
                        {
                            !resetComplete ? "Create New Password" : "Reset Complete"
                        }
                    </h1>
                    <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
                        {
                            !resetComplete ? "Almost done. Enter your new password and youre all set."
                                : "All done! We have sent an email to notify you of updation."
                        }
                    </p>

                    <form onSubmit={handleOnSubmit}>
                        {/* SHOW THIS PRE RESET OF PW */}
                        {!resetComplete &&
                            (<>
                                {/* PASSWORD BOX */}
                                <>
                                    <label className="relative">
                                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                            New Password <sup className="text-pink-200">*</sup>
                                        </p>

                                        <input
                                            required
                                            type={showPassword ? 'text' : 'password'}
                                            name='password'
                                            value={password}
                                            placeholder='Enter new password'
                                            autoComplete="new-password"
                                            onChange={handleOnChange}
                                            style={{ boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)", }}
                                            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5 outline-none"
                                        />

                                        {/* SHOW/HIDE PASSWORD */}
                                        <span className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                                            onClick={() => setShowPassword(prev => !prev)}>
                                            {showPassword
                                                ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                                : <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                            }
                                        </span>
                                    </label>
                                </>

                                {/* CONFIRM PASSWORD BOX */}
                                <>
                                    <label className="relative mt-3 block">

                                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                            Confirm new Password <sup className="text-pink-200"></sup>
                                        </p>

                                        <input
                                            required
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            name='confirmPassword'
                                            value={confirmPassword}
                                            placeholder='Confirm new password'
                                            autoComplete="new-password"
                                            onChange={handleOnChange}
                                            style={{ boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)", }}
                                            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5 outline-none"
                                        />

                                        {/* SHOW/HIDE CONFIRM PASSWORD */}
                                        <span className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                                            onClick={() => setShowConfirmPassword(prev => !prev)}>
                                            {showConfirmPassword
                                                ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                                : <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                            }
                                        </span>
                                    </label>
                                </>
                            </>)
                        }

                        {/* BUTTON */}
                        <>
                            {!resetComplete
                                ? <button type="submit"
                                    className="mt-6 w-full rounded-[8px] bg-indigo-600 py-[12px] px-[12px] font-medium text-white">
                                    Reset Password
                                </button>

                                : <Link to={"/login"}>
                                    <button
                                        className='mt-6 w-full rounded-[8px] bg-indigo-600 py-[12px] px-[12px] font-medium text-white'>
                                        Return to login
                                    </button>
                                </Link>
                            }
                        </>

                    </form>

                    {/* BACK TO LOGIN BUTTON */}
                    <div className="mt-6 flex items-center justify-between">
                        <Link to={'/login'}>
                            <p className="flex items-center gap-x-2 text-richblack-5">
                                <BiArrowBack /> Login Page
                            </p>
                        </Link>

                    </div>
                </div>
            )

        }</div>
    )
}

export default UpdatePassword