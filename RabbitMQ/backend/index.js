import express from "express";
import dotenv from "dotenv";

import emailRoutes from "./routes/email.routes.js";
import { connectRabbitMQ } from "./config/raabitmq.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/email", emailRoutes);

const PORT = process.env.PORT ;
console.log(PORT)
const startServer = async () => {
  try {
    await connectRabbitMQ();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();