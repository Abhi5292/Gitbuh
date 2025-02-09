const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Dummy User Data (Replace with Database in Future)
let users = [];

// Register User
router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    
    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    users.push({ username, password: hashedPassword });
    res.json({ message: "User Registered!" });
});

// Login User
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    
    const user = users.find(u => u.username === username);
    if (!user) return res.status(400).json({ error: "User Not Found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid Password" });

    const token = jwt.sign({ username }, "your_secret_key", { expiresIn: "1h" });
    res.json({ message: "Login Successful", token });
});

module.exports = router;
