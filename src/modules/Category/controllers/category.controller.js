const Crud = require(__srcdir + 'core/controllers/core.controller')
const Category = require(`${ __srcdir }modules/Category/models/Category`)

class CategoryController extends Crud {
  constructor(model) {
    super(model)
  }
}

module.exports = new CategoryController(Category)