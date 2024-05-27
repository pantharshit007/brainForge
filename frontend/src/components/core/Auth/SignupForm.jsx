import React, { useState } from 'react'
import { toast } from "react-hot-toast"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { ACCOUNT_TYPE, toastPosition } from '../../../utils/constant'
import { setSignupData } from '../../../reducer/slices/authSlice'
import { sendOtp } from '../../../services/backendCallFunction/authAPI'
import Tab from '../../common/Tab'

function SignupForm() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // ACCOUNT TYPE: Student / Instructor
    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)

    // STORE UPDATE FORM-DATA
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    // VALUES TO BE USED IN FORM
    const { firstName, lastName, email, password, confirmPassword } = formData;

    // PASSWORD ENCYPTION
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)


    // CALL THE HANDLE WHENEVER formData CHANGES
    function handleOnChange(event) {
        setFormData(prevData => ({
            ...prevData,
            [event.target.name]: event.target.value,
        }))
    }

    // HANDLE FORM SUBMISSION
    function handleOnSubmit(e) {
        e.preventDefault()

        if (password !== confirmPassword) {
            toast.error("Password Do Not Match", toastPosition)
            return
        }

        const signupData = { ...formData, accountType }

        // UPDATING STATE OF SIGNUPDATA FROM AUTH
        // WILL BE USED AFTER OTP VERIFICATION
        dispatch(setSignupData(signupData));

        // SEND OTP TO USE'S EMAIL
        dispatch(sendOtp(formData.email, navigate));

        // RESET THE FEILDS
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        })

        setAccountType(ACCOUNT_TYPE.STUDENT)
    }

    // SLIDER DATA TO CHOOSE B/W STUDENT AND INSTRUCTOR: find it useless just use type for name
    const tabData = [
        {
            id: 1,
            tabName: "Student",
            type: ACCOUNT_TYPE.STUDENT,
        },
        {
            id: 2,
            tabName: "Instructor",
            type: ACCOUNT_TYPE.INSTRUCTOR,
        },
    ]

    return (
        <div>
            {/* TAB SECTON */}
            <Tab tabData={tabData} field={accountType} setField={setAccountType} />

            {/* FORM */}
            <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">

                {/* SECTION-1: NAME */}
                <div className="flex gap-x-4">

                    <label>
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            First Name <sup className="text-pink-200">*</sup>
                        </p>
                        <input
                            required
                            type="text"
                            name="firstName"
                            value={firstName}
                            onChange={handleOnChange}
                            autoComplete='given-name'
                            autoFocus
                            placeholder="Enter first name"
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 focus:outline-none"
                        />
                    </label>
                    <label>
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            Last Name <sup className="text-pink-200">*</sup>
                        </p>
                        <input
                            required
                            type="text"
                            name="lastName"
                            value={lastName}
                            onChange={handleOnChange}
                            autoComplete='family-name'
                            placeholder="Enter last name"
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 focus:outline-none"
                        />
                    </label>
                </div>

                {/* SECTION-2: EMAIL */}
                <label className="w-full">
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                        Email Address <sup className="text-pink-200">*</sup>
                    </p>
                    <input
                        required
                        type="text"
                        name="email"
                        value={email}
                        onChange={handleOnChange}
                        autoComplete='email'
                        placeholder="Enter email address"
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 focus:outline-none"
                    />
                </label>

                {/* SECTION-3: PASSWORD */}
                <div className="flex gap-x-4">
                    {/* PASSWORD */}
                    <label className="relative">
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            Create Password <sup className="text-pink-200">*</sup>
                        </p>
                        <input
                            required
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={password}
                            onChange={handleOnChange}
                            placeholder="Enter Password"
                            autoComplete="new-password"
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5 focus:outline-none"
                        />

                        {/* ENCRYPT PASSWORD */}
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                        >
                            {showPassword ? (
                                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                            ) : (
                                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            )}
                        </span>

                    </label>

                    {/* CONFIRM-PASSWORD */}
                    <label className="relative">
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            Confirm Password <sup className="text-pink-200">*</sup>
                        </p>
                        <input
                            required
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleOnChange}
                            placeholder="Confirm Password"
                            autoComplete="new-password"
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5 focus:outline-none"
                        />

                        {/* ENCRYPT CONFIRM-PASSWORD */}
                        <span
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                        >
                            {showConfirmPassword ? (
                                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                            ) : (
                                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            )}
                        </span>

                    </label>
                </div>

                {/* TODO: ADD GOOGLE AUTHENTICATION FEATURE  */}
                {/* ---------------- OR ---------------- */}

                {/* section-4: BUTTON */}
                <button
                    type="submit"
                    className="mt-6 rounded-[8px] bg-indigo-600 py-[8px] px-[12px] font-medium text-white"
                >
                    Create Account
                </button>

            </form>

        </div>
    )
}

export default SignupForm