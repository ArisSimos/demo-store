import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import purchaseRoute from './purchase.js'; // Remove '/api/' if already in /src/api/
import newsletterRoute from './newsletter.js';

dotenv.config();

const app = express(); // <-- Initialize app first

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use('/api/purchase', purchaseRoute);
app.use('/api/newsletter', newsletterRoute);

// ...other routes and server setup...

app.get('/', (req, res) => {
  res.send('API is running!');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));

export default app;