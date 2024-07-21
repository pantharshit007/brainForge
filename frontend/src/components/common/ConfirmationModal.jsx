import React from 'react'
import { AnimatePresence, motion } from "framer-motion"

import IconBtn from './IconBtn'

const dropIn = {
    hidden: {
        y: "-100vh",
        opacity: 0,
    },
    visible: {
        y: "0",
        opacity: 1,
        transition: {
            duration: 0.5,
            type: "spring",
            damping: 55,
            stiffness: 500,
        },
    },
    exit: {
        y: "+100vh",
        opacity: 0,
    },
};

function ConfirmationModal({ modalData }) {
    return (
        <AnimatePresence>
            <motion.div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-opacity-10 "
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0 }}
                variants={dropIn}

            >
                <div className="w-11/12 max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-6"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h1 className="text-2xl font-semibold text-richblack-5">
                        {modalData.text1}
                    </h1>

                    <p className="mt-3 mb-5 leading-6 text-richblack-200">
                        {modalData.text2}
                    </p>

                    <div className="flex items-center gap-x-4">
                        {/* MAIN FUNCTION BTN */}
                        <IconBtn
                            onClick={modalData?.btn1handler}
                            text={modalData?.btnText1}
                        />

                        {/* CANCEL BTN */}
                        <button
                            className="cursor-pointer rounded-md bg-richblack-200 py-[8px] px-[20px] font-semibold -richblack-900"
                            onClick={modalData?.btn2handler}
                        >
                            {modalData?.btnText2}
                        </button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default ConfirmationModal