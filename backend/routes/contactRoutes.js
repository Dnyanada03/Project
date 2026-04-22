const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/send', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ message: 'Please provide name, email, and message.' });
        }

        // Configure nodemailer transporter using environment variables
        const transporter = nodemailer.createTransport({
            service: 'gmail', // You can change this if you are not using Gmail
            auth: {
                user: process.env.Email_user,
                pass: process.env.Email_password
            }
        });

        const mailOptions = {
            from: process.env.Email_user,
            to: process.env.Admin_Email,
            replyTo: email,
            subject: `New Contact Us Message from ${name}`,
            text: `You have received a new message from your EcoVation Contact Form.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            html: `
                <h3>New Contact Us Message</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Message sent successfully to the admin!' });
    } catch (error) {
        console.error('Error sending contact email:', error);
        res.status(500).json({ message: 'Failed to send message. Please try again later.' });
    }
});

module.exports = router;
