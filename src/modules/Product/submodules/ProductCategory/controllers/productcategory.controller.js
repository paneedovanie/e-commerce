const Crud = require(__srcdir + 'core/controllers/core.controller')
const ProductCategory = require(`${ __srcdir }modules/Product/models/ProductCategory`)

class ProductCategoryController extends Crud {
  constructor(model) {
    super(model)
  }
}

module.exports = new ProductCategoryController(ProductCategory)