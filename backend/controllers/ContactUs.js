const mailSender = require("../utils/mailSender")
const { contactUsEmail } = require('../mail/contactForm')

exports.contactUser = async (req, res) => {
    try {
        const { email,
            firstname,
            lastname,
            message,
            phoneNo,
        } = req.body;

        if (!email || !message) {
            return res.status(404).json({
                success: false,
                message: 'Fill the required fields.'
            })
        }

        // Send Mail to student regarding Email confirmation
        const titleStudent = "Mail Received"
        const verificationMail = await mailSender(email, titleStudent, contactUsEmail(email, firstname, lastname, message, phoneNo))
        console.log("verificationMail: " + verificationMail)

        //send Mail to MOD 
        const titleMod = "Contact Us Mail Details"
        const modEmail = "modEmail@gmail.com"
        const body = `
            <h2>Student Contact Details</h2>
            <p>Name: ${firstname} ${lastname}</p>
            <p>Email: ${email}</p>
            <p>Phone Number: ${phoneNo}</p>
            <p>Message: ${message}</p>
            `
        const modMail = await mailSender(modEmail, titleMod, body);

        return res.status(200).json({
            success: true,
            message: 'Email sent successfully'
        })

    } catch (err) {
        console.log("Failed to send email: " + err.message)
        return res.status(500).json({
            success: false,
            message: "Failed to send email: " + err.message,
        })
    }
}
