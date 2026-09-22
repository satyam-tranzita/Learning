import amqp from "amqplib";
import { env } from "./env.js";

let connection;
let channel;

export const connectRabbitMQ = async () => {
    if (connection && channel) {
        return channel;
    }

    connection =
        await amqp.connect(
            env.rabbitmq.url
        );

    channel =
        await connection.createChannel();

    await channel.assertExchange(
        "auth.email",
        "direct",
        {
            durable: true
        }
    );

    await channel.assertQueue(
        "auth.email.verification",
        {
            durable: true
        }
    );

    await channel.bindQueue(
        "auth.email.verification",
        "auth.email",
        "verification"
    );

    console.log(
        "RabbitMQ connected"
    );

    return channel;
};

export const getRabbitChannel = () => {
    if (!channel) {
        throw new Error(
            "RabbitMQ channel not initialized"
        );
    }

    return channel;
};

export const disconnectRabbitMQ = async () => {
    if (channel) {
        await channel.close();
        channel = null;
    }

    if (connection) {
        await connection.close();
        connection = null;
    }

    console.log(
        "RabbitMQ disconnected"
    );
};