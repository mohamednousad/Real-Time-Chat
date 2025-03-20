const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true },
    host: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Session', SessionSchema);
