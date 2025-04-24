import Video from "../models/Videos.js";

export const postVideos = async (req, res) => {
    try {
      const { videoId, videoSrc } = req.body;
  
      const newVideo = new Video({ videoId, videoSrc });
      await newVideo.save();
  
      res.status(201).json({ message: 'Video saved successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to save video' });
    }
}

export const getVideos = async (req, res) => {
    try {
      const videos = await Video.find(); 
      return res.status(200).json({
        success: true,
        videos
      });
    } catch (e) {
      console.log("Error in fetching all videos", e.message);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch all videos."
      });
    }
};  