import csrf from 'csurf';
import cookieParser from 'cookie-parser';
import { sendEmail } from '@/lib/sendEmail';

const csrfProtection = csrf({ cookie: true });

export default function handler(req, res) {
  cookieParser()(req, res, () => {
    csrfProtection(req, res, async () => {
      if (req.method === 'POST') {
        try {
          const { name, email, phone, product, quantity, address, notes } = req.body;

          // 1. حفظ الطلب بقاعدة البيانات (Firebase/MongoDB – حسب مشروعك)
          // مثال فقط (احذفي التعليق إذا عندك كود الحفظ):
          // await saveOrderToDB({ name, email, phone, product, quantity, address, notes });

          // 2. إرسال الإيميل للعميل:
          const emailContent = `
            <h2>مرحباً ${name}!</h2>
            <p>شكرًا لطلبك: <strong>${product}</strong></p>
            <p>الكمية: ${quantity}</p>
            <p>سيتم التواصل معك على الرقم: ${phone}</p>
            <p>العنوان: ${address}</p>
            <p>ملاحظات إضافية: ${notes || 'لا يوجد'}</p>
            <p>🛍️ فريق المتجر يشكرك!</p>
          `;

          await sendEmail(email, 'تأكيد طلبك من المتجر', emailContent);

          return res.status(200).json({ message: 'تم استلام الطلب وإرسال الإيميل ✅' });
        } catch (err) {
          console.error('خطأ أثناء المعالجة:', err);
          return res.status(500).json({ message: 'حدث خطأ أثناء معالجة الطلب أو إرسال الإيميل' });
        }
      } else if (req.method === 'GET') {
        return res.status(200).json({ csrfToken: req.csrfToken() });
      } else {
        return res.status(405).json({ message: 'Method Not Allowed' });
      }
    });
  });
}