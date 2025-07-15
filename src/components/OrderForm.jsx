import { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function OrderForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    product: '',
    quantity: 1,
    address: '',
    notes: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, 'orders'), {
        ...formData,
        quantity: Number(formData.quantity),
        timestamp: serverTimestamp(),
      });

      alert('✅ تم إرسال الطلب بنجاح! شكراً لك 💛');

      setFormData({
        name: '',
        phone: '',
        product: '',
        quantity: 1,
        address: '',
        notes: '',
      });
    } catch (error) {
      console.error('❌ خطأ أثناء إرسال الطلب:', error);
      alert('حدث خطأ أثناء إرسال الطلب 😢');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-md mx-auto bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-xl font-bold text-center mb-2">نموذج طلب المنتج</h2>

      <input
        type="text"
        name="name"
        placeholder="اسمك الكامل"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded"
      />

      <input
        type="tel"
        name="phone"
        placeholder="رقم الهاتف"
        value={formData.phone}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        name="product"
        placeholder="اسم المنتج"
        value={formData.product}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded"
      />

      <input
        type="number"
        name="quantity"
        placeholder="الكمية"
        value={formData.quantity}
        onChange={handleChange}
        min="1"
        className="w-full border p-2 rounded"
      />

      <textarea
        name="address"
        placeholder="العنوان بالتفصيل"
        value={formData.address}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded"
      />

      <textarea
        name="notes"
        placeholder="ملاحظات إضافية (اختياري)"
        value={formData.notes}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <button
        type="submit"
        disabled={loading}
        className={`w-full p-2 rounded text-white ${loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}
      >
        {loading ? '...جارٍ الإرسال' : 'إرسال الطلب'}
      </button>
    </form>
  );
}