import bcrypt from "bcryptjs";
import crypto from "crypto";

import { User, Session } from "../models/index.js";

import {
    generateAccessToken,
    generateRefreshToken
} from "../config/token.js";


// Hash refresh token before storing it in DB
const hashToken = (token) => {
    return crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");
};


// Cookie configuration
const setAuthCookies = (res, accessToken, refreshToken) => {

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 15 * 60 * 1000
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
};


// =========================
// REGISTER
// =========================

export const register = async (req, res) => {
    try {

        const {
            name,
            email,
            password
        } = req.body;


        // 1. Check existing user
        const existingUser = await User.findOne({
            where: { email }
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already registered"
            });
        }


        // 2. Hash password
        const hashedPassword = await bcrypt.hash(
            password,
            12
        );


        // 3. Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });


        // 4. Generate tokens
        const accessToken = generateAccessToken(user);

        const refreshToken = generateRefreshToken(user);


        // 5. Hash refresh token before storing
        const refreshTokenHash = hashToken(refreshToken);


        // 6. Create server-side session
        await Session.create({
            userId: user.id,
            refreshTokenHash,
            expiresAt: new Date(
                Date.now() + 7 * 24 * 60 * 60 * 1000
            )
        });


        // 7. Store tokens in HttpOnly cookies
        setAuthCookies(
            res,
            accessToken,
            refreshToken
        );


        // 8. Return user information only
        return res.status(201).json({
            success: true,
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            }
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Registration failed"
        });
    }
};



// =========================
// LOGIN
// =========================

export const login = async (req, res) => {
    try {

        const {
            email,
            password
        } = req.body;


        // 1. Find user
        const user = await User.findOne({
            where: { email }
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }


        // 2. Compare password
        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }


        // 3. Generate tokens
        const accessToken = generateAccessToken(user);

        const refreshToken = generateRefreshToken(user);


        // 4. Hash refresh token
        const refreshTokenHash = hashToken(refreshToken);


        // 5. Create session
        await Session.create({
            userId: user.id,
            refreshTokenHash,
            expiresAt: new Date(
                Date.now() + 7 * 24 * 60 * 60 * 1000
            )
        });


        // 6. Store tokens in cookies
        setAuthCookies(
            res,
            accessToken,
            refreshToken
        );


        // 7. Return user information
        return res.json({
            success: true,
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            }
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Login failed"
        });
    }
};
