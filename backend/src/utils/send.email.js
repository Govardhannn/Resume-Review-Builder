import nodemailer from "nodemailer";
const sendEmail = async ({ email, sub, message }) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.MY_EMAIL,
            pass: process.env.MY_PASSWORD
        },
    });
    await transporter.sendMail({
    from: process.env.MY_EMAIL,
    to: email,
    subject: sub,
    html: message, 
  });
}

export default sendEmail;