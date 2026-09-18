import dotenv from "dotenv";

dotenv.config();
import nodemailer from "nodemailer";


console.log(process.env.SMTP_USER)
console.log(process.env.SMTP_PASSWORD)



const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    },

    connectionTimeout: 10000,//appp-->connect mail server
    greetingTimeout: 10000,//after tcp connection,smtp server should send it initial greeting
    socketTimeout: 30000//activity during connection
});


try {
  await transporter.verify();
  console.log("SMTP configuration is valid");
} catch (error) {
  console.error("SMTP configuration failed:", error);
}

export default transporter;