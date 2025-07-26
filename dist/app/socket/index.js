"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIO = exports.initSocketServer = exports.onlineUsers = void 0;
const socket_io_1 = require("socket.io");
let io;
// Add map userId -> socketId to track online users
exports.onlineUsers = new Map();
const initSocketServer = (server) => {
    io = new socket_io_1.Server(server, {
        cors: {
            origin: "*",
        },
    });
    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);
        // Join personal room by userId and track in onlineUsers map
        socket.on("join", (userId) => {
            exports.onlineUsers.set(userId, socket.id);
            socket.data.userId = userId;
            socket.join(userId);
            console.log(`User ${userId} joined with socket ${socket.id}`);
        });
        socket.on("join-group", (groupId) => {
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
                exports.onlineUsers.delete(socket.data.userId);
            }
            console.log("User disconnected:", socket.id);
        });
        // Call offer
        socket.on("call-user", ({ to, offer }) => {
            // Here 'to' is userId, get socketId
            const targetSocketId = exports.onlineUsers.get(to);
            if (targetSocketId) {
                io.to(targetSocketId).emit("call-made", { from: socket.data.userId, offer });
            }
            else {
                socket.emit("call-error", "User is offline or not found");
            }
        });
        // Answer
        socket.on("make-answer", ({ to, answer }) => {
            const targetSocketId = exports.onlineUsers.get(to);
            if (targetSocketId) {
                io.to(targetSocketId).emit("answer-made", { from: socket.data.userId, answer });
            }
        });
        // ICE Candidate
        socket.on("ice-candidate", ({ to, candidate }) => {
            const targetSocketId = exports.onlineUsers.get(to);
            if (targetSocketId) {
                io.to(targetSocketId).emit("ice-candidate", { from: socket.data.userId, candidate });
            }
        });
        // Call reject
        socket.on("reject-call", ({ to }) => {
            const targetSocketId = exports.onlineUsers.get(to);
            if (targetSocketId) {
                io.to(targetSocketId).emit("call-rejected", { from: socket.data.userId });
            }
        });
    });
};
exports.initSocketServer = initSocketServer;
const getIO = () => {
    if (!io) {
        throw new Error("Socket.io not initialized");
    }
    return { io, onlineUsers: exports.onlineUsers };
};
exports.getIO = getIO;
