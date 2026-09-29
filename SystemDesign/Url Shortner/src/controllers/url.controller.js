import { redis } from "../config/redis.js";
import { Url } from "../models/Url.js";
import { generateShortCode } from "../utils/base62.js";
import { validateUrl } from "../utils/validatorUrl.js";

export async function createShortUrl(req, res) {
    try {
        const { originalUrl } = req.body;

        if (!originalUrl) {
            return res.status(400).json({
                success: false,
                message: "originalUrl is required",
            });
        }
        if (!validateUrl(originalUrl)) {
    return res.status(400).json({
        success: false,
        message: "Invalid URL",
    });
}

        const shortCode = generateShortCode();

        const url = await Url.create({
            shortCode,
            originalUrl,
        });

        try {
            await redis.set(
                shortCode,
                originalUrl,
                {
                    ex: 3600,
                }
            );
        } catch (error) {
            console.error("Redis cache failed:", error);
        }

        return res.status(201).json({
            success: true,
            data: {
                shortCode,
                shortUrl: `http://localhost:5000/${shortCode}`,
                originalUrl,
            },
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

export async function redirectToOriginalUrl(req, res) {
    try {
        const { shortCode } = req.params;

        // 1. Check Redis
        const cachedUrl = await redis.get(shortCode);

        if (cachedUrl) {
            console.log("Redis HIT");

            return res.redirect(302, cachedUrl);
        }

        console.log("Redis MISS");

        // 2. Redis MISS → PostgreSQL
        const url = await Url.findOne({
            where: {
                shortCode,
            },
        });

        if (!url) {
            return res.status(404).json({
                success: false,
                message: "Short URL not found",
            });
        }

        // 3. Store DB result in Redis
        await redis.set(
            shortCode,
            url.originalUrl,
            {
                ex: 3600,
            }
        );

        // 4. Redirect
        return res.redirect(302, url.originalUrl);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}