import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MdCloudUpload } from "react-icons/md"

import IconBtn from '../../../common/IconBtn';
import { updateDisplayPicture } from '../../../../services/backendCallFunction/settingAPI';
import toast from 'react-hot-toast';
import { errorToastPosition } from '../../../../utils/constant';

function ChangeProfilePic() {
    const { user } = useSelector(state => state.profile);
    const { token } = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false)
    const [imageFile, setImageFile] = useState(null)
    const [previewImage, setPreviewImage] = useState(user?.image)

    // every time new image is selected this handle will run
    function handleFileChange(event) {
        const file = event.target.files[0];
        // console.log(file)
        if (file) {
            previewFile(file)
            setImageFile(file)
        }
    }

    // convert the uploaded file to a string URL
    function previewFile(file) {
        setPreviewImage(URL.createObjectURL(file))
    }

    // when user wants to upload the image to set it as PFP
    async function handleFileUpload() {
        setLoading(true);
        if (!imageFile) {
            setLoading(false)
            toast.error("No File Found! Select One", errorToastPosition);
            return
        }
        try {
            const formData = new FormData();
            formData.append("displayPicture", imageFile)

            // calling the backend function to update image in BE
            dispatch(updateDisplayPicture(token, formData)).then(() => {
                setLoading(false);
            })
        } catch (err) {
            console.log("> Failed to update PFP:", err.message)
        }
    }

    // Find it useless since image will update on its own due to handleFileChange
    useEffect(() => {
        if (imageFile) {
            previewFile(imageFile)
        }
    }, [imageFile])

    return (
        <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5">
            <div className='flex items-center gap-x-4'>
                {/* IMAGE */}
                <div className="flex items-center gap-x-4">
                    <img
                        src={previewImage}
                        alt={"profileImg-" + user?.firstName}
                        className="aspect-square w-[78px] rounded-full object-cover ring-2 ring-indigo-600"
                    />
                </div>

                {/* FUNCTIONS AND TEXT */}
                <div className='space-y-2'>
                    {/* CHANGE PROFILE PIC */}
                    <h2>
                        Change Profile Picture
                    </h2>

                    {/* BUTTONS */}
                    <div className='flex flex-row gap-3'>
                        <label
                            htmlFor="upload"
                            className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
                        >
                            Choose
                            <input
                                type="file"
                                name="upload"
                                id="upload"
                                accept="image/png, image/gif, image/jpeg, image/jpg"
                                onChange={handleFileChange}
                                className='hidden' />
                        </label>

                        {/* UPLOAD BUTTON */}
                        <IconBtn
                            text={loading ? "Uploading..." : "Upload"}
                            onClick={handleFileUpload}
                            disabled={loading}
                            customClasses={loading && 'cursor-not-allowed bg-richblack-500'}
                        >
                            {!loading && (
                                <MdCloudUpload className="text-lg text-richblack-25" />
                            )}
                        </IconBtn>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangeProfilePic