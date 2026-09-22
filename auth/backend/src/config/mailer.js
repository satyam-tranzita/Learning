import nodemailer from "nodemailer";
import { env } from "./env.js";

export const transporter =
    nodemailer.createTransport({
        host: env.mail.host,
        port: env.mail.port,
        secure: env.mail.port === 465,

        auth: {
            user: env.mail.user,
            pass: env.mail.password
        }
    });