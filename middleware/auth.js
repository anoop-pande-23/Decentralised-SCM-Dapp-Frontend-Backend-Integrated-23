// middleware/auth.js
const jwt = require("jsonwebtoken");
require("dotenv").config();

function authMiddleware(req, res, next) {
  // Extract token from Authorization header
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "Access Denied. No token provided." });
  }

  try {
    // Verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    // Attach user info to request (id, username, role)
    req.user = verified;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired. Please login again." });
    }
    res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = authMiddleware;
