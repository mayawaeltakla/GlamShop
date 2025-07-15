import crypto from "crypto";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db";
import User from "@/models/User";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  await connectDB();

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "يرجى ملء كل الحقول" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "هذا البريد مسجل من قبل" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const token = crypto.randomBytes(32).toString("hex");

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    isVerified: false,
    emailToken: token,
  });

  await newUser.save();

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return res.status(500).json({ message: "إعدادات الإيميل غير موجودة" });
  }

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
      html: `<p>مرحبًا ${name} 🌟</p><p>اضغطي الرابط لتأكيد بريدك:</p><a href="${confirmLink}">${confirmLink}</a>`,
    });

    return res.status(200).json({
      message: "تم التسجيل، تحقق من بريدك الإلكتروني ✉️",
    });
  } catch (error) {
    console.error("Email Error:", error);
    return res.status(500).json({
      message: "حدث خطأ أثناء إرسال الإيميل، حاولي لاحقًا",
    });
  }
}