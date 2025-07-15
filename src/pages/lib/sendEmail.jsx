import nodemailer from 'nodemailer';

export async function sendEmail(to, subject, html) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',  // أو استخدمي خدمة الإيميل اللي تحبيها
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
  });
}