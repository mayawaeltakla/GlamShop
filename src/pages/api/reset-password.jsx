// pages/api/reset-password.js
export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ success: false, message: "الطريقة غير مسموحة" });
    }
  
    const { email } = req.body;
  
    // تحقق من البريد
    if (!email || !email.includes("@")) {
      return res.status(400).json({ success: false, message: "بريد غير صالح" });
    }
  
    // هون عادة منتحقق إذا الإيميل موجود بقاعدة البيانات
    // ومنولد توكن (رمز مؤقت) وبتنحفظ القصة لمرحلة لاحقة
  
    console.log("إرسال رابط استعادة كلمة المرور إلى:", email);
  
    // بدل الإرسال الحقيقي، رح نرجّع رسالة نجاح وهميّة
    return res.status(200).json({ success: true });
  }