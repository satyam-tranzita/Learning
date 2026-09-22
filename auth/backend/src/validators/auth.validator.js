import { body } from "express-validator";

export const registerValidator = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required")
        .isLength({
            min: 2,
            max: 100
        })
        .withMessage(
            "Name must be between 2 and 100 characters"
        ),

    body("email")
        .trim()
        .isEmail()
        .withMessage("A valid email is required")
        .normalizeEmail(),

    body("password")
        .isString()
        .withMessage("Password must be a string")
        .isLength({
            min: 8,
            max: 128
        })
        .withMessage(
            "Password must be between 8 and 128 characters"
        )
];


export const loginValidator = [
    body("email")
        .trim()
        .isEmail()
        .withMessage("A valid email is required")
        .normalizeEmail(),

    body("password")
        .isString()
        .withMessage("Password is required")
];
