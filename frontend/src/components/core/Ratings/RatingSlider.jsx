import React, { useEffect, useState } from 'react'
import { motion, useMotionValue, animate, } from 'framer-motion'
import useMeasure from 'react-use-measure'

import RatingCard from './RatingCard';
import { fetchRatingAndReview } from '../../../services/backendCallFunction/courseAPI';

function RatingSlider() {

    // test Data: toBe removed
    const testData = [
        {
            "_id": "649e991bf6b2ffa510e02a76",
            "user": {
                "_id": "649e678f0c56104d91096b86",
                "firstName": "hachi",
                "lastName": "man",
                "email": "ketleaa@gmail.com",
                "image": "https://api.dicebear.com/5.x/initials/svg?seed=hachi man"
            },
            "rating": 5,
            "review": "Greate Course.The Web Development Bootcamp exceeded my expectations.",
            "course": {
                "_id": "64903a50d83df5353bcf1897",
                "courseName": "Java"
            },
            "__v": 0
        },
        {
            "_id": "649e9c78f6b2ffa510e02b47",
            "user": {
                "_id": "649e678f0c56104d91096b86",
                "firstName": "hachi",
                "lastName": "man",
                "email": "ketleaa@gmail.com",
                "image": "https://api.dicebear.com/5.x/initials/svg?seed=hachi man"
            },
            "rating": 5,
            "review": "The Advanced JavaScript Concepts course took my JavaScript skills to the next level.",
            "course": {
                "_id": "6499202a3272e5a6b38a8e8b",
                "courseName": "JavaScript 2023"
            },
            "__v": 0
        },
        {
            "_id": "6552ddc47afcd3c95fe3fd54",
            "user": {
                "_id": "6541261e329cc76ed0055dc7",
                "firstName": "Uday Pratap",
                "lastName": "Singh",
                "email": "johnbhaicena77@gmail.com",
                "image": "https://api.dicebear.com/6.x/initials/svg?seed=Uday Singh&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600"
            },
            "rating": 5,
            "review": "Nice",
            "course": {
                "_id": "64903a50d83df5353bcf1897",
                "courseName": "Java"
            },
            "__v": 0
        },
        {
            "_id": "6552e03514e3f75cd01a909f",
            "user": {
                "_id": "6541261e329cc76ed0055dc7",
                "firstName": "Uday Pratap",
                "lastName": "Singh",
                "email": "johnbhaicena77@gmail.com",
                "image": "https://api.dicebear.com/6.x/initials/svg?seed=Uday Singh&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600"
            },
            "rating": 5,
            "review": "nice course",
            "course": {
                "_id": "6492accd77d6fe9f6fbb3cc5",
                "courseName": "Introduction to JavaScript Programming"
            },
            "__v": 0
        },
        {
            "_id": "657904568f28d97518c56786",
            "user": {
                "_id": "657902eda5062c4545ca6baa",
                "firstName": "k",
                "lastName": "a",
                "email": "hungkhang02@gmail.com",
                "image": "https://api.dicebear.com/6.x/initials/svg?seed=k a&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600"
            },
            "rating": 5,
            "review": "k",
            "course": {
                "_id": "6491cc1343b57f557be05857",
                "courseName": "Android App Developement"
            },
            "__v": 0
        },
        {
            "_id": "65b7d084149e08e7791611c7",
            "user": {
                "_id": "65b74d0ce0b25fef66d24f8e",
                "firstName": "PRIYANSHU",
                "lastName": "KUMAR",
                "email": "JIDIGAMER09@GMAIL.COM",
                "image": "https://res.cloudinary.com/dbr73rpz9/image/upload/v1706511743/images/kwmadu0xgf10ijpue1aw.png"
            },
            "rating": 5,
            "review": "thebestcourseeverihaveearned",
            "course": {
                "_id": "65b7ceadea909329ce1ce840",
                "courseName": "MERN stack"
            },
            "__v": 0
        },
    ]

    let BASE_FAST_DURATION = 45;
    let BASE_SLOW_DURATION = 85;
    const MIN_ITEMS = 10;
    const MAX_ITEMS = 20;

    const [reviews, setReviews] = useState([]);
    const [duration, setDuration] = useState(BASE_FAST_DURATION)
    const [mustFinish, setMustFinish] = useState(false) //for smoother transition from fast->slow 
    const [reRender, setReRender] = useState(false)


    useEffect(() => {
        async function getRatingAndReview() {
            const res = await fetchRatingAndReview();
            setReviews(res);

            testData && setReviews(testData)
        }
        getRatingAndReview();
    }, []);

    // Adjust duration based on Amount of Data
    const calculateDuration = (count) => {
        if (count <= MIN_ITEMS) {
            BASE_SLOW_DURATION -= 20;
            BASE_FAST_DURATION -= 20; // Subtract 20 for less than 10 items
            return BASE_FAST_DURATION;

        } else if (count <= MAX_ITEMS) {
            BASE_SLOW_DURATION -= 10;
            BASE_FAST_DURATION -= 10; // Subtract 10 for less than 20 items
            return BASE_FAST_DURATION;

        } else {
            return BASE_FAST_DURATION;
        }
    };

    useEffect(() => {
        const reviewCount = reviews.length;
        setDuration(calculateDuration(reviewCount));
    }, [reviews])

    // infinite moving animation
    let [ref, { width }] = useMeasure()
    const xTranslation = useMotionValue(0)

    useEffect(() => {
        let controls;
        let finalPosition = (-width / 2) - 36;

        if (mustFinish) {
            controls = animate(xTranslation, [xTranslation.get(), finalPosition], {
                ease: 'linear',
                duration: duration * (1 - (xTranslation.get() / finalPosition)),
                onComplete: () => {
                    setMustFinish(false)
                    setReRender(!reRender);
                }
            });

        } else {
            controls = animate(xTranslation, [0, finalPosition], {
                ease: 'linear',
                duration: duration,
                repeat: Infinity,
                repeatType: 'loop',
                repeatDelay: 0,
            });
        }

        return controls?.stop;

    }, [xTranslation, width, duration, reRender]);


    return (
        <div
            className=" max-w-7xl overflow-x-auto no-scrollbar scroll-smooth [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]"
        >
            {/* <marquee behavior="" direction="" > */}
            <motion.div
                ref={ref}
                className='flex min-w-full shrink-0 gap-9 py-4 w-max flex-nowrap hover:[animation-play-state:paused]'
                style={{ x: xTranslation }}
                onHoverStart={() => { setMustFinish(true), setDuration(BASE_SLOW_DURATION) }}
                onHoverEnd={() => { setMustFinish(true), setDuration(BASE_FAST_DURATION) }}
            >
                {[...reviews, ...reviews].map((item, idx) => (
                    <RatingCard item={item} key={idx} />
                ))}
            </motion.div>
            {/* </marquee> */}
        </div>
    );
};
export default RatingSlider