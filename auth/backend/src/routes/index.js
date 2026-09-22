import { Router } from "express";
import sessionRoutes
    from "./session.routes.js";
import authRoutes from "./auth.routes.js";
import healthRoutes from "./health.routes.js";

const router = Router();

router.use("/health", healthRoutes);
router.use("/auth", authRoutes);
router.use(
    "/sessions",
    sessionRoutes
);


export default router;