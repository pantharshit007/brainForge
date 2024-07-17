import React, { useEffect, useRef, useState } from 'react'
import { FaPlus } from 'react-icons/fa6';
import { IoVideocamOutline, IoCheckmarkDoneSharp } from 'react-icons/io5';
import { MdChecklistRtl } from "react-icons/md";
import { useNavigate, useParams } from 'react-router-dom';

function VideoAccordian({ section, videoActive, completedLectures }) {

    const { courseId } = useParams();
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [sectionHeight, setSectionHeight] = useState(0);
    const [sectionComplete, setSectionComplete] = useState(false);
    const contentHeight = useRef(null);

    // to mark the whole section as completed
    useEffect(() => {
        function markSectionComplete() {
            if (section?.subSection.every(subSection => completedLectures.includes(subSection?._id))) {
                setSectionComplete(true);
            } else {
                setSectionComplete(false);
            }
        }
        markSectionComplete();
    }, [completedLectures, section]);

    const link = `/dashboard/enrolled-courses/view-course/${courseId}/section/${section?._id}/sub-section/`

    // useEffect(() => {
    //     setIsOpen(isActive?.has(section._id));
    // }, [isActive])

    useEffect(() => {
        setSectionHeight(isOpen ? contentHeight.current.scrollHeight : 0)
    }, [isOpen])

    return (
        <div className="overflow-hidden border border-solid border-richblack-600 bg-richblack-700 text-richblack-5 last:mb-0 first:rounded-t-sm last:rounded-b-sm">
            {/* Header */}
            <div
                className='flex cursor-pointer items-start  justify-between bg-opacity-20 p-4 transition-[0.3s]'
                onClick={() => setIsOpen(!isOpen)}
            >
                {/* section Name */}
                <div className='flex flex-wrap w-full items-center gap-x-3 my-auto md:text-[16px] sm:text-[14px]'>
                    <FaPlus className={`${isOpen ? 'rotate-45 text-indigo-400' : 'rotate-0'} transition-all duration-200`} />
                    {section?.sectionName}

                    <span className={`ml-auto text-green-400 ${!sectionComplete && 'hidden'}`}>
                        <MdChecklistRtl size={24} />
                    </span>
                </div>

            </div>

            {/* section */}
            <div
                ref={contentHeight}
                className="h-0 bg-richblack-800 transition-[height] duration-[0.45s] ease-[ease]"
                style={{ height: sectionHeight }}
            >
                <div className="flex flex-col font-semibold">
                    {section.subSection.map(subSection => (
                        <div
                            key={subSection._id}
                            onClick={() => navigate(link + subSection._id)}
                            className={`flex items-center gap-x-3 py-3 px-8 border-b-[1px] border-richblack-600 last:border-none cursor-pointer ${subSection?._id === videoActive && 'bg-indigo-600'}`}
                        >
                            <IoVideocamOutline />
                            <span >
                                {subSection.title}
                            </span>

                            {/* MARK AS COMPLETE */}
                            <span className={`ml-auto text-white 
                                ${!completedLectures?.includes(subSection?._id) && 'hidden'}`}
                            >
                                <IoCheckmarkDoneSharp size={20} />
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default VideoAccordian