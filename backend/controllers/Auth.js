const userSchema = require('../models/User');
const OTP = require('../models/OTP');
const Profile = require('../models/Profile');
const otpGenerator = require('otp-generator');
const zod = require('zod');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mailSender = require('../utils/mailSender');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

//send OTP
async function sendOtpMessage(req, res) {
    try {
        const { email } = req.body;

        //check if user already exists 
        const isUserExists = await userSchema.findOne({ email });

        if (isUserExists) {
            return res.status(401).json({
                success: false,
                message: 'User already exists',
            })
        }

        //generate OTP: ⚠️ Not a good code since we are making calls on dB in loops
        let otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        })

        // check OTP is unique or not
        const isUnique = await OTP.findOne({ otp });
        while (isUnique) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            });
            isUnique = await OTP.findOne({ otp });
        }
        console.log('Genrated Otp: ' + otp);

        //create an entry in otp dB
        const otpPayload = { email, otp }
        const otpBody = await OTP.create(otpPayload);

        return res.status(200).json({
            success: true,
            message: 'OTP sent successfully',
            otp
        })

    } catch (err) {
        console.log('> Error sending OTP: ' + err.message)
        return res.status(500).json({
            success: false,
            message: 'Error sending OTP: ' + err.message,
        })
    }
}

//SignUp
async function signup(req, res) {
    //zod validation
    const signupBody = zod.object({
        firstName: zod.string(),
        lastName: zod.string(),
        email: zod.string().email(),
        password: zod.string(),
        confirmPassword: zod.string(),
        // contactNumber: zod.number(),
    })

    try {
        const { success } = signupBody.safeParse(req.body);
        if (!success) {
            return res.status(411).json({
                success: false,
                msg: 'Incorrect Inputs'
            })
        }

        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp,
        } = req.body;

        if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
            return res.status(403).json({
                success: false,
                message: "All Fields are Required",
            })
        }

        //confirm password === confirmPassword
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Password and Confirm Password must be the same',
            });
        }

        //checking if user already exists
        const existingUser = await userSchema.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists',
            });
        }

        //fetching the most recent otp from dB
        const storedOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        console.log('Stored otp: ' + storedOtp);

        //validate OTP
        if (storedOtp.length == 0) {
            return res.status(400).json({
                success: false,
                message: 'OTP NOT FOUND'
            })
        } else if (storedOtp.otp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP, otp doesn't Match"
            });
        }

        //Hashing the password in dB
        const hashedPassword = await bcrypt.hash(password, 10);

        //profile creation: when we update profile later we will just update it.
        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        })

        //new User entry create in dB
        const user = await userSchema.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            accountType,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}%20${lastName}`
        })

        return res.status(200).json({
            success: true,
            message: 'User Registered successfully'
        })

    } catch (err) {
        console.log("> Error: User registration failed: " + err.message)
        return res.status(500).json({
            success: false,
            message: "User registration failed: " + err.message,
        });

    }
}

//login
async function login(req, res) {
    // validating inputs
    const loginBody = zod.object({
        email: zod.string().email(),
        password: zod.string()
    })

    try {
        const { success } = loginBody.safeParse(req.body)
        if (!success) {
            return res.status(411).json({
                success: false,
                message: "Incorrect inputs"
            })
        }

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(403).json({
                success: false,
                message: "Invalid email or password"
            })
        }

        //user exists
        const user = await userSchema.findOne({ email }).populate("additonalDetails");
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is not Registered, try Signing Up"
            })
        }

        //password compare
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Password is incorrect, try again!"
            });
        }

        //generate jwt token
        const payload = {
            email: user.email,
            id: user._id,
            accountType: user.accountType,
        }
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' });
        // Save token to user document in database
        user.token = token;
        user.password = undefined;

        //Generating cookies for token 
        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        }
        res.cookie("token", token, options).status(200).json({
            success: true,
            token: token,
            user: user,
            message: "Logged in successfully"
        });

    } catch (err) {
        console.log("> Error While Registering User: " + err.message)
        return res.status(500).json({
            success: false,
            msg: "Login Failed, please try again" + err.message,

        })
    }
}

//change password
async function changePassword(req, res) {
    //validate inputs
    const changePassBody = zod.object({
        oldPassword: zod.string(),
        newPassword: zod.string(),
        confirmNewPassword: zod.string()
    })

    try {
        const { success } = signupBody.safeParse(req.body);
        if (!success) {
            return res.status(411).json({
                success: false,
                msg: 'Incorrect Inputs'
            })
        }

        // get old and new password with confirm New password from body
        const { oldPassword, newPassword, confirmNewPassword } = req.body;

        if (!oldPassword || !newPassword || !confirmNewPassword) {
            return res.status(403).json({
                success: false,
                message: "All fields are required",
            })
        }

        const userId = req.user.id;
        const user = await userSchema.findById(userId)

        //password compare: validation
        const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "Password is incorrect, try again!"
            });
        }

        //update the new Password in dB
        const encryptedPassword = await bcrypt.hash(newPassword, 10);
        const updatedUserDetails = await userSchema.findByIdAndUpdate(
            userId,
            { password: encryptedPassword },
            { new: true }
        );

        //send Password Updation Mail
        try {
            const title = "You password has been updated.";
            const body = `
                <h1>Hello! ${updatedUserDetails.firstName}!</h1> 
                <h3>You account password has been updated.</h3>
            `
            const emailResponse = await mailSender(updatedUserDetails.email, title, body)
            console.log("Email Response: " + emailResponse.response);

        } catch (err) {
            console.log("> Error occurred while sending email: " + err.message);
            return res.status(500).json({
                success: false,
                message: "Error occurred while sending email",
                error: err.message,
            })
        }

        return res.status(200).json({
            success: true,
            message: "Password updated successfully",
        })

    } catch (err) {
        console.log("> Error while updating password: " + err.message);
        return res.status(500).json({
            success: false,
            message: "Error while updating password",
            error: err.message,
        })
    }
}

module.exports = {
    sendOtpMessage,
    signup,
    login,
    changePassword
}
