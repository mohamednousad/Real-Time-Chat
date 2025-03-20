const express = require('express');
const router = express.Router();
const { sendMessage, getMessages } = require('../controllers/chatController');

// Send a new chat message
router.post('/send', sendMessage);

// Get all chat messages for a specific meeting
router.get('/messages', getMessages);

module.exports = router;
