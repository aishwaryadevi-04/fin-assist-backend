// controllers/authController.js
const bcrypt = require("bcrypt");
const User = require("../models/User");

async function signupUser(name, email, password) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    return { name, email }; // don't return password
}

async function loginUser(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    return { name: user.name, email: user.email }; // login success
}

module.exports = {
    signupUser,
    loginUser
};
