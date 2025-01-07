import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.elasticemail.com",
  port: 587,
  secure: false,
  auth: {
    user: "michaelieran@gmail.com",
    pass: process.env.ELASTIC_EMAIL_API_KEY,
  },
});

const FORM = "michaelieran@gmail.com";

export async function sendEmail(
  to: string,
  subject: string,
  text: string,
  html: string,
  token: string
) {
  const url = `https://localhost:3000/login?token=${token}`;
  const mailOptions = {
    from: FORM,
    to,
    subject,
    text: `Click here to log in: ${url}`,
    html: `<p>Click <a href="${url}">here</a> to log in.</p>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
