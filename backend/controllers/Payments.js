const { instance } = require('../config/razorpay');
const Course = require('../models/Course')
const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const { courseEnrollmentEmail } = require('../mail/courseEnrollment');
const { paymentSuccessEmail } = require('../mail/paymentSuccessful');
const CourseProgress = require('../models/CourseProgress');
const mongoose = require('mongoose');
const crypto = require('crypto');
const { formattedDateTime } = require('../utils/dateFormatter');
require('dotenv').config();

// Receive the Payment and initiate the razoryPay order
async function receivePayment(req, res) {
    try {
        // fetching courseId and userId
        const { courses } = req.body;
        const userId = req.user.id;

        //validation
        if (courses.length === 0) {
            return res.status(403).json({
                success: false,
                message: 'No Course Found.'
            })
        }

        // Fetching course details and calculating total amount
        let totalAmount = 0;
        const courseDetailsPromises = courses.map(async (courseId) => {
            const course = await Course.findById(courseId);
            if (!course) {
                throw new Error(`Course with ID ${courseId} not found`);
            }

            // convert string userId to user Object Id
            // const uid = new mongoose.Types.ObjectId(userId); // ObjectId is depricated
            const uid = mongoose.Types.ObjectId.createFromHexString(userId);

            //check if user already Enrolled
            if (course.studentEnrolled.includes(uid)) {
                return res.status(411).json({
                    success: false,
                    message: 'User already enrolled in the Course'
                })
            }

            totalAmount += course.price
            return course;
        });

        const courseDetails = await Promise.all(courseDetailsPromises)

        // order Creation
        const options = {
            amount: totalAmount * 100,   //499 -> 499.00
            currency: 'INR',
            receipt: (Date.now() + userId).toString(),  //unique Receipt Id
            notes: { userId: userId }
        }

        // Initiate the Payment on RazorPay
        try {
            const paymentResponse = await instance.orders.create(options);
            // console.log("> Payment Response: ", paymentResponse)

            // response
            return res.status(200).json({
                success: true,
                message: 'Order Created!',
                orderId: paymentResponse.id,
                amount: paymentResponse.amount,
                currency: paymentResponse.currency,
                transactionTime: paymentResponse.created_at,
            })

        } catch (err) {
            throw new Error("Could not initiate Payment: " + err.message);
        }

    } catch (err) {
        console.log("> Error: " + err.message)
        return res.status(500).json({
            success: false,
            message: "Error: " + err.message,
        })
    }
}

// Payment Verification using Signature (RazorPay - Server)
async function verifySignature(req, res) {
    try {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
        const { courses, amount } = req.body;
        const userId = req.user.id;

        // validation
        if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Payment details are incomplete."
            });
        }

        // Create body based on Razorpay docs
        let body = razorpay_order_id + "|" + razorpay_payment_id;

        // Authentication using HMAC (Hash-based message authentication code): Verify Signature
        const shaSum = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET);
        shaSum.update(body.toString());
        const digest = shaSum.digest("hex");

        // Compare the computed digest with the signature sent by Razorpay
        if (digest !== razorpay_signature) {
            return res.status(401).json({
                success: false,
                message: "Invalid signature"
            });
        }
        // console.log("Payment is Verified!")

        // Enrolling the student in respective courses
        return await enrollStudent(courses, userId, res, amount);

    } catch (err) {
        console.error("Error occurred while verifying signature:", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error: " + err.message
        });
    }
}

// student enroll function
async function enrollStudent(courses, userId, res, amount) {
    // validation
    if (!courses || !userId || !amount) {
        return res.status(400).json({
            success: false,
            message: 'Please provide valid courses and user ID',
        });
    }

    //enrolling student
    try {
        let courseDetails = []
        let studentDetail = await User.findById(userId);

        const courseEnrollmentPromises = courses.map(async (courseId) => {
            // Enroll the student in the specific course
            const enrolledCourse = await Course.findByIdAndUpdate(
                { _id: courseId },
                { $push: { studentEnrolled: userId } },
                { new: true }
            );

            if (!enrolledCourse) {
                return res.status(500).json({
                    success: false,
                    message: 'Course not found: ' + courseId,
                })
            }

            courseDetails.push({ courseName: enrolledCourse.courseName, coursePrice: enrolledCourse.price });

            // find the student and add the course to their enrolled courses
            await User.findByIdAndUpdate(
                { _id: userId },
                { $push: { courses: courseId } },
                { new: true }
            )

            // create new course progress
            const newCourseProgress = await CourseProgress.create({
                userId: userId,
                courseID: courseId
            })

            // Update course progress in User's Data
            await User.findByIdAndUpdate(
                { _id: userId },
                { $push: { courseProgress: newCourseProgress._id } },
                { new: true }
            );

            return { courseName: enrolledCourse.courseName, coursePrice: enrolledCourse.price };
        })

        await Promise.all(courseEnrollmentPromises)

        const time = Date.now();
        const date = formattedDateTime(time, true)

        //send email
        const title = "Successfull Enrollment in Purchased course";
        const studentName = studentDetail?.firstName + " " + studentDetail?.lastName;
        const body = courseEnrollmentEmail(courseDetails, studentName, amount / 100, date)

        await mailSender(studentDetail?.email, title, body);

        return res.status(200).json({
            success: true,
            messeage: 'Payment and Course Purchase Success.'
        })

    } catch (err) {
        console.error("> Failed to enroll student:", err);
        return res.status(500).json({
            success: false,
            message: "Failed to enroll student: " + err.message,
        })
    }
}

// send email when payment is successful
async function sendPaymentSuccessEmail(req, res) {
    const { amount, paymentId, orderId } = req.body
    const userId = req.user.id

    // validation
    if (!orderId || !paymentId || !amount) {
        return res.status(400).json({
            success: false,
            message: 'Please provide valid payment details',
        });
    }
    const currTime = Date.now()
    const transactionTime = formattedDateTime(currTime);

    try {
        const enrolledStudent = await User.findById(userId)

        const name = enrolledStudent.firstName + ' ' + enrolledStudent.lastName
        const email = enrolledStudent.email
        const title = 'Payment Received'
        const body = paymentSuccessEmail(name, amount / 100, orderId, paymentId, transactionTime)

        // sending mail
        await mailSender(email, title, body);

        return res.status(200).json({
            success: true,
            message: 'Payment success, Email sent!'
        })
    } catch (err) {
        console.log('> Failed sending payment Mail:', err.message)
        return res.status(500).json({
            success: false,
            message: 'Failed sending payment Mail: ' + err.message
        })
    }
}

module.exports = {
    receivePayment,
    verifySignature,
    sendPaymentSuccessEmail
}