import React, { useState } from 'react';

function CountryCurrencySelector() {
  const [country, setCountry] = useState('US');
  const [currency, setCurrency] = useState('USD');

  return (
    <div className="selector">
      <select value={country} onChange={(e) => setCountry(e.target.value)}>
        <option value="US">USA</option>
        <option value="AE">UAE</option>
        <option value="EG">Egypt</option>
      </select>
      <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
        <option value="USD">USD</option>
        <option value="AED">AED</option>
        <option value="EGP">EGP</option>
      </select>
    </div>
  );
}

export default CountryCurrencySelector;