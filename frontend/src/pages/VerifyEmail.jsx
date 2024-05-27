import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OTPInput from 'react-otp-input'
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";

import { sendOtp, signUp } from '../services/backendCallFunction/authAPI';
import OTPImage from '../assets/Images/otp.svg';

function VerifyEmail() {
    const { loading, signupData } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [otp, setOtp] = useState('')

    useEffect(() => {
        if (!signupData) {
            navigate('/signup');
        }
    }, [])

    function handleOnSubmit(e) {
        e.preventDefault();

        const { accountType, firstName, lastName, email, password, confirmPassword } = signupData;
        dispatch(signUp(
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp,
            navigate
        ))
    }

    return (
        <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
            {loading
                ? (<div className="spinner"></div>)
                : (
                    <div className="max-w-[500px] p-4 lg:p-8 flex relative">
                        <div className="max-w-[500px] p-4 lg:p-8">
                            <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
                                Verify Email
                            </h1>

                            <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">
                                A verification code has been sent to you. Enter the <code>OTP</code> below
                            </p>

                            <form onSubmit={handleOnSubmit} >
                                <OTPInput
                                    value={otp}
                                    onChange={setOtp}
                                    numInputs={6}
                                    shouldAutoFocus={true}
                                    renderSeparator={<span>-</span>}
                                    renderInput={(props) =>
                                        <input
                                            {...props}
                                            placeholder="-"
                                            name='otp'
                                            autoComplete='one-time-code'
                                            style={{ boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)", }}
                                            className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-indigo-600"
                                        />}
                                />
                                <button type="submit"
                                    className="w-full bg-indigo-600 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-white">
                                    Verify Email
                                </button>
                            </form>

                            <div className="mt-6 flex items-center justify-between">
                                {/* BACK TO LOGIN */}
                                <Link to="/signup">
                                    <p className="text-richblack-5 flex items-center gap-x-2">
                                        <BiArrowBack /> Back To Signup
                                    </p>
                                </Link>
                                {/* RESEND OTP */}
                                <button
                                    className="flex items-center text-blue-100 gap-x-2"
                                    onClick={() => dispatch(sendOtp(signupData.email), naviga)}
                                >
                                    <RxCountdownTimer />
                                    Resend OTP
                                </button>
                            </div>
                        </div>

                        <div className='absolute -right-[70%] top-[30%] translate-x-7 translate-y-28 hidden lg:block'>
                            <img src={OTPImage} alt="otpImage" loading='lazy'
                                className='w-[400px] ' />
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default VerifyEmail