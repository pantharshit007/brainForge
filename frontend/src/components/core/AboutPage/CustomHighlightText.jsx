import React from 'react'

function CustomHighlightText({ text, type, size = false }) {
    return (
        <span className={`bg-gradient-to-r text-transparent bg-clip-text font-bold
            ${type === 'orange' && 'from-[#FF512F] to-[#F09819]'}
            ${type === 'yellow' && 'from-[#E65C00] to-[#F9D423]'}
            ${type === 'blue' && 'from-[#00d4ff]  to-[#7e28de] '}
            ${size && 'text-4xl font-semibold lg:w-[70%]'}
        `}>
            {text}
        </span>
    )
}

export default CustomHighlightText