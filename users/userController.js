// users/userController.js
const User = require("./userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Register new user
async function register(req, res) {
  try {
    const { username, password, role } = req.body; // ✅ role added

    if (!username || !password)
      return res.status(400).json({ message: "Username and password required" });

    // Check if user exists
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ message: "Username already exists" });

    // ✅ Default role if not provided (e.g., 'customer')
    const newUser = new User({ username, password, role: role || "customer" });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Login user and return JWT
async function login(req, res) {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ message: "Username and password required" });

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // ✅ Include role in JWT payload
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { register, login };
