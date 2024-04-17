const userSchema = require('../models/User');
const mailSender = require('../utils/mailSender');
const bcrypt = require('bcrypt')
const crypto = require('crypto');
require('dotenv').config();
const FE_URL = process.env.FE_URL


//Reset Password Token
async function resetPasswordToken(req, res) {
    try {
        const email = req.body.email;
        if (!email) {
            throw new Error('Email cannot be empty');
        }

        //user exists
        const user = await userSchema.findOne({ email: email });
        if (!user) {
            return res.status(403).json({
                success: false,
                message: 'Not a registered email address'
            })
        }

        //generate token 
        // const token = crypto.randomBytes(20).toString("hex");
        const token = crypto.randomUUID();

        //update the token in user dB with an expiry
        const updateUserDetails = await userSchema.findOneAndUpdate(
            { email: email }, {
            token: token,
            resetPasswordExpires: Date.now() + (5 * 60 * 1000)
        }, { new: true });
        console.log("crypto token: " + updateUserDetails.token);

        // custome URL for password reset page
        const URL = FE_URL + '/update-password/' + token;

        //send Password Reset Mail Message
        const title = "Password reset Link";
        const body = ` <h2>Password reset link: ${URL}</h2>`;
        await mailSender(email, title, body)

        return res.json({
            success: true,
            message: 'Email sent successfully, Check your Inbox!',
        });


    } catch (err) {
        console.log("> Something went wrong while sending password reset email: " + err.message)
        return res.status(500).json({
            success: false,
            message: "Something went wrong while sending password reset email: " + err.message,
        })

    }
}

//Reset Password: use the newly generated token to set new password.
async function resetPassword(req, res) {
    try {
        //fetching data: token can be send to body using searchParams on FE
        const { password, confirmPassword, token } = req.body;

        if (password !== confirmPassword) {
            return res.status(403).json({
                success: false,
                message: 'Password does not match. Try again!',
            })
        }

        // fetch user details from dB using crypto token
        const userDetails = await userSchema.findOne({ token: token });

        if (!userDetails) {
            res.status(404).json({
                success: false,
                message: 'Invalid token. Try again!',
            })
        }

        // check token expiry time if it still valids.: 4:00 < 5:00
        if (userDetails.resetPasswordExpires < Date.now()) {
            return res.status(403).json({
                success: false,
                message: 'Token expired. Try again!',
            })
        }

        const newHashedPassword = await bcrypt.hash(password, 10);

        await userSchema.findOneAndUpdate(
            { token: token },
            {
                password: newHashedPassword,
                $unset: { token: 1, resetPasswordExpires: 1 } // Unset token and expiry fields
            },
            { new: true }
        );

        //TODO: send a mail to user notifing about password updation

        return res.status(200).json({
            success: true,
            message: 'Your password has been updated.',
        })

    } catch (err) {
        console.log("> Something went wrong while reseting the password: " + err.message)
        return res.status(500).json({
            success: false,
            message: "Something went wrong while reseting the password: " + err.message,
        })

    }
}


module.exports = {
    resetPasswordToken,
    resetPassword,
}