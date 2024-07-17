import React, { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player/lazy';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { BiSolidSkipPreviousCircle, BiSolidSkipNextCircle } from "react-icons/bi";
import { MdReplayCircleFilled } from "react-icons/md";

import { markLectureAsComplete } from '../../../services/backendCallFunction/courseAPI';
import { setCompletedLeactures } from '../../../reducer/slices/viewCourseSlice';
import IconBtn from '../../common/IconBtn';

function VideoDetail() {

    const { token } = useSelector(state => state.auth);
    const { courseSectionData, completedLectures } = useSelector(state => state.viewCourse);
    const { isOpen } = useSelector(state => state.sidebar);

    const { courseId, sectionId, subsectionId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [videoData, setVideoData] = useState([]);
    const [videoEnd, setVideoEnd] = useState(false);
    const [currSectionIndex, setCurrSectionIndex] = useState(0);
    const [currSubSectionIndex, setCurrSubSectionIndex] = useState(0)
    const playerRef = useRef(null);

    useEffect(() => {
        if (courseSectionData?.length === 0) return;

        const section = courseSectionData?.filter(section => section?._id === sectionId);
        const subSection = section?.[0]?.subSection?.filter(subSection => subSection?._id === subsectionId)
        setVideoData(subSection?.[0])

        setVideoEnd(false)
    }, [courseSectionData, sectionId, subsectionId])

    // set new indexes of section and sub section data
    useEffect(() => {
        const sectionIndex = courseSectionData?.findIndex(section => section._id === sectionId);
        const subSectionIndex = courseSectionData[sectionIndex]?.subSection?.findIndex(subSection => subSection._id === subsectionId);

        setCurrSectionIndex(sectionIndex);
        setCurrSubSectionIndex(subSectionIndex);
    }, [courseId, sectionId, subsectionId, courseSectionData]);

    function isFirstLecture() {
        if (currSectionIndex === 0 && currSubSectionIndex === 0) {
            return true;
        } else return false;
    }

    function isLastLecture() {

        const sectionLen = courseSectionData?.length;
        const subSectionLen = courseSectionData[currSectionIndex]?.subSection?.length;

        if (currSectionIndex === sectionLen - 1 && currSubSectionIndex === subSectionLen - 1) {
            return true;
        } else return false;
    }

    function prevVideo() {
        const subSectionLen = courseSectionData[currSectionIndex - 1]?.subSection?.length;

        // case: for prev video in same section
        if (currSubSectionIndex !== 0) {
            const prevSubSectionId = courseSectionData[currSectionIndex].subSection[currSubSectionIndex - 1]._id;
            navigate(`/dashboard/enrolled-courses/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`);
        }
        // case: for prev video of prev section
        else if (currSectionIndex !== 0) {
            const prevSectionId = courseSectionData[currSectionIndex - 1]._id;
            const prevSubSectionId = courseSectionData[currSectionIndex - 1].subSection[subSectionLen - 1]._id;
            navigate(`/dashboard/enrolled-courses/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`);
        } else {
            return;
        }
    }

    function nextVideo() {
        const sectionLen = courseSectionData?.length;
        const subSectionLen = courseSectionData[currSectionIndex]?.subSection?.length;

        // case: for next video in same section
        if (currSubSectionIndex !== subSectionLen - 1) {
            const nextSubSectionId = courseSectionData[currSectionIndex].subSection[currSubSectionIndex + 1]._id;
            navigate(`/dashboard/enrolled-courses/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`);
        }
        // case: for next video of next section
        else if (currSectionIndex !== sectionLen - 1) {
            const nextSectionId = courseSectionData[currSectionIndex + 1]._id;
            const nextSubSectionId = courseSectionData[currSectionIndex + 1].subSection[0]._id;
            navigate(`/dashboard/enrolled-courses/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`);
        } else {
            return;
        }
    }

    // mark lecture as completed.
    async function markAsCompleted() {
        const data = { courseId: courseId, subSectionId: subsectionId };
        const res = await markLectureAsComplete(token, data)

        if (res) {
            dispatch(setCompletedLeactures([...completedLectures, videoData._id]));
            nextVideo();
        }
    }

    // if video is not loaded right now!
    if (!videoData) {
        return (
            <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center'>
                <div className="spinner"></div>
            </div>)
    }

    return (
        <div className='md:w-[calc(100vw-335px)] w-screen max-md:w-[600px] max-sm:w-[370px] p-3 my-1 mx-auto'>

            {/* VIDEO PLAYER */}
            <div className={`relative ${isOpen ? 'hidden' : 'undefined'}`}>
                <div className='relative pb-[56.25%] px-2 h-0 bg-black'>
                    <ReactPlayer
                        url={videoData.videoUrl}
                        ref={playerRef}
                        controls={true}
                        width="100%"
                        height="96.5%"
                        onEnded={() => setVideoEnd(true)}
                        onSeek={() => setVideoEnd(false)}
                        className="z-10 absolute top-0 left-0" />
                </div>

                {/* BUTTON:when video ends */}
                {videoEnd && (
                    <div className='flex justify-center items-center z-20 bg-black/10 backdrop-blur-sm absolute  top-0 left-0 w-full h-full'>
                        {/* MARK VIDEO AS COMPLETED */}
                        <div className='flex justify-center top-[20%] max-md:top-[10%] absolute'>
                            {!completedLectures.includes(videoData._id) && (
                                <IconBtn
                                    text={'Mark Completed'}
                                    onClick={() => markAsCompleted()}
                                    customClasses='text-white transition-transform duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[4px_4px_0px_white] active:translate-x-[0px] active:translate-y-[0px] active:shadow-none '
                                />
                            )}
                        </div>

                        <div className='absolute w-full flex justify-around z-20 text-white'>
                            {/* PREVIOUS BUTTON */}
                            {!isFirstLecture()
                                ? <BiSolidSkipPreviousCircle size={50} onClick={prevVideo}
                                    className='cursor-pointer bg-indigo-500 rounded-full active:scale-90' />
                                : <div className='w-[50px] cursor-none'></div>
                            }

                            {/* RE-PLAY */}
                            <MdReplayCircleFilled size={50} onClick={() => playerRef.current.seekTo(0)} className='cursor-pointer bg-indigo-500 rounded-full active:scale-90' />

                            {/* NEXT BUTTON */}
                            {!isLastLecture()
                                ? <BiSolidSkipNextCircle size={50} onClick={nextVideo}
                                    className='cursor-pointer bg-indigo-500 rounded-full active:scale-90' />
                                : <div className='w-[50px] cursor-none'></div>
                            }
                        </div>

                    </div>
                )}
            </div>

            {/* VIDEO TITLE AND DESCRIPTION*/}
            <div className='mt-5'>
                <h1 className='text-2xl font-bold text-richblack-25'>
                    {videoData?.title}
                </h1>
                <p className='text-richblack-100'>
                    {videoData?.description}
                </p>
            </div>
        </div>
    )
}

export default VideoDetail