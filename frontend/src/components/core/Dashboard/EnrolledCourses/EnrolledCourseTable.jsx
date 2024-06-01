import React, { useEffect } from 'react'
import ProgressBar from "@ramonak/react-progress-bar"

function EnrolledCourseTable({ course, index }) {

    const totalSubSection = (course) => {
        let subSectionCount = 0;
        course.courseContent.forEach(section => {
            subSectionCount += section.subSection.length;
        });

        return subSectionCount;
    }

    const progressPercentage = (course) => {
        const percent = Math.round((course.courseProgress / totalSubSection) * 10000) / 100;
        return percent;
    }


    return (
        <div className='flex items-center border border-richblack-700'>
            {/* IMAGE & NAME+DESCRIPTION */}
            <div className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3">
                {/* IMAGE */}
                <img
                    src={course.thumbnail}
                    alt={course.courseName + " Course-img"}
                    className="h-14 w-14 rounded-lg object-cover"
                />

                {/* NAME+DESC */}
                <div className="flex max-w-xs flex-col gap-2">
                    <p className="font-semibold">{course.courseName}</p>
                    <p className="text-xs text-richblack-300 hidden md:block">
                        {/* for cases where description is greater than 50 words */}
                        {course.courseDescription.length > 50
                            ? course.courseDescription.slice(0, 50) + '...'
                            : course.courseDescription
                        }
                    </p>
                </div>
            </div>

            {/* VIDEO DURATION: Not Available from BE */}
            <div className="w-1/4 px-2 py-3">
                {course?.totalDuration}
            </div>

            {/* COURSE PROGRESS */}
            <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                <p>Progress: {course.courseProgress}/{totalSubSection(course)}</p>
                <ProgressBar
                    completed={progressPercentage(course) || 0}
                    height='8px'
                    isLabelVisible={false}
                />
            </div>
        </div>
    )
}

export default EnrolledCourseTable