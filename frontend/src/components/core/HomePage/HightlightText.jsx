import React from 'react'

function HightlightText({ text }) {
    return (
        <span className='font-bold text-transparent bg-clip-text bg-gradient-to-b from-indigo-600 to-fontPurple '>
            {text}
        </span>
    )
}

export default HightlightText