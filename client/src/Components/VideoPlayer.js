import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import './VideoPlayer.css';

const VideoPlayer = ({ videoId, videoSrc }) => {
  const videoRef = useRef();
  const [watched, setWatched] = useState([]);
  const [progress, setProgress] = useState(0);
  const [graphData, setGraphData] = useState([]);

  const userId = localStorage.getItem('tempUserId') || (() => {
    const id = 'user-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
    localStorage.setItem('tempUserId', id);
    return id;
  })();

  useEffect(() => {
    axios.get(`https://video-progress-tracker-backend-2.onrender.com/api/progress?userId=${userId}&videoId=${videoId}`)
      .then(res => {
        if (res.data) {
          setWatched(res.data.watchedIntervals || []);
          if (videoRef.current) videoRef.current.currentTime = res.data.lastWatched || 0;
        }
      });
  }, [videoId]);

  useEffect(() => {
    const video = videoRef.current;
    let lastTime = null;

    const track = () => {
      const currentTime = Math.floor(video.currentTime);

      if (lastTime !== null) {
        const diff = currentTime - lastTime;

        if (diff === 1) {
          const newInterval = [lastTime, currentTime + 1];
          updateProgress(newInterval);
        }
      }

      lastTime = currentTime;
    };

    video.addEventListener('timeupdate', track);
    return () => video.removeEventListener('timeupdate', track);
  }, [watched]);

  const updateProgress = (newInterval) => {
    const merged = mergeIntervals([...watched, newInterval]);
    setWatched(merged);

    const uniqueSeconds = merged.reduce((acc, [start, end]) => acc + (end - start), 0);
    const percentage = Math.floor((uniqueSeconds / videoRef.current.duration) * 100);
    setProgress(percentage);

    const newGraphData = generateGraphData(merged, Math.floor(videoRef.current.duration));
    setGraphData(newGraphData);

    axios.post('https://video-progress-tracker-backend-2.onrender.com/api/progress', {
      userId,
      videoId,
      watchedIntervals: [newInterval],
      lastWatched: Math.floor(videoRef.current.currentTime)
    });
  };

  const mergeIntervals = (intervals) => {
    if (intervals.length === 0) return [];
    intervals.sort((a, b) => a[0] - b[0]);
    const merged = [intervals[0]];
    for (let i = 1; i < intervals.length; i++) {
      const last = merged[merged.length - 1];
      const curr = intervals[i];
      if (last[1] >= curr[0]) {
        last[1] = Math.max(last[1], curr[1]);
      } else {
        merged.push(curr);
      }
    }
    return merged;
  };

  const generateGraphData = (intervals, duration) => {
    const timeMap = Array.from({ length: duration }, (_, i) => ({
      time: i,
      watched: 0,
    }));

    intervals.forEach(([start, end]) => {
      for (let i = start; i < end; i++) {
        if (timeMap[i]) {
          timeMap[i].watched = 1;
        }
      }
    });

    return timeMap;
  };

  const pieChartData = [
    { name: 'Watched', value: progress },
    { name: 'Remaining', value: 100 - progress },
  ];
  

  return (
      <div className='video-container'>
        <video ref={videoRef} controls>
          <source src={videoSrc} />
        </video>

        <div>
          <h4>Video Progress {progress}%</h4>
          <PieChart width={300} height={300}>
            <Pie
              data={pieChartData}
              dataKey="value"
              innerRadius={80}
              outerRadius={100}
              fill="#82ca9d"
              label
            >
              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? '#C503C7' : '#1242EE'} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        <div>
          <h4>Watched Intervals:</h4>
          <ul>
            {watched.map((interval, index) => (
              <li key={index}>
                Start & End Time: {interval[0]}s - {interval[1]}s
              </li>
            ))}
          </ul>
        </div>
      </div>
  );
};

export default VideoPlayer;