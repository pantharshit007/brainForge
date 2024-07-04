import React, { useEffect, useRef, useState } from 'react'
import { FaChevronDown } from 'react-icons/fa';
import { IoVideocamOutline } from 'react-icons/io5';

function CourseAccordian({ section, isActive, handleAccordion }) {

    const [isOpen, setIsOpen] = useState(false);
    const [sectionHeight, setSectionHeight] = useState(0);
    const contentHeight = useRef(null);

    useEffect(() => {
        setIsOpen(isActive?.has(section._id));
    }, [isActive])

    useEffect(() => {
        setSectionHeight(isOpen ? contentHeight.current.scrollHeight : 0)
    }, [isOpen])

    return (
        <div className="overflow-hidden border border-solid border-richblack-600 bg-richblack-800 text-richblack-5 last:mb-0 first:rounded-t-md last:rounded-b-md">
            {/* Header */}
            <div
                className='flex cursor-pointer items-start  justify-between bg-opacity-20 px-7 py-4 transition-[0.3s]'
                onClick={() => handleAccordion(section._id)}
            >
                {/* section Name */}
                <div className='flex flex-wrap items-center gap-x-3 my-auto md:text-[16px] sm:text-[14px]'>
                    <FaChevronDown className={`${isOpen ? 'rotate-180' : 'rotate-0'} transition-transform duration-200`} />
                    {section?.sectionName}
                </div>

                {/* No. of Lectures & Time duration*/}
                <div className='flex flex-col text-richblack-50 text-[14px]'>
                    <p>
                        Lecture: <span className='font-mono text-indigo-500'>{section?.subSection.length}</span>
                    </p>
                    <p>
                        Duration: <span className='font-mono text-indigo-500'>{section?.totalSectionDuration.toFixed(2)}</span>
                    </p>
                </div>

            </div>

            {/* section */}
            <div
                ref={contentHeight}
                className="h-0 bg-richblack-900 transition-[height] duration-[0.45s] ease-[ease]"
                style={{ height: sectionHeight }}
            >
                <div className="flex flex-col font-semibold">
                    {section.subSection.map(subSection => (
                        <div
                            key={subSection._id}
                            className='flex items-center gap-x-3 py-4 px-8 border-b-[1px] border-richblack-600 last:border-none cursor-not-allowed'
                        >
                            <IoVideocamOutline />
                            <span >
                                {subSection.title}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CourseAccordian