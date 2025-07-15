// pages/adminProducts.jsx
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  addDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // بيانات المنتج الجديد
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: '',
    image: '',
    description: '',
    category: '',
  });

  useEffect(() => {
    const q = query(collection(db, 'products'), orderBy('title', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const prods = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(prods);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // حذف منتج
  const handleDelete = async (id) => {
    if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      await deleteDoc(doc(db, 'products', id));
    }
  };

  // إضافة منتج جديد
  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (
      !newProduct.title ||
      !newProduct.price ||
      !newProduct.image ||
      !newProduct.description ||
      !newProduct.category
    ) {
      alert('رجاءً املئي كل الحقول');
      return;
    }
    await addDoc(collection(db, 'products'), {
      ...newProduct,
      price: parseFloat(newProduct.price),
    });
    setNewProduct({
      title: '',
      price: '',
      image: '',
      description: '',
      category: '',
    });
  };

  // تحديث بيانات النموذج عند التغيير
  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6 font-sans">
      <h1 className="text-2xl font-bold mb-6 text-center">🛍️ إدارة المنتجات</h1>

      {/* جدول عرض المنتجات */}
      {loading ? (
        <p className="text-center">جارٍ تحميل المنتجات...</p>
      ) : (
        <table className="w-full border border-gray-300 bg-white rounded shadow-sm mb-8">
          <thead className="bg-blue-100">
            <tr className="text-sm">
              <th className="p-2 border">الاسم</th>
              <th className="p-2 border">السعر</th>
              <th className="p-2 border">الصورة</th>
              <th className="p-2 border">التصنيف</th>
              <th className="p-2 border">الوصف</th>
              <th className="p-2 border">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr
                key={p.id}
                className="text-sm text-center hover:bg-gray-50"
              >
                <td className="p-2 border">{p.title}</td>
                <td className="p-2 border">${p.price.toFixed(2)}</td>
                <td className="p-2 border">
                  <img
                    src={p.image}
                    alt={p.title}
                    style={{ width: '50px', height: '50px', objectFit: 'contain', margin: 'auto' }}
                  />
                </td>
                <td className="p-2 border">{p.category}</td>
                <td className="p-2 border">{p.description}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* نموذج إضافة منتج جديد */}
      <form onSubmit={handleAddProduct} className="max-w-xl mx-auto bg-white p-6 rounded shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-center">➕ إضافة منتج جديد</h2>
        <label className="block mb-2">
          الاسم:
          <input
            type="text"
            name="title"
            value={newProduct.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            placeholder="اسم المنتج"
          />
        </label>

        <label className="block mb-2">
          السعر:
          <input
            type="number"
            step="0.01"
            name="price"
            value={newProduct.price}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            placeholder="السعر بالدولار"
          />
        </label>

        <label className="block mb-2">
          رابط الصورة:
          <input
            type="text"
            name="image"
            value={newProduct.image}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            placeholder="رابط صورة المنتج"
          />
        </label>

        <label className="block mb-2">
          التصنيف:
          <input
            type="text"
            name="category"
            value={newProduct.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            placeholder="تصنيف المنتج"
          />
        </label>

        <label className="block mb-2">
          الوصف:
          <textarea
            name="description"
            value={newProduct.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            placeholder="وصف المنتج"
            rows={3}
          />
        </label>

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded mt-4 font-semibold"
        >
          إضافة المنتج
        </button>
      </form>
    </main>
  );
}