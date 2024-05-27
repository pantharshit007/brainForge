import React from 'react'
import { motion } from 'framer-motion'

function Backdrop({ children, onClick }) {
    return (
        <motion.div className="bg-opacity-10 backdrop-blur-sm fixed h-screen w-screen overflow-auto z-[99] top-0 left-0"
            onClick={onClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {children}
        </motion.div>
    )
}

export default Backdrop