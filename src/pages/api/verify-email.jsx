// pages/api/verify-email.js
let users = []; // لازم يكون نفس مكان حفظ المستخدمين أو قاعدة بيانات حقيقية

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  const { token } = req.query;

  if (!token) return res.status(400).json({ message: "الرابط غير صالح" });

  // نبحث عن المستخدم عبر التوكن
  const user = users.find(u => u.emailToken === token);

  if (!user) return res.status(400).json({ message: "رمز التحقق غير صحيح أو منتهي" });

  if (user.isVerified) {
    return res.status(200).json({ message: "الحساب مفعل مسبقًا" });
  }

  // نفعّل الحساب
  user.isVerified = true;

  return res.status(200).json({ message: "تم تفعيل حسابك بنجاح 🎉" });
}