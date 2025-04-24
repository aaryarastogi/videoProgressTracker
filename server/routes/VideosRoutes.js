import express from 'express';
import { getVideos, postVideos } from '../controllers/videos.js';

const router = express.Router();

router.get('/all', getVideos);

router.post('/add', postVideos);

export default router;
