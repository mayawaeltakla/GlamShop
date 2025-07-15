// pages/track.jsx
import { useState } from "react";
import axios from "axios";

export default function TrackOrder() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchTrackingStatus = async () => {
    setError(null);
    setStatus(null);

    if (!trackingNumber.trim()) {
      setError("رجاءً أدخلي رقم التتبع");
      return;
    }

    setLoading(true);

    try {
      // مثال طلب API وهمي - بنجيب بيانات مستخدم كمثال
      const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${trackingNumber}`);

      // لو الرقم موجود، نفترض أنه يمثل الشحنة
      if (res.data && res.data.id) {
        // نعرض الحالة بناءً على رقم التتبع (مثال فقط)
        const statuses = [
          "تم استلام الشحنة في المستودع",
          "الشحنة قيد التجهيز",
          "الشحنة في الطريق إليك",
          "تم تسليم الشحنة بنجاح",
        ];

        // حالة عشوائية حسب الرقم (تبديل)
        const statusIndex = res.data.id % statuses.length;
        setStatus(statuses[statusIndex]);
      } else {
        setError("رقم التتبع غير صحيح أو غير موجود.");
      }
    } catch (err) {
      setError("حدث خطأ أثناء جلب بيانات الشحنة. تأكدي من رقم التتبع وحاولي مرة أخرى.");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>تتبع الشحنة 📦</h1>
      <input
        type="text"
        placeholder="أدخلي رقم التتبع (رقم من 1 إلى 10)"
        value={trackingNumber}
        onChange={(e) => setTrackingNumber(e.target.value)}
        style={{ padding: "10px", fontSize: "16px", width: "250px" }}
      />
      <button
        onClick={fetchTrackingStatus}
        style={{
          marginLeft: "10px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
        disabled={loading}
      >
        {loading ? "جاري التتبع..." : "تتبع"}
      </button>

      {status && (
        <p style={{ marginTop: "20px", fontWeight: "bold", color: "green" }}>
          حالة الشحنة: {status}
        </p>
      )}
      {error && (
        <p style={{ marginTop: "20px", fontWeight: "bold", color: "red" }}>
          {error}
        </p>
      )}
    </div>
  );
}