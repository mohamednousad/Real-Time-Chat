import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const WaitingRoom = () => {
  const [searchParams] = useSearchParams();
  const meetingId = searchParams.get("id"); // Get meeting ID from URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state

  // Create token and navigate to Chat Room
  useEffect(() => {
    const createTokenAndNavigate = async () => {
      try {
        // Call backend to create a token
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/session/create?id=${meetingId}`
        );

        if (response.data.success) {
          // Save token in localStorage
          localStorage.setItem("token", response.data.token);

          // Navigate to Chat Room
          navigate(`/room?id=${meetingId}`);
        } else {
          setError("Failed to create session. Please try again.");
        }
      } catch (err) {
        console.error("Error creating session:", err);
        setError("Error connecting to the server.");
      } finally {
        setLoading(false);
      }
    };

    // Check if the user already has a token
    const token = localStorage.getItem("token");
    if (token) {
      // Verify the token
      axios
        .get(`${process.env.REACT_APP_API_URL}/session/verify`, {
          headers: { Authorization: token },
        })
        .then((response) => {
          if (response.data.success && response.data.meetingId === meetingId) {
            navigate(`/room?id=${meetingId}`); // Navigate to Chat Room
          } else {
            createTokenAndNavigate(); // Create a new token
          }
        })
        .catch(() => {
          createTokenAndNavigate(); // Create a new token if verification fails
        });
    } else {
      createTokenAndNavigate(); // Create a new token if no token exists
    }
  }, [meetingId, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {loading ? (
        <>
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-700">Creating your session...</p>
        </>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : null}
    </div>
  );
};

export default WaitingRoom;
