// orders.schema.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  orderId: { type: String, required: true, unique: true },
  productId: { type: String, required: true, ref: 'Product' },
  orderQuantity: { type: Number, required: true },
  orderStatus: { type: String, enum: ['PENDING', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED'] },
  orderedBy: { type: String },
  deliveryAddress: { type: String },
  orderDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
