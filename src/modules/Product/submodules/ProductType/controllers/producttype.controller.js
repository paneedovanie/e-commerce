const Crud = require(__srcdir + 'core/controllers/core.controller')
const ProductType = require(`${ __srcdir }modules/Product/models/ProductType`)

class ProductTypeController extends Crud {
  constructor(model) {
    super(model)
  }
}

module.exports = new ProductTypeController(ProductType)