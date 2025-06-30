import { Server } from "http";
import app from "./app";
import config from "./app/config";

const port = config.port;

/**
 * Main function to start the HTTP server.
 * It listens on the configured port and sets up graceful shutdown handlers.
 */
async function main() {
  try {
    // Start the Express server and keep a reference to the HTTP server instance
    const server: Server = app.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
    });

    /**
     * Graceful Shutdown Handler for SIGTERM signal.
     * This signal is sent by platforms like Kubernetes or Docker when stopping the container.
     * The handler closes the HTTP server to stop accepting new requests,
     * allowing existing connections to finish before process exit.
     */
    process.on("SIGTERM", () => {
      console.log("⚠️ SIGTERM received: closing HTTP server...");
      server.close(() => {
        console.log("HTTP server closed gracefully.");
        // TODO: Close DB connections or other resources here if needed
      });
    });

    /**
     * Graceful Shutdown Handler for SIGINT signal (Ctrl+C).
     * Similar to SIGTERM but triggered on manual interrupt in terminal.
     */
    process.on("SIGINT", () => {
      console.log("⚠️ SIGINT received: closing HTTP server...");
      server.close(() => {
        console.log("HTTP server closed gracefully.");
        process.exit(0); // exit successfully
      });
    });
  } catch (error) {
    // If server startup fails, log the error and exit with failure code
    console.error("❌ Failed to start the server:", error);
    process.exit(1);
  }
}

/**
 * Global handler for uncaught exceptions.
 * Logs the error and terminates the process to avoid unknown state.
 */
process.on("uncaughtException", (error) => {
  console.error("❌ Uncaught Exception detected:", error);
  process.exit(1);
});

/**
 * Global handler for unhandled promise rejections.
 * Logs the rejection reason and terminates the process for safety.
 */
process.on("unhandledRejection", (reason) => {
  console.error("❌ Unhandled Promise Rejection detected:", reason);
  process.exit(1);
});

// Start the server
main();
