const ApiController = require(__srcdir + 'core/controllers/api/api.controller')
const categoryController = require('../../category.controller')

class ApiRoleController extends ApiController {
  constructor (props) {
    super(props)
  }
}

module.exports = new ApiRoleController(categoryController)