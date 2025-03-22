import React from "react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  const generateMeetingId = () => {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789"; // Alphanumeric characters
    let meetingId = "";

    // Generate 3 segments separated by hyphens
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < (i === 1 ? 4 : 3); j++) {
        // Second segment has 4 characters
        meetingId += characters[Math.floor(Math.random() * characters.length)];
      }
      if (i < 2) meetingId += "-"; // Add hyphen between segments
    }

    return meetingId;
  };

  const handleStartChat = () => {
    const token = generateMeetingId();
    navigate(`/waiting?id=${token}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold text-gray-800">Secured Chat</div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Lets talk privately
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            No accounts, no emails, no phone numbers. Just secure, private, and
            anonymous chatting.
          </p>
          <p className="text-xl text-gray-600 mb-8">
           Developed by NM. Nosuad
          </p>
          <div className="space-x-4">
            <button
              onClick={handleStartChat}
              className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900"
            >
              Start a Chat
            </button>
            <button
              onClick={handleStartChat}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300"
            >
              Join a Chat
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Choose Secured Chat?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                No Accounts Needed
              </h3>
              <p className="text-gray-600">
                Start chatting instantly without signing up or logging in.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                100% Secure
              </h3>
              <p className="text-gray-600">
                End-to-end encryption ensures your chats are private.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Completely Anonymous
              </h3>
              <p className="text-gray-600">
                No personal information required. Stay anonymous.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white shadow-lg mt-20">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center">
          <p className="text-gray-600">
            &copy; 2023 Secured Chat. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
