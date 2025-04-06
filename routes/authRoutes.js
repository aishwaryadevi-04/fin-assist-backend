// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const { signupUser, loginUser } = require("../services/userService");

// Signup Route
router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await signupUser(name, email, password);
        res.status(201).json({ message: "Signup successful", user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Login Route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await loginUser(email, password);
        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
});

module.exports = router;
