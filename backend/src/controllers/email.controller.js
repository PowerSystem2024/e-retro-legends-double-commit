import nodemailer from "nodemailer";
import { emailTemplate } from "../templates/emailTemplate.js";

export class EmailController {
  constructor(userName, userEmail) {
    this.userName = userName;
    this.userEmail = userEmail;
  }

  sendMail = async () => {
    try {
      if (!this.userName || !this.userEmail) {
        throw new Error("Faltan los parámetros del usuario");
      }

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const html = emailTemplate({
        userName: this.userName,
        url: "https://task-app-double-commit.vercel.app/login",
      });

      const info = await transporter.sendMail({
        from: `"doubleCommit taskApp" <${process.env.EMAIL_USER}>`,
        to: this.userEmail,
        subject: "Bienvenido a doubleCommit taskApp 🚀",
        html,
      });

      return info;
    } catch (error) {
      console.error("Error al enviar el correo:", error.message);
      throw error;
    }
  };
}
