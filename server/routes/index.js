const express = require('express');
const router = express.Router();

const sessionRoutes = require('./session');
const chatRoutes = require('./chat');

// Use session routes
router.use('/session', sessionRoutes);

// Use chat routes
router.use('/chat', chatRoutes);

module.exports = router;
