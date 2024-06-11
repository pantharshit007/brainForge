import React from 'react'
import { useSelector } from 'react-redux'
import { FaCheck } from "react-icons/fa"
import CourseInformationForm from './CourseInformation/CourseInformationForm'
import CourseBuilderForm from './CourseBuilder/CourseBuilderForm'
import PublishCourse from './PublishCourse/PublishCourse'

function RenderSteps() {
    const { step } = useSelector(state => state.course)

    const steps = [
        {
            id: 1,
            title: "Course Information",
        },
        {
            id: 2,
            title: "Course Builder",
        },
        {
            id: 3,
            title: "Publishing Course",
        },
    ]
    return (
        <>
            <div className=' flex justify-center items-center'>
                <div className=' flex flex-col w-[calc(100vw-20%)] sm:w-fit items-start'>

                    {/* NUMBERING + DASHES*/}
                    <div className=' ml-10 relative mb-2 flex w-full justify-center'>
                        {steps.map(items => (
                            <div key={items.id} className='flex w-full justify-between'>
                                {/* NUMBERING */}
                                <div className='flex flex-col items-center'>
                                    <div
                                        className={`grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px]
                                        ${step === items.id
                                                ? 'bg-indigo-600 border-white text-white'
                                                : 'border-richblack-700 bg-richblack-800 text-richblack-300'}
                                        ${step > items.id && "bg-white text-white"}
                                        `}>
                                        {
                                            step > items.id
                                                ? (<FaCheck className="font-bold text-indigo-600" />)
                                                : (items.id)
                                        }
                                    </div>
                                </div>
                                {/* DASHED LINE */}
                                {items.id < steps.length && (
                                    <div
                                        className={`h-[calc(34px/2)] w-[100%] border-dashed border-b-2
                                            ${step > items.id
                                                ? "border-indigo-500"
                                                : "border-richblack-700"}`}
                                    ></div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* STEP NAMING */}
                    <div className='relative mb-16 flex w-full select-none justify-between'>
                        {steps.map(items => (
                            <div key={items.id} className='flex md:min-w-[180px] flex-col items-start'>
                                <p
                                    className={` ml-3 md:ml-0 text-[10px] md:text-sm text-richblack-5
                                    ${step >= items.id ? "text-richblack-5" : "text-richblack-500"}`}
                                >
                                    {items.title}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* RENDER SPECIFIC COMPONENT/FORM BASED ON THE CURRENT STEP */}
            {step === 1 && <CourseInformationForm />}
            {step === 2 && <CourseBuilderForm />}
            {step === 3 && <PublishCourse />}
        </>
    )
}

export default RenderSteps