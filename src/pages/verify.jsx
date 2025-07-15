// pages/verify.js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function VerifyEmail() {
  const router = useRouter();
  const { token } = router.query;
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) return;

    const verifyEmail = async () => {
      try {
        const res = await fetch(`/api/verify?token=${token}`);
        const data = await res.json();
        setMessage(data.message || "تم تفعيل حسابك بنجاح 🎉");
      } catch (err) {
        setMessage("الرابط غير صالح أو منتهي.");
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">تأكيد البريد الإلكتروني</h2>
      <p>{message || "جاري التحقق..."}</p>
    </div>
  );
}