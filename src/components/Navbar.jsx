// components/Navbar.js
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Navbar({ theme, toggleTheme }) {
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const [language, setLanguage] = useState("العربية");
  const [country, setCountry] = useState("سوريا");
  const [currency, setCurrency] = useState("SYP");

  useEffect(() => {
    setLanguage(localStorage.getItem("language") || "العربية");
    setCountry(localStorage.getItem("country") || "سوريا");
    setCurrency(localStorage.getItem("currency") || "SYP");
  }, []);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem("country", country);
  }, [country]);

  useEffect(() => {
    localStorage.setItem("currency", currency);
  }, [currency]);

  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen);
    setMenuOpen(false);
  };

  const btnStyle = {
    padding: "10px 20px",
    width: "100%",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
    marginTop: "10px",
  };

  return (
    <>
      <nav
        style={{
          width: "100%",
          height: "60px",
          backgroundColor: theme === "dark" ? "#222" : "#f2f2f2",
          color: theme === "dark" ? "#fff" : "#000",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
          position: "relative",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div></div> {/* بدل PR MAYA، تركناه فاضي 👌 */}

        <div
          title="الإعدادات"
          onClick={toggleSettings}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && toggleSettings()}
          style={{ fontSize: "1.8rem", cursor: "pointer" }}
        >
          ⚙️
        </div>
      </nav>

      <aside
        style={{
          position: "fixed",
          top: "60px",
          right: 0,
          width: "280px",
          height: "calc(100% - 60px)",
          backgroundColor: theme === "dark" ? "#333" : "#fff",
          color: theme === "dark" ? "#fff" : "#000",
          boxShadow: "-2px 0 5px rgba(0,0,0,0.1)",
          padding: "20px",
          transform: settingsOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease",
          overflowY: "auto",
          zIndex: 1000,
          fontSize: "1rem",
        }}
        aria-hidden={!settingsOpen}
      >
        <button
          onClick={() => setSettingsOpen(false)}
          style={{
            position: "absolute",
            top: "10px",
            left: "15px",
            
            fontSize: "2rem",
            background: "none",
            border: "none",
            color: theme === "dark" ? "#fff" : "#000",
            cursor: "pointer",
          }}
        >
          ×
        </button>

        {/* زر تبديل الثيم */}
        <button
          onClick={toggleTheme}
          title="تبديل الوضع"
          aria-pressed={theme === "dark"}
          style={{
            marginBottom: "60px",
            fontSize: "2.4rem",
            cursor: "pointer",
            background: "none",
            border: "none",
            color: theme === "dark" ? "#fff" : "#000",
          }}
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>

        {/* 🟢 زر تسجيل الدخول */}
        <button
          type="button"
          onClick={() => router.push("/login")}
          style={{ ...btnStyle, backgroundColor: "#0070f3", color: "#fff" }}
        >
          تسجيل الدخول
        </button>

        {/* 🟢 زر تسجيل جديد */}
        <button
          type="button"
          onClick={() => router.push("/signup")}
          style={{ ...btnStyle, backgroundColor: "#28a745", color: "#fff" }}
        >
          تسجيل جديد
        </button>
        <hr style={{ margin: "20px 0" }} />

        <label>🌐 اللغة:</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={btnStyle}
        >
          {["العربية", "English", "Français"].map((lang) => (
            <option key={lang}>{lang}</option>
          ))}
        </select>

        <label>🏳️ البلد:</label>
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          style={btnStyle}
        >
          {["سوريا", "مصر", "لبنان", "الإمارات"].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <label>💰 العملة:</label>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          style={btnStyle}
        >
          {["SYP", "EGP", "USD", "AED"].map((cur) => (
            <option key={cur}>{cur}</option>
          ))}
        </select>
      </aside>
    </>
  );
}