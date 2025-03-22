import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaSignOutAlt } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import "animate.css";
import "./ChatRoom.css";

const ChatRoom = () => {
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("id");
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userId, setUserId] = useState(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      setUserId(decoded.userId);
    } else {
      navigate(`/waiting?id=${roomId}`);
    }
  }, [roomId, navigate]);

  useEffect(() => {
    const eventSource = new EventSource(
      `${process.env.REACT_APP_API_URL}/chat/events/${roomId}`
    );

    eventSource.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      setMessages((prev) => [...prev, newMessage]);
    };

    return () => eventSource.close();
  }, [roomId]);

  const sendMessage = useCallback(async () => {
    if (!newMessage.trim()) return;

    const tempMessage = {
      text: newMessage,
      senderId: userId,
      time: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, tempMessage]);
    setNewMessage("");

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/chat/send/${roomId}`, {
        senderId: userId,
        message: newMessage,
      });
    } catch (err) {
      console.error("Error sending message:", err);
      setMessages((prev) => prev.filter((msg) => msg !== tempMessage));
    }
  }, [newMessage, roomId, userId]);

  const leaveChat = async () => {
    try {
      localStorage.removeItem("token");
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/chat/clear/${roomId}`
      );

      navigate("/");
    } catch (err) {
      console.error("Error leaving the chat and clearing documents:", err);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="flex space-x-6">
          <p>Room ID: {roomId}</p>
          <p>User ID: {userId}</p>
        </div>
        <button
          onClick={leaveChat}
          className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          <FaSignOutAlt className="text-xl" />
        </button>
      </div>

      <div
        ref={chatContainerRef}
        className="flex-1 p-4 overflow-y-auto bg-white messages-container"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex mb-3 ${
              msg.senderId === userId ? "justify-end" : "justify-start"
            } animate_animated animate_fadeIn`}
          >
            <div>
              <div className="text-sm">{msg.message}</div>
              <div className="text-xs text-gray-800 mt-1">{msg.time}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="input-section">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
          />
          <button
            onClick={sendMessage}
            className="p-3 bg-gray-800 text-white rounded-full hover:bg-gray-900"
          >
            <FiSend className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
