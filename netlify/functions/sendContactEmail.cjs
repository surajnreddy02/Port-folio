const nodemailer = require('nodemailer');

// Input validation and sanitization
// Only allow safe characters for name/email, strip dangerous chars for message
const sanitizeInput = (input, type = 'text') => {
  if (typeof input !== 'string') return '';
  if (type === 'name') {
    return input.replace(/[^a-zA-Z0-9 .'-]/g, '').trim().substring(0, 100);
  }
  if (type === 'email') {
    return input.replace(/[^a-zA-Z0-9@._+-]/g, '').trim().substring(0, 100);
  }
  // Default: strip angle brackets, limit length
  return input.replace(/[<>]/g, '').trim().substring(0, 1000);
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Rate limiting store (in production, use Redis or similar)
// NOTE: In-memory rate limiting is NOT suitable for serverless/production. Use Redis or similar in production.
const rateLimitStore = new Map();

const isRateLimited = (ip) => {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 5;
  
  const requests = rateLimitStore.get(ip) || [];
  const validRequests = requests.filter(time => now - time < windowMs);
  
  if (validRequests.length >= maxRequests) {
    return true;
  }
  
  validRequests.push(now);
  rateLimitStore.set(ip, validRequests);
  return false;
};

exports.handler = async function(event, context) {
  // Security headers
  const headers = {
    'Content-Type': 'application/json',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
  };

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  // Rate limiting
  const clientIP = event.headers['client-ip'] || event.headers['x-forwarded-for'] || 'unknown';
  if (isRateLimited(clientIP)) {
    return {
      statusCode: 429,
      headers,
      body: JSON.stringify({ error: 'Too many requests. Please try again later.' }),
    };
  }

  let parsedBody;
  try {
    parsedBody = JSON.parse(event.body);
  } catch (error) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Invalid JSON' }),
    };
  }

  const { name, email, message } = parsedBody;

  // Input validation
  if (!name || !email || !message) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'All fields are required' }),
    };
  }

  if (!validateEmail(email)) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Invalid email address' }),
    };
  }

  // Sanitize inputs
  const sanitizedName = sanitizeInput(name, 'name');
  const sanitizedEmail = sanitizeInput(email, 'email');
  const sanitizedMessage = sanitizeInput(message);

  if (!sanitizedName || !sanitizedEmail || !sanitizedMessage) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Invalid input data' }),
    };
  }

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
    subject: `New Contact Form Submission from ${sanitizedName}`,
    html: `
      <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
        <h2 style="color: #0056b3;">New Contact Form Submission</h2>
        <p>You've received a new message from your portfolio website.</p>
        <hr style="border: 0; border-top: 1px solid #eee;">
        <p><strong>Name:</strong> ${sanitizedName}</p>
        <p><strong>Email:</strong> <a href="mailto:${sanitizedEmail}">${sanitizedEmail}</a></p>
        <div>
          <p><strong>Message:</strong></p>
          <p style="padding: 10px; background-color: #f9f9f9; border-left: 4px solid #0056b3;">${sanitizedMessage}</p>
        </div>
      </div>
    `,
    replyTo: sanitizedEmail,
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Message sent successfully!' }),
    };
  } catch (error) {
    console.error('Email sending failed:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to send message. Please try again later.' }),
    };
  }
};
