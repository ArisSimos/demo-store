import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;


router.post('/', async (req, res) => {
  const { email, productName, orderId } = req.body;

  if (!email || !productName || !orderId) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  // Generate a unique order number if not provided
  const orderNumber = orderId && orderId.trim() !== '' ? orderId : `ORD-${Date.now()}`;

  // Format product list as HTML
  const productList = productName
    .split(',')
    .map(name => `<li>${name.trim()}</li>`)
    .join('');

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    await transporter.verify();

    await transporter.sendMail({
      from: `"BookHaven" <${EMAIL_USER}>`,
      to: email,
      subject: 'Your BookHaven Receipt',
      html: `
        <p>Thank you for your purchase!</p>
        <p><strong>Order Number:</strong> ${orderNumber}</p>
        <p><strong>Order Date:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Products:</strong></p>
        <ul>${productList}</ul>
        <p>If you have any questions, reply to this email.</p>
        <p>Happy reading!<br/>BookHaven Team</p>
      `,
    });

    res.status(200).json({ message: 'Receipt sent successfully.' });
  } catch (err) {
    console.error('❌ Error sending purchase email:', err);
    res.status(500).json({ error: 'Failed to send receipt.' });
  }
});

console.log("🔐 Email config purchase:", EMAIL_USER, EMAIL_PASS ? "✅" : "❌");

export default router;
