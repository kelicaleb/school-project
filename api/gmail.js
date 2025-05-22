/**
 * NOTE: Set the Gmail SMTP "PASSWORD" as an environment variable in Vercel.
 * NEVER commit your real app password (or Gmail App Password) to your codebase.
 * Use a Gmail App Password (not your real login) for better security.
 */

import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const password = process.env.PASSWORD;
  if (!password) {
    return res.status(500).json({ message: "Missing PASSWORD env variable" });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "kelicaleb7@gmail.com",
      pass: password,
    },
  });

  try {
    const { to, subject, text, html } = req.body;
    const mailOptions = {
      from: "Bloo <kelicaleb7@gmail.com>",
      to,
      subject,
      text,
      html,
    };
    const info = await transporter.sendMail(mailOptions);
    return res.status(200).json(info);
  } catch (err) {
    console.log("Error posting data to gmail:", err);
    return res.status(500).json({ message: "Error posting data to gmail" });
  }
}

