// StockReport.jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const StockReport = ({ inventoryData }) => {
  const inventoryItems = Object.entries(inventoryData).map(([productId, stockQuantity]) => ({
    productId,
    stockQuantity
  }));

  return (
    <div className="stock-chart">
      <h3>Current Stock Levels</h3>
      <BarChart width={500} height={300} data={inventoryItems}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="productId" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="stockQuantity" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default StockReport;