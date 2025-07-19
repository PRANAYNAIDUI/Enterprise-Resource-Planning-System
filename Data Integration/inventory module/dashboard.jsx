// InventoryDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductForm from './ProductForm';
import OrderForm from './OrderForm';
import StockReport from './StockReport';

function InventoryDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [inventory, setInventory] = useState({});

  useEffect(() => {
    fetchProducts();
    fetchOrders();
    fetchInventory();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/orders');
      setOrders(response.data);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  const fetchInventory = async () => {
    try {
      const response = await axios.get('/api/inventory');
      setInventory(response.data);
    } catch (err) {
      console.error('Error fetching inventory:', err);
    }
  };

  return (
    <div className="dashboard">
      <h1>Inventory Management Dashboard</h1>
      <div className="dashboard-sections">
        <div className="products-section">
          <h2>Products</h2>
          <ProductForm onAddProduct={fetchProducts} />
          <table>
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.productId}</td>
                  <td>{product.productName}</td>
                  <td>${product.productPrice}</td>
                  <td>{inventory[product._id]?.stockQuantity || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="orders-section">
          <h2>Orders</h2>
          <OrderForm onPlaceOrder={fetchOrders} />
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.orderId}</td>
                  <td>{order.productId}</td>
                  <td>{order.orderQuantity}</td>
                  <td>{order.orderStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="stock-report">
          <h2>Stock Levels</h2>
          <StockReport inventoryData={inventory} />
        </div>
      </div>
    </div>
  );
}

export default InventoryDashboard;
