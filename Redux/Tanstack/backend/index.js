import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const users = [
    {
        id: 1,
        name: "Satyam",
        email: "satyam@example.com",
        role: "Admin",
        status: "Active"
    },
    {
        id: 2,
        name: "Rahul",
        email: "rahul@example.com",
        role: "User",
        status: "Active"
    },
    {
        id: 3,
        name: "Amit",
        email: "amit@example.com",
        role: "User",
        status: "Inactive"
    },
    {
        id: 4,
        name: "Priya",
        email: "priya@example.com",
        role: "Manager",
        status: "Active"
    }
];

app.get("/api/users", (req, res) => {
    res.json(users);
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});