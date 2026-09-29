import express from "express";
import helmet from "helmet";
import cors from "cors";

import urlRoutes from "./routes/url.routes.js";
import { redirectToOriginalUrl } from "./controllers/url.controller.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/v1/urls", urlRoutes);

app.get("/:shortCode", redirectToOriginalUrl);

export default app;