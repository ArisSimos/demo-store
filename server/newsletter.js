import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

router.post('/', async (req, res) => {
  const { emails, subject, content } = req.body;

  console.log('📨 Νέο newsletter request:', emails, subject);

  if (!Array.isArray(emails) || emails.length === 0) {
    return res.status(400).json({ error: 'Παρακαλώ δώσε μία ή περισσότερες email διευθύνσεις.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    // Αποστολή σε κάθε email ξεχωριστά
    await Promise.all(
      emails.map(async (email) => {
        await transporter.sendMail({
          from: `"BookHaven Newsletter" <${EMAIL_USER}>`,
          to: email,
          subject,
          html: content,
        });
        console.log(`✅ Email στάλθηκε στο: ${email}`);
      })
    );

    res.status(200).json({ message: `Newsletter στάλθηκε σε ${emails.length} παραλήπτες.` });
  } catch (err) {
    console.error('❌ Σφάλμα αποστολής newsletter:', err);
    res.status(500).json({ error: 'Αποτυχία αποστολής newsletter.' });
  }
});

export default router;