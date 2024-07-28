import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import HightlightText from '../components/core/HomePage/HightlightText'
import CTAButton from '../components/core/HomePage/Button'
import CodeBlocks from '../components/core/HomePage/CodeBlocks'
import TimeLineSection from '../components/core/HomePage/TimeLineSection'
import LearningLangSection from '../components/core/HomePage/LearningLangSection'
import InstructorSection from '../components/core/HomePage/InstructorSection'
import Footer from '../components/common/Footer'
import ExploreMore from '../components/core/HomePage/ExploreMore'
import RatingSlider from '../components/core/Ratings/RatingSlider'
import Hero from '../components/core/HomePage/Hero'

function Home() {
    return (
        <div>
            {/* Section 1 */}
            <div className='flex flex-col w-11/12 max-w-maxContent items-center justify-between mx-auto text-neutral-50 gap-8'>

                {/* HERO SECTION */}
                <Hero />

                {/* Code section-1 */}
                <div>
                    <CodeBlocks
                        position={"lg:flex-row"}
                        heading={
                            <div className="text-4xl font-semibold">
                                Unlock your <HightlightText text={"coding potential "} />
                                with our online courses.
                            </div>
                        }
                        subheading={
                            `Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.`
                        }
                        ctaBtn1={{
                            btnText: "try it yourself",
                            active: true,
                            linkTo: "/signup"
                        }}
                        ctaBtn2={{
                            btnText: "learn more",
                            active: false,
                            linkTo: "/login"
                        }}
                        codeColor={"text-yellow-25"}
                        codeBlock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
                        backgroundGradient={<div className="codeblock1 absolute"></div>}
                    />
                </div>

                {/* Code section-2 */}
                <div>
                    <CodeBlocks
                        position={"lg:flex-row-reverse"}
                        heading={
                            <div className="w-[100%] text-4xl font-semibold lg:w-[50%]">
                                Start <HightlightText text={"coding in Seconds "} />
                            </div>
                        }
                        subheading={
                            `Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.`
                        }
                        ctaBtn1={{
                            btnText: "Continue Lesson",
                            active: true,
                            linkTo: "/signup"
                        }}
                        ctaBtn2={{
                            btnText: "learn more",
                            active: false,
                            linkTo: "/login"
                        }}
                        codeColor={"text-neutral-200"}
                        codeBlock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
                        backgroundGradient={<div className="codeblock2 absolute"></div>}
                    />
                </div>

                {/* Card Section */}
                <ExploreMore />

            </div>

            {/* Section 2 */}
            <div className='bg-pure-greys-5 text-richblack-700'>
                <div className='homepage_bg h-[320px]'>

                    <div className='w-11/12 max-w-maxContent flex flex-col justify-center items-center gap-5 mx-auto'>
                        <div className='lg:h-[170px]'></div>
                        {/* Buttons */}
                        <div className='flex flex-row gap-7 text-white'>
                            <CTAButton active={true} linkTo={'/signup'}>
                                <div className='flex items-center gap-3'>
                                    Explore Full Catalog
                                    <FaArrowRight />
                                </div>
                            </CTAButton>

                            <CTAButton active={false} linkTo={'/login'}>
                                <div>Learn More</div>
                            </CTAButton>
                        </div>
                    </div>

                </div>

                <div className=' w-11/12 max-w-maxContent mx-auto flex flex-col items-center justify-between gap-7'>
                    {/* Skills Section */}
                    <div className='mb-10 mt-[-100px] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0'>
                        {/* box-1 */}
                        <div className='text-4xl font-semibold lg:w-[45%] '>
                            Get the skills you need for a
                            <HightlightText text={" job that is in demand."} />
                        </div>
                        {/* box-2 */}
                        <div className='flex flex-col gap-10 lg:w-[40%] items-start '>
                            <div className='text-[16px]'>
                                The modern BrainForge dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                            </div>
                            <div className='w-full md:w-fit'>
                                <CTAButton active={true} linkTo={'/signup'}>
                                    <div>Learn More</div>
                                </CTAButton>
                            </div>
                        </div>
                    </div>

                    {/* Timeline Section */}
                    <TimeLineSection />

                    {/* Learning Language Section */}
                    <LearningLangSection />

                </div>

            </div>

            {/* Section 3 */}
            <div className='w-11/12 mx-auto my-20 flex flex-col items-center justify-between gap-8 bg-bgBlue text-neutral-50'>

                {/* Instructor Section*/}
                <InstructorSection />

                <h1 className="text-center text-4xl font-semibold mt-8">
                    <HightlightText text={"Reviews "} /> from other learners
                </h1>

                {/* Review Slider */}
                <div className=" rounded-md flex flex-col antialiased bg-white dark:bg-bgBlue items-center justify-center">
                    <RatingSlider />
                </div>

            </div>

            {/* Footer */}
            <Footer />

        </div>
    )
}

export default Home