import express from 'express';
import sendPurchaseVerificationEmail from './sendPurchaseEmail.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, productName, orderId } = req.body;

  try {
    await sendPurchaseVerificationEmail({ to: email, productName, orderId });
    res.status(200).json({ message: 'Verification email sent.' });
  } catch (err) {
    console.error(err); // For debugging
    res.status(500).json({ error: 'Failed to send email.' });
  }
});

export default router;