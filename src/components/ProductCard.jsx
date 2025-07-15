// src/components/ProductCard.jsx
import React from 'react';

export default function ProductCard({ product }) {
  return (
    <div style={{ border: '1px solid #ddd', padding: '15px', width: '200px' }}>
      <img src={product.image} alt={product.name} style={{ width: '100%', height: 'auto' }} />
      <h3>{product.name}</h3>
      <p>السعر: ${product.price}</p>
    </div>
  );
}