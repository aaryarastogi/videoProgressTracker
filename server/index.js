import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import progressRoutes from './routes/ProgressRoutes.js'
import videosRoutes from './routes/VideosRoutes.js'
import connectDB from './config/db.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/progress', progressRoutes);
app.use('/api/videos', videosRoutes)

connectDB();

const PORT=process.env.PORT || 8000;

app.listen(PORT,()=>console.log(`server is running on port ${PORT}`));