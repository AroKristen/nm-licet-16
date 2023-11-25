// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StockForm from './components/StockForm';
import StockTable from './components/StockTable';
import './App.css';

function App() {
  const [stockItems, setStockItems] = useState([]);

  useEffect(() => {
    fetchStockItems();
  }, []);

  const fetchStockItems = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/stock');
      setStockItems(response.data);
    } catch (error) {
      console.error('Error fetching stock items:', error.message);
    }
  };

  const handleAddItem = async (newItem) => {
    try {
      const response = await axios.post('http://localhost:3001/api/stock', newItem);
      setStockItems([...stockItems, response.data]);
    } catch (error) {
      console.error('Error adding item:', error.message);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:3001/api/stock/${itemId}`);
      setStockItems(stockItems.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error('Error removing item:', error.message);
    }
  };

  const handleDisplayItem = (itemId) => {
    // Add logic to display the item as needed
    console.log(`Display item with ID ${itemId}`);
  };

  return (
    <div className="App">
      <h1>Stock Management System</h1>
      <StockForm onAddItem={handleAddItem} />
      <StockTable stockItems={stockItems} onRemoveItem={handleRemoveItem} onDisplayItem={handleDisplayItem} />
    </div>
  );
}

export default App;
