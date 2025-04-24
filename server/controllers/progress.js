import Progress from "../models/Progress.js";

export const getProgress = async (req, res) => {
  const { userId, videoId } = req.query;
  const progress = await Progress.findOne({ userId, videoId });
  
  console.log(progress);
  res.json(progress || {});
}

export const updateProgress = async (req, res) => {
    const { userId, videoId, watchedIntervals, lastWatched } = req.body;
  
    let existing = await Progress.findOne({ userId, videoId });
  
    if (!existing) {
      existing = new Progress({ userId, videoId, watchedIntervals, lastWatched });
    } else {
      const allIntervals = [...existing.watchedIntervals, ...watchedIntervals];
      const merged = mergeIntervals(allIntervals);
      existing.watchedIntervals = merged;
      existing.lastWatched = lastWatched;
    }
  
    await existing.save();
    res.json({ success: true });
}

function mergeIntervals(intervals) {
    if (!intervals.length) return [];
  
    intervals.sort((a, b) => a[0] - b[0]);
    const merged = [intervals[0]];
  
    for (let i = 1; i < intervals.length; i++) {
      const last = merged[merged.length - 1];
      const current = intervals[i];
  
      if (last[1] >= current[0]) {
        last[1] = Math.max(last[1], current[1]);
      } else {
        merged.push(current);
      }
    }
  
    return merged;
  }