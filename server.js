const express = require('express');
const multer = require('multer');
const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse form data
const upload = multer();

// Serve your HTML file and static assets
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Configure SendGrid and set your API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Handle form submissions
app.post('/send', upload.none(), (req, res) => {
  const { Name, email, Message } = req.body;

  const msg = {
    to: 'torbalansky@gmail.com', 
    from: 'patzostatev@gmail.com', 
    subject: 'New Contact Form Submission',
    text: `Name: ${Name}\nEmail: ${email}\nMessage: ${Message}`,
  };

  // Send the email using SendGrid
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
      res.status(200).json({ success: true, message: 'Email sent successfully' });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ success: false, message: 'Failed to send email' });
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
