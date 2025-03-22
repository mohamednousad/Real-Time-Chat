import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const WaitingRoom = () => {
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("id");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      const createTokenAndNavigate = async () => {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/session/create?id=${roomId}`
          );

          if (response.data.success) {
            localStorage.setItem("token", response.data.token);
            navigate(`/room?id=${roomId}`);
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

      const token = localStorage.getItem("token");
      if (token) {
        axios
          .get(`${process.env.REACT_APP_API_URL}/session/verify`, {
            headers: { Authorization: token },
          })
          .then((response) => {
            if (response.data.success && response.data.roomId === roomId) {
              navigate(`/room?id=${roomId}`);
            } else {
              createTokenAndNavigate();
            }
          })
          .catch(() => {
            createTokenAndNavigate();
          });
      } else {
        createTokenAndNavigate();
      }
    }, 5000); // 5-second delay

    return () => clearTimeout(timer); // Cleanup timer
  }, [roomId, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {loading ? (
        <>
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-700">Creating your private room...</p>
        </>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : null}
    </div>
  );
};

export default WaitingRoom;