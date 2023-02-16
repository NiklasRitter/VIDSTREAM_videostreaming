import mongoose from "mongoose";
import logger from "./logger";

const DB_CONNECTION_STRING =
process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/video-streaming-platform"; //TODO: Do a process.env DB Connectionsstring  

export async function connectToDatabase() {
    try {
        await mongoose.connect(DB_CONNECTION_STRING);
        logger.info("Connect to database");
      } catch (e) {
        logger.error(e, "Failed to connect to database.");
        process.exit(1);
    }
}

export async function disconnectFromDatabase() {
    await mongoose.connection.close();
    logger.info("Disconnect from database");
    return;
  }