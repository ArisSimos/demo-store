import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import purchaseRoute from './purchase.js'; // Remove '/api/' if already in /src/api/
import newsletterRoute from './newsletter.js';
import contactRoute from './contact.js';
import subscriptionRoute from './routes/subscription.js';

dotenv.config();

const app = express(); // <-- Initialize app first

app.use(cors({
  origin: 'http://localhost:3001', // Change this to your frontend's URL/port
  credentials: true,
}));

app.use(express.json());
app.use('/purchase', purchaseRoute);
app.use('/newsletter', newsletterRoute); // <-- direct route, NOT /api/newsletter
app.use('/contact', contactRoute);
app.use('/subscription', subscriptionRoute);

app.get('/', (req, res) => {
  res.send('API is running!');
});

// Start the server
app.listen(3000, () => console.log('Backend Listening on http://localhost:3000'));

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "set" : "not set");

console.log("🔐 Email config Index:", process.env.EMAIL_USER && process.env.EMAIL_PASS ? "✅" : "❌");
export default app;