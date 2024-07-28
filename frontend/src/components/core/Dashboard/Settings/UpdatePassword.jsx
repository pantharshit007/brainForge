import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import IconBtn from '../../../common/IconBtn';
// import { setLoading } from '../../../../reducer/slices/profileSlice';
import { changePassword } from '../../../../services/backendCallFunction/settingAPI';

function UpdatePassword() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token } = useSelector(state => state.auth);

    const [loading, setLoading] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showOldPassword, setShowOldPassword] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful }
    } = useForm()

    async function submitHandler(data) {
        dispatch(changePassword(token, data, setLoading));
    }

    // reset the password field
    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                oldPassword: "",
                newPassword: "",
            })

        }
    }, [reset, isSubmitSuccessful]);

    return (
        <form onSubmit={handleSubmit(submitHandler)}>
            <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                <h1 className="text-lg font-semibold text-richblack-5">Update Password</h1>

                {/* PASSWORD FORMS */}
                <div className="flex flex-col gap-5 lg:flex-row">

                    <input hidden type='text' name='email' autoComplete='email' />
                    {/* OLD PASSWORD */}
                    <div className="relative flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor="oldPassword" className="lable-style">
                            Old Password
                        </label>
                        <input
                            type={showOldPassword ? "text" : "password"}
                            name="oldPassword"
                            id="oldPassword"
                            placeholder="Enter Current Password"
                            autoComplete='current-password'
                            className="form-style"
                            {...register("oldPassword", { required: true })}
                        />
                        <span
                            onClick={() => setShowOldPassword((prev) => !prev)}
                            className="absolute right-3 top-[45px] z-[10] cursor-pointer"
                        >
                            {showOldPassword ? (
                                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                            ) : (
                                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            )}
                        </span>
                        {errors.oldPassword && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                Please enter your Current Password.
                            </span>
                        )}
                    </div>

                    {/* NEW PASSWORD */}
                    <div className="relative flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor="newPassword" className="lable-style">
                            New Password
                        </label>
                        <input
                            type={showNewPassword ? "text" : "password"}
                            name="newPassword"
                            id="newPassword"
                            placeholder="Enter New Password"
                            autoComplete='new-password'
                            className="form-style"
                            {...register("newPassword", { required: { value: true, minLength: "8" } })}
                        />
                        <span
                            onClick={() => setShowNewPassword((prev) => !prev)}
                            className="absolute right-3 top-[45px] z-[10] cursor-pointer"
                        >
                            {showNewPassword ? (
                                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                            ) : (
                                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            )}
                        </span>
                        {errors.newPassword && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                Please enter your New Password.
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-2">
                <button
                    onClick={() => {
                        setLoading(false)
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

export default UpdatePassword