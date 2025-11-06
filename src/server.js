// src/server.js

import express from "express";
import http from "http";
import cors from "cors";
import jwt from "jsonwebtoken";
import { createClient } from "redis";
import { initSocket } from "./socket.js";

const app = express();
const server = http.createServer(app);

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Redis client (optional use later)
const redis = createClient();
redis.connect().catch(console.error);

// ✅ JWT Middleware
function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).json({ error: "Missing token" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "SUPER_SECRET_KEY"); // Replace in production
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
}

// ✅ Example protected route
app.get("/profile", authenticateJWT, (req, res) => {
  res.json({
    message: "You are authenticated",
    user: req.user
  });
});

// ✅ Public route
app.get("/", (req, res) => {
  res.send("Chess server is running.");
});

// ✅ Initialize Socket.IO
initSocket(server);

// ✅ Start server
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
