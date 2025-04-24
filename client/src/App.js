import './App.css';
import VideoPlayer from './Components/VideoPlayer';
import VideosList from './Components/VideosList';

function App() {
  const videoId = "video-001";
  return (
    <div className="App">
      <VideosList/>
    </div>
  );
}

export default App;
