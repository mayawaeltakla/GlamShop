import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    updateCart(updatedCart);
  };

  const increaseQty = (id) => {
    const updatedCart = cart.map(item =>
      item.id === id
        ? { ...item, quantity: (item.quantity || 1) + 1 }
        : item
    );
    updateCart(updatedCart);
  };

  const decreaseQty = (id) => {
    const updatedCart = cart.map(item =>
      item.id === id && (item.quantity || 1) > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    updateCart(updatedCart);
  };

  const itemsTotal = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const shippingFee = cart.reduce(
    (sum, item) => sum + (item.quantity || 1) * 1,
    0
  );

  const totalPrice = itemsTotal + shippingFee;

  if (cart.length === 0) {
    return (
      <div style={styles.container}>
        <h2 style={{ marginBottom: "20px" }}>🛒 السلة فارغة حالياً.</h2>
        <button style={styles.backButton} onClick={() => router.push("/")}>
          ← العودة للتسوق
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🛒 سلة المشتريات</h1>
      <ul style={{ listStyle: "none", padding: 0, width: "100%" }}>
        {cart.map(item => (
          <li key={item.id} style={styles.item}>
            <h3 style={styles.itemTitle}>{item.title}</h3>
            <p>السعر للوحدة: ${item.price.toFixed(2)}</p>
            <div style={styles.controls}>
              <button onClick={() => decreaseQty(item.id)} style={styles.qtyButton}>-</button>
              <span style={styles.qty}>{item.quantity || 1}</span>
              <button onClick={() => increaseQty(item.id)} style={styles.qtyButton}>+</button>
              <button onClick={() => removeFromCart(item.id)} style={styles.deleteButton}>
                ❌ حذف
              </button>
            </div>
            <p>المجموع: ${(item.price * (item.quantity || 1)).toFixed(2)}</p>
          </li>
        ))}
      </ul>

      <hr style={{ width: "100%", margin: "20px 0" }} />

      <p>رسوم التوصيل: ${shippingFee.toFixed(2)}</p>
      <h3>المجموع الكلي: ${totalPrice.toFixed(2)}</h3>

      <button
        onClick={() => router.push("/checkout")}
        style={styles.checkoutButton}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#45a049")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4CAF50")}
      >
        💳 متابعة للدفع
      </button>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial",
    maxWidth: "800px",
    margin: "auto",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  item: {
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "15px",
    marginBottom: "15px",
    backgroundColor: "#f9f9f9",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  itemTitle: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "10px",
  },
  qtyButton: {
    padding: "5px 10px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    backgroundColor: "#eee",
    cursor: "pointer",
  },
  qty: {
    fontWeight: "bold",
    fontSize: "16px",
    minWidth: "20px",
    textAlign: "center",
  },
  deleteButton: {
    marginLeft: "auto",
    color: "#fff",
    backgroundColor: "#e53935",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  checkoutButton: {
    marginTop: "20px",
    padding: "12px 24px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    width: "100%",
    maxWidth: "400px",
    alignSelf: "center",
  },
  backButton: {
    padding: "10px 20px",
    borderRadius: "8px",
    backgroundColor: "#ccc",
    border: "none",
    cursor: "pointer",
  },
};