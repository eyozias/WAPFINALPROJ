const Product = require('../models/product');

exports.save = (req, res, next) => {
    const imagePath = req.file ? req.file.path : "";
    
    const addedProd = new Product(null, req.body.title, req.body.description, req.body.price, req.body.stock, imagePath).save();
    res.status(201).json(addedProd);
}


exports.getAll = (req, res, next) => {
    res.status(200).json(Product.getAll());
}

exports.deleteById = (req, res, next) => {
    res.json(Product.deleteById(req.params.productId));
}

exports.edit = (req, res) => {
    const editedProd = new Product(req.params.productId, req.body.title, req.body.description, req.body.price, req.body.stock, req.body.image).edit();
    res.json(editedProd);
}
