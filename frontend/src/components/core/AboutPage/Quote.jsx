import React from 'react'
import HightlightText from '../HomePage/HightlightText'
import CustomHighlightText from './CustomHighlightText'

function Quote() {
    return (
        <div className=" text-xl md:text-4xl font-semibold mx-auto py-5 pb-20 text-center text-white">
            We are passionate about revolutionizing the way we learn. Our innovative platform
            <HightlightText text={" combines technology"} />,
            <CustomHighlightText text={" expertise"} type={"orange"} />
            , and community to create an
            <CustomHighlightText text={" unparalleled educational experience."} type={"yellow"} />

        </div>
    )
}

export default Quote