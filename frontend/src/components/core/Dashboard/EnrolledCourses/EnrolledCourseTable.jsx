import React from 'react'
import ProgressBar from "@ramonak/react-progress-bar"
import { useNavigate } from 'react-router-dom';

function EnrolledCourseTable({ course, courseId, sectionId, subSectionId }) {

    const navigate = useNavigate();
    const link = `view-course/${courseId}/section/${sectionId}/sub-section/${subSectionId}`

    const totalSubSection = (course) => {
        let subSectionCount = 0;
        course.courseContent.forEach(section => {
            subSectionCount += section.subSection.length;
        });

        return subSectionCount;
    }

    const progressPercentage = (course) => {
        const percent = Math.round((course.courseProgress / totalSubSection(course)) * 10000) / 100;
        return percent;
    }


    return (
        <>
            <div
                onClick={() => navigate(link)}
                className='flex flex-col items-center w-full border border-richblack-700 rounded-sm'
            >
                <div className='grid row-span-4 grid-rows-subgrid gap-2 w-full cursor-pointer mb-3'>
                    {/* IMAGE */}
                    <img
                        src={course.thumbnail}
                        alt="course_img"
                        className="h-[130px] w-full  object-cover"
                    />

                    {/* NAME & DESCRIPTION */}
                    <div className="flex md:max-w-xs w-[calc(w-full-0.5rem)] flex-col gap-2 mx-auto md:px-2 ">
                        <p className="font-semibold">{course.courseName}</p>
                        <p className="text-xs text-richblack-300">
                            {course.courseDescription.length > 50
                                ? `${course.courseDescription.slice(0, 50)}...`
                                : course.courseDescription}
                        </p>
                    </div>

                    {/* PROGRESS BAR */}
                    <div className='px-2 flex flex-col gap-2'>
                        <div className='flex justify-between'>
                            <p >
                                Progress: {course?.courseProgress}/{totalSubSection(course)}
                            </p>
                            <p className="text-fontPurple">
                                {progressPercentage(course) || 0}%
                            </p>
                        </div>
                        <ProgressBar
                            completed={progressPercentage(course) || 0}
                            height='8px'
                            isLabelVisible={false}
                        />
                    </div>
                </div>
            </div>
        </>

    )
}

export default EnrolledCourseTable