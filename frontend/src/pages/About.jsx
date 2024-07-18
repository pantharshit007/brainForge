import Tilt from 'react-parallax-tilt';

import HightlightText from '../components/core/HomePage/HightlightText'
import Quote from '../components/core/AboutPage/Quote'
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
import FoundingStory from "../assets/Images/FoundingStory.png"
import StatsComponent from '../components/core/AboutPage/StatsComponent'
import LearningGrid from '../components/core/AboutPage/LearningGrid'
import ContactFormSection from '../components/core/AboutPage/ContactFormSection'
import Footer from '../components/common/Footer'
import CustomHighlightText from '../components/core/AboutPage/CustomHighlightText'
import RatingSlider from '../components/core/Ratings/RatingSlider';

function About() {
    return (
        <div >
            {/* Section-1 */}
            <section className="bg-richblack-700">
                <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center text-white">
                    <header className="mx-auto py-20 text-4xl font-semibold lg:w-[70%]">
                        Driving Innovation in Online Education for a
                        <HightlightText text={" Brighter Future"} />
                        <p className="mx-auto mt-3 text-center text-base font-medium text-richblack-200 lg:w-[95%]">
                            BrainForge is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                        </p>
                    </header>

                    {/* IMAGESx3 */}
                    <div className="sm:h-[70px] lg:h-[150px]"></div>
                    <div className="absolute bottom-0 left-[50%] grid w-[100%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-3 lg:gap-5">
                        <Tilt transitionSpeed={2500} scale={1.04} tiltMaxAngleX={8} tiltMaxAngleY={10}>
                            <img src={BannerImage1} alt="BannerImage1" /></Tilt>

                        <Tilt transitionSpeed={2500} scale={1.04} tiltMaxAngleX={8} tiltMaxAngleY={10}>
                            <img src={BannerImage2} alt="BannerImage2" /></Tilt>

                        <Tilt transitionSpeed={2500} scale={1.04} tiltMaxAngleX={8} tiltMaxAngleY={10}>
                            <img src={BannerImage3} alt="BannerImage3" /></Tilt>

                    </div>
                </div>
            </section>

            {/* SECTION-2 */}
            <section className="border-b border-richblack-700">
                <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500">
                    <div className="h-[100px] "></div>
                    <Quote />
                </div>
            </section>

            {/* SECTION-3 */}
            <section>
                <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500">
                    {/* UPPER BOX */}
                    <div className="flex flex-col items-center gap-10 lg:flex-row justify-between">
                        {/* FOUNDING-BOX1 */}
                        <div className="my-24 flex lg:w-[50%] flex-col gap-10">
                            <CustomHighlightText text={"Our Founding Story"} type={"blue"} size={true} />

                            <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                                Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                            </p>

                            <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                                As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                            </p>

                        </div>

                        {/* FOUNDING-BOX2 */}
                        <Tilt transitionSpeed={2500} tiltMaxAngleX={10} tiltMaxAngleY={10}>
                            <div>
                                <img src={FoundingStory}
                                    alt="FoundingStory"
                                    className="shadow-[0_0_20px_0] shadow-[#008cff]" />
                            </div>
                        </Tilt>

                    </div>

                    {/* LOWER BOX */}
                    <div className="flex flex-col items-center lg:gap-10 lg:flex-row justify-between">
                        {/* LEFT BOX */}
                        <div className="my-24 flex lg:w-[40%] flex-col gap-10">
                            <CustomHighlightText text={"Our Vision"} type={"orange"} size={true} />
                            <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                                With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
                            </p>
                        </div>

                        {/* RIGHT BOX */}
                        <div className="my-24 flex lg:w-[40%] flex-col gap-10">
                            <CustomHighlightText text={"Our Mission"} type={"blue"} size={true} />
                            <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                                Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION-4 */}
            <section>
                <StatsComponent />
            </section>

            {/* SECTION-5 */}
            <section className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white">
                <LearningGrid />
                <ContactFormSection />
            </section>

            {/* SECTION-6 */}
            <section>
                <div className="mx-auto my-20 w-screen flex flex-col gap-8 text-white">
                    <h1 className="text-center text-4xl font-semibold mt-8">
                        <HightlightText text={"Reviews "} />from other learners
                    </h1>

                    {/* Review Slider */}
                    <div className=" rounded-md flex flex-col antialiased bg-white dark:bg-bgBlue items-center justify-center">
                        <RatingSlider />
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <Footer />
        </div>

    )
}

export default About