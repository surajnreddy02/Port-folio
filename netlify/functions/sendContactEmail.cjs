const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  const { name, email, message } = JSON.parse(event.body);

  // Configure your SMTP transporter (use environment variables for secrets in production)
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `Portfolio Contact <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_RECEIVER_EMAIL, // Your email address
    subject: `New Contact Form Submission from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
        <h2 style="color: #0056b3;">New Contact Form Submission</h2>
        <p>You've received a new message from your portfolio website.</p>
        <hr style="border: 0; border-top: 1px solid #eee;">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <div>
          <p><strong>Message:</strong></p>
          <p style="padding: 10px; background-color: #f9f9f9; border-left: 4px solid #0056b3;">${message}</p>
        </div>
      </div>
    `,
    replyTo: email,
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Message sent successfully!' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send message', details: error.message }),
    };
  }
};
