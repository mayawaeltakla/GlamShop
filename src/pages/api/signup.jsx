import crypto from "crypto";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

// قاعدة بيانات مؤقتة (بدليها لاحقًا بقاعدة Mongo أو Firebase)
let users = [];

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "يرجى ملء كل الحقول" });
  }

  // تحقق من إعدادات الإيميل
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return res.status(500).json({ message: "إعدادات الإيميل غير موجودة" });
  }

  // تأكد ما يكون البريد مسجل قبل
  if (users.find((u) => u.email === email)) {
    return res.status(400).json({ message: "هذا البريد مسجل من قبل" });
  }

  // ✅ تشفير كلمة المرور
  const hashedPassword = await bcrypt.hash(password, 10);

  // توليد رمز التحقق
  const token = crypto.randomBytes(32).toString("hex");

  // تسجيل المستخدم
  users.push({
    name,
    email,
    password: hashedPassword, // كلمة السر المشفرة
    isVerified: false,
    emailToken: token,
  });

  // إعداد المرسل
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const confirmLink = `http://localhost:3000/api/verify-email?token=${token}`;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "تأكيد بريدك الإلكتروني",
      html: `
        <p>أهلاً ${name} 🌟</p>
        <p>اضغطي الرابط التالي لتأكيد بريدك:</p>
        <a href="${confirmLink}">${confirmLink}</a>
      ,`
    });

    return res.status(200).json({
      message: "تم التسجيل، تحقق من بريدك الإلكتروني ✉️",
    });
  } catch (error) {
    console.error("Email send error:", error);
    return res
      .status(500)
      .json({ message: "حدث خطأ أثناء إرسال الإيميل، حاولي لاحقًا" });
  }
}