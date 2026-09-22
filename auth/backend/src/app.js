import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import { env } from "./config/env.js";

import routes from "./routes/index.js";

import {
    notFoundMiddleware
} from "./middleware/not-found.middleware.js";

import {
    errorMiddleware
} from "./middleware/error.middleware.js";

const app = express();

app.disable("x-powered-by");

app.use(helmet());

app.use(
    cors({
        origin: env.corsOrigin,
        credentials: true
    })
);

app.use(
    express.json({
        limit: "1mb"
    })
);

app.use(
    express.urlencoded({
        extended: true,
        limit: "1mb"
    })
);

app.use(cookieParser());

app.get("/", (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Welcome to AuthCore API"
    });
});

app.use("/api/v1", routes);

app.use(notFoundMiddleware);

app.use(errorMiddleware);

export default app;