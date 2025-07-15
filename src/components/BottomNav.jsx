import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaHome, FaThList, FaFire, FaShoppingBag, FaUserCog } from "react-icons/fa";

export default function BottomNav() {
  const router = useRouter();
  const [active, setActive] = useState("");

  useEffect(() => {
    setActive(router.pathname);
  }, [router.pathname]);

  const navItems = [
    { name: "الرئيسية", icon: <FaHome />, path: "/" },
    { name: "الفئات", icon: <FaThList />, path: "/categories" },
    { name: "التريندات", icon: <FaFire />, path: "/trending" },
    { name: "السلة", icon: <FaShoppingBag />, path: "/cart" },
    { name: "أنا", icon: <FaUserCog />, path: "/profile" },
  ];

  const handleNavClick = (path) => {
    if (router.pathname !== path) {
      router.push(path);
    }
  };

  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "65px",
        backgroundColor: "#fff",
        borderTop: "1px solid #e0e0e0",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        zIndex: 999,
        boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.08)",
        padding: "0 10px",
      }}
    >
      {navItems.map((item) => (
        <button
          key={item.path}
          onClick={() => handleNavClick(item.path)}
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            background: "none",
            border: "none",
            color: active === item.path ? "#FF5722" : "#777",
            transition: "color 0.3s",
            cursor: "pointer",
            padding: "6px 0",
          }}
        >
          <div style={{ fontSize: "22px", marginBottom: "2px" }}>{item.icon}</div>
          <span style={{ fontWeight: active === item.path ? "bold" : "normal" }}>{item.name}</span>
        </button>
      ))}
    </nav>
  );
}