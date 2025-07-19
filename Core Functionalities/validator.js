// validation/product.validator.js
const Joi = require('joi');

const productSchema = Joi.object({
  productId: Joi.string().min(5).required(),
  productName: Joi.string().min(3).required(),
  productPrice: Joi.number().min(0).required()
});

module.exports = (req, res, next) => {
  const { error } = productSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
