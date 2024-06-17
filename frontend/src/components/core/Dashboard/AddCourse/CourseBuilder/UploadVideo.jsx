import React, { useEffect, useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { FiUploadCloud } from "react-icons/fi"
import { useSelector } from "react-redux"

// import "video-react/dist/video-react.css"
// import { Player } from "video-react"

import ReactPlayer from 'react-player/file'

function UploadVideo({
    name,
    label,
    register,
    setValue,
    errors,
    viewData = null,
    editData = null,
}) {

    const { course } = useSelector((state) => state.course)
    const [selectedFile, setSelectedFile] = useState(null)
    const [previewSource, setPreviewSource] = useState(viewData ? viewData : editData || "")

    // setting the new image values
    const onDrop = useCallback(acceptedFiles => {
        const videoFile = acceptedFiles[0]
        if (videoFile) {
            previewFile(videoFile)
            setSelectedFile(videoFile)
        }
    }, [setValue, name])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: { "video/*": [".mp4", ".mkv"] },
        onDrop
    })

    // render video file and make it available for preview
    const previewFile = (videoFile) => {
        const videoUrl = URL.createObjectURL(videoFile);
        setPreviewSource(videoUrl);
    }

    useEffect(() => {
        register(name, { required: true })
    }, [register])

    useEffect(() => {
        setValue(name, selectedFile)
    }, [selectedFile, setValue])

    return (
        <div className="flex flex-col space-y-2">
            <label htmlFor={label} className="text-sm text-richblack-5">
                <div>
                    Lecture Video {!viewData && <sup className="text-pink-200">*</sup>}
                </div>
            </label>

            <div
                className={`${isDragActive ? "bg-richblack-600" : "bg-richblack-700"}
                flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}
            >
                {previewSource ? (
                    // DISPLAY VIDEO UPLOADED
                    <div className="flex w-full flex-col p-6">
                        {/* PLAYER */}
                        {/* <Player aspectRatio="16:9" playsInline src={previewSource} preload="metadata" /> */}
                        <div className="relative pb-[56.25%] h-0 bg-black">
                            <ReactPlayer url={previewSource} controls={true} width="100%" height="100%"
                                className="absolute top-0 left-0" />
                        </div>


                        {/* REMOVE BUTTON */}
                        {!viewData && (
                            <button
                                type="button"
                                onClick={() => {
                                    setPreviewSource("")
                                    setSelectedFile(null)
                                    setValue(name, null)
                                }}
                                className="mt-3 text-richblack-400 underline"
                            >
                                Remove
                            </button>
                        )}
                    </div>
                ) : (
                    // PROMPT TO UPLOAD VIDEO
                    <div
                        {...getRootProps()}
                        role="presentation"
                        tabIndex={0}
                        className="flex w-full flex-col items-center p-6"
                    >
                        <input
                            {...getInputProps()}
                            id={label}
                        />

                        <div className="grid aspect-square w-14 place-items-center rounded-full bg-indigo-600">
                            <FiUploadCloud className="text-2xl font-bold text-richblack-25" />
                        </div>

                        <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
                            Drag and drop a Video, or click to{" "}
                            <span className=" text-indigo-200">Browse</span> a file
                        </p>

                        <ul className="mt-10 flex list-disc justify-between space-x-12 text-center text-xs text-richblack-200">
                            <li>Aspect ratio 16:9</li>
                            <li>Recommended size 1024x576</li>
                        </ul>
                    </div>

                )}
            </div>

            {errors[name] && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                    Lecture video is required
                </span>
            )}
        </div>
    )
}

export default UploadVideo