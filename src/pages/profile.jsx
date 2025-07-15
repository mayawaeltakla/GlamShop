import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BottomNav from "../components/BottomNav";

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div
      style={{
        padding: "20px",
        paddingBottom: "100px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
        boxSizing: "border-box",
      }}
    >
      <h1
        style={{
          fontSize: "1.8rem",
          marginBottom: "10px",
          textAlign: "center",
          color: "#333",
        }}
      >
        👤 الملف الشخصي
      </h1>

      {user ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          }}
        >
          <img
            src="https://via.placeholder.com/100"
            alt="User Avatar"
            style={{ borderRadius: "50%", marginBottom: "10px" }}
          />
          <h2 style={{ marginBottom: "10px" }}>مرحباً، {user.name}!</h2>

          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              marginBottom: "20px",
            }}
          >
            🚪 تسجيل خروج
          </button>

          <button
            onClick={() => router.push("/edit-profile")}
            style={{
              backgroundColor: "#2196f3",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              marginBottom: "10px",
              width: "100%",
              maxWidth: "300px",
            }}
          >
            ✏️ تعديل الملف الشخصي
          </button>

          <button
            onClick={() => router.push("/orders")}
            style={{
              backgroundColor: "#4caf50",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              marginBottom: "10px",
              width: "100%",
              maxWidth: "300px",
            }}
          >
            🧾 طلباتي
          </button>

          <button
            onClick={() => router.push("/notifications")}
            style={{
              backgroundColor: "#ff9800",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              marginBottom: "10px",
              width: "100%",
              maxWidth: "300px",
            }}
          >
            🔔 الإشعارات
          </button>

          <button
            onClick={() => router.push("/support")}
            style={{
              backgroundColor: "#9c27b0",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              width: "100%",
              maxWidth: "300px",
            }}
          >
            💬 الدعم الفني
          </button>
        </div>
      ) : (
        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            textAlign: "center",
          }}
        >
          <p style={{ color: "#999", marginBottom: "20px" }}>
            🛠 سجلي دخولك أو أنشئي حساب للاستفادة من كل الميزات:
          </p>

          <button
            onClick={() => router.push("/login")}
            style={{
              backgroundColor: "#2196f3",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              marginBottom: "10px",
            }}
          >
            🔐 تسجيل الدخول
          </button>

          <button
            onClick={() => router.push("/signup")}
            style={{
              backgroundColor: "#4caf50",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            📝 إنشاء حساب
          </button>
        </div>
      )}

      <BottomNav />
    </div>
  );
}