import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const lockTime = localStorage.getItem("lockTime");
    if (lockTime && Date.now() < parseInt(lockTime)) {
      setIsLocked(true);
      const timeout = setTimeout(() => {
        setIsLocked(false);
        localStorage.removeItem("lockTime");
        setFailedAttempts(0);
      }, parseInt(lockTime) - Date.now());
      return () => clearTimeout(timeout);
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLocked) {
      setError("🚫 تم قفل الحساب مؤقتًا بسبب المحاولات الخاطئة. حاول بعد دقيقة.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("/api/login", {
        email: form.email,
        password: form.password,
      });

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        setError("");
        setFailedAttempts(0);
        router.push("/");
      } else {
        handleFailure(res.data.message || "❌ بيانات الدخول غير صحيحة");
      }
    } catch (err) {
      handleFailure("❌ فشل الاتصال بالخادم أو بيانات غير صحيحة");
    }
    setLoading(false);
  };

  const handleFailure = (message) => {
    setFailedAttempts((prev) => {
      const newCount = prev + 1;
      if (newCount >= 3) {
        const lockUntil = Date.now() + 60 * 1000;
        localStorage.setItem("lockTime", lockUntil.toString());
        setIsLocked(true);
      }
      return newCount;
    });
    setError(message);
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h2 style={styles.title}>تسجيل الدخول</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            name="email"
            placeholder="📧 البريد الإلكتروني"
            value={form.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="🔒 كلمة المرور"
            value={form.password}
            onChange={handleChange}
            required
            style={styles.input}
          />
          {error && <p style={styles.error}>{error}</p>}
          <button
            type="submit"
            disabled={isLocked || loading}
            style={{
              ...styles.button,
              backgroundColor: isLocked || loading ? "#ccc" : "#0070f3",
              cursor: isLocked || loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "⏳ جاري الدخول..." : "دخول"}
          </button>
        </form>
        <p style={styles.linkText}>
          <a href="/reset-password" style={styles.link}>نسيت كلمة المرور؟</a>
        </p>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(to right, #fce4ec, #f3e5f5)",
    padding: "20px",
  },
  container: {
    width: "100%",
    maxWidth: "400px",
    backgroundColor: "#fff",
    padding: "30px 20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "24px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "12px",
    fontSize: "18px",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    transition: "background-color 0.3s",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginTop: "-10px",
    marginBottom: "10px",
  },
  linkText: {
    marginTop: "20px",
    textAlign: "center",
    fontSize: "14px",
  },
  link: {
    color: "#0070f3",
    textDecoration: "none",
  },
};