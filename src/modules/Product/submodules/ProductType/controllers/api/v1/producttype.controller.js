const ApiController = require(__srcdir + 'core/controllers/api/api.controller')
const producttypeController = require('../../producttype.controller')

class ApiRoleController extends ApiController {
  constructor (props) {
    super(props)
  }
}

module.exports = new ApiRoleController(producttypeController)