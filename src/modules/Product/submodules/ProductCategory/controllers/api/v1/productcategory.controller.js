const ApiController = require(__srcdir + 'core/controllers/api/api.controller')
const productcategoryController = require('../../productcategory.controller')

class ApiRoleController extends ApiController {
  constructor (props) {
    super(props)
  }
}

module.exports = new ApiRoleController(productcategoryController)