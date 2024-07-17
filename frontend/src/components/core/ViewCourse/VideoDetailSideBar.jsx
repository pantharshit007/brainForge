import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { IoChevronBackCircle } from "react-icons/io5";

import IconBtn from '../../common/IconBtn';
import VideoAccordian from './VideoAccordian';

function VideoDetailSideBar({ setReviewModal }) {

    const { courseSectionData, courseEntireData,
        completedLectures, totalNoOfLectures } = useSelector(state => state.viewCourse);
    const { sectionId, subsectionId } = useParams();
    const navigate = useNavigate();

    //? const [activeStatus, setActiveStatus] = useState(''); 
    const [videoActive, setVideoActive] = useState("");
    const [showSideBar, setShowSideBar] = useState(true);

    // set the data
    useEffect(() => {
        ; (() => {
            if (!courseSectionData?.length) return;

            const currSectionIdx = courseSectionData.findIndex(section => section._id === sectionId);
            const currSubSectionIdx = courseSectionData[currSectionIdx]?.subSection.
                findIndex(subSection => subSection._id === subsectionId);

            if (currSectionIdx === -1 || currSubSectionIdx === -1) return;

            const activeSubSectionId = courseSectionData[currSectionIdx].subSection[currSubSectionIdx]?._id;

            //? setActiveStatus(courseSectionData[currSubSectionIdx]._id);
            setVideoActive(activeSubSectionId);
        })()
    }, [courseSectionData, sectionId, subsectionId])

    return (
        <>
            <div
                className={`flex h-[calc(100vh-3.5rem)] min-h-screen max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 transition-all duration-700 overflow-y-auto ${showSideBar ? 'w-[320px]' : 'w-[60px]'}`}
            >
                {/* Sidebar collapse/Expand */}
                <div
                    className='text-white cursor-pointer mr-auto px-2 ml-1 my-4 hover:text-indigo-500 transition-colors duration-200'
                    onClick={() => { setShowSideBar(!showSideBar) }}
                >
                    <MdKeyboardDoubleArrowLeft
                        size={33}
                        className={`${showSideBar ? 'rotate-0 ' : 'rotate-180'} transition-transform duration-500`}
                    />
                </div>

                {/* GO BACK: Collapsed Sidebar */}
                <div
                    onClick={() => navigate('/dashboard/enrolled-courses')}
                    className={showSideBar ? 'hidden' : 'flex text-richblack-25 my-3 mx-auto cursor-pointer hover:scale-110'}>
                    <IoChevronBackCircle size={40} />
                </div>

                {/* UPPER SECTION */}
                <div className={` ${!showSideBar ? 'hidden' : undefined} mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 pt-2 pb-5 text-lg font-bold text-richblack-25`}>

                    {/* BUTTONS */}
                    <div className="flex min-w-full items-center justify-between overflow-x-hidden">
                        {/* Go Back */}
                        <span
                            onClick={() => navigate('/dashboard/enrolled-courses')}
                            className='text-richblack-25  hover:scale-110 transition-transform duration-200 cursor-pointer'
                        >
                            <IoChevronBackCircle size={40} />
                        </span>

                        <IconBtn
                            text={"Add Review"}
                            customClasses="ml-auto"
                            onClick={() => { setReviewModal(true) }}
                        />
                    </div>

                    {/* COURSE INFO */}
                    <div className="flex flex-col">
                        <p className='uppercase'>{courseEntireData?.courseName}</p>
                        <p className="text-sm font-semibold text-richblack-400">
                            {completedLectures?.length} of {totalNoOfLectures} Lectures Completed.
                        </p>
                    </div>
                </div>

                {/* LOWER SECTION */}
                <div className={!showSideBar ? 'hidden' : undefined}>
                    <div className=' h-[calc(100vh-5rem )] overflow-y-visible px-2 my-5 '>
                        {courseSectionData?.map(section => (
                            <VideoAccordian
                                key={section._id}
                                section={section}
                                videoActive={videoActive}
                                completedLectures={completedLectures}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default VideoDetailSideBar