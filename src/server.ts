import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import { notFound } from "./app/middleware/notFound";
import { errorHandler } from "./app/middleware/errorHandler";
import { initialRoute } from "./app/api";
import { envVariable } from "./app/config";


const app = express();
const PORT = envVariable.PORT;

/**
 * ✅ Middleware Setup (Ordered by priority)
 */

// 🍪 1️⃣ Cookie-parser - Parses cookies from the request header
// Must be placed at the top so any following middleware (like auth) can access req.cookies
app.use(cookieParser());

// 🛡️ 2️⃣ Helmet - Helps secure the app by setting HTTP headers
app.use(helmet());

// 🌍 3️⃣ CORS - Allows cross-origin requests (e.g., from your frontend)
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true, // Required to send cookies from frontend to backend
  })
);

// 📋 4️⃣ Morgan - Logs request details (method, URL, status, time, etc.)
const customFormat =
  ":method :url :status - :res[content-length] bytes - :response-time ms - :user-agent";
app.use(morgan(customFormat));

// 📦 5️⃣ Body Parsers - Parses incoming JSON and form data requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * 🔄 Routes
 */

// ✅ Basic Health Check route
app.get("/", (req, res) => {
  res.json({ status: "OK", message: "Akademi Backend is running!" });
});

// ✅ Main API entry point
initialRoute(app);

// ❌ 404 Not Found Handler - For undefined routes
app.use(notFound);

// ⚠️ Global Error Handler - Catches all thrown errors
app.use(errorHandler);

// 🚀 Start the Express server
app.listen(PORT, () => {
  console.log(`🚀 Akademi Backend running on port ${PORT}`);
});

export default app;
