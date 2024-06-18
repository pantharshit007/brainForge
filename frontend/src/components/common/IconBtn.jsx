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
            className={`flex items-center gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-25 
                ${outline
                    ? "border border-indigo-600 bg-transparent"
                    : "bg-indigo-600"
                } ${customClasses ? customClasses : "cursor-pointer"}`}
        >
            {children ?
                <>
                    <span className={outline ? "text-indigo-600" : undefined} >
                        {text}
                    </span>
                    {children}
                </>
                : (text)
            }
        </button>
    )
}

export default IconBtn