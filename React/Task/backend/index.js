import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

const allNames = Array.from(
    { length: 100000 },
    (_, index) => ({
        id: index + 1,
        name: `User ${index + 1}`
    })
);

app.get("/api/names", (req, res) => {
    let { limit = 50, cursor = 0 } = req.query;

    limit = Math.min(Number(limit), 100);
    cursor = Number(cursor);

    const start = cursor;
    const end = start + limit;

    const data = allNames.slice(start, end);

    const nextCursor =
        end < allNames.length ? end : null;

    res.json({
        success: true,
        data,
        pagination: {
            limit,
            nextCursor,
            hasMore: nextCursor !== null
        }
    });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});