import {
    connectRabbitMQ,
    getRabbitChannel
} from "../config/rabbitmq.js";

import { transporter } from "../config/mailer.js";

import { env } from "../config/env.js";

const startEmailWorker = async () => {
    await connectRabbitMQ();

    const channel =
        getRabbitChannel();

    await channel.prefetch(5);

    console.log(
        "Email worker started"
    );

    await channel.consume(
        "auth.email.verification",
        async (message) => {
            if (!message) {
                return;
            }

            try {
                const payload =
                    JSON.parse(
                        message.content.toString()
                    );

                const {
                    email,
                    name,
                    token
                } = payload;

                const verificationUrl =
                    `${env.clientUrl}/verify-email?token=${token}`;

                await transporter.sendMail({
                    from: env.mail.from,

                    to: email,

                    subject:
                        "Verify your AuthCore email",

                    text:
                        `Hello ${name},\n\n` +
                        `Please verify your email using this link:\n` +
                        `${verificationUrl}\n\n` +
                        `This link expires in 5 minutes.`,

                    html: `
                        <h2>Welcome to AuthCore</h2>

                        <p>Hello ${name},</p>

                        <p>
                            Please verify your email
                            address by clicking the
                            button below.
                        </p>

                        <p>
                            <a
                                href="${verificationUrl}"
                            >
                                Verify Email
                            </a>
                        </p>

                        <p>
                            This link expires in
                            <strong>5 minutes</strong>.
                        </p>
                    `
                });

                channel.ack(message);

                console.log(
                    `Verification email sent to ${email}`
                );
            } catch (error) {
                console.error(
                    "Email processing failed:",
                    error
                );

                /*
                 * For now requeue the message.
                 *
                 * Later in production:
                 * retry queue → DLX → DLQ
                 */
                channel.nack(
                    message,
                    false,
                    true
                );
            }
        }
    );
};

startEmailWorker().catch((error) => {
    console.error(
        "Email worker failed:",
        error
    );

    process.exit(1);
});