import express from 'express';
import axios from 'axios';

const router = express.Router();

router.post('/', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required.' });

  try {
    // Call your Supabase Edge Function to send the email
    const response = await axios.post(
      'https://supabase.com/dashboard/project/qjsgfrifkbeeqnzuhjse/functions/send-newsletter-email', // <-- Replace with your deployed function URL
      { email }
    );
    if (response.status === 200) {
      res.status(200).json({ message: 'Subscription email sent.' });
    } else {
      res.status(500).json({ error: 'Failed to send subscription email.' });
    }
  } catch (err) {
    console.error('Supabase function error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to send subscription email.' });
  }
});

export default router;