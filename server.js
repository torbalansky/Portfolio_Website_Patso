const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
const smtpTransport = require('nodemailer-smtp-transport');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse form data
const upload = multer();

// Serve HTML file and static assets
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Create Nodemailer transporter
const transporter = nodemailer.createTransport(smtpTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
}));

app.post('/send', upload.none(), async (req, res) => {
  const { Name, email, Message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: 'torbalansky@gmail.com',
    subject: 'New Contact Form Submission',
    text: `Name: ${Name}\nEmail: ${email}\nMessage: ${Message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error sending email' });
    } else {
      console.log('Email sent:', info.response);
      res.status(200).json({ success: true, message: 'Email sent successfully' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
