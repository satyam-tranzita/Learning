import express from "express";

import {
  getEmployees,
  getEmployee,
  addEmployee,
  removeEmployee
} from "../controllers/employee.controller.js";

const router = express.Router();

router.get("/", getEmployees);

router.get("/:id", getEmployee);

router.post("/", addEmployee);

router.delete("/:id", removeEmployee);

export default router;