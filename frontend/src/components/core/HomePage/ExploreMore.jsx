import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore';
import HightlightText from './HightlightText';
import CourseCard from './CourseCard';

const tabsName = ["Free", "New to coding", "Most popular", "Skills paths", "Career paths",];

function ExploreMore() {
    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setCard = (value) => {
        setCurrentTab(value);
        //fetch all related courses
        const result = HomePageExplore.filter((course) => course.tag === value);
        setCourses(result[0].courses)
        setCurrentCard(result[0].courses[0].heading)
    }

    return (
        <div className='w-full mb-6'>
            <div className='relative '>

                {/* Heading */}
                <div className='text-4xl font-semibold text-center my-10 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]'>
                    Unlock the
                    <HightlightText text={" Power of Code"} />
                    <p className='text-center text-richblack-300 text-lg mt-3 font-semibold'>
                        Learn to Build Anything You Can Imagine
                    </p>
                </div>

                {/* Category Bar */}
                <div className='hidden lg:flex rounded-full bg-richblack-800 mx-auto p-1 gap-5 w-max drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]'>{
                    tabsName.map((element, i) => {
                        return (
                            <div key={i}
                                className={`text-[16px] flex flex-col lg:flex-row rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-7 py-[7px] font-medium gap-2
                                ${currentTab === element
                                        ? 'bg-richblack-900 text-richblack-5 '
                                        : 'text-richblack-200'} `}
                                onClick={() => setCard(element)}
                            >
                                {element}
                            </div>
                        )
                    })
                }</div>
                <div className="hidden lg:block lg:h-[200px]"></div>

                {/* Cards */}
                <div className='lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:mb-0 mb-7 lg:px-0 px-3'>{
                    courses.map((course, index) => {
                        return (
                            <CourseCard
                                key={index}
                                cardData={course}
                                currentCard={currentCard}
                                setCurrentCard={setCurrentCard}
                            />
                        )
                    })
                }</div>

            </div>
        </div>
    )
}

export default ExploreMore