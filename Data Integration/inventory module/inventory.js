// inventory.schema.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inventorySchema = new Schema({
  productId: { type: String, required: true, ref: 'Product' },
  stockQuantity: { type: Number, required: true },
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Inventory', inventorySchema);