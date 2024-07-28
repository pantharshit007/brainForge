const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const otpTemplate = require("../mail/emailVerificationTemp");

const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 5 * 60,    // Automatically delete documents after 5 minutes
    },
});

//Pre Function: Send OTPs
async function sendVerificationEmail(email, otp) {
    try {
        const title = "Verification Email from BrainForge";
        const mailResponse = await mailSender(email, title, otpTemplate(otp))
        // console.log("OTP sent ✅: " + mailResponse.response)

    } catch (error) {
        console.log('> Error while sending v.Mail: ' + error.message);
        throw error;
    }
}

//pre function: send email before saving the document
OTPSchema.pre('save', async function (next) {
    // console.log("New OTP document saved to database");

    if (this.isNew) {
        await sendVerificationEmail(this.email, this.otp);
    }
    next();
})


module.exports = mongoose.model('OTP', OTPSchema);
