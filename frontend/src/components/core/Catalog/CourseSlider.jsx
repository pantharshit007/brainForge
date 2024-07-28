import React from 'react'
import CourseCard from './CourseCard'
import { Pagination, Scrollbar, Keyboard, Navigation, } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "react-loading-skeleton/dist/skeleton.css";

function CourseSlider({ courses }) {

    return (
        <>{courses?.length ?
            (
                <Swiper
                    slidesPerView={3}
                    spaceBetween={15}
                    loop={courses?.length > 3 ? true : false}
                    pagination={{ clickable: true, }}
                    scrollbar={{ draggable: true }}
                    keyboard={{ enabled: true, onlyInViewport: true }}
                    navigation={true}
                    modules={[Pagination, Scrollbar, Keyboard, Navigation]}

                    breakpoints={{
                        // when window width is >= 320px
                        320: {
                            slidesPerView: 2,
                            spaceBetween: 10
                        },
                        // when window width is >= 1024px
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 15
                        },
                    }}
                    style={{
                        "--swiper-navigation-size": "30px",
                        "--swiper-navigation-": "30px",
                        "--swiper-navigation-sides-offset": "0px",
                        // "--swiper-pagination-color": "white",
                        "--swiper-pagination-bullet-inactive-color": "white",
                        "--swiper-pagination-bullet-vertical-gap": "15px",
                    }}
                    className='mySwiper md:pt-5 px-5 pb-7'
                >
                    {courses?.map(courseContent => (
                        <SwiperSlide key={courseContent?._id}>
                            <CourseCard course={courseContent} Height={"max-md:h-[110px] h-[220px] lg:h-[200px]"} slider={true} />
                        </SwiperSlide>
                    ))}

                </Swiper>

            ) : (
                <div className='flex gap-4 overflow-hidden'>
                    <SkeletonTheme baseColor="#2C333F" highlightColor="#161D29">
                        <div className=''>
                            <Skeleton className="md:h-[200px] lg:w-[400px] h-[100px] w-[200px] rounded-xl" />
                            <Skeleton className=" md:h-[20px] w-[70px] rounded-md" />
                            <Skeleton className="md:h-[20px] md:w-[400px] rounded-md" />
                            <Skeleton className="md:h-[20px] md:w-[400px] rounded-md" />
                        </div>
                    </SkeletonTheme>

                    <SkeletonTheme baseColor="#2C333F" highlightColor="#161D29">
                        <div className=''>
                            <Skeleton className="md:h-[200px] lg:w-[400px] h-[100px] w-[200px] rounded-xl" />
                            <Skeleton className=" md:h-[20px] w-[70px] rounded-md" />
                            <Skeleton className="md:h-[20px] md:w-[400px] rounded-md" />
                            <Skeleton className="md:h-[20px] md:w-[400px] rounded-md" />
                        </div>
                    </SkeletonTheme>

                    <SkeletonTheme baseColor="#2C333F" highlightColor="#161D29">
                        <div className=''>
                            <Skeleton className="md:h-[200px] lg:w-[400px] h-[100px] w-[200px] rounded-xl" />
                            <Skeleton className=" md:h-[20px] w-[70px] rounded-md" />
                            <Skeleton className="md:h-[20px] md:w-[400px] rounded-md" />
                            <Skeleton className="md:h-[20px] md:w-[400px] rounded-md" />
                        </div>
                    </SkeletonTheme>
                </div>
            )
        }</>
    )
}
export default CourseSlider