import React from 'react'

function IconBtn({
    text,
    onClick,
    children,
    disabled = false,
    outline = false,
    customClasses = "",
    type = "button",
}) {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            type={type}
            className={`flex items-center cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 ${customClasses}
                ${outline
                    ? "border border-yellow-50 bg-transparent"
                    : "bg-yellow-50"
                }`}
        >
            {children ?
                <>
                    <span className={outline && "text-yellow-50"}>
                        {text}
                    </span>
                </>
                : (text)
            }
        </button>
    )
}

export default IconBtn