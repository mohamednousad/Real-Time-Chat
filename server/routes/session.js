const express = require('express');
const router = express.Router();
const { createSession, verifySession } = require('../controllers/sessionController');

// Create a new session and return a JWT
router.post('/create', createSession);

// Verify session from JWT
router.get('/verify', verifySession);

module.exports = router;
