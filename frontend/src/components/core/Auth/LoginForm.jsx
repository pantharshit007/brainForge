import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../../../services/backendCallFunction/authAPI'

function LoginForm() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({ email: "", password: "", })
    const { email, password } = formData

    // PASSWORD ENCYPTION
    const [showPassword, setShowPassword] = useState(false)

    function handleOnChange(e) {
        setFormData(prevData => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    }

    function handleOnSubmit(e) {
        e.preventDefault()
        dispatch(login(email, password, navigate))
    }

    return (
        <>
            <form
                onSubmit={handleOnSubmit}
                className="mt-6 flex w-full flex-col gap-y-4"
            >
                {/* EMAIL FEILD */}
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
                        autoComplete="email"
                        autoFocus
                        placeholder="Enter email address"
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 focus:outline-none"
                    />
                </label>

                {/* PASSWORD FEILD */}
                <label className="relative">
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                        Password <sup className="text-pink-200">*</sup>
                    </p>
                    <input
                        required
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={password}
                        onChange={handleOnChange}
                        placeholder="Enter Password"
                        autoComplete="current-password"
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5 focus:outline-none"
                    />
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

                    {/* FORGOT PASSWORD */}
                    <Link to="/forgot-password">
                        <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
                            Forgot Password
                        </p>
                    </Link>
                </label>

                {/* LOGIN BUTTON */}
                <button
                    type="submit"
                    className="mt-6 rounded-[8px] bg-indigo-600 py-[8px] px-[12px] font-medium text-white"
                >
                    Sign In
                </button>

                {/* DON'T HAVE AN ACCOUNT? */}
                <div className=' mx-auto text-richblack-25 text-sm font-medium '>
                    Don't have an account?
                    <Link to={'/signup'} className='text-sm text-indigo-500 font-medium'>
                        {' Create'}
                    </Link>
                </div>

            </form>

        </>
    )
}

export default LoginForm