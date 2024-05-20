import React from 'react'
import HightlightText from '../HomePage/HightlightText'

function Quote() {
    return (
        <div>
            We are passionate about revolutionizing the way we learn. Our innovative platform
            <HightlightText text={" combines technology"} />,
            <span className="text-orange-400">{" "}expertise</span>
            , and community to create an
            <span className="text-orange-400">{" "}unparalleled educational experience.</span>
        </div>
    )
}

export default Quote