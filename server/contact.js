import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL || EMAIL_USER; // fallback

router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: SUPPORT_EMAIL,
      subject: `[Contact] ${subject}`,
      html: `<p><strong>From:</strong> ${name} (${email})</p>
             <p><strong>Message:</strong></p>
             <p>${message}</p>`,
    });

    res.status(200).json({ message: 'Message sent successfully.' });
  } catch (err) {
    console.error('❌ Error sending contact email:', err);
    res.status(500).json({ error: 'Failed to send message.' });
  }
});

export default router;
