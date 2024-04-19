import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import HightlightText from '../components/core/HomePage/HightlightText'
import CTAButton from '../components/core/HomePage/Button'
import Banner from '../assets/Images/banner.mp4'
import CodeBlocks from '../components/core/HomePage/CodeBlocks'

function Home() {
    return (
        <div>
            {/* Section 1 */}
            <div className='flex flex-col w-11/12 max-w-maxContent items-center justify-between mx-auto text-neutral-50 gap-8'>

                {/* Upgrade to Instructor */}
                <Link to='/signup'>
                    <div className=' group mx-auto mt-16 p-1 rounded-full font-bold text-richblack-200 bg-richblack-800 transition-all duration-200 hover:scale-95 w-fit drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] hover:drop-shadow-none  '>
                        <div className=' flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900 '>
                            <p>Become an Instructor </p>
                            <FaArrowRight />
                        </div>
                    </div>
                </Link>

                {/* Main Heading */}
                <div className='text-center text-4xl font-semibold mt-7'>
                    Empower your future with <HightlightText text={"Coding Skills"} />
                </div>

                {/* Sub Heading */}
                <div className='mx-auto mt-4 w-[90%] text-center text-lg font-bold text-richblack-300'>
                    With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
                </div>

                {/* Click to Action Buttons */}
                <div className='flex flex-row gap-7 mt-8'>
                    <CTAButton active={true} linkTo={'/signup'}>
                        Learn More
                    </CTAButton>
                    <CTAButton active={false} linkTo={'/login'}>
                        Book a Demo
                    </CTAButton>
                </div>

                {/* Banner Video */}
                <div className='mx3 my-7 shadow-[10px_-5px_50px_-5px] shadow-fontPurple '>
                    <video muted loop autoPlay src={Banner} className="shadow-[20px_20px_rgba(255,255,255)]">
                    </video>
                </div>

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


            </div>

            {/* Section 2 */}

            {/* Section 3 */}

            {/* Footer */}

        </div>
    )
}

export default Home