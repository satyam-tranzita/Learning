import transporter from "../config/mail.js"

export const sendEmail = async ({
    to,
    subject,
    text,
    html,
    cc,
    bcc,
    replyTo,
    attachments
}) => {

    if (!to) {
        throw new Error("Recipient email is required");
    }

    if (!subject) {
        throw new Error("Email subject is required");
    }

    if (!text && !html) {
        throw new Error("Email content is required");
    }

    const mailOptions = {
        from: process.env.SMTP_USER,
        to,
        subject,
        text,
        html,
        cc,
        bcc,
        replyTo,
        attachments
    };

    return await transporter.sendMail(mailOptions);
};