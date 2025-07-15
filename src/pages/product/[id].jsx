// pages/product/[id].jsx import { useRouter } from "next/router"; import { useEffect, useState } from "react"; import axios from "axios"; import ReviewBox from "@/components/ReviewBox";

export default function ProductDetails() { const router = useRouter(); const { id } = router.query; const [product, setProduct] = useState(null); const [theme, setTheme] = useState("light"); const [added, setAdded] = useState(false); const [rating, setRating] = useState(5); const [comment, setComment] = useState(""); const [reviews, setReviews] = useState([]);

useEffect(() => { const savedTheme = localStorage.getItem("theme"); if (savedTheme) setTheme(savedTheme); }, []);

useEffect(() => { if (id) { fetchProduct(); loadReviews(); } }, [id]);

async function fetchProduct() { try { const res = await axios.get(`https://fakestoreapi.com/products/${id}`); setProduct(res.data); } catch (err) { console.error("خطأ في جلب المنتج", err); } }

function addToCart() { const currentCart = JSON.parse(localStorage.getItem("cart")) || []; currentCart.push(product); localStorage.setItem("cart", JSON.stringify(currentCart)); setAdded(true); setTimeout(() => setAdded(false), 2000); }

function loadReviews() { const stored = JSON.parse(localStorage.getItem(`reviews-${id}`)) || []; setReviews(stored); }

function handleReviewSubmit(e) { e.preventDefault(); if (!comment.trim()) return alert("اكتبي تعليقك يا مشمشة 🍑");

const newReview = {
  rating,
  comment,
  createdAt: new Date().toISOString(),
};

const updatedReviews = [newReview, ...reviews];
setReviews(updatedReviews);
localStorage.setItem(`reviews-${id}`, JSON.stringify(updatedReviews));
setComment("");
setRating(5);

}

if (!product) { return ( <div style={{ padding: "20px", fontFamily: "Arial", backgroundColor: theme === "dark" ? "#111" : "#fff", color: theme === "dark" ? "#fff" : "#000", minHeight: "100vh", }} > جارٍ تحميل تفاصيل المنتج... </div> ); }

return ( <div style={{ backgroundColor: theme === "dark" ? "#111" : "#fff", color: theme === "dark" ? "#fff" : "#000", minHeight: "100vh", padding: "20px", fontFamily: "Arial",}} > <button onClick={() => router.back()} style={{ marginBottom: "20px", padding: "10px 20px", borderRadius: "10px", cursor: "pointer", backgroundColor: theme === "dark" ? "#333" : "#ddd", border: "none", color: theme === "dark" ? "#fff" : "#000", }} > ← العودة </button>

<div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      maxWidth: "800px",
      margin: "auto",
      backgroundColor: theme === "dark" ? "#222" : "#f9f9f9",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: theme === "dark" ? "0 0 10px #000" : "0 0 10px #ccc",
    }}
  >
    <img
      src={product.image}
      alt={product.title}
      style={{
        width: "100%",
        height: "300px",
        objectFit: "contain",
        borderRadius: "12px",
      }}
    />
    <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>{product.title}</h1>
    <p style={{ fontSize: "18px" }}>{product.description}</p>
    <p style={{ fontSize: "20px", fontWeight: "bold" }}>${product.price}</p>

    <button
      onClick={addToCart}
      style={{
        padding: "10px 20px",
        backgroundColor: theme === "dark" ? "#28a745" : "#4CAF50",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        fontSize: "16px",
        cursor: "pointer",
        marginTop: "10px",
      }}
    >
      🛒 إضافة إلى السلة
    </button>
    {added && <p style={{ color: "green" }}>✅ تمت الإضافة للسلة</p>}
    <p>التصنيف: {product.category}</p>
    <p>⭐️ التقييم العام: {product.rating?.rate} ({product.rating?.count})</p>

    <hr />

    <form onSubmit={handleReviewSubmit}>
      <h3>✨ اتركي تقييمك:</h3>
      <label>⭐️ التقييم:</label>
      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
      >
        {[5, 4, 3, 2, 1].map((r) => (
          <option key={r} value={r}>{r} نجوم</option>
        ))}
      </select>
      <br />
      <label>💬 تعليقك:</label>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows="3"
        cols="30"
        placeholder="شو رأيك بالمنتج؟"
        style={{ width: "100%", padding: "10px", borderRadius: "8px" }}
      />
      <br />
      <button
        type="submit"
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          border: "none",
          borderRadius: "8px",
          backgroundColor: "#0070f3",
          color: "white",
          cursor: "pointer",
        }}
      >📤 إرسال التقييم</button>
    </form>

    <hr />
    <h3>⭐️ تقييمات العملاء:</h3>
    {reviews.length === 0 ? (
      <p>لا يوجد تقييمات بعد.</p>
    ) : (
      <ul style={{ listStyle: "none", padding: 0 }}>
        {reviews.map((rev, i) => (
          <li
            key={i}
            style={{
              borderBottom: "1px solid #ccc",
              paddingBottom: "10px",
              marginBottom: "10px",
            }}
          >
            <p>⭐️ التقييم: {rev.rating}</p>
            <p>💬 {rev.comment}</p>
            <small>📅 {new Date(rev.createdAt).toLocaleDateString()}</small>
          </li>
        ))}
      </ul>
    )}
  </div>
</div>

); }