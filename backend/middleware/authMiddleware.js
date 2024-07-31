const jwt = require('jsonwebtoken');
const userSchema = require('../models/User');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
const BLOCKED_EMAIL = process.env.BLOCKED_EMAIL ? process.env.BLOCKED_EMAIL.split(',') : [];

//Authentication Middleware
async function auth(req, res, next) {
    try {
        const authHeader = req.header("Authorization");
        if (authHeader === undefined) {
            return res.status(401).json({
                success: false,
                message: "Token is missing!"
            });
        }

        const token = req.cookies.token || authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing"
            });
        }

        //verifying token
        try {
            const decode = jwt.verify(token, JWT_SECRET);
            req.user = decode;

        } catch (err) {
            if (err.message === 'jwt expired') {
                return res.status(408).json({
                    success: false,
                    message: "Re-Login: " + err.message
                })
            }

            return res.status(408).json({
                success: false,
                message: "Token is invalid: " + err.message
            })
        }
        next();

    } catch (err) {
        console.log("> Error while authorizing: " + err.message);
        return res.status(401).json({
            success: false,
            message: "Error while authorizing: " + err.message
        })
    }
}

//isStudent
async function isStudent(req, res, next) {
    try {
        // we have 2 methods one is using the data from auth middleware via Token or using dB
        const userDetails = req.user;
        if (userDetails.accountType !== 'Student') {
            return res.status(401).json({
                succes: false,
                message: 'Protected route for student only.'
            })
        }
        next();

    } catch (err) {
        console.log("> User role cannot be verified: " + err.message);
        return res.status(401).json({
            success: false,
            message: "User role cannot be verified: " + err.message
        })
    }
}

//isInstructor
async function isInstructor(req, res, next) {
    try {
        // we have 2 methods one is using the data from auth middle ware via Token or using dB
        const userDetails = req.user;
        if (userDetails.accountType !== 'Instructor') {
            return res.status(401).json({
                succes: false,
                message: 'Protected route for Instructor only.'
            })
        }
        next();

    } catch (err) {
        console.log("> User role cannot be verified: " + err.message);
        return res.status(401).json({
            success: false,
            message: "User role cannot be verified: " + err.message
        })
    }
}

//isAdmin
async function isAdmin(req, res, next) {
    try {
        // we have 2 methods one is using the data from auth middle ware via Token or using dB
        const userDetails = req.user;
        if (userDetails.accountType !== 'Admin') {
            return res.status(401).json({
                succes: false,
                message: 'Protected route for admin only.'
            })
        }
        next();

    } catch (err) {
        console.log("> User role cannot be verified: " + err.message);
        return res.status(401).json({
            success: false,
            message: "User role cannot be verified: " + err.message
        })
    }
}

// check demo courses
async function isDemo(req, res, next) {
    try {
        if (BLOCKED_EMAIL.includes(req.user?.email || req.body.email)) {
            return res.status(401).json({
                success: false,
                message: "Not Authorized on Demo Account",
            });
        }
        next()

    } catch (err) {
        console.error("Error in isDemo middleware:", err.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

module.exports = {
    auth,
    isStudent,
    isInstructor,
    isAdmin,
    isDemo
}