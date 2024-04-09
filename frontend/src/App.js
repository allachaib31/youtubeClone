import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Auth from "./screens/auth";
import Home from "./screens";
import { Channel, HomePage, DisplayChannel, AddChannel, VideoChannel, UploadVideo, WatchVideo, History } from "./components";

function App() {
  return (
    <Router>
      <Routes>

        <Route exact path="/" element={<Home />}>
          <Route exact path="/" element={<HomePage />}/>
          <Route path="/channel/" element={<Channel />}>
            <Route path="/channel/" element={<DisplayChannel />}>
              <Route path="/channel/" element={<VideoChannel />}/>
              <Route path="/channel/uploadVideo/" element={<UploadVideo />}/>
            </Route>
            <Route path="/channel/createChannel" element={<AddChannel />}/>
          </Route>
          <Route path="/video/" element={<WatchVideo />} />
          <Route path="/history/" element={<History />}/>
        </Route>
        <Route path="/auth" element={<Auth /> }/>
      </Routes>
    </Router>
  );
}


export default App;
