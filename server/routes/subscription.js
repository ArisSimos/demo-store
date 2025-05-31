import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

router.post('/', async (req, res) => {
  const { userId, tier, email } = req.body;

  if (!userId || !tier || !email) {
    return res.status(400).json({ error: 'Missing required fields.' });
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
      from: `"BookHaven Membership" <${EMAIL_USER}>`,
      to: email,
      subject: 'Welcome to BookHaven Membership!',
      html: `<p>Welcome to the <strong>${tier}</strong> plan!</p>
             <p>Thank you for joining BookHaven Membership. Enjoy your exclusive benefits!</p>`,
    });

    res.status(200).json({ message: 'Welcome email sent successfully.' });
  } catch (err) {
    console.error('❌ Error sending subscription email:', err);
    res.status(500).json({ error: 'Failed to send welcome email.' });
  }
});

export default router;