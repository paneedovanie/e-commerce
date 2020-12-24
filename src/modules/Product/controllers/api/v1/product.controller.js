const ApiController = require(__srcdir + 'core/controllers/api/api.controller')
const productController = require('../../product.controller')

class ApiRoleController extends ApiController {
  constructor (props) {
    super(props)
  }
}

module.exports = new ApiRoleController(productController)