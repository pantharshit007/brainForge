import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { BsLightningChargeFill } from "react-icons/bs"

import loginImg from "../assets/Images/login.svg"
import Template from "../components/core/Auth/Template"
import { login } from "../services/backendCallFunction/authAPI"

function Login() {

    const [showDemo, setShowDemo] = useState(true)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <>
            {/* TEST ID's */}
            < div
                className={`${showDemo ? "" : "hidden"} justify-center items-center absolute bg-slate-700 top-52 md:top-32 md:right-[50%] right-[10%] p-6 -rotate-[20deg] z-20 rounded-md max-md:hidden`}>

                <div className="flex flex-col gap-2 relative">
                    {/* PIN */}
                    <div
                        onClick={() => { setShowDemo(false) }}
                        className="absolute top-[-28px] right-[-27px] text-5xl text-indigo-500 rounded-full w-[40px] h-[40px] flex justify-center items-center cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="20" height="20">
                            <circle cx="50" cy="50" r="45" fill="#888888" stroke="#000000" strokeWidth="2" />
                            <circle cx="50" cy="50" r="20" fill="#ffffff" />
                        </svg>

                    </div>

                    <div className=" gap-y-2 flex flex-col">
                        <p className="text-2xl font-extrabold text-richblack-5 flex items-center">
                            Try Demo &nbsp;
                            <BsLightningChargeFill size={20} className="text-indigo-500 shadow-md drop-shadow-md" />
                        </p>

                        {/* INSTRUCTOR LOGIN */}
                        <div>
                            <button
                                onClick={() => {
                                    dispatch(login("demoInstructor@gmail.com", "123456", navigate));
                                    setShowDemo(false)
                                }}
                                className="bg-indigo-600 font-medium font-mono mt-4 mb-1 text-richblack-25 px-4 py-2 rounded-md flex">

                                🚀 Click for Instructor Demo
                            </button>
                        </div>

                        {/* STUDENT LOGIN */}
                        <div>
                            <button
                                onClick={() => {
                                    dispatch(login("demoStudent@gmail.com", "123456", navigate));
                                    setShowDemo(false)
                                }}
                                className="bg-indigo-600 font-medium font-mono text-richblack-25 px-4 py-2 rounded-md flex">

                                🚀 Click for Student Demo
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Template
                title="Welcome Back"
                description1="Build skills for today, tomorrow, and beyond."
                description2="Education to future-proof your career."
                image={loginImg}
                formType="login"
            />
        </>
    )
}

export default Login