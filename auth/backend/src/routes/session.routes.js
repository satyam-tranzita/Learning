import express from "express";

import {
    getSessions,
    revoke,
    revokeOthers
} from "../controllers/session.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get(
    "/",
    authenticate,
    getSessions
);

router.delete(
    "/:sessionId",
    authenticate,
    revoke
);

router.post(
    "/revoke-others",
    authenticate,
    revokeOthers
);

export default router;