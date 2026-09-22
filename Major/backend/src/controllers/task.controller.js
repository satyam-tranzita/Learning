import { Task } from "../models/index.js";
import { getTasksByUser } from "../services/task.service.js";

export const createTask = async (req, res) => {
    try {
        const {
            title,
            description
        } = req.body;

        const task = await Task.create({
            title,
            description,
            userId: req.user.userId
        });

        res.status(201).json({
            success: true,
            data: task
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to create task"
        });
    }
};



export const getTasks = async (req, res) => {
  try {
    const tasks = await getTasksByUser(req.user.userId);

    res.json({
      success: true,
      data: tasks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch tasks"
    });
  }
};