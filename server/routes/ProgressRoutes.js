import express from 'express';
import Progress from '../models/Progress.js';
import { getProgress, updateProgress } from '../controllers/progress.js';

const router = express.Router();

router.get('/', getProgress);

router.post('/', updateProgress);

export default router;
