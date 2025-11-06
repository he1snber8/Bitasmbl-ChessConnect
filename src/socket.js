// src/socket.js

import { Server } from "socket.io";

export function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*", // configure properly in production
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // ✅ Join a game room
    socket.on("join-room", (roomId) => {
      socket.join(roomId);
      console.log(`Socket ${socket.id} joined room ${roomId}`);

      socket.to(roomId).emit("player-joined", { player: socket.id });
    });

    // ✅ Receive and broadcast chess moves
    socket.on("move", ({ roomId, from, to }) => {
      console.log(`Move in room ${roomId}: ${from} -> ${to}`);

      // Broadcast to *other players* in the same room
      socket.to(roomId).emit("move", { from, to });
    });

    // ✅ Disconnect event
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  return io;
}
