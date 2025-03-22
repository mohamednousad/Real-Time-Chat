const express = require('express');
const router = express.Router();
const {  sendMessage, setupSSE , getMessages , clearDocuments} = require('../controllers/chatController');

router.post('/send/:roomId', sendMessage);
router.get('/events/:roomId', setupSSE);
router.get('/messages/:roomId', getMessages);
router.delete('/clear/:roomId', clearDocuments);

module.exports = router;
