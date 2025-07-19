// products.schema.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  productId: { type: String, required: true, unique: true },
  productName: { type: String, required: true },
  productDescription: { type: String },
  productPrice: { type: Number, required: true },
  productCategory: { type: String },
  createdDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);