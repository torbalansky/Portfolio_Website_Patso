const express = require('express');
const multer = require('multer');
const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse form data
const upload = multer();

// Serve HTML file and static assets
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Configure SendGrid and set API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Handle form submissions
app.post('/send', upload.none(), async (req, res) => {
  const { Name, email, Message } = req.body;

  const msg = {
    to: 'torbalansky@gmail.com', 
    from: 'patzostatev@gmail.com', 
    subject: 'New Contact Form Submission',
    text: `Name: ${Name}\nEmail: ${email}\nMessage: ${Message}`,
  };

  // Send the email using SendGrid
  try {
    await sgMail.send(msg);
    console.log('Email sent');
    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
