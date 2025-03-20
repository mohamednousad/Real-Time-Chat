import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import {jwtDecode} from "jwt-decode"; // For decoding JWT tokens
import { FaPaperPlane, FaSignOutAlt } from "react-icons/fa"; // Icons for UI

const socket = io("http://localhost:8000"); // Connect to your backend

const ChatComponent = () => {
  const [searchParams] = useSearchParams();
  const meetingId = searchParams.get("id"); // Get meeting ID from URL
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]); // Store chat messages
  const [newMessage, setNewMessage] = useState(""); // Current message input
  const [userId, setUserId] = useState(null); // Current user's ID from token
  const chatContainerRef = useRef(null); // For auto-scrolling chat

  // Decode token and set userId
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate(`/waiting?id=${meetingId}`); // Redirect to Waiting Room if no token
      return;
    }

    try {
      const decoded = jwtDecode(token); // Decode the token
      setUserId(decoded.userId); // Set userId from the token
    } catch (err) {
      console.error("Error decoding token:", err);
      navigate(`/waiting?id=${meetingId}`); // Redirect to Waiting Room if token is invalid
    }
  }, [meetingId, navigate]);

  // Join the room and listen for messages
  useEffect(() => {
    if (meetingId && userId) {
      socket.emit("joinRoom", meetingId); // Join the room using meetingId

      // Listen for incoming messages
      socket.on("message", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      // Scroll to the bottom of the chat when a new message arrives
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }
    }

    // Cleanup on unmount
    return () => {
      socket.off("message");
    };
  }, [meetingId, userId]);

  // Send a new message
  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        text: newMessage,
        sender: "You", // Sender is always "You"
        time: new Date().toLocaleTimeString(),
        userId, // Include userId
      };

      // Emit the message to the backend
      socket.emit("send_message", { roomId: meetingId, message });
      setNewMessage(""); // Clear input
    }
  };

  // Leave the chat room
  const leaveChat = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    navigate("/"); // Navigate to homepage
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Chat Header */}
      <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Chat Room: {meetingId}</h1>
        <button
          onClick={leaveChat}
          className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          <FaSignOutAlt className="mr-2" /> Leave Chat
        </button>
      </div>

      {/* Chat Messages */}
      <div
        ref={chatContainerRef}
        className="flex-1 p-4 overflow-y-auto bg-white"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.userId === userId ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                msg.userId === userId
                  ? "bg-blue-500 text-white" // Sender's message (right)
                  : "bg-gray-200 text-gray-800" // Receiver's message (left)
              }`}
            >
              <div className="text-sm font-semibold">
                {msg.userId === userId ? "You" : "Anonymous"}
              </div>
              <div className="text-sm">{msg.text}</div>
              <div className="text-xs text-gray-400 mt-1">{msg.time}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={sendMessage}
            className="ml-2 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
          >
            <FaPaperPlane className="text-xl" /> {/* Send icon */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
