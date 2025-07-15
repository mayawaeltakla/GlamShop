// pages/index.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";
import Link from "next/link";

const styles = {
  splashContainer: {
    background: "radial-gradient(circle at center, #fcd2ec, #000000)",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backdropFilter: "blur(8px)",
  },
  splashText: {
    fontSize: "3rem",
    fontWeight: "bold",
    color: "#fff",
    textShadow: "0 0 10px #ff00c8, 0 0 20px #ff00c8",
    animation: "glow 1.5s ease-in-out infinite alternate",
  },
};

const categories = [
  "نساء", "رجال", "اطفال", "حقائب", "أحذية", "اكسسوارات ومجوهرات",
  "رياضة", "مستلزمات للمنزل", "مستلزمات مكتبية", "الحيوانات الأليفة",
  "أجهزة إلكترونية", "العاب اطفال", "تجميل",
];

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [theme, setTheme] = useState("light");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategory, setFilteredCategory] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const catFromQuery = router.query.category;
    if (catFromQuery && categories.includes(catFromQuery)) {
      setFilteredCategory(catFromQuery);
    } else {
      setFilteredCategory(null);
    }
  }, [router.query.category]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  async function fetchProducts() {
    try {
      const res = await axios.get("https://fakestoreapi.com/products");
      setProducts(res.data);
    } catch (err) {
      console.error("فشل في جلب المنتجات", err);
    }
  }

  function toggleTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filteredCategory
      ? product.category.includes(filteredCategory)
      : true;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div style={styles.splashContainer}>
        <h1 style={styles.splashText}>GLOW SHOP</h1>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: "80px" }}>
      <div
        style={{
          backgroundColor: theme === "dark" ? "#111" : "#fff",
          color: theme === "dark" ? "#fff" : "#000",
          minHeight: "100vh",
          paddingTop: "60px",
          fontFamily: "Arial",
        }}
      >
        <Navbar theme={theme} toggleTheme={toggleTheme} />

        {/* أزرار تسجيل الدخول */}
        <div style={{ display: "flex", justifyContent: "center", gap: "10px", margin: "10px" }}>
          <Link href="/login">
            <button style={{
              padding: "10px 16px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              backgroundColor: "#f0f0f0",
              cursor: "pointer"
            }}>تسجيل الدخول</button>
          </Link>
          <Link href="/register">
            <button style={{
              padding: "10px 16px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              backgroundColor: "#ffe0e6",
              cursor: "pointer"
            }}>إنشاء حساب</button>
          </Link>
        </div>

        <div style={{ padding: "20px" }}>
          {/* البحث */}
          <input
            type="text"
            placeholder="🔍 ابحث عن منتج..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "10px",
              marginTop: "10px",
              width: "100%",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />

          {/* الأقسام */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))",
              gap: "10px",
              margin: "20px 0",
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() =>
                  router.push(`/?category=${encodeURIComponent(cat)}`)
                }
                style={{
                  padding: "10px",
                  backgroundColor:
                    filteredCategory === cat
                      ? theme === "dark"
                        ? "#555"
                        : "#ddd"
                      : theme === "dark"
                      ? "#222"
                      : "#f0f0f0",
                  color: theme === "dark" ? "#fff" : "#000",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: filteredCategory === cat ? "bold" : "normal",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* المنتجات */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px",
            }}
          >
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  padding: "10px",
                  backgroundColor: theme === "dark" ? "#222" : "#fafafa",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  style={{
                    height: "160px",
                    width: "100%",
                    objectFit: "contain",
                    marginBottom: "12px",
                  }}
                />
                <h3 style={{ fontSize: "1rem", height: "50px", overflow: "hidden" }}>{product.title}</h3>
                <p style={{ fontWeight: "bold", margin: "10px 0" }}>${product.price}</p>
                <button
                  onClick={() => router.push(`/product/${product.id}`)}
                  style={{
                    marginTop: "auto",
                    padding: "10px",
                    width: "100%",
                    backgroundColor: "#e91e63",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  عرض التفاصيل
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />

      {/* تنسيقات إضافية للموبايل */}
      <style jsx>{`
        @media (max-width: 768px) {
          h3 {
            font-size: 0.95rem;
          }
          button {
            font-size: 0.9rem;
          }
        }
     ` }</style>
    </div>
  );
}