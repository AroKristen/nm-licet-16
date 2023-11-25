// src/components/StockTable.js
import React from 'react';

function StockTable({ stockItems, onRemoveItem, onDisplayItem }) {
  return (
    <div className="stock-table">
      <h2>Stock Table</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stockItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.itemName}</td>
              <td>{item.quantity}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>
                <button onClick={() => onRemoveItem(item.id)}>Remove</button>
                <button onClick={() => onDisplayItem(item.id)}>Display</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StockTable;
