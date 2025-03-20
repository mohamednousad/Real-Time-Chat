const Message = require('../models/Message');

exports.sendMessage = async (req, res) => {
  try {
    const { id: meetingId } = req.query; // Get meeting ID from URL
    const { sender, message } = req.body;

    if (!meetingId) return res.status(400).json({ msg: 'Meeting ID is required' });

    const newMessage = new Message({ meetingId, sender, message });
    await newMessage.save();

    res.json({ success: true, message: newMessage });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { id: meetingId } = req.query;
    if (!meetingId) return res.status(400).json({ msg: 'Meeting ID is required' });

    const messages = await Message.find({ meetingId }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
