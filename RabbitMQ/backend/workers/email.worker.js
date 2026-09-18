import {
  connectRabbitMQ,
  EMAIL_QUEUE,
  RETRY_EXCHANGE,
  DLX_EXCHANGE
} from "../config/raabitmq.js";

import transporter from "../config/mail.js";

console.log(process.env.SMTP_USER)
console.log(process.env.SMTP_PASSWORD)
console.log(process.env.PORT)

const MAX_RETRIES = 3;

const startWorker = async () => {
  try {
    const channel = await connectRabbitMQ();

    channel.prefetch(5);

    console.log("Email worker started");

    await channel.consume(
      EMAIL_QUEUE,
      async (message) => {
        if (!message) {
          return;
        }

        try {
          const emailJob = JSON.parse(
            message.content.toString()
          );

          const retryCount =
            emailJob.retryCount || 0;

          console.log(
            `Processing email. Attempt: ${
              retryCount + 1
            }`
          );

          await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: emailJob.to,
            subject: emailJob.subject,
            text: emailJob.text,
            html: emailJob.html
          });

          console.log("Email sent successfully");

          channel.ack(message);

        } catch (error) {
          console.error(
            "Email failed:",
            error.message
          );

          const emailJob = JSON.parse(
            message.content.toString()
          );

          const retryCount =
            emailJob.retryCount || 0;

          if (retryCount >= MAX_RETRIES) {
            console.log(
              "Maximum retries reached. Sending to DLQ."
            );

            channel.publish(
              DLX_EXCHANGE,
              "dead",
              Buffer.from(
                JSON.stringify({
                  ...emailJob,
                  failedAt: new Date().toISOString(),
                  finalError: error.message
                })
              ),
              {
                persistent: true
              }
            );

            channel.ack(message);

            return;
          }

          const retryJob = {
            ...emailJob,
            retryCount: retryCount + 1
          };

          channel.publish(
            RETRY_EXCHANGE,
            "retry",
            Buffer.from(
              JSON.stringify(retryJob)
            ),
            {
              persistent: true
            }
          );

          console.log(
            `Email scheduled for retry ${
              retryCount + 1
            }`
          );

          channel.ack(message);
        }
      },
      {
        noAck: false
      }
    );

  } catch (error) {
    console.error(
      "Worker startup failed:",
      error
    );

    process.exit(1);
  }
};

startWorker();