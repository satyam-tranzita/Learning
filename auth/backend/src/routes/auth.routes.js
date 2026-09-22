import { Router } from "express";

import {
    register,
    login,
    getMe,
    refresh,
    logout,
    logoutAll,
    verifyEmailController,
    resendVerification
} from "../controllers/auth.controller.js";

import {
    registerValidator,
    loginValidator
} from "../validators/auth.validator.js";

import {
    validationMiddleware
} from "../middleware/validation.middleware.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.post(
    "/register",
    registerValidator,
    validationMiddleware,
    register
);

router.post(
    "/login",
    loginValidator,
    validationMiddleware,
    login
);

router.get("/me",authenticate,getMe);

router.post(
    "/refresh",
    refresh
);

router.post(
    "/logout",
    logout
);

router.post(
    "/logout-all",
    authenticate,
    logoutAll
);

router.get(
    "/verify-email",
    verifyEmailController
);

router.post(
    "/resend-verification",
    resendVerification
);


export default router;