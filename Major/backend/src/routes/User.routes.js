import express from "express";
import { createUser, getUserById, getUsers } from "../controllers/User.controller.js";

const router = express.Router();

router.post("/", createUser);
router.get("/",getUsers);
router.get("/:id",getUserById)

export default router;