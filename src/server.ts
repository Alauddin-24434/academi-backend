import express from "express";
import http from "http";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import { notFound } from "./app/middleware/notFound";
import { errorHandler } from "./app/middleware/errorHandler";
import { initialRoute } from "./app/api";
import { envVariable } from "./app/config"; // make sure dotenv is NOT called here
import { initSocketServer } from "./app/socket";

const app = express();
const server = http.createServer(app);

const PORT = envVariable.PORT || 5000; // fallback if no env var set
const clientURL = envVariable.CLIENT_URL || "http://localhost:3000";

/**
 * ✅ Middleware Setup (Ordered by priority)
 */

// 🍪 1️⃣ Cookie-parser
app.use(cookieParser());

// 🛡️ 2️⃣ Helmet - Security headers
app.use(helmet());

// 🌍 3️⃣ CORS
app.use(
  cors({
    origin: [clientURL],
    credentials: true,
  })
);

// 📋 4️⃣ Morgan - Request logging
const customFormat =
  ":method :url :status - :res[content-length] bytes - :response-time ms - :user-agent";
app.use(morgan(customFormat));

// 📦 5️⃣ Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * 🔄 Routes
 */
app.get("/", (req, res) => {
  res.json({ status: "OK", message: "Akademi Backend is running!" });
});

// API entry
initialRoute(app);

// ❌ Not Found
app.use(notFound);

// ⚠️ Global Error Handler
app.use(errorHandler);

// 🔌 Initialize socket.io
initSocketServer(server); // ✅ Attach socket to the correct server

// 🚀 Start the server
server.listen(PORT, () => {
  console.log(`🚀 Akademi Backend running on port ${PORT}`);
});

export default app;
