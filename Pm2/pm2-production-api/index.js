import express from "express";
import dotenv from "dotenv";

import employeeRoutes from "./routes/employee.routes.js";
import pool from "./config/db.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "PM2 Production API is running"
  });
});

app.get("/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");

    res.status(200).json({
      success: true,
      server: "UP",
      database: "UP"
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      server: "UP",
      database: "DOWN"
    });
  }
});
// app.get("/crash", (req, res) => {
//   process.exit(1);
// });

app.use("/api/employees", employeeRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




