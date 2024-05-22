import React from 'react'
import ContactUsForm from './ContactUsForm'

function ContactForm() {
    return (
        <>
            <div className="border border-richblack-600 text-richblack-300 rounded-xl p-7 lg:p-14 flex gap-3 flex-col">
                <h1 className="text-4xl leading-10 font-semibold text-richblack-5">
                    Got a Idea? We've got the skills. Let's team up
                </h1>
                <p>
                    Tell us more about yourself and what you're got in mind.
                </p>

                {/* INNER-FORM SECTION */}
                <div className="mt-7">
                    <ContactUsForm />
                </div>
            </div>

        </>
    )
}

export default ContactForm