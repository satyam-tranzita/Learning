import {
    getRabbitChannel
} from "../config/rabbitmq.js";

export const publishVerificationEmail = async ({
    email,
    name,
    token
}) => {
    const channel =
        getRabbitChannel();

    const message = {
        type: "EMAIL_VERIFICATION",
        email,
        name,
        token
    };

    channel.publish(
        "auth.email",
        "verification",
        Buffer.from(
            JSON.stringify(message)
        ),
        {
            persistent: true,
            contentType: "application/json"
        }
    );
};