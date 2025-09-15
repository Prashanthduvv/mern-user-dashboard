import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import usersRouter from './routes/users.js';

dotenv.config();

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;
const ORIGIN = process.env.ORIGIN || 'https://mernuser1.netlify.app';

const app = express();

// Allow frontend + local dev
app.use(cors({
  origin: [ORIGIN, 'http://localhost:5173'],
  credentials: true
}));

app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/users', usersRouter);

// Connect to MongoDB and start server
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log(`✅ API running on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ Mongo connection failed', err);
    process.exit(1);
  });
