import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud } from "react-icons/fi"


function Upload({ name, label, register, errors, setValue }) {

    const [image, setImage] = useState(null)

    // setting the new image values
    const onDrop = useCallback(acceptedFiles => {
        const imageFile = acceptedFiles[0]
        if (imageFile) {
            setImage(URL.createObjectURL(imageFile))
            setValue(name, imageFile)
        }
    }, [setValue, name])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: { "image/*": [".jpeg", ".jpg", ".png"] },
        onDrop
    })

    useEffect(() => {
        register(name, { required: true })
    }, [register])


    return (
        <div className="flex flex-col space-y-2">
            <label htmlFor={label} className="text-sm text-richblack-5">
                <div>
                    Course Thumbnail <sup className="text-pink-200">*</sup>
                </div>
            </label>

            {image ? (
                // DISPLAY IMAGE UPLOADED
                <div className="flex flex-col space-y-2">
                    <img
                        src={image}
                        alt="thumbnail"
                        className="h-full w-full rounded-md object-cover"
                    />
                    <button
                        type="button"
                        onClick={() => {
                            setImage(null);
                            setValue(name, null);
                        }}
                        className="text-sm text-indigo-600 font-semibold"
                    >
                        Remove
                    </button>
                </div>
            ) : (
                // PROMPT TO UPLOAD IMAGE
                <div
                    className={`${isDragActive ? "bg-richblack-600" : "bg-richblack-700"} 
                    flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}>

                    <div
                        {...getRootProps()}
                        role="presentation"
                        tabIndex={0}
                        className="flex w-full flex-col items-center p-6"
                    >
                        <input
                            {...getInputProps()}
                            id={label}
                            tabIndex="-1"
                        />

                        <div className="grid aspect-square w-14 place-items-center rounded-full bg-indigo-600">
                            <FiUploadCloud className="text-2xl font-bold text-richblack-25" />
                        </div>

                        <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
                            Drag and drop an image, or click to{" "}
                            <span className=" text-indigo-200">Browse</span> a file
                        </p>

                        <ul className="mt-10 flex list-disc justify-between space-x-12 text-center text-xs text-richblack-200">
                            <li>Aspect ratio 16:9</li>
                            <li>Recommended size 1024x576</li>
                        </ul>
                    </div>

                </div>
            )}

            {errors.courseImage && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                    Course Image is required
                </span>
            )}
        </div>
    )
}

export default Upload