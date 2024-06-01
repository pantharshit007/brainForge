import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import IconBtn from '../../../common/IconBtn';
import { updateProfileInformation } from '../../../../services/backendCallFunction/settingAPI';
// import { setLoading } from '../../../../reducer/slices/profileSlice';


function EditProfile() {
    const { user } = useSelector(state => state.profile);
    const { token } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();
    const genders = ["Male", "Female", "Transgender", "Prefer not to say", "Other"]

    const [loading, setLoading] = useState(false);

    async function submitHandler(data) {
        dispatch(updateProfileInformation(token, data, setLoading, navigate));
    }

    return (
        <form onSubmit={handleSubmit(submitHandler)}>
            <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                <h1 className="text-lg font-semibold text-richblack-5">Profile Information</h1>

                <>
                    <div className="flex flex-col gap-5 lg:flex-row">
                        {/* F.NAME */}
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="firstName" className="lable-style">
                                First Name
                            </label>
                            <input
                                required
                                type="text"
                                name="firstName"
                                id='firstName'
                                autoComplete='given-name'
                                autoFocus
                                placeholder="Enter first name"
                                className="form-style"
                                {...register("firstName", { required: true })}
                                defaultValue={user?.firstName}
                            />

                            {errors.firstName && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please enter your first name.
                                </span>
                            )}
                        </div>

                        {/* L.NAME */}
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="lastName" className="lable-style">
                                Last Name
                            </label>
                            <input
                                required
                                type="text"
                                name="lastName"
                                id="lastName"
                                autoComplete='family-name'
                                placeholder="Enter last name"
                                className="form-style"
                                {...register("lastName", { required: true })}
                                defaultValue={user?.lastName}
                            />

                            {errors.lastName && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please enter your last name.
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-5 lg:flex-row">
                        {/* DOB */}
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="dateOfBirth" className="lable-style">
                                Date of Birth
                            </label>

                            <input
                                type="date"
                                name="dateOfBirth"
                                id="dateOfBirth"
                                className="form-style"
                                {...register('dateOfBirth', {
                                    required: { value: true, message: "Enter your Date of Birth." },
                                    max: {
                                        value: new Date().toISOString().split("T")[0],
                                        message: "Date of Birth cannot be in the future.",
                                    }
                                })}
                                defaultValue={user?.additionalDetails?.dateOfBirth}
                            />

                            {errors.dateOfBirth && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    {errors.dateOfBirth.message}
                                </span>
                            )}
                        </div>

                        {/* GENDER */}
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="gender" className="lable-style">
                                Gender
                            </label>

                            <select
                                type="text"
                                name="gender"
                                id="gender"
                                className="form-style"
                                {...register("gender", { required: true })}
                                defaultValue={user?.additionalDetails?.gender}
                            >
                                {genders.map((ele, i) => {
                                    return (
                                        <option key={i} value={ele}>
                                            {ele}
                                        </option>
                                    )
                                })}
                            </select>

                            {errors.gender && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please enter your Date of Birth.
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-5 lg:flex-row">
                        {/* PH NO */}
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="contactNumber" className='lable-style'>
                                Contact Number
                            </label>

                            <input
                                type="tel"
                                name='contactNumber'
                                id="contactNumber"
                                placeholder="Enter Contact Number"
                                autoComplete='tel'
                                className="form-style"
                                {...register('contactNumber', {
                                    required: {
                                        value: true, message: "Please enter your Contact Number.",
                                        maxLength: { value: 12, message: "Invalid Contact Number" },
                                        minLength: { value: 10, message: "Invalid Contact Number" },
                                    }
                                })}
                                defaultValue={user?.additionalDetails?.contactNumber}
                            />

                            {errors.contactNumber && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    {errors.contactNumber.message}
                                </span>
                            )}
                        </div>

                        {/* ABOUT */}
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="about" className="lable-style">
                                About
                            </label>

                            <textarea
                                name="about"
                                id="about"
                                placeholder="Enter Bio Details"
                                className="form-style h-12"
                                rows="2" cols="40"
                                {...register('about', { required: { value: true, maxlength: 100, } })}
                                defaultValue={user?.additionalDetails?.about || ` Hey! Let's Connect! - @${user?.firstName}${user?.lastName}`}
                            />

                            {errors.about && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please enter your About.
                                </span>)
                            }

                        </div>
                    </div>
                </>

            </div>

            {/* BUTTONS */}
            <div className="flex justify-end gap-2">
                <button
                    onClick={() => {
                        dispatch(setLoading(false))
                        navigate("/dashboard/my-profile")
                    }}
                    className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
                >
                    Cancel
                </button>

                <IconBtn
                    type="submit"
                    text={loading ? "Hold on.." : "Save"}
                    disabled={loading}
                    customClasses={loading ? 'cursor-not-allowed bg-richblack-500' : ''}
                />
            </div>
        </form>
    )
}

export default EditProfile