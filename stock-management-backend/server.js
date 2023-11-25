const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mysql = require('mysql2');

const app = express();
const PORT = 3001;

// Enable CORS
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'aro123',
  database: 'stock2',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// API Routes
app.get('/api/stock', (req, res) => {
  connection.query('SELECT * FROM stock_items', (error, results) => {
    if (error) {
      console.error('Error querying MySQL:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});

app.post('/api/stock', (req, res) => {
  const newItem = req.body;

  if (!newItem.itemName || !newItem.quantity || !newItem.price) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  connection.query(
    'INSERT INTO stock_items (itemName, quantity, price) VALUES (?, ?, ?)',
    [newItem.itemName, newItem.quantity, newItem.price],
    (error, result) => {
      if (error) {
        console.error('Error inserting into MySQL:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        newItem.id = result.insertId;
        res.status(201).json(newItem);
      }
    }
  );
});

app.delete('/api/stock/:id', (req, res) => {
  const itemId = req.params.id;

  connection.query('DELETE FROM stock_items WHERE id = ?', [itemId], (error) => {
    if (error) {
      console.error('Error deleting from MySQL:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json({ message: 'Item deleted successfully.' });
    }
  });
});

// Serve React Frontend
const buildPath = path.join(__dirname, '..', 'stock-management-frontend', 'build');
app.use(express.static(buildPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
