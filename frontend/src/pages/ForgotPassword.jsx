import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { BiArrowBack } from "react-icons/bi"
import { getPasswordResetToken } from '../services/backendCalls/authAPI';

function ForgotPassword() {
    // Loading State
    const { loading } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState('');

    function handleOnSubmit(e) {
        e.preventDefault();
        // setEmailSent to update emaiSent state and load next set of screen 
        dispatch(getPasswordResetToken(email, setEmailSent));
    }

    return (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center ">{
            loading ? (
                <div className="spinner"></div>
            ) : (
                <div className="max-w-[500px] p-4 lg:p-8">
                    {/* FORGOT PASSWORD || RESEND EMAIL */}
                    <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
                        {!emailSent ? "Reset Your Password" : "Check Your Email Box"}
                    </h1>

                    {/* CONTEXT OF THE PAGE */}
                    <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
                        {!emailSent
                            ? "Enter your email address here, We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery."
                            : <>We have sent the reset email to <span className="text-richblack-25 font-mono">{email}</span></>
                        }
                    </p>

                    <form onSubmit={handleOnSubmit}>
                        {/* FORGOT PASSWORD FORM */}
                        {!emailSent && (
                            <label className="w-full">
                                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                    Email Address <sup className="text-pink-200">*</sup>
                                </p>
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete='email'
                                    placeholder="Email Address"
                                    className="rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none w-full"
                                />
                            </label>
                        )}

                        <button type="submit"
                            className="mt-6 w-full rounded-[8px] bg-indigo-600 py-[12px] px-[12px] font-medium text-white">
                            {!emailSent ? "Reset Password" : "Resend Email"}
                        </button>
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

export default ForgotPassword