// api-service.js
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3001;

// Middleware
app.use(express.json());

// Authentication Middleware
const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'your-secret-key');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({
      error: 'Please authenticate.',
      details: error.name
    });
  }
};

// Routes
app.get('/hr/employees', authenticate, (req, res) => {
  // Logic to fetch employees
});

// Start server
app.listen(port, () => {
  console.log(`API service listening on port ${port}`);
});
