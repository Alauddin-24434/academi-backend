import { Server } from "socket.io";
import http from "http";

let io: Server;

// Add map userId -> socketId to track online users
export const onlineUsers = new Map<string, string>();

export const initSocketServer = (server: http.Server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Join personal room by userId and track in onlineUsers map
    socket.on("join", (userId: string) => {
      onlineUsers.set(userId, socket.id);
      socket.data.userId = userId;
      socket.join(userId);
      console.log(`User ${userId} joined with socket ${socket.id}`);
    });

    socket.on("join-group", (groupId: string) => {
      socket.join(groupId);
    });

    socket.on("private-message", (data) => {
      io.to(data.receiverId).emit("new-message", data);
    });

    socket.on("group-message", (data) => {
      io.to(data.groupId).emit("new-message", data);
    });

    socket.on("disconnect", () => {
      if (socket.data.userId) {
        onlineUsers.delete(socket.data.userId);
      }
      console.log("User disconnected:", socket.id);
    });

    // Call offer
    socket.on("call-user", ({ to, offer }) => {
      // Here 'to' is userId, get socketId
      const targetSocketId = onlineUsers.get(to);
      if (targetSocketId) {
        io.to(targetSocketId).emit("call-made", { from: socket.data.userId, offer });
      } else {
        socket.emit("call-error", "User is offline or not found");
      }
    });

    // Answer
    socket.on("make-answer", ({ to, answer }) => {
      const targetSocketId = onlineUsers.get(to);
      if (targetSocketId) {
        io.to(targetSocketId).emit("answer-made", { from: socket.data.userId, answer });
      }
    });

    // ICE Candidate
    socket.on("ice-candidate", ({ to, candidate }) => {
      const targetSocketId = onlineUsers.get(to);
      if (targetSocketId) {
        io.to(targetSocketId).emit("ice-candidate", { from: socket.data.userId, candidate });
      }
    });

    // Call reject
    socket.on("reject-call", ({ to }) => {
      const targetSocketId = onlineUsers.get(to);
      if (targetSocketId) {
        io.to(targetSocketId).emit("call-rejected", { from: socket.data.userId });
      }
    });
  });
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return { io, onlineUsers};
};
