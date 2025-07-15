import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';

export default function AdminPage() {
  const [orders, setOrders] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [filter, setFilter] = useState("all"); // all | new | delivered

  const correctPassword = "mayasecret123"; // 🧠 غيريها لشي خاص فيك

  useEffect(() => {
    if (isAuth) {
      const q = query(collection(db, 'orders'), orderBy('timestamp', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const ordersData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(ordersData);
      });

      return () => unsubscribe();
    }
  }, [isAuth]);

  const handleDelete = async (id) => {
    const confirm = window.confirm("هل تريدين حذف هذا الطلب؟");
    if (confirm) {
      await deleteDoc(doc(db, 'orders', id));
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "تم التوصيل" ? "جديد" : "تم التوصيل";
    await updateDoc(doc(db, 'orders', id), {
      status: newStatus,
    });
  };

  const filteredOrders = orders.filter((order) => {
    if (filter === "all") return true;
    return order.status === (filter === "new" ? "جديد" : "تم التوصيل");
  });

  if (!isAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white shadow-lg p-6 rounded">
          <h2 className="text-xl font-bold mb-4 text-center">🔐 دخول الأدمن</h2>
          <input
            type="password"
            placeholder="أدخل كلمة السر"
            className="border p-2 rounded w-full mb-4"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded w-full"
            onClick={() => {
              if (passwordInput === correctPassword) {
                setIsAuth(true);
              } else {
                alert("كلمة السر غلط يا مشمشتي 😅");
              }
            }}
          >
            دخول
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">📦 لوحة الطلبات</h1>

      {/* أزرار الفلترة */}
      <div className="flex justify-center gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${filter === "all" ? "bg-blue-500 text-white" : "bg-white border"}`}
          onClick={() => setFilter("all")}
        >
          كل الطلبات
        </button>
        <button
          className={`px-4 py-2 rounded ${filter === "new" ? "bg-yellow-500 text-white" : "bg-white border"}`}
          onClick={() => setFilter("new")}
        >
          جديدة
        </button>
        <button
          className={`px-4 py-2 rounded ${filter === "delivered" ? "bg-green-500 text-white" : "bg-white border"}`}
          onClick={() => setFilter("delivered")}
        >
          تم التوصيل
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 bg-white rounded shadow-sm">
          <thead className="bg-green-100">
            <tr className="text-sm">
              <th className="p-2 border">الاسم</th>
              <th className="p-2 border">الهاتف</th>
              <th className="p-2 border">المنتج</th>
              <th className="p-2 border">الكمية</th>
              <th className="p-2 border">العنوان</th>
              <th className="p-2 border">ملاحظات</th>
<th className="p-2 border">الحالة</th>
              <th className="p-2 border">التاريخ</th>
              <th className="p-2 border">تعديل</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="text-sm text-center hover:bg-gray-50">
                <td className="p-2 border">{order.name}</td>
                <td className="p-2 border">{order.phone}</td>
                <td className="p-2 border">{order.product}</td>
                <td className="p-2 border">{order.quantity}</td>
                <td className="p-2 border">{order.address}</td>
                <td className="p-2 border">{order.notes || '-'}</td>
                <td className="p-2 border">{order.status || "جديد"}</td>
                <td className="p-2 border">{order.timestamp?.toDate().toLocaleString()}</td>
                <td className="p-2 border flex flex-col gap-2 items-center justify-center">
                  <button
                    onClick={() => handleToggleStatus(order.id, order.status || "جديد")}
                    className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
                  >
                    {order.status === "تم التوصيل" ? "جعله جديد" : "تم التوصيل ✅"}
                  </button>
                  <button
                    onClick={() => handleDelete(order.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                  >
                    حذف 🗑
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
 }