// src/components/StockForm.js
import React, { useState } from 'react';

function StockForm({ onAddItem }) {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const handleAddItem = () => {
    // Check if required fields are present
    if (!itemName || !quantity || !price) {
      alert('All fields are required.');
      return;
    }

    const newItem = {
      itemName,
      quantity: parseInt(quantity, 10),
      price: parseFloat(price),
    };

    onAddItem(newItem);

    // Clear input fields
    setItemName('');
    setQuantity('');
    setPrice('');
  };

  return (
    <div className="stock-form">
      <label htmlFor="itemName">Item Name:</label>
      <input
        type="text"
        id="itemName"
        placeholder="Enter item name"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />

      <label htmlFor="quantity">Quantity:</label>
      <input
        type="number"
        id="quantity"
        placeholder="Enter quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      <label htmlFor="price">Price:</label>
      <input
        type="number"
        id="price"
        placeholder="Enter price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <button onClick={handleAddItem}>Add Item</button>
    </div>
  );
}

export default StockForm;
