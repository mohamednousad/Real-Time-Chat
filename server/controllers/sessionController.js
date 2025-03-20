const jwt = require("jsonwebtoken");

exports.createSession = (req, res) => {
  try {
    const { id: meetingId } = req.query; // Extracts meetingId from URL query
    if (!meetingId)
      return res.status(400).json({ msg: "Meeting ID is required" });

    // Generate a unique 4-digit random ID for the user
    const userId = Math.floor(1000 + Math.random() * 9000); // Random 4-digit number

    // Create a JWT token with meetingId and userId
    const token = jwt.sign({ meetingId, userId }, process.env.JWT_SECRET, {
      expiresIn: "2h", // Token expires in 2 hours
    });

    res.json({ success: true, token }); // Return token and userId
  } catch (err) {
    console.error("Error creating session:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.verifySession = (req, res) => {
  try {
    const token = req.header("Authorization");
    if (!token)
      return res.status(401).json({ msg: "No token, authorization denied" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ success: true, userId: decoded.userId ,meetingId: decoded.meetingId });
  } catch (err) {
    res.status(401).json({ msg: "Invalid or expired token" });
  }
};
