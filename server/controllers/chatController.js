const Message = require("../models/Message");
const clients = new Map();

const broadcastMessage = (roomId, message) => {
  if (clients.has(roomId)) {
    clients.get(roomId).forEach((client) => {
      client.write(`data: ${JSON.stringify(message)}\n\n`);
    });
  }
};

exports.setupSSE = (req, res) => {
  const roomId = req.params.roomId;

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  if (!clients.has(roomId)) {
    clients.set(roomId, new Set());
  }
  clients.get(roomId).add(res);

  req.on("close", () => {
    if (clients.has(roomId)) {
      clients.get(roomId).delete(res);
      if (clients.get(roomId).size === 0) {
        clients.delete(roomId);
      }
    }
  });
};

// Send message to the database and broadcast it to clients
exports.sendMessage = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { senderId, message } = req.body;

    if (!roomId)
      return res.status(400).json({ message: "Meeting ID is required" });

    const newMessage = new Message({ roomId, senderId, message });
    await newMessage.save();

    broadcastMessage(roomId, { ...newMessage.toObject(), senderId }); // Include userId (senderId)
    
    res.json({ success: true, message: newMessage });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all messages from the database for a specific room
exports.getMessages = async (req, res) => {
  try {
    const { roomId } = req.params;
    if (!roomId)
      return res.status(400).json({ message: "Meeting ID is required" });

    const messages = await Message.find({ roomId }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.clearDocuments = async (req, res) => {
  const { roomId } = req.params;

  try {
    await Message.deleteMany({ roomId });
    res.status(200).json({ success: true, message: 'Documents cleared successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to clear documents.', error: err });
  }
};

