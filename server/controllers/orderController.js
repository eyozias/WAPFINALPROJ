const Product = require("../models/product");

exports.checkout = (req, res, next) => {
  const cart = req.body;
  const orderedProducts = [];

  for (const cartItem of cart) {
    const product = Product.getByID(cartItem.id);
    if (!product) {
      return res
        .status(400)
        .json({ error: `Product with id ${cartItem.id} not found.` });
    }

    if (cartItem.quantity > product.stock) {
      return res.status(400).json({
        error: `Quantity requested for product ${product.title} is greater than stock.`,
      });
    }

    product.stock -= cartItem.quantity;

    // product.edit();

    orderedProducts.push({ ...product, quantity: cartItem.quantity });
  }

  res.status(201).json({ orderedProducts });
};
