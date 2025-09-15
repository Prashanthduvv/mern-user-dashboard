import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import usersRouter from './routes/users.js';
dotenv.config();

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://prashanthduvvala:prashanthduvvala@cluster0.hreuipq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const ORIGIN = process.env.ORIGIN || 'https://mernuser1.netlify.app';

const app = express();
app.use(cors({ origin: ORIGIN }));
app.use(express.json());
app.use(morgan('dev'));

app.use('/users', usersRouter);

mongoose.connect(MONGO_URI).then(() => {
  app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
}).catch(err => {
  console.error('Mongo connection failed', err);
  process.exit(1);
});
