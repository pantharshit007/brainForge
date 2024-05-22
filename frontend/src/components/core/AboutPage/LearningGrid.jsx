import React from 'react'
import HightlightText from '../HomePage/HightlightText';
import CTAButton from '../HomePage/Button';

const LearningGridArray = [
    {
        order: -1,
        heading: "World-Class Learning for",
        highlightText: "Anyone, Anywhere",
        description:
            "BrainForge partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
        BtnText: "Learn More",
        BtnLink: "/",
    },
    {
        order: 1,
        heading: "Curriculum Based on Industry Needs",
        description:
            "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
        order: 2,
        heading: "Our Learning Methods",
        description:
            "BrainForge partners with more than 275+ leading universities and companies to bring",
    },
    {
        order: 3,
        heading: "Certification",
        description:
            "BrainForge partners with more than 275+ leading universities and companies to bring",
    },
    {
        order: 4,
        heading: `Rating "Auto-grading"`,
        description:
            "BrainForge partners with more than 275+ leading universities and companies to bring",
    },
    {
        order: 5,
        heading: "Ready to Work",
        description:
            "BrainForge partners with more than 275+ leading universities and companies to bring",
    },
];

function LearningGrid() {
    return (
        <div className='grid mx-auto w-[350px] lg:w-fit grid-cols-1 lg:grid-cols-4 mb-12'>
            {
                LearningGridArray.map((card, index) => {
                    return (
                        <div key={index}
                            className={`
                                ${index === 0 && 'lg:col-span-2 bg-transparent '}
                                ${card.order % 2 === 0 ? 'bg-richblack-800' : 'bg-richblack-700'}
                                ${card.order === 3 && 'lg:col-start-2'}
                                lg:h-[294px] p-5 
                            `}
                        >
                            {
                                card.order == -1 ? (
                                    // FEATURED CELL
                                    <div className='lg:w-[90%] flex flex-col gap-3 pb-10 lg:pb-0'>
                                        <div className='text-4xl font-semibold'>
                                            {card.heading}
                                            <HightlightText text={" " + card.highlightText} />
                                        </div>

                                        <p className='font-medium text-richblack-300'>
                                            {card.description}
                                        </p>

                                        <div className='w-fit mt-2'>
                                            <CTAButton active={true} linkTo={card.BtnLink}>
                                                {card.BtnText}
                                            </CTAButton>
                                        </div>

                                    </div>
                                ) : (
                                    // NORMAL CELL
                                    <div className='flex flex-col xl:gap-8 gap-6 xl:p-8 p-6'>
                                        <h1 className='text-richblack-5 text-lg'>
                                            {card.heading}
                                        </h1>
                                        <p className='text-richblack-300 font-medium'>
                                            {card.description}
                                        </p>
                                    </div>
                                )
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default LearningGrid