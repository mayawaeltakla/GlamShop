// src/components/Splash.jsx
import React, { useEffect, useState } from "react";
import styles from "./Splash.module.css";

export default function Splash({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3000); // تظهر لمدة 3 ثواني
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className={styles.splash}>
      <h1 className={styles.glow}>GLOW SHOP</h1>
    </div>
  );
}