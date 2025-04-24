**Features**
1. Tracks intervals of video that have been watched.
2. Merges overlapping intervals to calculate unique watch time.
3. Displays real-time progress visually.
4. Stores progress in local storage (or backend, depending on config).
5. Built with modern frontend technologies for performance and responsiveness.
6. Resume video from that point where the user leaves it earlier.

**How to Setup**
1. Create a folder into your system in which you want to clone the repository.
2. Clone the git repo into your system by using command : git clone https://github.com/aaryarastogi/videoProgressTracker.git
3. Go to server folder and run the command npm install.
4. Go to client folder and run the command npm install.
5. Go to mongo db atlas, create a database and also create a cluster init.
6. Copy the url to connect the db.
7. Paste this url in the .env file of the server folder as MONGO_URI.

**How to run the application**
1. Run the server by using command npm start.
2. Go to client folder and run it by using command: npm start.
3. Now, you are finally able to see the working website.

**How you tracked the watched intervals**
1. Using the <video> element's timeupdate event:
  Inside the useEffect that runs when watched changes, a track function is registered using: video.addEventListener('timeupdate', track);
   
2. Detecting sequential viewing: track checks if the time difference between the current second and the last recorded second is exactly 1, meaning the user is watching normally (not   skipping or scrubbing). If it is, it considers this a valid new interval of watched content:
     const newInterval = [lastTime, currentTime + 1];
   
3. Calling updateProgress to save this interval:
      updateProgress(newInterval) handles storing, merging, updating progress %, updating the graph data, and sending it to the backend.

**How you merged intervals to calculate unique progress:**
1. Combining current and new intervals:

   mergeIntervals([...watched, newInterval]) merges the old watched intervals with the new one.

  Merging overlapping or adjacent intervals:

2. The mergeIntervals function:
      1. Sorts all intervals by start time. Iterates through them and merges if:
      2. if (last[1] >= curr[0])    
      3. Extends the end time if they overlap: last[1] = Math.max(last[1], curr[1]);
3. Calculating unique watched seconds: After merging, the total unique watched time is calculated by:
      merged.reduce((acc, [start, end]) => acc + (end - start), 0)
4. Calculating progress %: Then compared against total video duration:
      const percentage = Math.floor((uniqueSeconds / videoRef.current.duration) * 100);

**Challenges**
1. In deployment , I don't know how to deploy fullstack MERN website so I learnt it by taking help from youtube videos and reading articles.
2. At first attempt, I got failed as videos are not rendering on browser.
3. So, I find out the issue and solve it .
4. In the second attempt, I finally able to deploy the fullstack website.

_**Live Link**_ : 

                           
