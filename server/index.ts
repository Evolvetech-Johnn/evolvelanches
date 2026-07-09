import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/the-rooster';

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Basic Route
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'The Rooster API is running' });
});

// Database Connection
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    // Start Server only after DB connection
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    // Start server anyway for health check, but log critical error
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} (DB Disconnected)`);
    });
  });

export default app;
