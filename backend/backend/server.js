const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// Database Connection (Replace with Real MongoDB URI)
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ Database Connected"))
    .catch(err => console.log("❌ Database Connection Error:", err));

// Dummy User Data (Replace with Database in Future)
let users = [];

// 🟢 Register User
app.post("/api/register", async (req, res) => {
    const { username, password } = req.body;
    
    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    users.push({ username, password: hashedPassword });
    res.json({ message: "✅ User Registered!" });
});

// 🟢 Login User
app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;
    
    const user = users.find(u => u.username === username);
    if (!user) return res.status(400).json({ error: "❌ User Not Found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "❌ Invalid Password" });

    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ message: "✅ Login Successful", token });
});

// 🟢 Default Route
app.get("/", (req, res) => {
    res.send("🚀 Meta Game Backend Running...");
});

// 🟢 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
