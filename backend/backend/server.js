const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Database Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// User Schema & Model
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  walletBalance: { type: Number, default: 1000 }, // Default wallet balance
});
const User = mongoose.model("User", UserSchema);

// Signup Route
app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Signup failed" });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ message: "Login successful", token, walletBalance: user.walletBalance });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

// Get Wallet Balance
app.get("/wallet/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ walletBalance: user.walletBalance });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch wallet balance" });
  }
});

// Spin Wheel (Random Reward)
app.post("/spin/:userId", async (req, res) => {
  try {
    const rewards = [150, 200, 300, 500, 1000, 5, 10, 15]; // Coin & Token rewards
    const reward = rewards[Math.floor(Math.random() * rewards.length)];

    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.walletBalance += reward;
    await user.save();

    res.json({ message: "Spin successful", reward, walletBalance: user.walletBalance });
  } catch (error) {
    res.status(500).json({ error: "Spin failed" });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
