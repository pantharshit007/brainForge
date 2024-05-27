import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from "react-hot-toast";

import { apiConnector } from '../../services/apiConnector';
import { contactusEndpoint } from '../../services/apis';
import { errorToastPosition, toastPosition } from '../../utils/constant';
import CountryCode from '../../data/countrycode.json'

function ContactUsForm() {
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful }
    } = useForm();

    // submitting the data 
    const submitContactForm = async (data) => {
        try {
            // start loader
            setLoading(true);
            const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
            // console.log("response", response);
            toast.success('Message sent successfully!', toastPosition)

        } catch (err) {
            console.log("> Error in Contactus:", err.message);
            toast.error(err.message, errorToastPosition);

        } finally {
            setLoading(false);
        }

    }

    //to reset the values back to default when user either submits or resets the form.
    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                firstName: '',
                lastName: '',
                email: '',
                phoneNo: '',
                message: '',
            })
        }
    }, [reset, isSubmitSuccessful])

    return (
        <form onSubmit={handleSubmit(submitContactForm)}
            className="flex flex-col gap-7"
        >
            {/* NAME */}
            <div className="flex flex-col gap-5 lg:flex-row ">
                {/* FIRST NAME */}
                <div className="flex flex-col gap-2 lg:w-[48%]">
                    <label className="lable-style" htmlFor='firstName'>
                        First Name
                    </label>
                    <input
                        type="text"
                        name='firstName'
                        id='firstName'
                        placeholder='Enter First Name'
                        className="form-style"
                        {...register("firstName", { required: true })}
                    />
                    {
                        errors.firstName &&
                        (<span className="-mt-1 text-[12px] text-yellow-100">
                            Please enter your name.
                        </span>)
                    }
                </div>

                {/* Last NAME */}
                <div className="flex flex-col gap-2 lg:w-[48%]">
                    <label className="lable-style" htmlFor='lastName'>
                        Last Name
                    </label>
                    <input
                        type="text"
                        name='lastName'
                        id='lastName'
                        placeholder='Enter First Name'
                        className="form-style"
                        {...register("lastName")}
                    />
                </div>

            </div>

            {/* EMAIL */}
            <div className="flex flex-col gap-2 ">
                <label className="lable-style" htmlFor="email">
                    Email Address
                </label>

                <input
                    type="email"
                    name='email'
                    id='email'
                    autoComplete='email'
                    placeholder='Enter Email Address'
                    className="form-style"
                    {...register("email", { required: true })}
                />

                {errors.email &&
                    (<span className="-mt-1 text-[12px] text-yellow-100">
                        Please enter your Email address.
                    </span>)
                }

            </div>

            {/* PHONE NO */}
            <div className="flex flex-col gap-2 ">
                <label className="lable-style" htmlFor="phoneNo">
                    Phone Number
                </label>

                {/* DROP DOWN AND INPUT */}
                <div className="flex gap-2 ">
                    {/* DROP-DOWN */}
                    <div className="flex w-[80px] flex-col gap-2">
                        <select
                            name="dropdown"
                            id="dropdown"
                            {...register("countrycode", { required: true })}
                            defaultValue="+91"
                            className="form-style"
                        >
                            {CountryCode.map((element, index) => {
                                return (
                                    <option value={element.code} key={index} >
                                        {element.code} -{element.country}
                                    </option>
                                )
                            })}
                        </select>
                    </div>

                    {/* INPUT BOX */}
                    <div className="flex w-[calc(100%-90px)] flex-col gap-2">
                        <input
                            type="number"
                            name="phoneNo"
                            id="phoneNo"
                            placeholder="12345 67890"
                            className="form-style"
                            {...register("phoneNo", {
                                required: { value: true, message: "Please enter a phone number" },
                                maxLength: { value: 10, message: "Invalid phone number" },
                                minLength: { value: 8, message: "Invalid phone number" },
                            })}
                        />
                    </div>
                </div>

                {errors.phoneNo && (
                    <span className="-mt-1 text-[12px] text-yellow-100">
                        {errors.phoneNo.message}
                    </span>
                )}

            </div>

            {/* MESSAGE */}
            <div className="flex flex-col gap-2 ">
                <label className="lable-style" htmlFor="message">
                    Message
                </label>

                <textarea
                    name="message"
                    id="message"
                    cols="38"
                    rows="7"
                    placeholder='Enter your message here.'
                    className="form-style"
                    {...register("message", { required: true })}
                />

                {errors.email &&
                    (<span className="-mt-1 text-[12px] text-yellow-100">
                        Please enter your Message.
                    </span>)
                }

            </div>

            {/* BUTTON */}
            <button
                type='submit'
                disabled={loading}
                className={`rounded-md bg-indigo-600 text-neutral-50 px-6 py-3 text-center text-[13px] font-bold shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] mt-3 outline-none disabled:bg-richblack-500 sm:text-[16px]
                ${!loading
                        ? "hover:scale-95 hover:shadow-white transition-all duration-200 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)]"
                        : 'cursor-wait'
                    }
                `}
            >
                Send Message!
            </button>
        </form>
    )
}

export default ContactUsForm