const nodemailer = require('nodemailer');
require('dotenv').config();

async function mailSender(email, title, body) {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        })

        let info = await transporter.sendMail({
            from: 'StudyNotion@Verifcation',
            to: email,
            subject: title,
            html: body,
        })
        console.log(info)
        return info

    } catch (error) {
        //TODO: show error screen
        console.log('> Error while sending Mail: ' + error.message);
    }
}


module.exports = mailSender;