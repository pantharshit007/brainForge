import React, { useEffect, useState } from 'react'
import { motion, useMotionValue, animate, } from 'framer-motion'
import useMeasure from 'react-use-measure'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import RatingCard from './RatingCard';
import { fetchRatingAndReview } from '../../../services/backendCallFunction/courseAPI';

function RatingSlider() {

    let BASE_FAST_DURATION = 45;
    let BASE_SLOW_DURATION = 85;
    const MIN_ITEMS = 10;
    const MAX_ITEMS = 20;

    const [reviews, setReviews] = useState([]);
    const [duration, setDuration] = useState(BASE_FAST_DURATION)
    const [mustFinish, setMustFinish] = useState(false) //for smoother transition from fast->slow 
    const [reRender, setReRender] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        async function getRatingAndReview() {
            const res = await fetchRatingAndReview(dispatch, navigate);
            setReviews(res);
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