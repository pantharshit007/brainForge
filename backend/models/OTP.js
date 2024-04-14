const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createAt: {
        type: String,
        default: Date.now(),
        expires: 5 * 60,    // Automatically delete documents after 5 minutes
    },
});

//Pre Function: Send OTPs
async function sendVerificationEmail(email, otp) {
    try {
        const title = "Verification Email from StudyNotion";
        const mailResponse = await mailSender(email, title, otp)
        console.log("OTP sent ✅: " + mailResponse)

    } catch (error) {
        //TODO: show error screen
        console.log('> Error while sending v.Mail: ' + error.message);
        throw error;
    }
}

//pre function: send before DB call
OTPSchema.pre('save', async function (next) {
    await sendVerificationEmail(this.email, this.otp);
    next();
})


module.exports = mongoose.model('OTP', OTPSchema);
