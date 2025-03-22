const jwt = require("jsonwebtoken");

exports.createSession = (req, res) => {
  try {
    const { id: roomId } = req.query; // Extracts roomId from URL query
    if (!roomId)
      return res.status(400).json({ message: "Room ID is required" });

    const userId = Math.floor(1000 + Math.random() * 9000); // Random 4-digit number

    const token = jwt.sign({ roomId, userId }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token expires in 2 hours
    });

    res.json({ success: true, token }); 
  } catch (err) {
    console.error("Error creating session:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.verifySession = (req, res) => {
  try {
    const token = req.header("Authorization");
    if (!token)
      return res.status(401).json({ message: "No token, authorization denied" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ success: true, userId: decoded.userId ,roomId: decoded.roomId });
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired session" });
  }
};
