import {
  getChannel,
  EMAIL_EXCHANGE
} from "../config/raabitmq.js";

export const sendEmailController = async (req, res) => {
  try {
    const {
      to,
      subject,
      text,
      html
    } = req.body;

    // Validate request
    if (!to || !subject || (!text && !html)) {
      return res.status(400).json({
        success: false,
        message: "to, subject and email content are required"
      });
    }

    // Create email job
    const emailJob = {
      to,
      subject,
      text,
      html
    };

    const channel = getChannel();

    // Publish email job to RabbitMQ exchange
    channel.publish(
      EMAIL_EXCHANGE,
      "email",
      Buffer.from(JSON.stringify(emailJob)),
      {
        persistent: true
      }
    );

    // 202 = request accepted for asynchronous processing
    return res.status(202).json({
      success: true,
      message: "Email queued successfully"
    });

  } catch (error) {
    console.error("Failed to queue email:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to queue email"
    });
  }
};
