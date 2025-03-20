import React from "react";
import { useNavigate } from "react-router-dom";

const EndPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Meeting Ended</h1>

        {/* Message */}
        <p className="text-gray-600 mb-6">
          Your meeting has been successfully ended. You can start a new meeting
          or return to the homepage.
        </p>

        {/* Buttons */}
        <div className="flex justify-center space-x-4">
          {/* Return to Home Button */}
          <button
            onClick={() => navigate("/")}
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-all"
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default EndPage;
