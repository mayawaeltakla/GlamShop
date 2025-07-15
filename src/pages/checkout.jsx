import { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Checkout() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    product: '',
    quantity: 1,
    paymentMethod: 'COD', // الدفع عند الاستلام
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
        paid: false, // ما تم الدفع بعد
        timestamp: serverTimestamp(),
      });

      alert('✅ تم تأكيد الطلب والدفع عند الاستلام');
      setFormData({
        name: '',
        phone: '',
        address: '',
        product: '',
        quantity: 1,
        paymentMethod: 'COD',
      });
    } catch (error) {
      console.error('❌ خطأ في إرسال الطلب:', error);
      alert('حدث خطأ، حاول لاحقًا.');
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md max-w-md w-full space-y-4">
        <h2 className="text-xl font-bold text-center">📦 الدفع عند الاستلام</h2>

        <input type="text" name="name" placeholder="الاسم الكامل" value={formData.name} onChange={handleChange} required className="w-full border p-2 rounded" />
        <input type="tel" name="phone" placeholder="رقم الهاتف" value={formData.phone} onChange={handleChange} required className="w-full border p-2 rounded" />
        <textarea name="address" placeholder="العنوان الكامل" value={formData.address} onChange={handleChange} required className="w-full border p-2 rounded" />

        <input type="text" name="product" placeholder="اسم المنتج" value={formData.product} onChange={handleChange} required className="w-full border p-2 rounded" />
        <input type="number" name="quantity" placeholder="الكمية" min="1" value={formData.quantity} onChange={handleChange} required className="w-full border p-2 rounded" />

        <div className="text-sm text-gray-600">
          طريقة الدفع: <strong>الدفع عند الاستلام</strong>
        </div>

        <button type="submit" disabled={loading} className={`w-full p-2 rounded text-white ${loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}>
          {loading ? '...جارٍ التأكيد' : 'تأكيد الطلب'}
        </button>
      </form>
    </main>
  );
}