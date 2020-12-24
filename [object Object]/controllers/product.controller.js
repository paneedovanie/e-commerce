const Crud = require(__srcdir + 'core/controllers/core.controller')
const Product = require('../models/Product')

class ProductController extends Crud {
  constructor(model) {
    super(model)
  }
}

module.exports = new ProductController(Product)