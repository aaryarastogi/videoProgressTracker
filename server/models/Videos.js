import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  videoId: {
    type: String,
    required: true,
    unique: true
  },
  videoSrc: {
    type: String,
    required: true
  }
});

export default mongoose.model('Video', videoSchema);
