import React from "react";
import { useNavigate } from "react-router-dom";
const Homepage = () => {
  const navigate = useNavigate();

  const generateMeetingId = () => {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789"; // Alphanumeric characters
    let meetingId = "";
  
    // Generate 3 segments separated by hyphens
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < (i === 1 ? 4 : 3); j++) { // Second segment has 4 characters
        meetingId += characters[Math.floor(Math.random() * characters.length)];
      }
      if (i < 2) meetingId += "-"; // Add hyphen between segments
    }
  
    return meetingId;
  };

  const handleStartMeeting = () => {
    // Generate a random token
    const token = generateMeetingId();
    // Navigate to CreateMeeting with the token in the URL
    navigate(`/waiting?id=${token}`);
  };

  return (
    <div className="bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold text-blue-600">VideoMeet</div>
            <div>
              <a
                href="s"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Sign In
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Seamless Video Conferencing
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Connect with your team, friends, and family in high-quality video
            calls.
          </p>
          <div className="space-x-4">
            <button
              onClick={handleStartMeeting}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Start a Meeting
            </button>
            <a
              href="s"
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300"
            >
              Join a Meeting
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                High-Quality Video
              </h3>
              <p className="text-gray-600">
                Crystal-clear video calls with no lag.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Screen Sharing
              </h3>
              <p className="text-gray-600">
                Share your screen with participants.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Secure & Private
              </h3>
              <p className="text-gray-600">
                End-to-end encryption for all calls.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white shadow-lg mt-20">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center">
          <p className="text-gray-600">
            &copy; 2023 VideoMeet. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
