/**
 * @author @heera9331
 * @date 03-06-2025
 * @description SMTP sending emails
 */

import nodemailer, { type Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

class EmailService {
  private transporter: Transporter<SMTPTransport.SentMessageInfo>;

  constructor() {
    if (
      !process.env.SMTP_HOST ||
      !process.env.SMTP_PORT ||
      !process.env.SMTP_USER ||
      !process.env.SMTP_PASS
    ) {
      throw new Error("SMTP environment variables are not properly set.");
    }

    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465, // true for port 465, false otherwise
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async sendMail(
    to: string,
    subject: string,
    text: string,
    html?: string
  ): Promise<SMTPTransport.SentMessageInfo> {
    const mailOptions = {
      from: `"Reply" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
      ...(html ? { html } : {}),
    };

    return this.transporter.sendMail(mailOptions);
  }
}
const emailService = new EmailService();

export default emailService;
