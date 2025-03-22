import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Home";
import ChatRoom from "./pages//ChatRoom";
// import CreateMeeting from "./pages/CreateMeeting";
import WaitingRoom from "./pages/WaitingRoom";
import EndPage from "./pages//EndPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        {/* <Route path="/create-meeting" element={<CreateMeeting />} /> */}
        <Route path="/room" element={<ChatRoom />} />
        <Route path="/waiting" element={<WaitingRoom />} />
        <Route path="/end" element={<EndPage />} />

      </Routes>
    </Router>
  );
}

export default App;
