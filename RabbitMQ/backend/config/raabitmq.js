import amqp from "amqplib";

const RABBITMQ_URL =
  process.env.RABBITMQ_URL || "amqp://localhost:5672";

export const EMAIL_EXCHANGE = "email_exchange";
export const EMAIL_QUEUE = "email_queue";

export const RETRY_EXCHANGE = "email_retry_exchange";
export const RETRY_QUEUE = "email_retry_queue";

export const DLX_EXCHANGE = "email_dl_exchange";
export const DLQ = "email_dlq";

let connection;
let channel;

export const connectRabbitMQ = async () => {
  connection = await amqp.connect(RABBITMQ_URL);

  channel = await connection.createChannel();

  /*
   * 1. Main exchange
   */
  await channel.assertExchange(
    EMAIL_EXCHANGE,
    "direct", //exchange through direct routing key
    {
      durable: true
    }
  );

  /*
   * 2. Main queue
   */
  await channel.assertQueue(
    EMAIL_QUEUE,
    {
      durable: true
    }
  );

  /*
   * Route main exchange → main queue
   */
  await channel.bindQueue(
    EMAIL_QUEUE,
    EMAIL_EXCHANGE,
    "email"
  );

  /*
   * 3. Retry exchange
   */
  await channel.assertExchange(
    RETRY_EXCHANGE,
    "direct",
    {
      durable: true
    }
  );

  /*
   * 4. Retry queue
   */
  await channel.assertQueue(
    RETRY_QUEUE,
    {
      durable: true,

      arguments: {
        "x-message-ttl": 5000,//exponentional backoff time

        "x-dead-letter-exchange": //
          EMAIL_EXCHANGE,

        "x-dead-letter-routing-key":
          "email"
      }
    }
  );

  /*
   * Route retry exchange → retry queue
   */
  await channel.bindQueue(
    RETRY_QUEUE,
    RETRY_EXCHANGE,
    "retry"
  );

  /*
   * 5. Dead Letter Exchange
   */
  await channel.assertExchange(
    DLX_EXCHANGE,
    "direct",
    {
      durable: true
    }
  );

  /*
   * 6. Dead Letter Queue
   */
  await channel.assertQueue(
    DLQ,
    {
      durable: true
    }
  );

  /*
   * Route DLX → DLQ
   */
  await channel.bindQueue(
    DLQ,
    DLX_EXCHANGE,
    "dead"
  );

  console.log("RabbitMQ topology initialized");

  return channel;
};

export const getChannel = () => {
  if (!channel) {
    throw new Error(
      "RabbitMQ channel is not initialized"
    );
  }

  return channel;
};

export {
  connection
};