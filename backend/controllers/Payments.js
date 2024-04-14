const { instance } = require('../config/razorpay');
const Course = require('../models/Course')
const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const { courseEnrollmentTemplate } = require('../mail/courseEnrollment');
const mongoose = require('mongoose');
require('dotenv').config();

// Receive the Payment and initiate the razoryPay order
async function receivePayment(req, res) {
    try {
        // fetching courseId and userId
        const { courseId } = req.body;
        const userId = req.user.id;

        //validation
        if (!courseId) {
            return res.status(403).json({
                success: false,
                message: 'Invalid course ID'
            })
        }

        //fetching course details
        // TODO: update controller to encorporate multiple course payment
        let courseDetails;
        try {
            courseDetails = await Course.findById(courseId);

            if (!courseDetails) {
                throw new Error("Course details not found");
            }

            //check if user already Enrolled
            //convert string userId to user Object Id
            // const uid = new mongoose.Types.ObjectId(userId); // ObjectId is depricated
            const uid = mongoose.Types.ObjectId.createFromHexString(userId);

            if (Course.studentEnrolled.includes(uid)) {
                throw new Error("User already Enrolled in the Course");
            }

        } catch (err) {
            throw new Error("Failed to fetch course details: " + err.message)
        }

        // order Creation
        const amount = Course.price;
        const currency = 'INR';

        const options = {
            amount: amount * 100,   //499 -> 499.00
            currency,
            receipt: (Date.now() + userId).toString(),  //unique Receipt Id
            notes: {
                courseId: courseId,
                userId: userId,
            }
        }

        //initiate the Payment on RazorPay
        try {
            const paymentResponse = await instance.orders.create(options);
            console.log(paymentResponse)

        } catch (err) {
            throw new Error("Could not initiate Payment: " + err.message);
        }

        // response
        return res.status(200).json({
            success: true,
            message: 'Course Purchased! ✨',
            courseName: courseDetails.courseName,
            courseDescription: courseDetails.courseDescription,
            thumbnail: courseDetails.thumbnail,
            orderId: paymentResponse.id,
            amount: `${paymentResponse.currency} ${paymentResponse.amount}`,
            currency: paymentResponse.currency,

        })

    } catch (err) {
        console.log("> Error: " + err.message)
        return res.json({
            success: false,
            message: "Error: " + err.message,
        })
    }

}

// Payment Verification using Signature (razorPay - Server)
async function verifySignature(req, res) {
    try {
        const webhookSecret = process.env.WEBHOOK_SECRET || '123456';   //in case I forget

        // razorPay special custom header key 
        const hashedCode = req.headers["x-razorpay-signature"];

        if (!hashedCode) {
            return res.status(400).json({
                success: false,
                message: "Missing signature in request headers"
            });
        }

        // Authentication using HMAC (Hash-based message authentication code) 
        const shaSum = crypto.createHmac('sha256', webhookSecret);
        shaSum.update(JSON.stringify(req.body));
        const digest = shaSum.digest("hex");

        // Compare the computed digest with the signature sent by Razorpay
        if (digest !== hashedCode) {
            return res.status(401).json({
                success: false,
                message: "Invalid signature"
            });
        }

        console.log("Payment is authorized!")

        // RazorPay: req->body->payload->payment->entity->notes
        const { courseId, userId } = req.body.payload.payment.entity.notes;

        //enrolling student
        try {
            //enroll the student in the specific course
            const enrolledCourse = await Course.findByIdAndUpdate(
                { _id: courseId },
                { $push: { studentEnrolled: userId } },
                { new: true }
            );

            if (!enrolledCourse) {
                return res.status(500).json({
                    success: false,
                    message: 'Course not found',
                })
            }

            // find the student and add the course to their enrolled courses
            const enrolledStudent = await User.findByIdAndUpdate(
                { _id: userId },
                { $push: { courses: courseId } },
                { new: true }
            )

            //send email
            const tilte = "Enrolled in Course";
            const body = `Congratulations! ✨ You are now enrolled into the Course.
                          Start learning and growing your skills Today!`;

            const emailResponse = await mailSender(enrolledStudent.email, tilte, body);

            console.log("Course Purchase email: " + emailResponse)
            return res.status(200).json({
                succes: true,
                messeage: 'Signature Verified and Course Purchase Success.'
            })


        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "Failed to enroll student: " + err.message,
            })
        }

    } catch (err) {
        console.error("Error occurred while verifying signature:", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error: " + err.message
        });
    }
}

// TODO: enroll the student in the courses remove it from verifySignature and make a separate func

module.exports = {
    receivePayment,
    verifySignature
}