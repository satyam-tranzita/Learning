import { User } from "../models/index.js";

export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await User.create({
            name,
            email,
            password
        });

        res.status(201).json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to create user"
        });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();

        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch users"
        });
    }
};


export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch user"
        });
    }
};
