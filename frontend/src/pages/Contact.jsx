import React from 'react'
import ContactForm from '../components/ContactPage/ContactForm'
import ContactDetail from '../components/ContactPage/ContactDetail'
import Footer from '../components/common/Footer'

function Contact() {
    return (
        <div >
            {/* CONTACT SECTION */}
            <div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row">
                {/* CONTACT DETAIL */}
                <div className="lg:w-[40%]">
                    <ContactDetail />
                </div>

                {/* CONTACT FORM */}
                <div className="lg:w-[60%]">
                    <ContactForm />
                </div>

            </div>

            {/* REVIEW SECTION */}
            <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8  text-white">
                <h1 className="text-center text-4xl font-semibold mt-8">
                    Reviews from other learners
                </h1>
            </div>

            {/* FOOTER */}
            <Footer />
        </div>
    )
}

export default Contact