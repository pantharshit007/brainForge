import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import CTAButton from './Button'
import { TypeAnimation } from 'react-type-animation'

function CodeBlocks({
    position, heading, subheading, ctaBtn1, ctaBtn2, codeBlock, backgroundGradient, codeColor
}) {
    return (
        <div className={`flex ${position} justify-between flex-col my-20 lg:gap-10 gap-10 `}>
            {/* Box 1 */}
            <div className='lg:w-[50%] flex flex-col gap-8'>
                {heading}
                <div className=' text-base font-bold text-richblack-300 w-[85%] -mt-3'>
                    {subheading}
                </div>

                <div className='flex gap-7 mt-7' >
                    <CTAButton active={ctaBtn1.active} linkTo={ctaBtn1.linkTo}>
                        <div className='flex gap-2 items-center'>
                            {ctaBtn1.btnText}
                            <FaArrowRight />
                        </div>
                    </CTAButton>

                    <CTAButton active={ctaBtn2.active} linkTo={ctaBtn2.linkTo}>
                        {ctaBtn2.btnText}
                    </CTAButton>
                </div>
            </div>

            {/* Box 2 */}
            <div className='h-fit flex flex-row text-[10px] sm:text-sm w-[100%] py-3 lg:w-[470px] leading-[18px] sm:leading-6 relative code-border '>
                {backgroundGradient}

                {/* Indexing */}
                <div className='text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold select-none'>
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                </div>

                {/* Code Space */}
                <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono pr-1 ${codeColor} select-none`}>
                    <TypeAnimation
                        sequence={[codeBlock, 1000, ""]}
                        repeat={Infinity}
                        cursor={true}
                        omitDeletionAnimation={true}
                        style={{ whiteSpace: "pre-line", display: 'block' }}
                    />
                </div>

            </div>
        </div>
    )
}

export default CodeBlocks