import { db } from '@/lib/firebase';
import { useRouter } from 'next/router';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  router.push('/order-confirmation');
  const { name, email, phone, product, quantity, address, notes } = req.body;
  const router = useRouter(); 
  try {
    // 1. حفظ الطلب بفايربيس
    await addDoc(collection(db, 'orders'), {
      name,
      email,
      phone,
      product,
      quantity,
      address,
      notes,
      timestamp: serverTimestamp(),
    });

    // 2. إعداد nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 3. إرسال إيميل للمستخدم
    await transporter.sendMail({
      from:` "GlowShop" <${process.env.EMAIL_USER}>,
      to: email,
      subject: '✅ تأكيد طلبك',
      html: 
        <p>أهلاً ${name} 🌟</p>
        <p>تم استلام طلبك بنجاح:</p>
        <ul>
          <li><strong>المنتج:</strong> ${product}</li>
          <li><strong>الكمية:</strong> ${quantity}</li>
          <li><strong>العنوان:</strong> ${address}</li>
        </ul>
        <p>سنتواصل معك قريبًا 💌</p>
      `,
    });

    // 4. إرسال إيميل للإدارة
    await transporter.sendMail({
      from:` "تنبيه طلب جديد" <${process.env.EMAIL_USER}>,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER, // احتياط
      subject: '🚨 طلب جديد',
      html: 
        <h3>طلب جديد من: ${name}</h3>
        <ul>
          <li><strong>الإيميل:</strong> ${email}</li>
          <li><strong>الهاتف:</strong> ${phone}</li>
          <li><strong>المنتج:</strong> ${product}</li>
          <li><strong>الكمية:</strong> ${quantity}</li>
          <li><strong>العنوان:</strong> ${address}</li>
          <li><strong>ملاحظات:</strong> ${notes ? notes : 'لا يوجد'}</li>
        </ul>
      `,
    });

    // 5. رد السيرفر
    return res.status(200).json({ message: 'تم إرسال الطلب والإيميلات ✅' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'حدث خطأ أثناء إرسال الطلب 😢' });
  }
}