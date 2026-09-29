import express from "express";
import {
    createShortUrl,
    redirectToOriginalUrl,
} from "../controllers/url.controller.js";

const router = express.Router();

router.post("/", createShortUrl);

// router.get("/:shortCode", redirectToOriginalUrl);

export default router;