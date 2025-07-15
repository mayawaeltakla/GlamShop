// src/components/HeroBanner.jsx
import React from 'react';

export default function HeroBanner() {
  return (
    <div style={{ background: '#f4f4f4', padding: '50px', textAlign: 'center', marginBottom: '30px' }}>
      <h2>أهلاً بكم في GlowShop</h2>
      <p>أفضل العروض وأجمل الملابس من Shein</p>
      {/* ممكن تضيفي زر شراء أو توجيه لأقسام */}
    </div>
  );
}