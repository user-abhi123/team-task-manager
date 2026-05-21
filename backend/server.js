require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const app = express();

// DB CONNECT
connectDB();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/attendance", require("./routes/attendanceRoutes"));

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("API Running...");
});

// ✅ IMPORTANT FOR RAILWAY
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});