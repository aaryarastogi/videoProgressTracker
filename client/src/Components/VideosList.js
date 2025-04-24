import React, { useEffect, useState } from "react";
import VideoPlayer from "./VideoPlayer";
import './VideoPlayer.css';
import axios from "axios";

const VideosList = () => {
    const [videos,setVideos] = useState([]);
    
    useEffect(()=>{
        const getAllVideos = async() => {
            try{
                const res =await axios.get('https://video-progress-tracker-backend-2.onrender.com/api/videos/all')
                console.log("res", res.data.videos);
                setVideos(res.data.videos);
            }
            catch(e){
                console.log(e.message);
            }
        };
    getAllVideos()}
    , []);

    return(
    <div className="video-list">
        <h1>User Progress Tracker System</h1>
        {videos.map((video) => (
            <VideoPlayer key={video.videoId} videoId={video.videoId} videoSrc={video.videoSrc} />
        ))}
    </div>
    )
}

export default VideosList;