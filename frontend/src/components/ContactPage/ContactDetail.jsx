import React from 'react'
import * as Icon1 from "react-icons/bi"
import * as Icon3 from "react-icons/hi2"
import * as Icon2 from "react-icons/io5"

const contactDetails = [
    {
        icon: "HiChatBubbleLeftRight",
        heading: "Chat on us",
        description: "Our friendly team is here to help.",
        details: "info@brainForge.com",
    },
    {
        icon: "BiWorld",
        heading: "Visit us",
        description: "Come and say hello at our office HQ.",
        details: "Prime Minister's Office, South Block, New Delhi- 110011",
    },
    {
        icon: "IoCall",
        heading: "Call us",
        description: "Mon - Fri From 8am to 5pm",
        details: "011-23386447",
    },
]

function ContactDetail() {
    return (
        <div className="flex flex-col gap-6 rounded-xl bg-richblack-800 p-4  lg:p-6 ">
            {
                contactDetails.map((item, index) => {
                    let Icon = Icon1[item.icon] || Icon2[item.icon] || Icon3[item.icon]
                    return (
                        <div key={index}
                            className="flex flex-col gap-[2px] p-3 text-sm text-richblack-200"
                        >
                            {/* LOGO PART */}
                            <div className="flex flex-row items-center gap-3">
                                <Icon size={25} />
                                <h1 className="text-lg font-semibold text-richblack-5">
                                    {item.heading}
                                </h1>
                            </div>

                            {/* INFO PART */}
                            <div>
                                <p className="font-medium">{item.description}</p>
                                <p className="font-semibold">{item.details}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ContactDetail