import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { CORS_ORIGIN } from "./constants";
import userRoute from "./modules/user/user.route";
import { connectToDatabase, disconnectFromDatabase } from "./utils/database";
import logger from "./utils/logger";

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);
app.use(helmet());

app.use("/api/users", userRoute);

const server = app.listen(PORT, async () => {
  await connectToDatabase();
  logger.info(`Server listening at htp://localhost:${PORT}`);
});

//SIGTERM: kill signal //SIGINT: Ctrl+C
const signals = ["SIGTERM", "SIGINT"];

function gracefulShutdown(signal: string) {
  process.on(signal, async () => {
    server.close();
    logger.info("Close server with signal", signal);

    await disconnectFromDatabase();

    process.exit(0);
  });
}

for (let i = 0; i < signals.length; i++) {
  gracefulShutdown(signals[i]);
}
