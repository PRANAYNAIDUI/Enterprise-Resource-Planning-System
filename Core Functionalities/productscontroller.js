// products.controller.js
const Product = require('../models/products.schema');
const Inventory = require('../models/inventory.schema');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().exec();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products' });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const result = await product.save();
    
    // Update inventory when a new product is added
    const inventory = new Inventory({
      productId: result._id,
      stockQuantity: 0
    });
    await inventory.save();
    
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Error adding product' });
  }
};
