import { db } from '@/lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { orderId, status, email, name, product } = req.body;

  try {
    // تحديث الحالة بفايربيس
    const orderRef = doc(db, 'orders', orderId);
    await updateDoc(orderRef, { status });

    // إعداد الإيميل
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // إرسال الإيميل حسب الحالة
    if (status === 'shipped') {
      await transporter.sendMail({
        from:` "GlowShop" <${process.env.EMAIL_USER}>,
        to: email,
        subject: '📦 طلبك تم شحنه',
        html: <p>أهلاً ${name} 🌟</p><p>طلبك للمنتج <strong>${product}</strong> تم شحنه وسيصلك قريبًا!</p>`,
      });
    }

    if (status === 'delivered') {
      await transporter.sendMail({
        from:` "GlowShop" <${process.env.EMAIL_USER}>,
        to: email,
        subject: '✅ تم تسليم طلبك',
        html: <p>أهلاً ${name} 🌟</p><p>طلبك للمنتج <strong>${product}</strong> تم تسليمه بنجاح. شكرًا لتسوقك معنا!</p>`,
      });
    }

    res.status(200).json({ message: 'تم تحديث الطلب والإشعار 🎉' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'حدث خطأ أثناء التحديث 😢' });
  }
}