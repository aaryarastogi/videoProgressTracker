import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
  userId: String,
  videoId: String,
  watchedIntervals: [[Number]],
  lastWatched: Number,
}, { timestamps: true });

export default mongoose.model('Progress', progressSchema);
