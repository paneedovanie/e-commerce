const ApiController = require(__srcdir + 'core/controllers/api/api.controller')
const roleController = require(`../../role.controller`)

class ApiRoleController extends ApiController {
	constructor (props) {
		super(props)
	}
}

module.exports = new ApiRoleController(roleController)