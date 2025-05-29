import express from 'express';
import purchaseRoute from './purchase.js'; // Remove '/api/' if already in /src/api/

const app = express();

app.use(express.json());
app.use('/api/purchase', purchaseRoute);

// ...other routes and server setup...

export default app;