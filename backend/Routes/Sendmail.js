import express from 'express';
import dotenv from "dotenv";
import nodemailer from 'nodemailer';
import Email from '../models/Email.js';

dotenv.config({
  path: 'D:\\EasyMail\\EasyMail\\backend\\.env'
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.APP_PASSWORD,
  },
});

const sendMail = async ({ to, subject, text, html }) => {
  let mailOptions = {
    from: {
      name: 'Easy Mail',
      address: process.env.EMAIL_USER
    },
    to: to,
    subject: subject,
    text: text,
    html: html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
    //saving mail to db
    const email = new Email({
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
      text: mailOptions.text,
      html: mailOptions.html,
      status: 'sent',
    });
    await email.save();
    
  } catch (error) {
    console.error('Error sending email:', error.message);
    throw error;
  }
};

const router = express.Router();

router.post('/sendmail', async (req, res) => {
  try {
    await sendMail(req.body);
    res.status(200).send('Email sent successfully!');
  } catch (error) {
    res.status(500).send('Failed to send email: ' + error.message);
  }
});

export default router;
