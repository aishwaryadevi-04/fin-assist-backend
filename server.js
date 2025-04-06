const express = require("express");
require("dotenv").config();
const chatRoutes = require("./routes/chatRoutes");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./services/db"); 
const cors = require("cors");

const app = express();
const PORT = 5000;

connectDB();
// Apply CORS before anything else
app.use(cors({
    origin: '*', // For development. You can restrict to 127.0.0.1:5500 if needed
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());
app.use("/chat", chatRoutes);
app.use(express.static("public")); // Serve HTML files
app.use("/auth", authRoutes);




app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// 3HScFDygw9b9RPDM
// mongodb+srv://aishwaryadevi2004:<db_password>@cluster0.qc3qmnj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0